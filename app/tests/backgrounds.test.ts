import { describe, expect, it } from "vitest";
import { backgroundStill, resolveBackground, SYSTEM_BACKGROUNDS } from "../lib/backgrounds";

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

  it("exposes the lightweight still used while a background loads", () => {
    const image = SYSTEM_BACKGROUNDS.find((background) => background.src)!;
    const video = SYSTEM_BACKGROUNDS.find((background) => background.video)!;

    expect(backgroundStill(resolveBackground(image.id))).toBe(image.src);
    expect(backgroundStill(resolveBackground(video.id))).toBe(video.poster);
    expect(backgroundStill({ kind: "fallback" })).toBeUndefined();
  });
});
