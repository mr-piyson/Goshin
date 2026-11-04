import { describe, expect, it } from "vitest";
import { resolveBackground, SYSTEM_BACKGROUNDS } from "../lib/backgrounds";

describe("resolveBackground", () => {
  it("uses the bundled ambient video and its poster when selected", () => {
    const video = SYSTEM_BACKGROUNDS.find((background) => background.video)!;

    expect(resolveBackground(video.id)).toEqual({
      kind: "video",
      url: video.video,
      poster: video.poster,
    });
  });

  it("keeps the existing image background as the default", () => {
    const image = SYSTEM_BACKGROUNDS.find((background) => background.src)!;
    const look = resolveBackground(image.id);

    expect(look.kind).toBe("image");
    if (look.kind === "image") expect(look.src).toBe(image.src);
  });

  it("falls back to the branded background when a selection is missing", () => {
    expect(resolveBackground("custom")).toEqual({ kind: "fallback" });
    expect(resolveBackground("removed-background")).toEqual({ kind: "fallback" });
  });
});
