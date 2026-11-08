import type { ShowroomEnvironment } from "@/types/showroom";

/**
 * Prototype navigation fixtures. The panorama artwork is stored as uploaded JPEG assets in public/panoramas.
 */
export const showroomEnvironments = [
  {
    id: "threshold",
    name: "The Threshold",
    description: "A quiet arrival point. Choose a direction and enter the atelier.",
    panorama: { src: "/panoramas/WhatsApp%20Image%202026-11-08%20at%206.09.14%20PM.jpeg", alt: "360-degree panorama of The Threshold, with aubergine walls, dark marble flooring and sculptural entrance." },
    hotspots: [
      { id: "to-gallery", label: "Enter The Gallery", yaw: -0.52, pitch: 0.08, action: { type: "navigate", destinationId: "gallery" } },
      { id: "to-archive", label: "Explore The Archive", yaw: 0.72, pitch: -0.04, action: { type: "navigate", destinationId: "archive" } }
    ]
  },
  {
    id: "gallery",
    name: "The Gallery",
    description: "The central collection space. Move through the room and discover its architecture.",
    panorama: { src: "/panoramas/WhatsApp%20Image%202026-11-08%20at%209.43.15%20PM.jpeg", alt: "360-degree panorama of The Gallery, with sculptural metallic display platforms and dark aubergine architecture." },
    hotspots: [
      { id: "gallery-threshold", label: "Return to The Threshold", yaw: 2.48, pitch: 0.02, action: { type: "navigate", destinationId: "threshold" } },
      { id: "gallery-archive", label: "Continue to The Archive", yaw: -0.72, pitch: -0.08, action: { type: "navigate", destinationId: "archive" } }
    ]
  },
  {
    id: "archive",
    name: "The Archive",
    description: "A slower space for material studies, collection notes and the stories behind each object.",
    panorama: { src: "/panoramas/WhatsApp%20Image%202026-11-08%20at%209.43.16%20PM.jpeg", alt: "360-degree panorama of The Archive, with illuminated garment display niches and aubergine walls." },
    hotspots: [
      { id: "archive-threshold", label: "Return to The Threshold", yaw: -2.45, pitch: 0.03, action: { type: "navigate", destinationId: "threshold" } },
      { id: "archive-gallery", label: "Enter The Gallery", yaw: 0.64, pitch: 0.02, action: { type: "navigate", destinationId: "gallery" } }
    ]
  }
] as const satisfies readonly ShowroomEnvironment[];
