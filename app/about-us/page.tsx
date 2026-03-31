"use client";

import React, { useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════════════════════════
   TYPES & INTERFACES
═══════════════════════════════════════════════════════════════════ */

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

interface GoldBtnProps {
  children: React.ReactNode;
  sm?: boolean;
  outline?: boolean;
}

interface PillProps {
  children: React.ReactNode;
  dark?: boolean;
}

interface ImgBoxProps {
  className?: string;
  label?: string;
  style?: React.CSSProperties;
  overlay?: boolean;
  icon?: string | null;
}

interface PillarCardProps {
  number: string;
  title: string;
  description: string;
  points: string[];
  icon: string;
  delay?: number;
}

interface StatCardProps {
  value: number;
  suffix?: string;
  label: string;
  sublabel?: string;
  delay?: number;
}

interface BenefitCardProps {
  title: string;
  audience: string;
  points: string[];
  icon: string;
  delay?: number;
}

interface FloatingOrbProps {
  size: string;
  top: string;
  left: string;
  delay: number;
  opacity?: number;
}

interface Pillar {
  number: string;
  icon: string;
  title: string;
  description: string;
  points: string[];
}

interface Benefit {
  icon: string;
  audience: string;
  title: string;
  points: string[];
}

interface Stat {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
}

/* ═══════════════════════════════════════════════════════════════════
   HOOKS & UTILITIES
═══════════════════════════════════════════════════════════════════ */
function useReveal(
  threshold = 0.1,
): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: RevealProps) {
  const [ref, visible] = useReveal();
  const map: Record<string, string> = {
    up: "translateY(36px)",
    down: "translateY(-36px)",
    left: "translateX(36px)",
    right: "translateX(-36px)",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : map[direction] || map.up,
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function useCounter(end: number, active: boolean): number {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let n = 0;
    const step = Math.ceil(end / 60);
    const t = setInterval(() => {
      n += step;
      if (n >= end) {
        setVal(end);
        clearInterval(t);
      } else setVal(n);
    }, 18);
    return () => clearInterval(t);
  }, [active, end]);
  return val;
}

