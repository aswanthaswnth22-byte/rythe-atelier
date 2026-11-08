import { describe, expect, it } from "vitest";
import { showroomEnvironments } from "./environments";

describe("showroom environment fixtures", () => {
  it("defines the three approved prototype destinations", () => {
    expect(showroomEnvironments.map((environment) => environment.id)).toEqual([
      "threshold",
      "gallery",
      "archive"
    ]);
  });

  it("keeps panorama assets as explicit placeholders in Phase 1", () => {
    expect(showroomEnvironments.every((environment) => environment.panorama.src === "")).toBe(true);
  });

  it("provides navigation hotspots that target known destinations", () => {
    const ids = new Set(showroomEnvironments.map((environment) => environment.id));
    const destinations = showroomEnvironments.flatMap((environment) => environment.hotspots.map((hotspot) => hotspot.action.type === "navigate" ? hotspot.action.destinationId : null));
    expect(destinations.every((destination) => destination !== null && ids.has(destination))).toBe(true);
  });

  it("uses unique environment identifiers", () => {
    const ids = showroomEnvironments.map((environment) => environment.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
