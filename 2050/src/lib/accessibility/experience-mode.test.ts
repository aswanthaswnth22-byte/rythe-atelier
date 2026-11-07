import { describe, expect, it } from "vitest";
import { getExperienceMode } from "./experience-mode";

describe("getExperienceMode", () => {
  it("returns webgl-capable when WebGL is available", () => {
    expect(getExperienceMode(true)).toBe("webgl-capable");
  });

  it("returns the accessible fallback when WebGL is unavailable", () => {
    expect(getExperienceMode(false)).toBe("accessible-fallback");
  });
});
