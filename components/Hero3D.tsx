"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const SCAN_X = 0.4;
const BELT_LEN = 22;
const GRAIN_COUNT = 150;

type Grain = {
  x: number;
  z: number;
  speed: number;
  rot: number;
  scale: number;
  defective: boolean;
};

export default function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* ---------- renderer / scene / camera ---------- */
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x16263f, 9, 22);

    const camera = new THREE.PerspectiveCamera(
      42,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0.4, 2.6, 7.4);
    camera.lookAt(0, 0.8, 0);

    const rig = new THREE.Group();
    scene.add(rig);

    /* ---------- lights ---------- */
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const dir = new THREE.DirectionalLight(0xbfdbfe, 1.1);
    dir.position.set(4, 8, 5);
    scene.add(dir);
    const blue = new THREE.PointLight(0x1a76d1, 2.5, 14);
    blue.position.set(-6, 3, 2);
    scene.add(blue);

    /* ---------- belt ---------- */
    const belt = new THREE.Mesh(
      new THREE.BoxGeometry(BELT_LEN, 0.12, 2.4),
      new THREE.MeshStandardMaterial({ color: 0x1d3050, roughness: 0.85, metalness: 0.35 })
    );
    rig.add(belt);

    const railMat = new THREE.MeshStandardMaterial({
      color: 0x2a4066,
      emissive: 0x3b82f6,
      emissiveIntensity: 0.25,
      roughness: 0.4,
    });
    [-1.32, 1.32].forEach((z) => {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(BELT_LEN, 0.1, 0.08), railMat);
      rail.position.set(0, 0.1, z);
      rig.add(rail);
    });

    const laneMat = new THREE.MeshBasicMaterial({ color: 0x2a4066, transparent: true, opacity: 0.9 });
    for (let i = 0; i < 12; i++) {
      const lane = new THREE.Mesh(new THREE.PlaneGeometry(0.04, 2.2), laneMat);
      lane.rotation.x = -Math.PI / 2;
      lane.position.set(-BELT_LEN / 2 + (i * BELT_LEN) / 11, 0.065, 0);
      rig.add(lane);
    }

    /* ---------- grains (instanced) ---------- */
    const GOLD = new THREE.Color(0xd9a441);
    const GREEN = new THREE.Color(0x34d399);
    const RED = new THREE.Color(0xf87171);

    const grains: Grain[] = Array.from({ length: GRAIN_COUNT }, () => ({
      x: -BELT_LEN / 2 + Math.random() * BELT_LEN,
      z: (Math.random() - 0.5) * 1.7,
      speed: 1.5 + Math.random() * 0.5,
      rot: Math.random() * Math.PI * 2,
      scale: 0.75 + Math.random() * 0.5,
      defective: Math.random() < 0.16,
    }));

    const grainMesh = new THREE.InstancedMesh(
      new THREE.CapsuleGeometry(0.55, 0.7, 4, 10),
      new THREE.MeshStandardMaterial({ roughness: 0.5, metalness: 0.1 }),
      GRAIN_COUNT
    );
    grainMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    rig.add(grainMesh);
    const dummy = new THREE.Object3D();
    // initialize instance colors
    for (let i = 0; i < GRAIN_COUNT; i++) grainMesh.setColorAt(i, GOLD);

    /* ---------- scan gate ---------- */
    const gate = new THREE.Group();
    gate.position.x = SCAN_X;
    rig.add(gate);

    const postMat = new THREE.MeshStandardMaterial({
      color: 0x22375c,
      emissive: 0x4da3ff,
      emissiveIntensity: 0.5,
      roughness: 0.3,
    });
    [-1.5, 1.5].forEach((z) => {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.9, 0.12), postMat);
      post.position.set(0, 0.85, z);
      gate.add(post);
    });

    const beamMat = new THREE.MeshBasicMaterial({ color: 0x9cc8ff, transparent: true, opacity: 0.9 });
    const beam = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 3.15), beamMat);
    beam.position.set(0, 1.82, 0);
    gate.add(beam);

    const scanMat = new THREE.MeshBasicMaterial({
      color: 0x4da3ff,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const scanPlane = new THREE.Mesh(new THREE.PlaneGeometry(3, 1.8), scanMat);
    scanPlane.rotation.y = Math.PI / 2;
    scanPlane.position.set(0, 0.9, 0);
    gate.add(scanPlane);

    /* ---------- AI core ---------- */
    const core = new THREE.Group();
    core.position.set(SCAN_X, 3.1, 0);
    rig.add(core);

    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.55, 1),
      new THREE.MeshStandardMaterial({
        color: 0x1d3050,
        emissive: 0x4da3ff,
        emissiveIntensity: 0.9,
        wireframe: true,
      })
    );
    core.add(shell);
    core.add(
      new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.3, 2),
        new THREE.MeshBasicMaterial({ color: 0x9cc8ff })
      )
    );
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.85, 0.015, 8, 64),
      new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.7 })
    );
    ring.rotation.x = Math.PI / 2.4;
    core.add(ring);
    const coreLight = new THREE.PointLight(0x4da3ff, 6, 7);
    core.add(coreLight);

    /* ---------- data stream particles ---------- */
    const STREAM_COUNT = 90;
    const streamSeeds = Array.from({ length: STREAM_COUNT }, () => ({
      offset: Math.random(),
      lane: (Math.random() - 0.5) * 1.4,
      speed: 0.25 + Math.random() * 0.35,
    }));
    const streamPos = new Float32Array(STREAM_COUNT * 3);
    const streamGeo = new THREE.BufferGeometry();
    streamGeo.setAttribute("position", new THREE.BufferAttribute(streamPos, 3));
    const stream = new THREE.Points(
      streamGeo,
      new THREE.PointsMaterial({ color: 0x9cc8ff, size: 0.05, transparent: true, opacity: 0.85, sizeAttenuation: true })
    );
    rig.add(stream);

    /* ---------- ambient stars ---------- */
    const STAR_COUNT = 320;
    const starPos = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 34;
      starPos[i * 3 + 1] = Math.random() * 12 - 2;
      starPos[i * 3 + 2] = -4 - Math.random() * 14;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({ color: 0x5f9bd9, size: 0.04, transparent: true, opacity: 0.6, sizeAttenuation: true })
    );
    rig.add(stars);

    /* ---------- pointer parallax ---------- */
    let pointerX = 0;
    let pointerY = 0;
    const onPointer = (e: PointerEvent) => {
      pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      pointerY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    /* ---------- resize ---------- */
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    /* ---------- animation loop ---------- */
    const clock = new THREE.Clock();
    let raf = 0;
    let running = true;

    const io = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting;
    });
    io.observe(mount);

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!running) return;
      const delta = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      // grains
      grains.forEach((g, i) => {
        g.x += g.speed * delta;
        if (g.x > BELT_LEN / 2) {
          g.x = -BELT_LEN / 2;
          g.z = (Math.random() - 0.5) * 1.7;
          g.defective = Math.random() < 0.16;
        }
        const rejected = g.defective && g.x > SCAN_X + 0.6;
        const kick = rejected ? Math.min(g.x - SCAN_X - 0.6, 1.6) : 0;
        dummy.position.set(g.x, 0.14 + kick * 0.18, g.z + kick * 1.5);
        dummy.rotation.set(g.rot, g.rot * 1.3, g.rot * 0.7);
        dummy.scale.setScalar(0.09 * g.scale);
        dummy.updateMatrix();
        grainMesh.setMatrixAt(i, dummy.matrix);
        grainMesh.setColorAt(i, g.x <= SCAN_X ? GOLD : g.defective ? RED : GREEN);
      });
      grainMesh.instanceMatrix.needsUpdate = true;
      if (grainMesh.instanceColor) grainMesh.instanceColor.needsUpdate = true;

      // gate pulse
      scanMat.opacity = 0.16 + Math.sin(t * 3.2) * 0.08;
      beamMat.opacity = 0.75 + Math.sin(t * 6) * 0.25;

      // AI core
      core.position.y = 3.1 + Math.sin(t * 0.9) * 0.15;
      core.rotation.y = t * 0.35;
      ring.rotation.x = Math.PI / 2.4 + Math.sin(t * 0.5) * 0.2;

      // data stream
      streamSeeds.forEach((s, i) => {
        const p = (s.offset + t * s.speed) % 1;
        streamPos[i * 3] = SCAN_X + Math.sin(p * Math.PI * 4 + i) * 0.35 * (1 - p);
        streamPos[i * 3 + 1] = 1.85 + p * 1.1;
        streamPos[i * 3 + 2] = s.lane * (1 - p);
      });
      streamGeo.attributes.position.needsUpdate = true;

      // stars drift + camera rig
      stars.rotation.y = Math.sin(t * 0.03) * 0.08;
      rig.rotation.y = Math.sin(t * 0.08) * 0.16 + pointerX * 0.06;
      rig.rotation.x = pointerY * -0.03;

      renderer.render(scene, camera);
    };
    animate();

    /* ---------- cleanup ---------- */
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      scene.traverse((obj) => {
        const m = obj as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        if (m.material) {
          const mats = Array.isArray(m.material) ? m.material : [m.material];
          mats.forEach((mat) => mat.dispose());
        }
      });
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" />;
}
