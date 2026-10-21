'use client';

import { useMemo, useRef, useSyncExternalStore } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type { ShaderMaterial } from 'three';

const glsl = /* glsl */ `
  #define HAZE vec3(0.07, 0.015, 0.025)
  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
    float a = hash2(i).x, b = hash2(i + vec2(1, 0)).x, c = hash2(i + vec2(0, 1)).x, d = hash2(i + vec2(1, 1)).x;
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
    return v;
  }
  // Distance to the nearest Voronoi cell border: ~0 inside a crack.
  float crack(vec2 p) {
    vec2 n = floor(p), f = fract(p), mr;
    float md = 8.0;
    for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
      vec2 g = vec2(i, j), r = g + hash2(n + g) - f;
      float d = dot(r, r);
      if (d < md) { md = d; mr = r; }
    }
    md = 8.0;
    for (int j = -2; j <= 2; j++) for (int i = -2; i <= 2; i++) {
      vec2 g = vec2(i, j), r = g + hash2(n + g) - f;
      if (dot(mr - r, mr - r) > 0.00001) md = min(md, dot(0.5 * (mr + r), normalize(r - mr)));
    }
    return md;
  }
`;

const vertexShader = /* glsl */ `
  ${glsl}
  varying vec2 vUv;
  varying float vH;
  varying float vDist;
  void main() {
    vUv = uv;
    vec2 p = uv * 40.0;
    float c = crack(p + fbm(p) * 0.6);
    float h = fbm(uv * 53.0) * 0.6 + smoothstep(0.0, 0.15, c) * 0.4;
    vH = h;
    vec4 mv = modelViewMatrix * vec4(position + normal * h, 1.0);
    vDist = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  ${glsl}
  uniform float uTime;
  varying vec2 vUv;
  varying float vH;
  varying float vDist;
  void main() {
    vec2 p = vUv * 40.0;
    vec2 warp = vec2(fbm(p + uTime * 0.05), fbm(p - uTime * 0.04));
    float c = crack(p + fbm(p) * 0.6 + warp * 0.08);
    float flow = fbm(p * 3.0 + vec2(uTime * 0.15, -uTime * 0.1));
    float pulse = 0.75 + 0.25 * sin(uTime * 1.3 + flow * 6.0);
    float core = smoothstep(0.05, 0.0, c);
    float halo = smoothstep(0.22, 0.0, c);
    vec3 rock = mix(vec3(0.02, 0.02, 0.03), vec3(0.08, 0.08, 0.09), vH) * (0.6 + 0.4 * fbm(p * 10.0));
    vec3 lava = mix(vec3(1.0, 0.1, 0.25), vec3(1.0, 0.16, 0.37), flow) * pulse;
    vec3 col = rock + lava * (core * 1.6 + halo * 0.35);
    col = mix(col, HAZE, smoothstep(15.0, 95.0, vDist));
    gl_FragColor = vec4(col, 1.0);
  }
`;

function Terrain() {
  const mat = useRef<ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame(({ clock, camera }) => {
    if (mat.current) mat.current.uniforms.uTime.value = clock.elapsedTime;
    const max = document.documentElement.scrollHeight - innerHeight;
    const t = max > 0 ? scrollY / max : 0;
    // Tilt from a low glancing view toward overhead as the page scrolls.
    camera.position.y += (3 + t * 3 - camera.position.y) * 0.05;
    camera.position.z += (5 - t * 2.5 - camera.position.z) * 0.05;
    camera.lookAt(0, 1.5 - t * 2.5, -14);
  });

  return (
    <mesh rotation-x={-Math.PI / 2}>
      <planeGeometry args={[200, 200, 400, 400]} />
      <shaderMaterial ref={mat} uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} />
    </mesh>
  );
}

const VOLCANO = { z: -85, height: 24, base: 45, crater: 5 };

const volcanoVertex = /* glsl */ `
  ${glsl}
  varying vec3 vPos;
  varying float vDist;
  void main() {
    vec3 p = position;
    // Rugged slopes: push vertices outward with noise, less near the crater rim.
    float n = fbm(vec2(atan(p.z, p.x) * 4.0, p.y * 0.15));
    float k = 1.0 - smoothstep(${VOLCANO.height / 2 - 2}.0, ${VOLCANO.height / 2}.0, p.y);
    p.xz *= 1.0 + (n - 0.5) * 0.35 * k;
    vPos = p;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vDist = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const volcanoFragment = /* glsl */ `
  ${glsl}
  uniform float uTime;
  varying vec3 vPos;
  varying float vDist;
  void main() {
    float h = vPos.y / ${VOLCANO.height}.0 + 0.5; // 0 at base, 1 at rim
    float ang = atan(vPos.z, vPos.x);
    vec3 rock = vec3(0.025, 0.022, 0.03) * (0.6 + 0.6 * fbm(vec2(ang * 12.0, vPos.y * 0.6)));
    // Lava rivers running down from the crater.
    float river = fbm(vec2(ang * 6.0 + fbm(vec2(ang * 3.0, h * 4.0)) * 1.5, h * 0.6 - uTime * 0.03));
    float streak = smoothstep(0.62, 0.7, river) * smoothstep(0.15, 0.9, h);
    float rim = smoothstep(0.88, 1.0, h);
    float pulse = 0.8 + 0.2 * sin(uTime * 1.1 + ang * 3.0);
    vec3 lava = vec3(1.0, 0.1, 0.25) * pulse;
    vec3 col = rock + lava * (streak * 1.4 + rim * 1.2);
    col = mix(col, HAZE, smoothstep(60.0, 140.0, vDist) * 0.6);
    gl_FragColor = vec4(col, 1.0);
  }
