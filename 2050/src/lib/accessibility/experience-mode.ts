export type ExperienceMode = "webgl-capable" | "accessible-fallback";

/**
 * Selects a capability state only. It does not start or render a 3D experience.
 */
export function getExperienceMode(webglAvailable: boolean): ExperienceMode {
  return webglAvailable ? "webgl-capable" : "accessible-fallback";
}
