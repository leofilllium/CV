"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls, RoundedBox } from "@react-three/drei";
import { Component, useMemo, useRef, type ReactNode } from "react";
import { Group, Vector3, MathUtils } from "three";

type SceneProps = { calm: boolean; active: boolean; exploded: boolean; mode: number; rotation: number; onReady?: () => void };

function Artifact({ calm, active, exploded, mode, rotation }: SceneProps) {
  const assembly = useRef<Group>(null);
  const core = useRef<Group>(null);
  const satellites = useRef<Group>(null);
  const destination = useMemo(() => new Vector3(), []);
  useFrame(({ clock }, delta) => {
    const dt = Math.min(delta, 0.04);
    if (core.current && active && !calm) core.current.rotation.y += dt * 0.18;
    if (assembly.current) {
      const targetScale = mode === 1 ? 0.92 : 1;
      assembly.current.scale.lerp(destination.setScalar(targetScale), calm ? 1 : dt * 4);
      if (!calm && active) assembly.current.position.y = Math.sin(clock.elapsedTime * 0.6) * 0.055;
    }
    if (satellites.current) {
      satellites.current.scale.lerp(destination.setScalar(exploded ? 1.32 : 1), calm ? 1 : dt * 4);
      if (!calm && active) satellites.current.rotation.y += dt * 0.065;
    }
    if (core.current) core.current.rotation.z = MathUtils.damp(core.current.rotation.z, exploded ? 0.5 : -0.2, 4, dt);
  });
  return <group ref={assembly} rotation={[0.14, -0.25 + rotation, -0.17]}>
    <group ref={core}>
      {mode === 0 && <>
        <mesh><sphereGeometry args={[1.18, 48, 32]} /><meshPhysicalMaterial color="#84973d" metalness={0.82} roughness={0.24} clearcoat={0.6} /></mesh>
        {Array.from({ length: 23 }, (_, i) => {
          const y = (i - 11) * 0.103;
          const radius = Math.sqrt(1.2 ** 2 - y ** 2);
          return <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[radius, 0.032, 8, 80]} /><meshStandardMaterial color={i % 4 === 0 ? "#e5eccd" : "#bedc75"} roughness={0.35} metalness={0.72} /></mesh>;
        })}
      </>}
      {mode === 1 && <group rotation={[0, -0.3, 0.12]}>
        <RoundedBox args={[1.4, 2.48, 0.2]} radius={0.15} smoothness={4}><meshStandardMaterial color="#aeb5a5" metalness={0.86} roughness={0.23} /></RoundedBox>
        <RoundedBox position={[0, 0, 0.125]} args={[1.25, 2.31, 0.025]} radius={0.11}><meshStandardMaterial color="#121912" roughness={0.5} /></RoundedBox>
        <RoundedBox position={[0, 0.65, 0.15]} args={[0.98, 0.67, 0.025]} radius={0.07}><meshStandardMaterial color="#c4eb83" emissive="#76922d" emissiveIntensity={0.25} /></RoundedBox>
        {[0, 1, 2].map(i => <RoundedBox key={i} position={[0, 0.04 - i * 0.35, 0.15]} args={[0.98, 0.2, 0.025]} radius={0.035}><meshStandardMaterial color={i === 2 ? "#748164" : "#e2e4d8"} roughness={0.6} /></RoundedBox>)}
        <mesh position={[0, 0.99, 0.156]}><capsuleGeometry args={[0.022, 0.22, 4, 8]} /><meshBasicMaterial color="#465438" /></mesh>
      </group>}
      {mode === 2 && <group rotation={[0.3, 0.4, 0]}>
        {[-1, 0, 1].flatMap(x => [-1, 0, 1].flatMap(y => [-1, 0, 1].map(z => <RoundedBox key={`${x}${y}${z}`} position={[x * 0.64, y * 0.64, z * 0.64]} args={[0.54, 0.54, 0.54]} radius={0.065}><meshStandardMaterial color={(x + y + z) % 2 ? "#aebca4" : "#c5e887"} metalness={0.7} roughness={0.3} /></RoundedBox>)))}
      </group>}
    </group>
    <group ref={satellites}>
      <mesh rotation={[1.15, 0.3, 0.2]}><torusGeometry args={[1.94, 0.067, 12, 120]} /><meshStandardMaterial color="#d9dfd3" metalness={0.92} roughness={0.18} /></mesh>
      <mesh rotation={[0.32, 0.55, -0.28]}><torusGeometry args={[2.1, 0.024, 8, 120]} /><meshStandardMaterial color="#badc7c" metalness={0.65} roughness={0.28} /></mesh>
      <mesh rotation={[0.3, 0.4, 0.9]}><torusGeometry args={[2.18, 0.011, 6, 100]} /><meshBasicMaterial color="#6c7b51" transparent opacity={0.65} /></mesh>
      <group position={[1.7, 0.95, 0.3]} rotation={[0.4, 0.3, 0.3]}>
        <RoundedBox args={[0.4, 0.4, 0.4]} radius={0.055}><meshStandardMaterial color="#dbeaaf" metalness={0.76} roughness={0.22} /></RoundedBox>
        <mesh><boxGeometry args={[0.65, 0.12, 0.2]} /><meshStandardMaterial color="#718456" metalness={0.85} roughness={0.3} /></mesh>
      </group>
      <mesh position={[-1.64, -0.84, 0.54]}><icosahedronGeometry args={[0.27, 0]} /><meshStandardMaterial color="#cee8a2" metalness={0.65} roughness={0.27} /></mesh>
      <mesh position={[0.3, -1.85, -0.4]}><sphereGeometry args={[0.11, 16, 16]} /><meshStandardMaterial color="#d1e89b" metalness={0.85} roughness={0.2} /></mesh>
    </group>
  </group>;
}
export function SceneFallback() {
  return <div className="scene-fallback" role="img" aria-label="An orbital sculpture with interlocking rings"><div className="fallback-core" /><div className="fallback-ring" /><div className="fallback-ring second" /></div>;
}
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <SceneFallback /> : this.props.children; }
}
export default function OrbitalScene(props: SceneProps) {
  return <SceneBoundary><Canvas dpr={[1, 1.5]} camera={{ position: [0, 0.15, 7.6], fov: 40 }} gl={{ antialias: true, alpha: true, powerPreference: "low-power" }} frameloop={props.active && !props.calm ? "always" : "demand"} fallback={<SceneFallback />} onCreated={props.onReady}>
    <ambientLight intensity={0.7} /><directionalLight position={[4, 5, 4]} intensity={2.4} color="#eff6df" /><directionalLight position={[-4, 0, -3]} intensity={2} color="#a7d56c" />
    <Environment resolution={128}>
      <Lightformer intensity={3} position={[0, 4, 2]} scale={[5, 5, 1]} color="#ffffff" />
      <Lightformer intensity={4} position={[-5, 0, 1]} rotation={[0, Math.PI / 2, 0]} scale={[3, 7, 1]} color="#e8eedd" />
      <Lightformer intensity={2} position={[4, -2, 0]} rotation={[0, -Math.PI / 2, 0]} scale={[3, 5, 1]} color="#c0db87" />
    </Environment>
    <Artifact {...props} />
    <OrbitControls enablePan={false} enableZoom={false} enableDamping={!props.calm} autoRotate={!props.calm && props.active} autoRotateSpeed={0.35} minPolarAngle={0.45} maxPolarAngle={2.6} />
  </Canvas></SceneBoundary>;
}
