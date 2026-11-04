import { useCallback, useEffect, useRef, useState } from "react";
import { backgroundStill, type BackgroundLook } from "@/lib/backgrounds";
import { preloadImage } from "@/lib/preload";
import LoopingVideo from "./LoopingVideo";

// Keep in sync with --background-fade-duration in styles.css.
const FADE_MS = 800;

interface BackgroundLayerProps {
  look: BackgroundLook;
}

interface Layer {
  id: number;
  look: BackgroundLook;
  fadeIn: boolean;
}

function BackgroundMedia({ layer, onError }: { layer: Layer; onError: () => void }) {
  const className = `ntp-bg${layer.fadeIn ? " ntp-bg-fade-in" : ""}`;
  const { look } = layer;

  if (look.kind === "fallback") return null;

  if (look.kind === "gradient") {
    return <div className={className} style={{ background: look.css }} aria-hidden="true" />;
  }

  if (look.kind === "image") {
    return (
      <img
        className={`${className} ntp-bg-image`}
        src={look.src}
        alt=""
        aria-hidden="true"
        draggable={false}
        onError={onError}
      />
    );
  }

  return (
    <LoopingVideo
      key={look.url}
      className={className}
      src={look.url}
      poster={look.poster}
      onError={onError}
    />
  );
}

/** Renders the selected background over the branded fallback, crossfading from
 *  the previous background whenever the selection changes. */
export default function BackgroundLayer({ look }: BackgroundLayerProps) {
  const nextId = useRef(1);
  const lastLook = useRef(look);
  const removalTimer = useRef<number | null>(null);
  const [layers, setLayers] = useState<Layer[]>(() =>
    look.kind === "fallback" ? [] : [{ id: 0, look, fadeIn: false }],
  );

  const removeLayer = useCallback((id: number) => {
    setLayers((current) => current.filter((layer) => layer.id !== id));
  }, []);

  useEffect(() => {
    if (look === lastLook.current) return;
    lastLook.current = look;

    if (removalTimer.current !== null) {
      window.clearTimeout(removalTimer.current);
      removalTimer.current = null;
    }

    if (look.kind === "fallback") {
      setLayers([]);
      return;
    }

    let cancelled = false;

    const show = () => {
      if (cancelled) return;

      const id = nextId.current++;
      setLayers((current) => {
        const previous = current[current.length - 1];
        return [
          // Promote the outgoing layer to full opacity if it was still fading in,
          // then fade the new background over it.
          ...(previous ? [{ ...previous, fadeIn: false }] : []),
          { id, look, fadeIn: true },
        ];
      });

      removalTimer.current = window.setTimeout(() => {
        // Drop the outgoing layer and release the incoming layer's animation/GPU
        // hint now that it fully covers the screen.
        setLayers((current) =>
          current
            .filter((layer) => layer.id === id)
            .map((layer) => ({ ...layer, fadeIn: false })),
        );
        removalTimer.current = null;
      }, FADE_MS + 80);
    };

    // Decode the incoming still first so the fade never lands on a blank frame.
    const still = backgroundStill(look);
    if (!still) {
      show();
    } else {
      void preloadImage(still).then((loaded) => {
        if (cancelled) return;
        if (!loaded && look.kind === "image") {
          setLayers([]);
          return;
        }
        show();
      });
    }

    return () => {
      cancelled = true;
    };
  }, [look, removeLayer]);

  useEffect(() => {
    return () => {
      if (removalTimer.current !== null) window.clearTimeout(removalTimer.current);
    };
  }, []);

  return (
    <>
      {layers.map((layer) => (
        <BackgroundMedia key={layer.id} layer={layer} onError={() => removeLayer(layer.id)} />
      ))}
    </>
  );
}