/* ═══════════════════════════════════════════════════════════════════
   SHARED UI ATOMS
═══════════════════════════════════════════════════════════════════ */
function GoldBtn({ children, sm = false, outline = false }: GoldBtnProps) {
  if (outline) {
    return (
      <button
        className={`inline-flex items-center gap-2 rounded-xl font-bold transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap border border-yellow-600 text-yellow-600 hover:bg-yellow-600/10 ${sm ? "px-4 py-2 text-xs" : "px-6 py-3 text-sm"}`}
        style={{ fontFamily: "'Georgia',serif" }}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      className={`inline-flex items-center gap-2 rounded-xl font-bold transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap ${sm ? "px-4 py-2 text-xs" : "px-6 py-3 text-sm"}`}
      style={{
        background: "linear-gradient(135deg,#c9940a,#f5d87a)",
        color: "#000",
        fontFamily: "'Georgia',serif",
        boxShadow: "0 4px 20px rgba(201,148,10,0.4)",
      }}
    >
      {children}
    </button>
  );
}

function Pill({ children, dark = false }: PillProps) {
  return (
    <span
      className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
      style={{
        background: dark ? "rgba(201,148,10,0.15)" : "rgba(201,148,10,0.1)",
        border: "1px solid rgba(201,148,10,0.4)",
        color: "#c9940a",
        fontFamily: "'Georgia',serif",
      }}
    >
      {children}
    </span>
  );
}

function ImgBox({
  className = "",
  label = "",
  style = {},
  overlay = false,
  icon = null,
}: ImgBoxProps) {
  return (
    <div
      className={`rounded-2xl flex items-center justify-center overflow-hidden relative ${className}`}
      style={{
        background: "linear-gradient(135deg,#1a1000,#3a2800,#6b4800)",
        border: "1px solid rgba(201,148,10,0.2)",
        minHeight: 80,
        ...style,
      }}
    >
      {overlay && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)",
          }}
        />
      )}
      <div className="relative z-10 flex flex-col items-center gap-2">
        {icon && <span className="text-3xl">{icon}</span>}
        <span
          className="text-yellow-600/40 text-xs font-bold tracking-widest uppercase px-2 text-center"
          style={{ fontFamily: "'Georgia',serif" }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

/* ── Pillar Card ─────────────────────────────────────────────────── */
function PillarCard({
  number,
  title,
  description,
  points,
  icon,
  delay = 0,
}: PillarCardProps) {
  const [ref, visible] = useReveal(0.1);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      <div
        className="group p-6 sm:p-8 rounded-2xl h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl relative overflow-hidden"
        style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)" }}
      >
        {/* Number watermark */}
        <div
          className="absolute -top-4 -right-4 text-8xl font-black opacity-5 select-none pointer-events-none"
          style={{ fontFamily: "'Georgia',serif", color: "#c9940a" }}
        >
          {number}
        </div>

        <div className="relative z-10">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 transition-all duration-300 group-hover:scale-110"
            style={{
              background:
                "linear-gradient(135deg,rgba(201,148,10,0.1),rgba(201,148,10,0.2))",
              border: "1px solid rgba(201,148,10,0.3)",
            }}
          >
            {icon}
          </div>

          <h3
            className="font-black text-xl mb-3 group-hover:text-yellow-700 transition-colors"
            style={{ fontFamily: "'Georgia',serif", color: "#000" }}
          >
            {title}
          </h3>

          <p className="text-sm text-black/60 leading-relaxed mb-5">
            {description}
          </p>

          <ul className="space-y-2">
            {points.map((point, i) => (
              <li
                key={`${number}-point-${i}`}
                className="flex items-start gap-2 text-xs text-black/50"
              >
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                  style={{ background: "#c9940a" }}
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ── Stat Card ─────────────────────────────────────────────────── */
function StatCard({
  value,
  suffix = "",
  label,
  sublabel = "",
  delay = 0,
}: StatCardProps) {
  const [ref, visible] = useReveal(0.3);
  const count = useCounter(value, visible);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px) scale(0.92)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      <div
        className="p-6 rounded-2xl text-center h-full"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(201,148,10,0.2)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div
          className="text-4xl sm:text-5xl font-black mb-2"
          style={{
            fontFamily: "'Georgia',serif",
            background: "linear-gradient(135deg,#c9940a,#f5d87a)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {count}
          {suffix}
        </div>
        <div className="text-white/80 text-sm font-bold uppercase tracking-wider mb-1">
          {label}
        </div>
        {sublabel && <div className="text-white/40 text-xs">{sublabel}</div>}
      </div>
    </div>
  );
}

/* ── Benefit Card ────────────────────────────────────────────────── */
function BenefitCard({
  title,
  audience,
  points,
  icon,
  delay = 0,
}: BenefitCardProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        className="relative p-6 sm:p-7 rounded-2xl cursor-pointer overflow-hidden transition-all duration-400 h-full"
        style={{
          background: hovered ? "linear-gradient(135deg,#000,#1a1000)" : "#fff",
          border: hovered
            ? "1px solid rgba(201,148,10,0.5)"
            : "1px solid rgba(0,0,0,0.08)",
          boxShadow: hovered
            ? "0 20px 60px rgba(201,148,10,0.2)"
            : "0 2px 12px rgba(0,0,0,0.05)",
          transition: "all 0.4s cubic-bezier(.22,1,.36,1)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Shimmer top border on hover */}
        <div
          className="absolute top-0 left-0 right-0 h-px transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(90deg,transparent,#c9940a,transparent)",
            opacity: hovered ? 1 : 0,
          }}
        />

        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4 transition-all duration-300"
          style={{
            background: hovered
              ? "rgba(201,148,10,0.15)"
              : "rgba(201,148,10,0.08)",
          }}
        >
          {icon}
        </div>

        <div
          className="inline-flex items-center gap-2 px-2 py-1 rounded text-xs font-bold mb-3"
          style={{
            background: hovered
              ? "rgba(201,148,10,0.2)"
              : "rgba(201,148,10,0.1)",
            color: "#c9940a",
          }}
        >
          {audience}
        </div>

        <h3
          className="font-black text-lg mb-3 transition-colors duration-300"
          style={{
            fontFamily: "'Georgia',serif",
            color: hovered ? "#fff" : "#000",
          }}
        >
          {title}
        </h3>

        <ul className="space-y-2">
          {points.map((point, i) => (
            <li
              key={`${title}-point-${i}`}
              className="flex items-start gap-2 text-xs transition-colors duration-300"
              style={{
                color: hovered ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)",
              }}
            >
              <span className="text-yellow-600 flex-shrink-0">✓</span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE DATA
═══════════════════════════════════════════════════════════════════ */
const PILLARS: Pillar[] = [
  {
    number: "01",
    icon: "📊",
    title: "Alternative Credit Scoring",
    description:
      "We analyze complex, non-PII smartphone metadata—such as typing cadence, device health, and usage velocity.",
    points: [
      "Highly predictive supplementary risk scores",
      "Designed for 'thin-file' customers & SMEs",
      "First-time borrowers without CIB histories",
      "Behavioral metadata analytics",
    ],
  },
  {
    number: "02",
    icon: "🛡️",
    title: "Advanced Mobile Fraud Intelligence",
    description:
      "Powered by Credolab's global framework, our AI detects hidden signs of fraud before users reach onboarding.",
    points: [
      "Organized Fraud: Device Farms & Automation Tools",
      "Device Manipulation: Rooted devices, Emulators",
      "Identity & Geo-Spoofing detection",
      "VPN/Tor routing & Remote Access takeover prevention",
    ],
  },
  {
    number: "03",
    icon: "🏛️",
    title: "Sovereign AI & Regulatory Compliance",
    description:
      "Engineered to exceed Nepal Rastra Bank (NRB) 2026 AI and Cyber Resilience Guidelines.",
    points: [
      "100% Local Data Residency (Tier-3 Nepal Data Centers)",
      "Explainable AI (XAI) - Fully auditable decisions",
      "Transparent, fair algorithmic processes",
      "Exceeds NRB compliance requirements",
    ],
  },
];

const BENEFITS: Benefit[] = [
  {
    icon: "🏦",
    audience: "For Banks",
    title: "Reduce Risk, Increase Inclusion",
    points: [
      "Lower customer acquisition costs",
      "Reduce Non-Performing Loans (NPLs)",
      "Impenetrable shield against synthetic identity fraud",
      "100% NRB regulatory compliance",
    ],
  },
  {
    icon: "💼",
    audience: "For Investors",
    title: "Exclusive Technological Moat",
    points: [
      "Exclusive Credolab partnership in Nepal",
      "Regulatory-first business model",
      "Emerging market fintech infrastructure",
      "Sovereign AI with local data residency",
    ],
  },
];

const STATS: Stat[] = [
  {
    value: 100,
    suffix: "%",
    label: "Local Data",
    sublabel: "Tier-3 Nepal Data Centers",
  },
  {
    value: 35,
    suffix: "%",
    label: "Fraud Detection",
    sublabel: "Reduction in synthetic identity fraud",
  },
  {
    value: 30,
    suffix: "+",
    label: "Million Unbanked",
    sublabel: "Potential customers reached",
  },
  {
    value: 2026,
    suffix: "",
    label: "NRB Ready",
    sublabel: "AI & Cyber Resilience Guidelines",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   ANIMATED HERO BACKGROUND
═══════════════════════════════════════════════════════════════════ */
function FloatingOrb({
  size,
  top,
  left,
  delay,
  opacity = 0.12,
}: FloatingOrbProps) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        top,
        left,
        background:
          "radial-gradient(circle, rgba(201,148,10,0.35) 0%, transparent 70%)",
        opacity,
        animation: `floatOrb ${6 + delay}s ease-in-out ${delay}s infinite alternate`,
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE EXPORT
═══════════════════════════════════════════════════════════════════ */
export default function AboutPage() {
  return (
    <main
      className="bg-white overflow-x-hidden w-full"
      style={{ fontFamily: "'Georgia',serif" }}
    >
      {/* ── GLOBAL KEYFRAMES ──────────────────────────────────────── */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes floatOrb {
          from { transform: translate(0,0) scale(1); }
          to { transform: translate(20px, -30px) scale(1.1); }
        }
        @keyframes shimmerSlide {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes slideInLeft {
          from { opacity:0; transform: translateX(-60px); }
          to { opacity:1; transform: translateX(0); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform: translateY(40px); }
          to { opacity:1; transform: translateY(0); }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
          @keyframes marquee {
            0% {
            transform: translateX(0%);
            }
           100% {
           transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 25s linear infinite;
    }
        .shimmer-text {
          background: linear-gradient(90deg, #c9940a 0%, #f5d87a 30%, #c9940a 60%, #f5d87a 90%, #c9940a 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmerSlide 3s linear infinite;
        }
        .hero-animate { animation: slideInLeft 0.9s cubic-bezier(.22,1,.36,1) both; }
        .hero-animate-2 { animation: fadeUp 0.9s cubic-bezier(.22,1,.36,1) 0.2s both; }
        .hero-animate-3 { animation: fadeUp 0.9s cubic-bezier(.22,1,.36,1) 0.4s both; }
        .hero-animate-4 { animation: fadeUp 0.9s cubic-bezier(.22,1,.36,1) 0.6s both; }
      `,
        }}
      />

      {/* ════════════════════════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[85vh] sm:min-h-screen flex items-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg,#000 0%,#0d0800 30%,#1a1000 55%,#3d2900 80%,#7a5500 100%)",
        }}
      >
        {/* Floating orbs */}
        <FloatingOrb size="400px" top="-100px" left="-100px" delay={0} />
        <FloatingOrb
          size="300px"
          top="60%"
          left="70%"
          delay={2}
          opacity={0.1}
        />
        <FloatingOrb
          size="200px"
          top="20%"
          left="60%"
          delay={1}
          opacity={0.08}
        />

        {/* Geometric grid lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
          {[...Array(8)].map((_, i) => (
            <div
              key={`grid-line-${i}`}
              className="absolute w-px h-full"
              style={{
                left: `${12.5 * i}%`,
                background:
                  "linear-gradient(180deg,transparent,#c9940a,transparent)",
              }}
            />
          ))}
        </div>

        {/* Rotating ring deco – desktop only */}
        <div
          className="absolute right-[-80px] top-1/2 -translate-y-1/2 w-96 h-96 rounded-full hidden lg:block pointer-events-none"
          style={{
            border: "1px solid rgba(201,148,10,0.12)",
            animation: "rotateSlow 40s linear infinite",
          }}
        >
          <div
            className="absolute top-4 left-1/2 w-3 h-3 rounded-full -translate-x-1/2"
            style={{
              background: "#c9940a",
              boxShadow: "0 0 12px rgba(201,148,10,0.8)",
            }}
          />
        </div>

        {/* Shimmer top border */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg,transparent,#c9940a 30%,#f5d87a 50%,#c9940a 70%,transparent)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* LEFT TEXT */}
            <div>
              <div className="hero-animate">
                <Pill>About Us</Pill>
              </div>
              <h1
                className="hero-animate-2 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.04] mt-4 mb-6"
                style={{ fontFamily: "'Georgia',serif" }}
              >
                <span className="text-white">Building the Digital</span>
                <br />
                <span className="shimmer-text">Fortress for Nepal.</span>
              </h1>
              <p className="hero-animate-3 text-white/55 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
                Nepal's premier Artificial Intelligence infrastructure company,
                specializing in behavioral credit scoring and advanced mobile
                fraud intelligence for Tier-A financial institutions.
              </p>
              <div className="hero-animate-4 flex flex-wrap gap-3">
                <GoldBtn>Partner With Us</GoldBtn>
                <GoldBtn outline>Explore Solutions →</GoldBtn>
              </div>

              {/* Credolab badge */}
              <div
                className="hero-animate-4 mt-8 inline-flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{
                  background: "rgba(201,148,10,0.1)",
                  border: "1px solid rgba(201,148,10,0.3)",
                }}
              >
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-white/60 text-xs">
                  Exclusive Credolab Partner in Nepal
                </span>
              </div>
            </div>

            {/* RIGHT IMAGE MOSAIC */}
            <div className="hero-animate-3 relative hidden sm:block">
              <div
                className="grid grid-cols-2 gap-3 sm:gap-4"
                style={{ height: "clamp(320px,45vw,480px)" }}
              >
                <ImgBox
                  className="row-span-2 h-full"
                  label="AI Infrastructure"
                  icon="🧠"
                  overlay
                  style={{ borderRadius: "24px" }}
                />
                <ImgBox
                  label="Behavioral Analytics"
                  icon="📱"
                  style={{ height: "48%" }}
                />
                <ImgBox
                  label="Fraud Detection"
                  icon="🛡️"
                  style={{ height: "48%" }}
                />
              </div>
              {/* Floating badge */}
              <div
                className="absolute -bottom-4 -left-4 sm:-left-6 rounded-2xl px-4 py-3"
                style={{
                  background: "linear-gradient(135deg,#c9940a,#f5d87a)",
                  boxShadow: "0 12px 40px rgba(201,148,10,0.5)",
                }}
              >
                <div className="text-xs font-bold text-black/60 uppercase tracking-wider">
                  NRB 2026 Compliant
                </div>
                <div
                  className="text-xl font-black text-black"
                  style={{ fontFamily: "'Georgia',serif" }}
                >
                  Sovereign AI
                </div>
              </div>
              {/* Pulse ring */}
              <div className="absolute top-8 right-8 w-4 h-4">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "#c9940a",
                    animation: "pulseRing 2s ease-out infinite",
                  }}
                />
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ background: "#c9940a" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          MISSION SECTION
      ════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal direction="right">
              <div className="relative">
                <ImgBox
                  className="w-full h-96"
                  label="Digital Nepal Vision"
                  icon="🇳🇵"
                />
                <div className="absolute -bottom-6 -right-6 bg-black text-white p-6 rounded-2xl max-w-xs shadow-2xl">
                  <p className="text-xs text-white/60 uppercase tracking-wider mb-2">
                    Our Mission
                  </p>
                  <p className="text-sm font-bold leading-relaxed">
                    To empower Nepal's banking sector to safely bank the
                    unbanked.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2} direction="left">
              <Pill>Our Mission</Pill>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mt-4 mb-6 leading-tight"
                style={{ fontFamily: "'Georgia',serif" }}
              >
                Banking the Unbanked.
                <br />
                <span className="text-yellow-700">Protecting the Future.</span>
              </h2>
              <p className="text-black/60 text-base leading-relaxed mb-6">
                By leveraging alternative data and locally hosted AI, we aim to
                accelerate the Digital Nepal vision, ensuring that every citizen
                has fair access to credit while protecting institutions from
                sophisticated digital fraud.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className="p-4 rounded-xl"
                  style={{
                    background: "rgba(201,148,10,0.05)",
                    border: "1px solid rgba(201,148,10,0.1)",
                  }}
                >
                  <div className="text-2xl font-black text-yellow-700 mb-1">
                    30M+
                  </div>
                  <div className="text-xs text-black/50">
                    Unbanked Population
                  </div>
                </div>
                <div
                  className="p-4 rounded-xl"
                  style={{
                    background: "rgba(201,148,10,0.05)",
                    border: "1px solid rgba(201,148,10,0.1)",
                  }}
                >
                  <div className="text-2xl font-black text-yellow-700 mb-1">
                    Tier-A
                  </div>
                  <div className="text-xs text-black/50">
                    Financial Institutions
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          THREE PILLARS SECTION
      ════════════════════════════════════════════════════════════ */}
      <section
        className="py-16 sm:py-24 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg,#000 0%,#1a1000 50%,#3d2900 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,148,10,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal className="text-center mb-12 sm:mb-16">
            <Pill dark>What We Do</Pill>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-4 mb-4"
              style={{ fontFamily: "'Georgia',serif" }}
            >
              The Falcon Infrastructure
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-sm sm:text-base">
              We operate at the intersection of Financial Inclusion and Systemic
              Risk Mitigation. Our infrastructure is built on three core
              pillars:
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {PILLARS.map((pillar, i) => (
              <PillarCard key={pillar.number} {...pillar} delay={i * 0.15} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          STATS BAND
      ════════════════════════════════════════════════════════════ */}
      <section
        className="py-16 sm:py-20 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg,#000 0%,#0d0800 30%,#1a1000 55%,#3d2900 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,148,10,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {STATS.map((stat, i) => (
              <StatCard key={stat.label} {...stat} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12 sm:mb-16">
            <Pill>Partnership</Pill>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mt-4 mb-4"
              style={{ fontFamily: "'Georgia',serif" }}
            >
              Why Partner With Falcon?
            </h2>
            <p className="text-black/50 max-w-xl mx-auto text-sm sm:text-base">
              Exclusive technological moat in an emerging market, backed by a
              robust, regulatory-first business model.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {BENEFITS.map((benefit, i) => (
              <BenefitCard key={benefit.title} {...benefit} delay={i * 0.15} />
            ))}
          </div>

          {/* Trust indicators */}
          <Reveal className="mt-16 text-center">
            <p className="text-black/100 text-xm uppercase tracking-widest mb-6">
              Trusted By Leading Institutions
            </p>
            <div className="relative overflow-hidden">
              <div className="flex animate-marquee whitespace-nowrap">
                {/* First set */}
                {[
                  "Commercial Banks",
                  "Development Banks",
                  "Finance Companies",
                  "Microfinance",
                  "Digital Wallets",
                ].map((inst) => (
                  <span
                    key={`a-${inst}`}
                    className="text-sm font-bold text-black/40 mx-8 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-black/20"></span>
                    {inst}
                  </span>
                ))}
                {/* Duplicate set for seamless loop */}
                {[
                  "Commercial Banks",
                  "Development Banks",
                  "Finance Companies",
                  "Microfinance",
                  "Digital Wallets",
                ].map((inst) => (
                  <span
                    key={`b-${inst}`}
                    className="text-sm font-bold text-black/40 mx-8 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-black/20"></span>
                    {inst}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          LOCATION & CONTACT
      ════════════════════════════════════════════════════════════ */}
      <section
        className="py-16 sm:py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#f8f8f8 0%,#fff 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <Pill>Headquarters</Pill>
              <h2
                className="text-3xl sm:text-4xl font-black text-black mt-4 mb-6"
                style={{ fontFamily: "'Georgia',serif" }}
              >
                Lalitpur, Nepal
              </h2>
              <p className="text-black/60 text-base leading-relaxed mb-8">
                Headquartered in Lalitpur, we provide Tier-A financial
                institutions with the sovereign, privacy-first technology
                required to navigate the modern digital lending landscape.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white shadow-sm border border-black/5">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(201,148,10,0.1)" }}
                  >
                    <span className="text-lg">📍</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-black">Location</div>
                    <div className="text-xs text-black/50">Lalitpur, Nepal</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-white shadow-sm border border-black/5">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(201,148,10,0.1)" }}
                  >
                    <span className="text-lg">🤝</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-black">
                      Partnership
                    </div>
                    <div className="text-xs text-black/50">
                      Exclusive Credolab Strategic Partner
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-white shadow-sm border border-black/5">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(201,148,10,0.1)" }}
                  >
                    <span className="text-lg">🏛️</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-black">
                      Regulation
                    </div>
                    <div className="text-xs text-black/50">
                      Nepal Rastra Bank (NRB) Compliant
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2} direction="left">
              <div className="relative">
                <ImgBox
                  className="w-full h-80 lg:h-96"
                  label="Lalitpur Office"
                  icon="🏢"
                />
                <div className="absolute bottom-3 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg">
                  <h3
                    className="font-black text-black lg mb-2"
                    style={{ fontFamily: "'Georgia',serif" }}
                  >
                    Ready to secure your digital future?
                  </h3>
                  <p className="text-xs text-black/50 mb-4">
                    Join Nepal's leading financial institutions in adopting
                    sovereign AI infrastructure.
                  </p>
                  <GoldBtn sm>Schedule a Demo</GoldBtn>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          CTA BANNER
      ════════════════════════════════════════════════════════════ */}
      <section
        className="py-16 sm:py-24 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg,#000 0%,#0d0800 30%,#3d2900 70%,#7a5500 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,148,10,0.1) 0%, transparent 70%)",
          }}
        />
        {/* Shimmer border top */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg,transparent,#c9940a 30%,#f5d87a 50%,#c9940a 70%,transparent)",
          }}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <Reveal>
            <Pill>Get Started</Pill>
            <h2
              className="text-3xl sm:text-4xl lg:text-6xl font-black text-white mt-4 mb-5 leading-tight"
              style={{ fontFamily: "'Georgia',serif" }}
            >
              Bridge Traditional Banking
              <br />
              <span className="shimmer-text">With AI-Driven Future.</span>
            </h2>
            <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto">
              Allow your bank to say "yes" to more customers without
              compromising on security. Experience the exclusive Credolab
              advantage in Nepal.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <GoldBtn>Request Demo</GoldBtn>
              <button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white border border-white/15 hover:border-white/30 transition-colors"
                style={{ fontFamily: "'Georgia',serif" }}
              >
                Contact Sales →
              </button>
            </div>
          </Reveal>
        </div>
      </section>
     <section className="w-full px-4 py-10 md:px-8 lg:px-16 bg-gray-50">
      {/* Heading */}
      <div className="max-w-5xl mx-auto text-center mb-6">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
          Our Location
        </h2>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Visit us or find us easily on the map below
        </p>
      </div>

      {/* Map */}
      <div className="max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.967780614527!2d85.31480357525305!3d27.68739067619398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19b625d8cd09%3A0x155b6ead3c186597!2sFalcon%20Chips%20And%20A.I.%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1774776887665!5m2!1sen!2snp"
          className="w-full h-[400px] md:h-[400px] lg:h-[500px] border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
    </main>
  );
}
