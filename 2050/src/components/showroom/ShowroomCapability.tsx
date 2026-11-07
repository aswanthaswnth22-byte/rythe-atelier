"use client";

import { useEffect, useState } from "react";
import { getExperienceMode } from "@/lib/accessibility/experience-mode";

export function ShowroomCapability() {
  const [mode, setMode] = useState<"checking" | "webgl-capable" | "accessible-fallback">("checking");

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const webglAvailable = Boolean(
      canvas.getContext("webgl2") || canvas.getContext("webgl")
    );
    setMode(getExperienceMode(webglAvailable));
  }, []);

  const ready = mode === "webgl-capable";
  const title =
    mode === "checking"
      ? "Checking device capability"
      : ready
        ? "Visual experience supported"
        : "Accessible experience mode";
  const copy =
    mode === "checking"
      ? "Preparing the experience foundation."
      : ready
        ? "This device can support the future immersive layer. The showroom renderer is not part of Phase 1."
        : "The experience will remain available through a lightweight interface when WebGL is unavailable.";

  return (
    <section className="capability" aria-live="polite" aria-label="Device capability">
      <p className="capability-label">SYSTEM CHECK / 01</p>
      <h2 className="capability-title">{title}</h2>
      <p className="capability-copy">{copy}</p>
    </section>
  );
}
