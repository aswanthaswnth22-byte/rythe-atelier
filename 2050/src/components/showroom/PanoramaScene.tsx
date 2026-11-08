"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface PanoramaSceneProps {
  sceneId: string;
  panoramaSrc: string;
  cameraYaw: number;
  cameraPitch: number;
  onReady: () => void;
  onError: () => void;
}

function createPlaceholderPanorama(sceneId: string): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 1024;
  const context = canvas.getContext("2d");
  if (!context) return canvas;

  const palettes: Record<string, [string, string, string]> = {
    threshold: ["#17151b", "#51405b", "#a68cae"],
    gallery: ["#171719", "#414149", "#b8bac1"],
    archive: ["#191417", "#49333c", "#b18a83"]
  };
  const [dark, mid, light] = palettes[sceneId] ?? palettes.threshold;
  const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, dark);
  gradient.addColorStop(0.48, mid);
  gradient.addColorStop(1, "#111014");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const glow = context.createRadialGradient(1024, 510, 20, 1024, 510, 700);
  glow.addColorStop(0, light + "55");
  glow.addColorStop(1, light + "00");
  context.fillStyle = glow;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.strokeStyle = "rgba(245,240,234,.20)";
  context.lineWidth = 3;
  for (let index = 0; index < 9; index += 1) {
    const x = index * 256;
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, canvas.height);
    context.stroke();
  }

  context.strokeStyle = "rgba(245,240,234,.34)";
  context.lineWidth = 5;
  context.beginPath();
  context.moveTo(0, 760);
  context.lineTo(canvas.width, 760);
  context.stroke();

  [170, 480, 1530, 1840].forEach((x, index) => {
    const height = index % 2 === 0 ? 470 : 350;
    context.fillStyle = "rgba(10,10,13,.38)";
    context.fillRect(x, 760 - height, 110, height);
    context.strokeStyle = "rgba(245,240,234,.28)";
    context.strokeRect(x, 760 - height, 110, height);
  });

  context.fillStyle = "rgba(245,240,234,.72)";
  context.font = "26px Arial";
  context.fillText("RYTHE ATELIER  /  " + sceneId.toUpperCase(), 92, 930);
  return canvas;
}

export function PanoramaScene({
  sceneId,
  panoramaSrc,
  cameraYaw,
  cameraPitch,
  onReady,
  onError
}: PanoramaSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    } catch {
      onError();
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.className = "panorama-canvas";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(76, mount.clientWidth / Math.max(mount.clientHeight, 1), 0.1, 1100);
    camera.position.set(0, 0, 0);
    camera.rotation.order = "YXZ";
    cameraRef.current = camera;

    const placeholder = new THREE.CanvasTexture(createPlaceholderPanorama(sceneId));
    placeholder.colorSpace = THREE.SRGBColorSpace;
    const material = new THREE.MeshBasicMaterial({ map: placeholder, side: THREE.BackSide });
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(500, 64, 40), material);
    scene.add(sphere);

    let loadedTexture: THREE.Texture | null = null;
    let disposed = false;
    if (panoramaSrc) {
      new THREE.TextureLoader().load(
        panoramaSrc,
        (texture) => {
          if (disposed) {
            texture.dispose();
            return;
          }
          texture.colorSpace = THREE.SRGBColorSpace;
          loadedTexture = texture;
          material.map = texture;
          material.needsUpdate = true;
        },
        undefined,
        () => onError()
      );
    }

    let frame = 0;
    const render = () => {
      if (disposed) return;
      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(render);
    };
    render();
    onReady();

    const resize = () => {
      if (disposed) return;
      camera.aspect = mount.clientWidth / Math.max(mount.clientHeight, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
    };
    const observer = new ResizeObserver(resize);
    observer.observe(mount);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      sphere.geometry.dispose();
      material.dispose();
      placeholder.dispose();
      loadedTexture?.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      cameraRef.current = null;
    };
  }, [sceneId, panoramaSrc, onReady, onError]);

  useEffect(() => {
    const camera = cameraRef.current;
    if (!camera) return;
    camera.rotation.order = "YXZ";
    camera.rotation.y = cameraYaw;
    camera.rotation.x = cameraPitch;
  }, [cameraYaw, cameraPitch]);

  return (
    <div
      ref={mountRef}
      className="panorama-renderer"
      role="img"
      aria-label="Interactive 360-degree showroom panorama. Drag or use arrow keys to look around."
    />
  );
}
