import { describe, expect, it } from "vitest";
import { angleDelta, projectHotspot } from "./navigation";

describe("showroom navigation geometry", () => {
  it("uses the shortest angular distance across the wrap boundary", () => {
    expect(angleDelta(-Math.PI + 0.1, Math.PI - 0.1)).toBeCloseTo(0.2);
  });

  it("projects a forward hotspot to the center of the viewport", () => {
    expect(projectHotspot(0, 0, 0, 0)).toEqual({ left: 50, top: 50, visible: true });
  });

  it("hides hotspots outside the current field of view", () => {
    expect(projectHotspot(2.2, 0, 0, 0).visible).toBe(false);
  });
});
