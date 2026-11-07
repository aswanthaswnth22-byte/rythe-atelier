export type HotspotAction =
  | { type: "navigate"; destinationId: string }
  | { type: "open-product"; productId: string }
  | { type: "open-concierge"; guideId: string };

export interface PanoramaSource {
  /** Public path or future CDN URL for an equirectangular panorama. */
  src: string;
  /** Intrinsic image dimensions, when known. */
  width?: number;
  height?: number;
  /** Optional descriptive alternative for non-visual navigation. */
  alt: string;
}

export interface ShowroomHotspot {
  id: string;
  label: string;
  /** Normalized spherical coordinates: yaw and pitch in radians. */
  yaw: number;
  pitch: number;
  action: HotspotAction;
}

export interface ShowroomEnvironment {
  id: string;
  name: string;
  description: string;
  panorama: PanoramaSource;
  hotspots: readonly ShowroomHotspot[];
}

export interface ProductDisplayMetadata {
  productId: string;
  environmentId: string;
  hotspotId: string;
  displayOrder: number;
  presentation: "image-led" | "model-ready";
}
