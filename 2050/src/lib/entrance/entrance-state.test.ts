import { describe, expect, it } from "vitest";
import { readSoundPreference, shouldSkipEntranceMotion } from "./entrance-state";

describe("entrance preferences", () => {
  it("skips cinematic movement when reduced motion is requested", () => {
    expect(shouldSkipEntranceMotion(true)).toBe(true);
    expect(shouldSkipEntranceMotion(false)).toBe(false);
  });

  it("defaults sound to off unless an explicit on preference exists", () => {
    expect(readSoundPreference(null)).toBe(false);
    expect(readSoundPreference("off")).toBe(false);
    expect(readSoundPreference("on")).toBe(true);
  });
});
