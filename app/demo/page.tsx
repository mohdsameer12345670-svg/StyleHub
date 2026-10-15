"use client";

import { useState } from "react";
import Link from "next/link";
import KineticGrid, { KineticGridColorTheme } from "@/components/ui/kinetic-grid";
import {
  ArrowLeft,
  Sparkles,
  Move,
  MousePointerClick,
  ShoppingBag,
  Sliders,
  RotateCcw,
  Palette,
  Eye,
  Zap,
} from "lucide-react";
import Button from "@/components/ui/Button";

export default function DemoPage() {
  const [theme, setTheme] = useState<KineticGridColorTheme>("luxury");
  const [cellSize, setCellSize] = useState(55);
  const [influenceRadius, setInfluenceRadius] = useState(260);
  const [maxWarp, setMaxWarp] = useState(24);
  const [rippleSpeed, setRippleSpeed] = useState(400);
  const [lerpSpeed, setLerpSpeed] = useState(0.08);
  const [showDots, setShowDots] = useState(true);
  const [showVignette, setShowVignette] = useState(true);
  const [showControls, setShowControls] = useState(false);

  const themes: { id: KineticGridColorTheme; label: string; accent: string }[] = [
    { id: "luxury", label: "Royal Gold", accent: "#D4AF37" },
    { id: "default", label: "Cyber Blue", accent: "#4A9EFF" },
    { id: "monochrome", label: "Monochrome", accent: "#FFFFFF" },
    { id: "emerald", label: "Emerald Matrix", accent: "#10B981" },
    { id: "amber", label: "Amber Glow", accent: "#F59E0B" },
    { id: "violet", label: "Neon Violet", accent: "#A855F7" },
    { id: "rose", label: "Cyber Rose", accent: "#F43F5E" },
  ];

  const resetDefaults = () => {
    setCellSize(55);
    setInfluenceRadius(260);
    setMaxWarp(24);
    setRippleSpeed(400);
    setLerpSpeed(0.08);
    setShowDots(true);
    setShowVignette(true);
  };

  return (
    <KineticGrid
      globalColor={theme}
      cellSize={cellSize}
      influenceRadius={influenceRadius}
      maxWarp={maxWarp}
      rippleSpeed={rippleSpeed}
      lerpSpeed={lerpSpeed}
      showDots={showDots}
      showVignette={showVignette}
      className="min-h-screen flex flex-col justify-between"
    >
      {/* Top Bar */}
      <header className="w-full px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-3 z-20 backdrop-blur-md bg-black/30 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-white/80 hover:text-white gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Store</span>
            </Button>
          </Link>
          <div className="h-4 w-px bg-white/20 hidden sm:block" />
          <span className="text-xs tracking-widest uppercase font-semibold text-white/60 hidden sm:inline-block">
            Interactive Kinetic Engine
          </span>
        </div>

        {/* Theme Picker & Controls Button */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-black/50 border border-white/15 rounded-full backdrop-blur-md overflow-x-auto max-w-[280px] sm:max-w-none">
            <Palette className="w-3.5 h-3.5 text-white/50 ml-2 mr-1 hidden sm:inline-block flex-shrink-0" />
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`px-2.5 py-1 text-xs font-medium rounded-full transition-all duration-200 whitespace-nowrap ${
                  theme === t.id
                    ? "bg-white text-black shadow-md font-semibold scale-105"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <Button
            size="sm"
            onClick={() => setShowControls(!showControls)}
            variant={showControls ? "secondary" : "outline"}
            className="gap-1.5 border-white/20 text-xs backdrop-blur-md"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Physics Lab</span>
          </Button>
        </div>
      </header>

      {/* Main Interactive Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center z-10 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 mb-6 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-4 py-1.5 text-xs font-medium tracking-wide text-white/90 shadow-lg animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Interactive Canvas Shader Matrix</span>
        </div>

        <h1 className="max-w-3xl text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-tight">
          Touch the Grid. <br />
          <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-rose-300 bg-clip-text text-transparent">
            Feel the Physics.
          </span>
        </h1>

        <p className="mt-5 max-w-xl text-base sm:text-lg text-white/60 leading-relaxed">
          A dynamic kinetic grid that warps toward pointer coordinates using cubic smoothstep mathematics and produces propagating shockwaves on every click.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 w-full max-w-2xl text-left">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all hover:scale-[1.02]">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-2">
              <Move className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-white">Gravitational Warp</h3>
            <p className="text-xs text-white/50 mt-1">
              Active warp strength: <span className="text-amber-300 font-mono">{maxWarp}px</span>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all hover:scale-[1.02]">
            <div className="w-8 h-8 rounded-lg bg-yellow-500/20 text-yellow-400 flex items-center justify-center mb-2">
              <MousePointerClick className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-white">Shockwave Ripples</h3>
            <p className="text-xs text-white/50 mt-1">
              Wave velocity: <span className="text-yellow-300 font-mono">{rippleSpeed}px/s</span>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all hover:scale-[1.02]">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-white">Ultra-Smooth 60 FPS</h3>
            <p className="text-xs text-white/50 mt-1">
              Grid resolution: <span className="text-emerald-300 font-mono">{cellSize}px cells</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <Link href="/products">
            <Button size="lg" shimmer className="bg-white text-black hover:bg-white/90 gap-2 shadow-xl font-medium">
              <ShoppingBag className="w-4 h-4" />
              <span>Shop Collection</span>
            </Button>
          </Link>
          <button
            onClick={() => setShowControls(!showControls)}
            className="px-5 py-2.5 rounded-lg border border-white/20 text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-md text-sm font-medium transition-colors flex items-center gap-2"
          >
            <Sliders className="w-4 h-4 text-amber-400" />
            <span>{showControls ? "Hide Physics Lab" : "Customize Physics"}</span>
          </button>
        </div>
      </main>

      {/* Physics Control Panel Drawer */}
      {showControls && (
        <aside className="fixed bottom-14 right-4 sm:right-8 z-30 w-[calc(100vw-32px)] sm:w-[360px] max-h-[75vh] overflow-y-auto bg-black/80 border border-white/20 rounded-2xl p-5 backdrop-blur-xl shadow-2xl text-white">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold tracking-wide">Physics & Grid Controls</h3>
            </div>
            <button
              onClick={resetDefaults}
              className="text-xs text-white/50 hover:text-white flex items-center gap-1 transition-colors"
              title="Reset to defaults"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          <div className="space-y-4 text-xs">
            {/* Warp Strength */}
            <div>
              <div className="flex justify-between mb-1.5 text-white/70">
                <span>Warp Intensity</span>
                <span className="font-mono text-amber-400">{maxWarp}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                step="2"
                value={maxWarp}
                onChange={(e) => setMaxWarp(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            {/* Influence Radius */}
            <div>
              <div className="flex justify-between mb-1.5 text-white/70">
                <span>Influence Radius</span>
                <span className="font-mono text-amber-400">{influenceRadius}px</span>
              </div>
              <input
                type="range"
                min="100"
                max="500"
                step="10"
                value={influenceRadius}
                onChange={(e) => setInfluenceRadius(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            {/* Cell Size */}
            <div>
              <div className="flex justify-between mb-1.5 text-white/70">
                <span>Grid Density (Cell Size)</span>
                <span className="font-mono text-amber-400">{cellSize}px</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                step="5"
                value={cellSize}
                onChange={(e) => setCellSize(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            {/* Ripple Velocity */}
            <div>
              <div className="flex justify-between mb-1.5 text-white/70">
                <span>Wave Ripple Velocity</span>
                <span className="font-mono text-amber-400">{rippleSpeed}px/s</span>
              </div>
              <input
                type="range"
                min="150"
                max="800"
                step="25"
                value={rippleSpeed}
                onChange={(e) => setRippleSpeed(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            {/* Smoothing Speed */}
            <div>
              <div className="flex justify-between mb-1.5 text-white/70">
                <span>Mouse Smoothing (Lerp)</span>
                <span className="font-mono text-amber-400">{lerpSpeed.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.02"
                max="0.3"
                step="0.01"
                value={lerpSpeed}
                onChange={(e) => setLerpSpeed(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            {/* Toggles */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer text-white/80">
                <input
                  type="checkbox"
                  checked={showDots}
                  onChange={(e) => setShowDots(e.target.checked)}
                  className="accent-amber-400 rounded"
                />
                <span>Background Dot Matrix</span>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer text-white/80">
                <input
                  type="checkbox"
                  checked={showVignette}
                  onChange={(e) => setShowVignette(e.target.checked)}
                  className="accent-amber-400 rounded"
                />
                <span>Radial Vignette Glow</span>
              </label>
            </div>
          </div>
        </aside>
      )}

      {/* Footer */}
      <footer className="w-full px-6 py-3.5 text-center text-xs text-white/40 border-t border-white/10 bg-black/40 backdrop-blur-sm z-20 flex items-center justify-between flex-wrap gap-2">
        <span>StyleHub Kinetic Engine • shadcn/ui & Next.js App Router</span>
        <span className="text-white/60">Hover or click canvas to interact</span>
      </footer>
    </KineticGrid>
  );
}
