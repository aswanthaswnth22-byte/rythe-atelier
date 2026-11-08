import type { ShowroomEnvironment } from "@/types/showroom";

/**
 * Prototype navigation fixtures. The panorama artwork is generated locally as
 * a temporary visual placeholder until approved 360-degree assets are supplied.
 */
export const showroomEnvironments = [
  {
    id: "threshold",
    name: "The Threshold",
    description: "A quiet arrival point. Choose a direction and enter the atelier.",
    panorama: { src: "", alt: "Temporary generated panorama placeholder for The Threshold." },
    hotspots: [
      { id: "to-gallery", label: "Enter The Gallery", yaw: -0.52, pitch: 0.08, action: { type: "navigate", destinationId: "gallery" } },
      { id: "to-archive", label: "Explore The Archive", yaw: 0.72, pitch: -0.04, action: { type: "navigate", destinationId: "archive" } }
    ]
  },
  {
    id: "gallery",
    name: "The Gallery",
    description: "The central collection space. Move through the room and discover its architecture.",
    panorama: { src: "", alt: "Temporary generated panorama placeholder for The Gallery." },
    hotspots: [
      { id: "gallery-threshold", label: "Return to The Threshold", yaw: 2.48, pitch: 0.02, action: { type: "navigate", destinationId: "threshold" } },
      { id: "gallery-archive", label: "Continue to The Archive", yaw: -0.72, pitch: -0.08, action: { type: "navigate", destinationId: "archive" } }
    ]
  },
  {
    id: "archive",
    name: "The Archive",
    description: "A slower space for material studies, collection notes and the stories behind each object.",
    panorama: { src: "", alt: "Temporary generated panorama placeholder for The Archive." },
    hotspots: [
      { id: "archive-threshold", label: "Return to The Threshold", yaw: -2.45, pitch: 0.03, action: { type: "navigate", destinationId: "threshold" } },
      { id: "archive-gallery", label: "Enter The Gallery", yaw: 0.64, pitch: 0.02, action: { type: "navigate", destinationId: "gallery" } }
    ]
  }
] as const satisfies readonly ShowroomEnvironment[];
