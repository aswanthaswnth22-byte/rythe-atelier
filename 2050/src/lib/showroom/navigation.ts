export interface HotspotPosition {
  left: number;
  top: number;
  visible: boolean;
}

export function angleDelta(target: number, origin: number): number {
  let delta = target - origin;
  while (delta > Math.PI) delta -= Math.PI * 2;
  while (delta < -Math.PI) delta += Math.PI * 2;
  return delta;
}

export function projectHotspot(
  yaw: number,
  pitch: number,
  cameraYaw: number,
  cameraPitch: number
): HotspotPosition {
  const horizontal = angleDelta(yaw, cameraYaw);
  const vertical = pitch - cameraPitch;
  return {
    left: 50 + (horizontal / 2.1) * 100,
    top: 50 - (vertical / 1.64) * 100,
    visible: Math.abs(horizontal) < 1.05 && Math.abs(vertical) < 0.82
  };
}
