import { describe, expect, it } from "vitest";
import {
  getVideoCrossfadeDuration,
  getVideoLayerOpacity,
  shouldStartVideoCrossfade,
} from "../components/LoopingVideo";

describe("video crossfade timing", () => {
  it("starts fading during the final 1.5 seconds of longer videos", () => {
    expect(shouldStartVideoCrossfade(10, 8.4)).toBe(false);
    expect(shouldStartVideoCrossfade(10, 8.5)).toBe(true);
  });

  it("shortens the fade for short clips and rejects invalid durations", () => {
    expect(getVideoCrossfadeDuration(0.9)).toBe(0.3);
    expect(getVideoCrossfadeDuration(Number.NaN)).toBe(0);
    expect(shouldStartVideoCrossfade(Number.POSITIVE_INFINITY, 1)).toBe(false);
  });

  it("fades from the active video to the incoming video", () => {
    expect(getVideoLayerOpacity(0, 0, null)).toBe(1);
    expect(getVideoLayerOpacity(1, 0, null)).toBe(0);
    expect(getVideoLayerOpacity(0, 0, 1)).toBe(0);
    expect(getVideoLayerOpacity(1, 0, 1)).toBe(1);
  });
});
