import { describe, expect, it } from "vitest";
import { resolveBackground, SYSTEM_BACKGROUNDS } from "../lib/backgrounds";

describe("resolveBackground", () => {
  it("uses the bundled ambient video when selected", () => {
    expect(resolveBackground("bg-video").kind).toBe("video");
    expect(resolveBackground("bg-video")).toEqual({
      kind: "video",
      url: "/backgrounds/10070-fhd.mp4",
    });
  });

  it("keeps the existing image background as the default", () => {
    expect(resolveBackground(SYSTEM_BACKGROUNDS[0]!.id).kind).toBe("image");
  });
});
