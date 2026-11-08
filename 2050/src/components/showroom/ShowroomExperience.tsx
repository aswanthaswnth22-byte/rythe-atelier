"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { showroomEnvironments } from "@/data/environments";
import { projectHotspot } from "@/lib/showroom/navigation";
import { PanoramaScene } from "@/components/showroom/PanoramaScene";

export function ShowroomExperience() {
  const [activeId, setActiveId] = useState<string>("threshold");
  const [cameraYaw, setCameraYaw] = useState(0);
  const [cameraPitch, setCameraPitch] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);
  const dragOrigin = useRef<{ x: number; y: number; yaw: number; pitch: number } | null>(null);

  const activeEnvironment = showroomEnvironments.find((environment) => environment.id === activeId) ?? showroomEnvironments[0];
  const handleReady = useCallback(() => {
    setIsReady(true);
    setWebglFailed(false);
  }, []);
  const handleError = useCallback(() => {
    setWebglFailed(true);
    setIsReady(false);
  }, []);

  const hotspots = useMemo(
    () => activeEnvironment.hotspots.map((hotspot) => ({
      ...hotspot,
      position: projectHotspot(hotspot.yaw, hotspot.pitch, cameraYaw, cameraPitch)
    })),
    [activeEnvironment, cameraYaw, cameraPitch]
  );

  function navigate(destinationId: string) {
    if (!showroomEnvironments.some((environment) => environment.id === destinationId)) return;
    setActiveId(destinationId);
    setCameraYaw(0);
    setCameraPitch(0);
    setIsReady(false);
    setWebglFailed(false);
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.target instanceof HTMLElement && event.target.closest("button")) return;
    dragOrigin.current = { x: event.clientX, y: event.clientY, yaw: cameraYaw, pitch: cameraPitch };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const origin = dragOrigin.current;
    if (!origin) return;
    const sensitivity = 0.0042;
    setCameraYaw(origin.yaw - (event.clientX - origin.x) * sensitivity);
    setCameraPitch(Math.max(-0.72, Math.min(0.72, origin.pitch + (event.clientY - origin.y) * sensitivity)));
  }

  function onPointerUp() {
    dragOrigin.current = null;
    setIsDragging(false);
  }

  function onViewerKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const step = 0.12;
    if (event.key === "ArrowLeft") setCameraYaw((value) => value - step);
    if (event.key === "ArrowRight") setCameraYaw((value) => value + step);
    if (event.key === "ArrowUp") setCameraPitch((value) => Math.max(-0.72, value - step));
    if (event.key === "ArrowDown") setCameraPitch((value) => Math.min(0.72, value + step));
  }

  return (
    <section className="showroom-shell" aria-label="RYTHE immersive showroom">
      <section className="showroom-stage" aria-label="Virtual showroom">
        <PanoramaScene
          key={activeEnvironment.id}
          sceneId={activeEnvironment.id}
          panoramaSrc={activeEnvironment.panorama.src}
          cameraYaw={cameraYaw}
          cameraPitch={cameraPitch}
          onReady={handleReady}
          onError={handleError}
        />

        <div
          className={`showroom-interaction-layer${isDragging ? " is-dragging" : ""}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onKeyDown={onViewerKeyDown}
          role="group"
          aria-label="Panorama controls. Drag to look around or use arrow keys."
          tabIndex={0}
        >
          {!webglFailed && hotspots.map((hotspot) => hotspot.position.visible ? (
            <button
              key={hotspot.id}
              className="panorama-hotspot"
              style={{ left: `${hotspot.position.left}%`, top: `${hotspot.position.top}%` }}
              type="button"
              onClick={() => hotspot.action.type === "navigate" && navigate(hotspot.action.destinationId)}
              aria-label={hotspot.label}
            >
              <span className="hotspot-pulse" />
              <span className="hotspot-label">{hotspot.label}</span>
            </button>
          ) : null)}
        </div>

        <div className="showroom-vignette" aria-hidden="true" />
        <div className="showroom-scene-heading">
          <p className="showroom-eyebrow">LOCATION / 0{showroomEnvironments.findIndex((item) => item.id === activeId) + 1}</p>
          <h1>{activeEnvironment.name}</h1>
          <p>{activeEnvironment.description}</p>
        </div>

        <div className="showroom-status" aria-live="polite">
          <span className={`status-indicator${isReady ? " is-ready" : ""}`} />
          {webglFailed ? "COMPATIBLE VIEW / WEBGL UNAVAILABLE" : isReady ? "PANORAMA READY / DRAG TO EXPLORE" : "PREPARING ENVIRONMENT"}
        </div>

        {webglFailed && (
          <div className="showroom-fallback" role="status">
            <p className="showroom-eyebrow">ALTERNATIVE VIEW</p>
            <h2>Explore without WebGL.</h2>
            <p>This device cannot start the immersive renderer. You can still move between the three showroom destinations below.</p>
          </div>
        )}

        <div className="showroom-controls" aria-label="Showroom destinations">
          <div className="destination-list">
            {showroomEnvironments.map((environment, index) => (
              <button
                key={environment.id}
                type="button"
                className={`destination-button${activeId === environment.id ? " is-active" : ""}`}
                onClick={() => navigate(environment.id)}
                aria-current={activeId === environment.id ? "location" : undefined}
              >
                <span>0{index + 1}</span>{environment.name}
              </button>
            ))}
          </div>
          <div className="look-controls">
            <span>LOOK AROUND</span>
            <button type="button" aria-label="Look left" onClick={() => setCameraYaw((value) => value - 0.32)}>←</button>
            <button type="button" aria-label="Look right" onClick={() => setCameraYaw((value) => value + 0.32)}>→</button>
            <button type="button" aria-label="Reset view" onClick={() => { setCameraYaw(0); setCameraPitch(0); }}>RESET</button>
          </div>
        </div>
        <div className="showroom-temporary-note">RYTHE ATELIER  /  IMMERSIVE SHOWROOM</div>
      </section>

    </section>
  );
}
