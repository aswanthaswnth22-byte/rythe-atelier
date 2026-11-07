export function shouldSkipEntranceMotion(prefersReducedMotion: boolean): boolean {
  return prefersReducedMotion;
}

export function readSoundPreference(value: string | null): boolean {
  return value === "on";
}
