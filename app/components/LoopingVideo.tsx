import { useCallback, useEffect, useRef, useState } from "react";

const MAX_CROSSFADE_SECONDS = 1.5;

export function getVideoCrossfadeDuration(duration: number): number {
  return Number.isFinite(duration) && duration > 0
    ? Math.min(MAX_CROSSFADE_SECONDS, duration / 3)
    : 0;
}

export function shouldStartVideoCrossfade(duration: number, currentTime: number): boolean {
  const fadeDuration = getVideoCrossfadeDuration(duration);
  return fadeDuration > 0 && Number.isFinite(currentTime) && duration - currentTime <= fadeDuration;
}

export function getVideoLayerOpacity(index: number, active: number, fadeTo: number | null): number {
  return fadeTo !== null || index === active ? 1 : 0;
}

export function getVideoLayerZIndex(index: number, active: number, fadeTo: number | null): number {
  return index === (fadeTo ?? active) ? 2 : 1;
}

interface LoopingVideoProps {
  src: string;
  className: string;
  poster?: string;
  onError?: () => void;
}

export default function LoopingVideo({ src, className, poster, onError }: LoopingVideoProps) {
  const videos = useRef<[HTMLVideoElement | null, HTMLVideoElement | null]>([null, null]);
  const activeRef = useRef(0);
  const fadeToRef = useRef<number | null>(null);
  const fallbackTimer = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const [fadeTo, setFadeTo] = useState<number | null>(null);
  const [fadeDuration, setFadeDuration] = useState(MAX_CROSSFADE_SECONDS);

  const finishFade = useCallback((outgoingIndex: number) => {
    const incomingIndex = fadeToRef.current;
    if (incomingIndex === null) return;

    if (fallbackTimer.current !== null) {
      window.clearTimeout(fallbackTimer.current);
      fallbackTimer.current = null;
    }

    activeRef.current = incomingIndex;
    fadeToRef.current = null;
    setActive(incomingIndex);
    setFadeTo(null);

    const outgoing = videos.current[outgoingIndex];
    if (outgoing) {
      outgoing.pause();
      outgoing.currentTime = 0;
    }
  }, []);

  const startFade = useCallback(
    (outgoingIndex: number) => {
      if (activeRef.current !== outgoingIndex || fadeToRef.current !== null) return;

      const outgoing = videos.current[outgoingIndex];
      const fadeSeconds = outgoing ? getVideoCrossfadeDuration(outgoing.duration) : 0;
      const incomingIndex = 1 - outgoingIndex;
      const incoming = videos.current[incomingIndex];
      if (!outgoing || !incoming || !fadeSeconds) return;

      fadeToRef.current = incomingIndex;
      setFadeTo(incomingIndex);
      setFadeDuration(fadeSeconds);
      incoming.currentTime = 0;
      void incoming.play().catch((error: unknown) => {
        console.warn("[newtab] could not play background video fade layer", error);
        fadeToRef.current = null;
        setFadeTo(null);
        outgoing.currentTime = 0;
        void outgoing.play().catch((restartError: unknown) => {
          console.warn("[newtab] could not restart background video", restartError);
        });
      });
    },
    [],
  );

  const handleTimeUpdate = useCallback(
    (index: number) => {
      if (index !== activeRef.current || fadeToRef.current !== null) return;
      const video = videos.current[index];
      if (video && shouldStartVideoCrossfade(video.duration, video.currentTime)) {
        startFade(index);
      }
    },
    [startFade],
  );

  const handleEnded = useCallback(
    (index: number) => {
      if (index !== activeRef.current) return;

      if (fadeToRef.current === null) {
        startFade(index);
        if (fadeToRef.current === null) {
          const video = videos.current[index];
          if (video) {
            video.currentTime = 0;
            void video.play().catch((error: unknown) => {
              console.warn("[newtab] could not restart background video", error);
            });
          }
          return;
        }
        fallbackTimer.current = window.setTimeout(
          () => finishFade(index),
          getVideoCrossfadeDuration(videos.current[index]?.duration ?? 0) * 1000,
        );
        return;
      }

      finishFade(index);
    },
    [finishFade, startFade],
  );

  useEffect(() => {
    const initialVideo = videos.current[activeRef.current];
    if (initialVideo) {
      void initialVideo.play().catch((error: unknown) => {
        console.warn("[newtab] could not autoplay background video", error);
      });
    }

    return () => {
      if (fallbackTimer.current !== null) window.clearTimeout(fallbackTimer.current);
      videos.current.forEach((video) => video?.pause());
    };
  }, [src]);

  return (
    <div className={className} aria-hidden="true">
      {[0, 1].map((index) => (
        <video
          key={index}
          ref={(video) => {
            videos.current[index] = video;
          }}
          src={src}
          poster={poster}
          muted
          playsInline
          autoPlay={index === 0}
          preload="auto"
          className="looping-video-layer"
          style={{
            opacity: getVideoLayerOpacity(index, active, fadeTo),
            zIndex: getVideoLayerZIndex(index, active, fadeTo),
            transitionDuration: `${fadeDuration}s`,
          }}
          onTimeUpdate={() => handleTimeUpdate(index)}
          onEnded={() => handleEnded(index)}
          onError={onError}
        />
      ))}
    </div>
  );
}