`;

function Volcano() {
  const mat = useRef<ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
  useFrame(({ clock }) => {
    if (mat.current) mat.current.uniforms.uTime.value = clock.elapsedTime;
  });
  return (
    <mesh position={[8, VOLCANO.height / 2 - 1, VOLCANO.z]}>
      <cylinderGeometry args={[VOLCANO.crater, VOLCANO.base, VOLCANO.height, 160, 48, true]} />
      <shaderMaterial ref={mat} uniforms={uniforms} vertexShader={volcanoVertex} fragmentShader={volcanoFragment} />
    </mesh>
  );
}

const SMOKE_COUNT = 260;

const smokeVertex = /* glsl */ `
  attribute float aSeed;
  uniform float uTime;
  varying float vLife;
  varying float vSeed;
  void main() {
    float life = fract(uTime * 0.025 + aSeed);
    float r1 = fract(aSeed * 91.7) - 0.5, r2 = fract(aSeed * 37.3) - 0.5;
    vec3 p = vec3(r1 * (4.0 + life * 30.0), life * 55.0, r2 * (4.0 + life * 18.0));
    p.x += life * life * 35.0 + sin(uTime * 0.3 + aSeed * 20.0) * 2.0; // wind drift
    vec4 mv = modelViewMatrix * vec4(position + p, 1.0);
    gl_PointSize = (10.0 + life * 55.0) * (300.0 / -mv.z);
    vLife = life;
    vSeed = aSeed;
    gl_Position = projectionMatrix * mv;
  }
`;

const smokeFragment = /* glsl */ `
  varying float vLife;
  varying float vSeed;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d) * smoothstep(0.0, 0.08, vLife) * (1.0 - vLife);
    // Lit red from the crater below, cooling to ash grey as it rises.
    vec3 col = mix(vec3(0.55, 0.08, 0.1), vec3(0.16, 0.15, 0.17), smoothstep(0.0, 0.35, vLife));
    gl_FragColor = vec4(col, a * 0.32);
  }
`;

function Smoke() {
  const mat = useRef<ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
  const [positions, seeds] = useMemo(() => {
    const seeds = new Float32Array(SMOKE_COUNT);
    for (let i = 0; i < SMOKE_COUNT; i++) seeds[i] = i / SMOKE_COUNT;
    return [new Float32Array(SMOKE_COUNT * 3), seeds];
  }, []);
  useFrame(({ clock }) => {
    if (mat.current) mat.current.uniforms.uTime.value = clock.elapsedTime;
  });
  return (
    <points position={[8, VOLCANO.height - 2, VOLCANO.z]} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={smokeVertex}
        fragmentShader={smokeFragment}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

let webglOk: boolean | undefined;
function canRunWebGL() {
  if (webglOk === undefined) {
    try {
      webglOk = !matchMedia('(prefers-reduced-motion: reduce)').matches && !!document.createElement('canvas').getContext('webgl2');
    } catch {
      webglOk = false;
    }
  }
  return webglOk;
}
const noop = () => () => {};

export default function VolcanoLavaBackground() {
  const webgl = useSyncExternalStore(noop, canRunWebGL, () => false);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
      {/* CSS fallback: always painted, covered by the canvas when WebGL runs. */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'radial-gradient(ellipse at 50% 110%, rgba(255,26,64,0.35), transparent 60%)',
            'linear-gradient(115deg, transparent 48%, rgba(255,42,95,0.25) 49.5%, transparent 51%)',
            'linear-gradient(35deg, transparent 62%, rgba(255,26,64,0.18) 63%, transparent 64%)',
            'linear-gradient(rgba(255,26,64,0.05) 1px, transparent 1px) 0 0 / 48px 48px',
            'linear-gradient(90deg, rgba(255,26,64,0.05) 1px, transparent 1px) 0 0 / 48px 48px',
            '#0a0a0d',
          ].join(','),
        }}
      />
      {webgl && (
        <Canvas camera={{ position: [0, 3, 5], fov: 55, far: 400 }} dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: 'high-performance' }}>
          <color attach="background" args={['#0a0a0d']} />
          <Terrain />
          <Volcano />
          <Smoke />
        </Canvas>
      )}
      <div className="absolute inset-0 bg-[#090a0f]/40" />
    </div>
  );
}
