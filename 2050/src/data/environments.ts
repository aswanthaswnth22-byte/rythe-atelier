import type { ShowroomEnvironment } from "@/types/showroom";

/** Typed planning fixtures only; panorama sources are intentionally not supplied in Phase 1. */
export const showroomEnvironments = [
  {
    id: "threshold",
    name: "The Threshold",
    description: "The first point of entry into the RYTHE digital atelier.",
    panorama: {
      src: "",
      alt: "Panorama artwork to be commissioned for The Threshold."
    },
    hotspots: []
  },
  {
    id: "gallery",
    name: "The Gallery",
    description: "A curated space for the current collection and selected pieces.",
    panorama: {
      src: "",
      alt: "Panorama artwork to be commissioned for The Gallery."
    },
    hotspots: []
  },
  {
    id: "archive",
    name: "The Archive",
    description: "A quieter destination for stories, studies and past collections.",
    panorama: {
      src: "",
      alt: "Panorama artwork to be commissioned for The Archive."
    },
    hotspots: []
  }
] as const satisfies readonly ShowroomEnvironment[];
