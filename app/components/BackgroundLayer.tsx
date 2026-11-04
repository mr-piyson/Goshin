import { useEffect, useState } from "react";
import type { BackgroundLook } from "@/lib/backgrounds";
import LoopingVideo from "./LoopingVideo";

interface BackgroundLayerProps {
  look: BackgroundLook;
}

/** Renders the selected background. If it fails to load, nothing is rendered so
 *  the branded FallbackBackground underneath stays visible. */
export default function BackgroundLayer({ look }: BackgroundLayerProps) {
  const [failed, setFailed] = useState(false);
  const source =
    look.kind === "image" ? look.src : look.kind === "video" ? look.url : look.kind === "gradient" ? look.css : "";

  useEffect(() => {
    setFailed(false);
  }, [source]);

  if (look.kind === "fallback" || failed) return null;

  if (look.kind === "gradient") {
    return <div className="ntp-bg" style={{ background: look.css }} aria-hidden="true" />;
  }

  if (look.kind === "image") {
    return (
      <img
        className="ntp-bg ntp-bg-image"
        src={look.src}
        alt=""
        aria-hidden="true"
        draggable={false}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <LoopingVideo
      key={look.url}
      className="ntp-bg"
      src={look.url}
      poster={look.poster}
      onError={() => setFailed(true)}
    />
  );
}
