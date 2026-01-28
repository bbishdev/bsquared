"use client";

import FaultyTerminal from "@/components/faulty-terminal";

export function HardcoreBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <FaultyTerminal
        className="h-full w-full"
        scale={1.5}
        gridMul={[2, 1]}
        digitSize={1.2}
        timeScale={0.5}
        pause={false}
        scanlineIntensity={0.5}
        glitchAmount={1}
        flickerAmount={1}
        noiseAmp={1}
        chromaticAberration={0}
        dither={0}
        curvature={0.1}
        tint="#EF4444"
        mouseReact
        mouseStrength={0.5}
        pageLoadAnimation
        brightness={0.6}
      />
      <div className="pointer-events-none absolute inset-0 bg-black/50" />
    </div>
  );
}
