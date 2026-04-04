"use client";
import Link from "next/link";

import React, { useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════════════════════════
   TYPES & INTERFACES
═══════════════════════════════════════════════════════════════════ */

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  className?: string;
}

interface GoldBtnProps {
  children: React.ReactNode;
  full?: boolean;
  outline?: boolean;
  sm?: boolean;
  onClick?: () => void;
}

interface GoldLabelProps {
  children: React.ReactNode;
}

interface PillProps {
  children: React.ReactNode;
  dark?: boolean;
}

interface UICardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface CheckItemProps {
  children: React.ReactNode;
  gold?: boolean;
}

interface StatNode {
  x: string;
  y: string;
  city: string;
}



interface TabContent {
  headline: string;
  desc: string;
  features: string[];
  ui: React.ReactNode;
}

interface FAQItem {
  q: string;
  a: string;
}



/* ═══════════════════════════════════════════════════════════════════
   HOOKS
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
    up: "translateY(40px)",
    down: "translateY(-40px)",
    left: "translateX(44px)",
    right: "translateX(-44px)",
    scale: "scale(0.93) translateY(20px)",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : map[direction] || map.up,
        transition: `opacity 0.75s ease ${delay}s, transform 0.8s cubic-bezier(.22,1,.36,1) ${delay}s`,
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
    const step = Math.ceil(end / 70);
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
   ATOMS
═══════════════════════════════════════════════════════════════════ */
function GoldBtn({
  children,
  full = false,
  outline = false,
  sm = false,
  onClick,
}: GoldBtnProps) {
  if (outline)
    return (
      <button
        onClick={onClick}
        className={`inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap ${sm ? "px-4 py-2 text-xs" : "px-6 py-3 text-sm"} ${full ? "w-full" : ""}`}
        style={{
          border: "1.5px solid #c9940a",
          color: "#c9940a",
          background: "transparent",
          fontFamily: "'Georgia',serif",
        }}
      >
        {children}
      </button>
    );
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-black transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap ${sm ? "px-4 py-2 text-xs" : "px-6 py-3 text-sm"} ${full ? "w-full" : ""}`}
      style={{
        background: "linear-gradient(135deg,#c9940a,#f5d87a)",
        color: "#000",
        fontFamily: "'Georgia',serif",
        boxShadow: "0 4px 20px rgba(201,148,10,0.38)",
        letterSpacing: "0.02em",
      }}
    >
      {children}
    </button>
  );
}

function GoldLabel({ children }: GoldLabelProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-3">
      <span className="h-px w-8" style={{ background: "#c9940a" }} />
      <span
        className="text-xs font-black uppercase tracking-widest"
        style={{ color: "#c9940a", fontFamily: "'Georgia',serif" }}
      >
        {children}
      </span>
      <span className="h-px w-8" style={{ background: "#c9940a" }} />
    </div>
  );
}

function Pill({ children, dark = false }: PillProps) {
  return (
    <span
      className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
      style={{
        background: dark ? "rgba(201,148,10,0.18)" : "rgba(201,148,10,0.09)",
        border: "1px solid rgba(201,148,10,0.38)",
        color: "#c9940a",
        fontFamily: "'Georgia',serif",
      }}
    >
      {children}
    </span>
  );
}

function UICard({ children, className = "", style = {} }: UICardProps) {
  return (
    <div
      className={`rounded-2xl p-4 ${className}`}
      style={{
        background: "#fff",
        boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
        border: "1px solid rgba(0,0,0,0.06)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function CheckItem({ children, gold = false }: CheckItemProps) {
  return (
    <li className="flex items-start gap-2.5 text-sm">
      <span
        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
        style={{
          background: gold
            ? "linear-gradient(135deg,#c9940a,#f5d87a)"
            : "rgba(201,148,10,0.12)",
          border: "1px solid rgba(201,148,10,0.3)",
        }}
      >
        <svg
          className="w-2.5 h-2.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke={gold ? "#000" : "#c9940a"}
          strokeWidth={3}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </span>
      <span style={{ color: "rgba(0,0,0,0.65)" }}>{children}</span>
    </li>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 1 — HERO: KNOW YOUR CUSTOMER (NEW DESIGN)
═══════════════════════════════════════════════════════════════════ */
function HeroSection() {
  const words: string[] = [
    "authentication",
    "verification",
    "confidence",
    "accuracy",
  ];
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout: NodeJS.Timeout;
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(
        () => setDisplayed(word.slice(0, displayed.length + 1)),
        80,
      );
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIdx]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Layered background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 60% at 70% 30%, rgba(201,148,10,0.07) 0%, transparent 65%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 40% 40% at 10% 80%, rgba(0,0,0,0.03) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Animated grid */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ opacity: 0.025 }}
      >
        {[...Array(12)].map((_, i) => (
          <div
            key={`h${i}`}
            className="absolute w-full h-px"
            style={{
              top: `${i * 9}%`,
              background: "linear-gradient(90deg,transparent,#000,transparent)",
            }}
          />
        ))}
        {[...Array(16)].map((_, i) => (
          <div
            key={`v${i}`}
            className="absolute h-full w-px"
            style={{
              left: `${i * 7}%`,
              background:
                "linear-gradient(180deg,transparent,#000,transparent)",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 sm:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT */}
          <div>
            <Reveal delay={0}>
              <Pill>Identity Verification</Pill>
            </Reveal>
            <Reveal delay={0.08}>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-black mt-4 mb-5 leading-[1.04]"
                style={{
                  fontFamily: "'Georgia',serif",
                  letterSpacing: "-0.02em",
                }}
              >
                Know your{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg,#c9940a,#f5d87a)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  customer
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-black/55 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
                Verify identities with confidence. Our AI-powered platform
                authenticates documents and biometrics in seconds, helping you
                onboard genuine customers while stopping fraud.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <Link href="/demo">
              <div className="flex flex-wrap gap-3">
                <GoldBtn>Get started</GoldBtn>
                
              </div>
              </Link>
            </Reveal>

            {/* Feature bullet list */}
            <Reveal delay={0.32}>
              <ul className="mt-8 space-y-3">
                <CheckItem>
                  Verify 200+ document types across 195 countries
                </CheckItem>
                <CheckItem>
                  AI-powered fraud detection with 99%+ accuracy
                </CheckItem>
                <CheckItem>
                  Biometric verification with liveness detection
                </CheckItem>
                <CheckItem>4-second average verification time</CheckItem>
              </ul>
            </Reveal>
          </div>

          {/* RIGHT — ID Verification UI Mockup */}
          <Reveal delay={0.18} direction="left">
            <div
              className="relative"
              style={{ height: "clamp(420px,55vw,560px)" }}
            >
              {/* Main ID Card UI */}
              <UICard
                className="absolute inset-0 overflow-hidden"
                style={{
                  background: "linear-gradient(135deg,#fafafa,#fff)",
                  border: "1px solid rgba(0,0,0,0.08)",
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg,#c9940a,#f5d87a)",
                      }}
                    >
                      <span className="text-sm">🦅</span>
                    </div>
                    <span
                      className="font-black text-sm text-black"
                      style={{ fontFamily: "'Georgia',serif" }}
                    >
                      Falcon
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-xs text-black/40">Secure</span>
                  </div>
                </div>

                {/* ID Document Preview */}
                <div
                  className="rounded-xl p-4 mb-4"
                  style={{
                    background: "linear-gradient(135deg,#1a365d,#2d5a87)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-20 rounded-lg bg-white/20 flex items-center justify-center text-2xl">
                      🆔
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white/80 text-xs font-bold">
                          PASSPORT
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-green-400/20 text-green-300">
                          VERIFIED
                        </span>
                      </div>
                      <div className="text-white text-sm font-bold mb-2">
                        Sarah Mitchell
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[10px] text-white/60">
                        <div>GBR ••••••••</div>
                        <div>Exp: 2031</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Verification Steps */}
                <div className="space-y-3">
                  {[
                    {
                      label: "Document captured",
                      status: "complete",
                      icon: "📸",
                    },
                    { label: "Data extracted", status: "complete", icon: "📄" },
                    {
                      label: "Biometric match",
                      status: "complete",
                      icon: "🤳",
                    },
                    { label: "Liveness check", status: "complete", icon: "✨" },
                  ].map((step, i) => (
                    <div key={step.label} className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                        style={{
                          background:
                            step.status === "complete"
                              ? "linear-gradient(135deg,#c9940a,#f5d87a)"
                              : "rgba(0,0,0,0.05)",
                        }}
                      >
                        {step.status === "complete" ? "✓" : step.icon}
                      </div>
                      <span className="text-sm text-black/70 flex-1">
                        {step.label}
                      </span>
                      <span className="text-xs text-green-600 font-bold">
                        Done
                      </span>
                    </div>
                  ))}
                </div>

                {/* Success Banner */}
                <div
                  className="mt-4 p-3 rounded-xl flex items-center gap-3"
                  style={{
                    background: "rgba(34,197,94,0.08)",
                    border: "1px solid rgba(34,197,94,0.2)",
                  }}
                >
                  <div className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center text-white text-sm">
                    ✓
                  </div>
                  <div>
                    <div className="text-sm font-bold text-black">
                      Verification Complete
                    </div>
                    <div className="text-xs text-black/50">
                      Identity confirmed
                    </div>
                  </div>
                </div>
              </UICard>

              {/* Floating Status Card */}
              <UICard
                className="absolute -bottom-4 -right-4 w-48 p-3"
                style={{
                  animation: "floatCard 4s ease-in-out infinite alternate",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-black/60">
                    Live Verification
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-black/40">Confidence</span>
                  <span
                    className="text-sm font-black"
                    style={{ color: "#c9940a", fontFamily: "'Georgia',serif" }}
                  >
                    99.4%
                  </span>
                </div>
                <div
                  className="h-1.5 rounded-full w-full mt-1"
                  style={{ background: "rgba(0,0,0,0.06)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "99.4%",
                      background: "linear-gradient(90deg,#c9940a,#f5d87a)",
                    }}
                  />
                </div>
              </UICard>
            </div>
          </Reveal>
        </div>

        {/* 3 Feature Icons Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-16 sm:mt-20 pt-12 border-t border-black/5">
          {[
            {
              icon: "🛡️",
              title: "Stop fraud",
              desc: "AI-powered detection stops sophisticated fraud attempts before they reach your business.",
            },
            {
              icon: "⚡",
              title: "Onboard faster",
              desc: "4-second verification gets genuine customers through quickly, reducing abandonment.",
            },
            {
              icon: "📋",
              title: "Stay compliant",
              desc: "Meet KYC, AML and global regulatory requirements with automated compliance.",
            },
          ].map((f, i) => (
            <Reveal key={f.title} delay={0.08 * i}>
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{
                    background: "rgba(201,148,10,0.08)",
                    border: "1px solid rgba(201,148,10,0.15)",
                  }}
                >
                  {f.icon}
                </div>
                <div>
                  <h4
                    className="font-black text-black text-sm mb-1"
                    style={{ fontFamily: "'Georgia',serif" }}
                  >
                    {f.title}
                  </h4>
                  <p className="text-xs text-black/50 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 2 — AUTOMATE KYC AND AML COMPLIANCE (NEW)
═══════════════════════════════════════════════════════════════════ */
function KYCAutomationSection() {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT - Text Content */}
          <Reveal>
            <GoldLabel>Global Compliance</GoldLabel>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mt-3 mb-5 leading-tight"
              style={{ fontFamily: "'Georgia',serif" }}
            >
              Automate KYC and AML compliance around the world
            </h2>
            <p className="text-black/55 text-sm sm:text-base leading-relaxed mb-6 max-w-lg">
              Meet regulatory requirements in 195 countries with automated
              identity verification, watchlist screening, and ongoing
              monitoring. Our platform helps you navigate complex compliance
              landscapes while delivering a seamless customer experience.
            </p>
            <ul className="space-y-3 mb-8">
              <CheckItem>
                Automated identity verification for 200+ document types
              </CheckItem>
              <CheckItem>PEP, sanctions and watchlist screening</CheckItem>
              <CheckItem>Ongoing monitoring and risk assessment</CheckItem>
              <CheckItem>Audit trails and compliance reporting</CheckItem>
            </ul>
            
          </Reveal>

          {/* RIGHT - Global Map UI */}
          <Reveal delay={0.15} direction="left">
            <div className="relative">
              <UICard
                className="p-6"
                style={{
                  background: "linear-gradient(135deg,#0a0a0a,#1a1a2e)",
                  border: "1px solid rgba(201,148,10,0.2)",
                }}
              >
                {/* World Map Visualization */}
                <div
                  className="relative h-64 mb-4 rounded-xl overflow-hidden"
                  style={{ background: "#0f172a" }}
                >
                  {/* Simplified world map dots */}
                  <div className="absolute inset-0 opacity-30">
                    {[...Array(50)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-blue-400"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animation: `pulse 2s ease-in-out ${Math.random() * 2}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full opacity-20">
                    <line
                      x1="20%"
                      y1="30%"
                      x2="50%"
                      y2="25%"
                      stroke="#c9940a"
                      strokeWidth="1"
                      strokeDasharray="4,4"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="0"
                        to="8"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </line>
                    <line
                      x1="50%"
                      y1="25%"
                      x2="80%"
                      y2="40%"
                      stroke="#c9940a"
                      strokeWidth="1"
                      strokeDasharray="4,4"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="0"
                        to="8"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </line>
                    <line
                      x1="30%"
                      y1="60%"
                      x2="70%"
                      y2="55%"
                      stroke="#c9940a"
                      strokeWidth="1"
                      strokeDasharray="4,4"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="0"
                        to="8"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </line>
                  </svg>
                  {/* Location markers */}
                  {[
                    { x: "20%", y: "30%", label: "NYC" },
                    { x: "50%", y: "25%", label: "LDN" },
                    { x: "80%", y: "40%", label: "DXB" },
                    { x: "70%", y: "55%", label: "SIN" },
                    { x: "30%", y: "60%", label: "SYD" },
                  ].map((loc) => (
                    <div
                      key={loc.label}
                      className="absolute flex flex-col items-center"
                      style={{
                        left: loc.x,
                        top: loc.y,
                        transform: "translate(-50%,-50%)",
                      }}
                    >
                      <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/50 animate-pulse" />
                      <span className="text-[10px] text-white/60 mt-1 font-bold">
                        {loc.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { val: "195", label: "Countries" },
                    { val: "200+", label: "Documents" },
                    { val: "4s", label: "Avg check" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div
                        className="text-2xl font-black text-white mb-1"
                        style={{ fontFamily: "'Georgia',serif" }}
                      >
                        {stat.val}
                      </div>
                      <div className="text-xs text-white/40">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </UICard>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 3 — COMPLETE CUSTOMER DUE DILIGENCE (NEW)
═══════════════════════════════════════════════════════════════════ */
function DueDiligenceSection() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal className="text-center mb-14">
          <GoldLabel>Due Diligence</GoldLabel>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mt-2 mb-4 max-w-2xl mx-auto leading-tight"
            style={{ fontFamily: "'Georgia',serif" }}
          >
            Complete customer due diligence
          </h2>
          <p className="text-black/50 text-sm max-w-xl mx-auto leading-relaxed">
            Build comprehensive risk profiles with automated data collection,
            verification, and ongoing monitoring throughout the customer
            lifecycle.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT - Workflow Diagram */}
          <Reveal direction="right">
            <UICard className="p-6">
              <div className="space-y-4">
                {/* Step 1 */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-black/5">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                    style={{
                      background: "linear-gradient(135deg,#c9940a,#f5d87a)",
                    }}
                  >
                    1
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-black">
                      Identity Verification
                    </div>
                    <div className="text-xs text-black/50">
                      Document & biometric check
                    </div>
                  </div>
                  <div className="text-green-500 text-sm">✓ Complete</div>
                </div>

                {/* Connector */}
                <div className="flex justify-center">
                  <div className="w-px h-6 bg-black/10" />
                </div>

                {/* Step 2 */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-black/5">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                    style={{
                      background: "linear-gradient(135deg,#c9940a,#f5d87a)",
                    }}
                  >
                    2
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-black">
                      Risk Assessment
                    </div>
                    <div className="text-xs text-black/50">
                      Watchlist & sanctions screening
                    </div>
                  </div>
                  <div className="text-green-500 text-sm">✓ Clear</div>
                </div>

                {/* Connector */}
                <div className="flex justify-center">
                  <div className="w-px h-6 bg-black/10" />
                </div>

                {/* Step 3 */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-black/5">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                    style={{
                      background: "linear-gradient(135deg,#c9940a,#f5d87a)",
                    }}
                  >
                    3
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-black">
                      Ongoing Monitoring
                    </div>
                    <div className="text-xs text-black/50">
                      Continuous risk evaluation
                    </div>
                  </div>
                  <div className="text-blue-500 text-sm">● Active</div>
                </div>
              </div>
            </UICard>
          </Reveal>

          {/* RIGHT - Text Content */}
          <Reveal delay={0.15} direction="left">
            <div className="space-y-8">
              <div>
                <h3
                  className="text-xl sm:text-2xl font-black text-black mb-3"
                  style={{ fontFamily: "'Georgia',serif" }}
                >
                  Run automated risk screening
                </h3>
                <p className="text-black/55 text-sm leading-relaxed mb-4">
                  Screen against global watchlists, sanctions lists, and PEP
                  databases automatically. Our platform checks thousands of data
                  sources in real-time to identify potential risks before they
                  impact your business.
                </p>
                <ul className="space-y-2">
                  <CheckItem>Sanctions and watchlist screening</CheckItem>
                  <CheckItem>
                    Politically Exposed Persons (PEP) checks
                  </CheckItem>
                  <CheckItem>Adverse media monitoring</CheckItem>
                </ul>
              </div>

              <div>
                <h3
                  className="text-xl sm:text-2xl font-black text-black mb-3"
                  style={{ fontFamily: "'Georgia',serif" }}
                >
                  Build detailed risk profiles
                </h3>
                <p className="text-black/55 text-sm leading-relaxed mb-4">
                  Create comprehensive customer risk profiles with automated
                  data collection and verification. Our platform aggregates
                  information from multiple sources to give you a complete view
                  of every customer.
                </p>
                <ul className="space-y-2">
                  <CheckItem>Automated data enrichment</CheckItem>
                  <CheckItem>Identity graph analysis</CheckItem>
                  <CheckItem>Risk scoring and categorization</CheckItem>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 4 — FALCON GO & ADVANCED IDENTITY PROOFING (NEW)
═══════════════════════════════════════════════════════════════════ */
function FalconGoSection() {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* LEFT - Text */}
          <Reveal>
            <GoldLabel>Quick Start</GoldLabel>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mt-3 mb-5 leading-tight"
              style={{ fontFamily: "'Georgia',serif" }}
            >
              Falcon 
            </h2>
            <p className="text-black/55 text-sm sm:text-base leading-relaxed mb-6 max-w-lg">
              Get started in hours, not weeks. Falcon Go is our no-code solution
              for businesses that need instant identity verification without
              complex integration.
            </p>
            <ul className="space-y-3 mb-8">
              <CheckItem gold>No-code setup and configuration</CheckItem>
              <CheckItem gold>Pre-built verification workflows</CheckItem>
              <CheckItem gold>Real-time dashboard and analytics</CheckItem>
              <CheckItem gold>Pay-per-verification pricing</CheckItem>
            </ul>
            <div className="flex gap-3">
              
              
            </div>
          </Reveal>

          {/* RIGHT - Falcon Go UI */}
          <Reveal delay={0.15} direction="left">
            <UICard
              className="p-5"
              style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-xs font-black text-black"
                  style={{ fontFamily: "'Georgia',serif" }}
                >
                  Falcon Go Dashboard
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-bold"
                  style={{
                    background: "rgba(34,197,94,0.1)",
                    color: "#16a34a",
                  }}
                >
                  Live
                </span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: "Verifications", val: "1,247", change: "+12%" },
                  { label: "Pass rate", val: "94.2%", change: "+3%" },
                  { label: "Avg time", val: "3.8s", change: "-0.5s" },
                  { label: "Fraud blocked", val: "23", change: "Today" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-3 rounded-xl"
                    style={{
                      background: "rgba(201,148,10,0.05)",
                      border: "1px solid rgba(201,148,10,0.1)",
                    }}
                  >
                    <div className="text-xs text-black/50 mb-1">
                      {stat.label}
                    </div>
                    <div className="flex items-end gap-2">
                      <span
                        className="text-lg font-black text-black"
                        style={{ fontFamily: "'Georgia',serif" }}
                      >
                        {stat.val}
                      </span>
                      <span className="text-[10px] text-green-600 mb-1">
                        {stat.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Verifications */}
              <div className="space-y-2">
                <div className="text-xs text-black/40 mb-2">
                  Recent verifications
                </div>
                {[
                  { name: "John Smith", status: "Pass", time: "2m ago" },
                  { name: "Emma Wilson", status: "Pass", time: "5m ago" },
                  { name: "Michael Brown", status: "Review", time: "8m ago" },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between p-2 rounded-lg bg-gray-50"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{
                          background:
                            item.status === "Pass"
                              ? "linear-gradient(135deg,#c9940a,#f5d87a)"
                              : "#6b7280",
                        }}
                      >
                        {item.name.charAt(0)}
                      </div>
                      <span className="text-xs text-black">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-bold ${
                          item.status === "Pass"
                            ? "text-green-600"
                            : "text-amber-600"
                        }`}
                      >
                        {item.status}
                      </span>
                      <span className="text-xs text-black/30">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </UICard>
          </Reveal>
        </div>

        {/* Advanced Identity Proofing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT - Biometric UI */}
          <Reveal direction="right">
            <UICard
              className="p-5"
              style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}
            >
              <div className="text-center mb-4">
                <span
                  className="text-xs font-black text-black"
                  style={{ fontFamily: "'Georgia',serif" }}
                >
                  Advanced Identity Proofing
                </span>
              </div>

              {/* Face Match Comparison */}
              <div className="flex items-center justify-center gap-4 mb-4">
                {/* ID Photo */}
                <div className="text-center">
                  <div
                    className="w-20 h-24 rounded-xl mb-2 mx-auto flex items-center justify-center text-3xl"
                    style={{
                      background: "linear-gradient(135deg,#e5e7eb,#f3f4f6)",
                      border: "2px solid rgba(201,148,10,0.3)",
                    }}
                  >
                    👤
                  </div>
                  <div className="text-xs text-black/50">ID Photo</div>
                </div>

                {/* Match Indicator */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-1"
                    style={{
                      background: "linear-gradient(135deg,#c9940a,#f5d87a)",
                    }}
                  >
                    <svg
                      className="w-6 h-6 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div
                    className="text-sm font-black"
                    style={{ color: "#c9940a", fontFamily: "'Georgia',serif" }}
                  >
                    98.7%
                  </div>
                  <div className="text-[10px] text-black/40">Match</div>
                </div>

                {/* Selfie */}
                <div className="text-center">
                  <div
                    className="w-20 h-24 rounded-xl mb-2 mx-auto flex items-center justify-center text-3xl"
                    style={{
                      background: "linear-gradient(135deg,#e5e7eb,#f3f4f6)",
                      border: "2px solid rgba(34,197,94,0.3)",
                    }}
                  >
                    📱
                  </div>
                  <div className="text-xs text-black/50">Selfie</div>
                </div>
              </div>

              {/* Liveness Checks */}
              <div className="space-y-2">
                {[
                  { check: "Blink detection", passed: true },
                  { check: "3D depth analysis", passed: true },
                  { check: "Texture analysis", passed: true },
                  { check: "Screen replay check", passed: true },
                ].map((test) => (
                  <div
                    key={test.check}
                    className="flex items-center justify-between p-2 rounded-lg bg-gray-50"
                  >
                    <span className="text-xs text-black/70">{test.check}</span>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      <span className="text-xs text-green-600 font-bold">
                        Pass
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </UICard>
          </Reveal>

          {/* RIGHT - Text */}
          <Reveal delay={0.15} direction="left">
            <GoldLabel>Biometric Verification</GoldLabel>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mt-3 mb-5 leading-tight"
              style={{ fontFamily: "'Georgia',serif" }}
            >
              Advanced identity proofing
            </h2>
            <p className="text-black/55 text-sm sm:text-base leading-relaxed mb-6 max-w-lg">
              Combine document verification with biometric checks to ensure the
              person presenting the ID is its rightful owner. Our liveness
              detection prevents spoofing attempts using photos, videos, or
              masks.
            </p>
            <ul className="space-y-3 mb-8">
              <CheckItem gold>Facial recognition with 99.7% accuracy</CheckItem>
              <CheckItem gold>Passive and active liveness detection</CheckItem>
              <CheckItem gold>Deepfake and spoofing prevention</CheckItem>
              <CheckItem gold>Cross-device biometric matching</CheckItem>
            </ul>
            
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 5 — DOCUMENT AUTHENTICATION (ORIGINAL - ENHANCED)
═══════════════════════════════════════════════════════════════════ */
function DocumentAuthSection() {
  const docFeatures = [
    {
      title: "Smart capture ID",
      desc: "Guided capture technology ensures customers submit a clear, readable image of their document first time — reducing drop-off and manual review.",
      icon: "📸",
      ui: (
        <UICard style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.10)" }}>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{
                background: "rgba(201,148,10,0.1)",
                border: "1px solid rgba(201,148,10,0.2)",
              }}
            >
              📸
            </div>
            <div>
              <p
                className="text-xs font-black text-black"
                style={{ fontFamily: "'Georgia',serif" }}
              >
                Smart Capture
              </p>
              <p className="text-xs text-black/40">Auto-align & optimise</p>
            </div>
          </div>
          <div
            className="h-20 rounded-xl flex items-center justify-center mb-2"
            style={{
              background: "linear-gradient(135deg,#f8f8f8,#fff8e6)",
              border: "1px solid rgba(201,148,10,0.12)",
            }}
          >
            <span className="text-xs text-black/30 uppercase tracking-widest">
              Document Frame
            </span>
          </div>
          <div
            className="flex items-center gap-2 p-2 rounded-lg"
            style={{
              background: "rgba(34,197,94,0.06)",
              border: "1px solid rgba(34,197,94,0.15)",
            }}
          >
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-xs text-black/60">
              Image quality: Excellent
            </span>
          </div>
        </UICard>
      ),
    },
    {
      title: "Accurate ID extraction",
      desc: "OCR and NFC data extraction pulls all relevant fields from a document accurately — name, date of birth, document number, expiry and more.",
      icon: "🔎",
      ui: (
        <UICard style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.10)" }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🔎</span>
            <span
              className="text-xs font-black text-black"
              style={{ fontFamily: "'Georgia',serif" }}
            >
              Data Extraction
            </span>
          </div>
          <div className="space-y-1.5">
            {[
              { label: "Full name", value: "Sarah Mitchell" },
              { label: "Date of birth", value: "12 Mar 1988" },
              { label: "Doc number", value: "GB••••••••" },
              { label: "Expiry", value: "14 Jun 2031" },
            ].map((r) => (
              <div
                key={r.label}
                className="flex items-center justify-between px-2 py-1.5 rounded-lg"
                style={{
                  background: "#fafafa",
                  border: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <span className="text-xs text-black/40">{r.label}</span>
                <span
                  className="text-xs font-bold text-black"
                  style={{ fontFamily: "'Georgia',serif" }}
                >
                  {r.value}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-xs text-green-600 font-bold">
              All fields extracted ✓
            </span>
          </div>
        </UICard>
      ),
    },
    {
      title: "Enhanced tampering detection",
      desc: "Forensic analysis checks security features, holograms, fonts and microprint for signs of alteration or counterfeiting.",
      icon: "🧬",
      ui: (
        <UICard style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.10)" }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🧬</span>
            <span
              className="text-xs font-black text-black"
              style={{ fontFamily: "'Georgia',serif" }}
            >
              Tamper Analysis
            </span>
          </div>
          <div className="space-y-2">
            {[
              { check: "Hologram present", pass: true },
              { check: "Font consistency", pass: true },
              { check: "MRZ integrity", pass: true },
              { check: "UV security features", pass: true },
              { check: "Microprint verified", pass: true },
            ].map((c) => (
              <div key={c.check} className="flex items-center justify-between">
                <span className="text-xs text-black/55">{c.check}</span>
                <span className="text-xs font-bold text-green-500">✓ Pass</span>
              </div>
            ))}
          </div>
        </UICard>
      ),
    },
    {
      title: "Forensic document expert support",
      desc: "Access to a team of forensic document specialists for complex cases — providing expert opinion on edge cases and emerging fraud typologies.",
      icon: "👨‍🔬",
      ui: (
        <UICard style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.10)" }}>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-black"
              style={{ background: "linear-gradient(135deg,#c9940a,#f5d87a)" }}
            >
              FE
            </div>
            <div>
              <p
                className="text-xs font-black text-black"
                style={{ fontFamily: "'Georgia',serif" }}
              >
                Forensic Expert
              </p>
              <p className="text-xs text-black/40">Available 24/7</p>
            </div>
          </div>
          <div
            className="p-3 rounded-xl mb-2"
            style={{
              background: "#fafafa",
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <p
              className="text-xs text-black/55 italic"
              style={{ fontFamily: "'Georgia',serif" }}
            >
              "This document shows consistent security feature profiles.
              Authentication: confirmed genuine."
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-xs text-black/50">
              Expert review complete
            </span>
          </div>
        </UICard>
      ),
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-50 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,148,10,0.04) 0%, transparent 70%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal className="text-center mb-14 sm:mb-18">
          <GoldLabel>How It Works</GoldLabel>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mt-2 mb-4 max-w-2xl mx-auto leading-tight"
            style={{ fontFamily: "'Georgia',serif" }}
          >
            Fast, forensic and secure document authentication
          </h2>
          <p className="text-black/50 text-sm max-w-xl mx-auto leading-relaxed">
            Accurate, secure and expertly documented solutions and reliable
            verifications to authenticate documents and confirm the identities
            of your customers.
          </p>
        </Reveal>

        <div className="space-y-16 sm:space-y-24">
          {docFeatures.map((feat, i) => (
            <div
              key={feat.title}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center`}
            >
              {/* Text — alternates left/right */}
              <div className={i % 2 === 1 ? "order-1 lg:order-2" : ""}>
                <Reveal delay={0.05}>
                  <div className="text-3xl mb-4">{feat.icon}</div>
                  <h3
                    className="text-2xl sm:text-3xl font-black text-black mb-4 leading-tight"
                    style={{ fontFamily: "'Georgia',serif" }}
                  >
                    {feat.title}
                  </h3>
                  <p className="text-black/55 text-sm sm:text-base leading-relaxed mb-6 max-w-md">
                    {feat.desc}
                  </p>
                  
                </Reveal>
              </div>
              {/* UI card */}
              <div className={i % 2 === 1 ? "order-2 lg:order-1" : ""}>
                <Reveal delay={0.15} direction={i % 2 === 1 ? "right" : "left"}>
                  {feat.ui}
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 6 — HARDWARE CTA BANNER (ORIGINAL)
═══════════════════════════════════════════════════════════════════ */
function HardwareBanner() {
  return (
    <section className="py-8 sm:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div
            className="rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
            style={{
              background: "linear-gradient(135deg,#000,#1a1000)",
              border: "1px solid rgba(201,148,10,0.25)",
            }}
          >
            <div className="flex items-center gap-5">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{
                  background: "rgba(201,148,10,0.12)",
                  border: "1px solid rgba(201,148,10,0.25)",
                }}
              >
                🖨️
              </div>
              <div>
                <p
                  className="text-white font-black text-base sm:text-lg mb-1"
                  style={{ fontFamily: "'Georgia',serif" }}
                >
                  Looking for document authentication hardware?
                </p>
                <p className="text-white/45 text-xs leading-relaxed max-w-lg">
                  Falcon offers a range of desktop and kiosk document readers
                  for in-branch and in-store verification workflows — fully
                  integrated with our software platform.
                </p>
              </div>
            </div>
            <div className="flex-shrink-0">
              
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 7 — ESTABLISH TRUST IN REAL TIME (ORIGINAL)
═══════════════════════════════════════════════════════════════════ */
const STAT_NODES: StatNode[] = [
  { x: "22%", y: "32%", city: "NY" },
  { x: "48%", y: "28%", city: "LDN" },
  { x: "62%", y: "42%", city: "DXB" },
  { x: "76%", y: "56%", city: "SG" },
  { x: "83%", y: "72%", city: "SYD" },
  { x: "35%", y: "62%", city: "SAO" },
  { x: "54%", y: "22%", city: "MOS" },
  { x: "68%", y: "30%", city: "MUM" },
];

function EstablishTrustSection() {
  const [ref, visible] = useReveal(0.2);
  const n1 = useCounter(200, visible);
  const n2 = useCounter(99, visible);
  const n3 = useCounter(4, visible);

  const trustPillars = [
    {
      icon: "✨",
      title: "Simple experience",
      desc: "A smooth, guided document capture experience that keeps genuine customers on track without friction or confusion.",
    },
    {
      icon: "🎯",
      title: "Best accuracy",
      desc: "Industry-leading extraction and authentication accuracy rates across a wide range of document types and quality levels.",
    },
    {
      icon: "🛡️",
      title: "Secure fraud protection",
      desc: "Multi-layer forensic checks and real-time fraud signals protect you from sophisticated document fraud at scale.",
    },
    {
      icon: "🚀",
      title: "Streamlined onboarding",
      desc: "Fast, automated decisions get genuine customers through onboarding quickly — reducing abandonment and boosting conversion.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-white">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,148,10,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal className="text-center mb-12 sm:mb-16">
          <GoldLabel>Trust & Biometrics</GoldLabel>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mt-2 mb-4 max-w-2xl mx-auto leading-tight"
            style={{ fontFamily: "'Georgia',serif" }}
          >
            Establish trust in real time with documents and biometrics
          </h2>
          <p className="text-black/50 text-sm max-w-xl mx-auto leading-relaxed">
            Infinite identity proofing in a proven product that authenticates in
            seconds and delivers reliable decisions every time.
          </p>
        </Reveal>

        {/* Stats row */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 mb-14"
        >
          {[
            {
              val: n1,
              suffix: "+",
              label: "Document types",
              sub: "Supported globally across 195 countries",
            },
            {
              val: n2,
              suffix: "%+",
              label: "Accuracy rate",
              sub: "Industry-leading extraction and authentication",
            },
            {
              val: n3,
              suffix: "s",
              label: "Average decision",
              sub: "From capture to confirmed result",
            },
          ].map((s, i) => (
            <Reveal key={s.sub} delay={i * 0.1} direction="scale">
              <div
                className="p-6 sm:p-8 rounded-2xl text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{
                  background: "linear-gradient(135deg,#000,#1a1000)",
                  border: "1px solid rgba(201,148,10,0.25)",
                }}
              >
                <div
                  className="text-3xl sm:text-4xl font-black mb-1"
                  style={{
                    fontFamily: "'Georgia',serif",
                    background: "linear-gradient(135deg,#c9940a,#f5d87a)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {s.val}
                  {s.suffix}
                </div>
                <div
                  className="text-white font-bold text-sm mb-1"
                  style={{ fontFamily: "'Georgia',serif" }}
                >
                  {s.label}
                </div>
                <div className="text-white/40 text-xs">{s.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 4 trust pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {trustPillars.map((p, i) => (
            <Reveal key={p.title} delay={0.08 * i}>
              <div
                className="group p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer h-full"
                style={{
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.07)",
                }}
              >
                <div className="text-2xl mb-3">{p.icon}</div>
                <h4
                  className="font-black text-black text-sm mb-2 group-hover:text-yellow-700 transition-colors"
                  style={{ fontFamily: "'Georgia',serif" }}
                >
                  {p.title}
                </h4>
                <p className="text-xs text-black/50 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 8 — TESTIMONIAL BANNER (ORIGINAL)
═══════════════════════════════════════════════════════════════════ */
function TestimonialBanner() {
  return (
    <section
      className="py-14 sm:py-20 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg,#000,#1a1000,#3d2900)" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg,transparent,#c9940a 30%,#f5d87a 50%,#c9940a 70%,transparent)",
        }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <Reveal>
          <div
            className="text-5xl font-black mb-4"
            style={{
              color: "rgba(201,148,10,0.2)",
              fontFamily: "'Georgia',serif",
            }}
          >
            "
          </div>
          <p
            className="text-white/80 text-base sm:text-xl lg:text-2xl italic leading-relaxed mb-8 font-bold"
            style={{ fontFamily: "'Georgia',serif" }}
          >
            Falcon's document authentication platform helped us reduce manual
            review rates by over 60%, dramatically improving our customer
            onboarding experience.
          </p>
          <div className="flex items-center justify-center gap-4">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center font-black text-sm"
              style={{
                background: "linear-gradient(135deg,#c9940a,#f5d87a)",
                color: "#000",
                fontFamily: "'Georgia',serif",
              }}
            >
              JT
            </div>
            <div className="text-left">
              <p
                className="font-black text-white text-sm"
                style={{ fontFamily: "'Georgia',serif" }}
              >
                James Thornton
              </p>
              <p className="text-white/40 text-xs">
                Head of Compliance, Meridian Financial Services
              </p>
            </div>
            <div className="ml-4 hidden sm:flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400">
                  ★
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg,transparent,#c9940a 30%,#f5d87a 50%,#c9940a 70%,transparent)",
        }}
      />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 9 — CONNECT SAFELY / PRODUCT SHOWCASE (ORIGINAL - COMPLETED)
═══════════════════════════════════════════════════════════════════ */
function ConnectSafelySection() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs: string[] = ["Falcon Go", "Falcon Trust Network"];

  const tabContent: TabContent[] = [
    {
      headline: "Launch document verification in hours, not weeks",
      desc: "Falcon Go is the fastest way to get document authentication live for your business — no complex integration required. Ideal for growing businesses that need KYC up and running quickly.",
      features: [
        "No-code setup in hours",
        "200+ document types supported",
        "Plug-in to existing onboarding",
        "Instant pass/fail decisions",
      ],
      ui: (
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-xs font-black text-black"
              style={{ fontFamily: "'Georgia',serif" }}
            >
              Falcon  Dashboard
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-bold"
              style={{ background: "rgba(34,197,94,0.1)", color: "#16a34a" }}
            >
              Live
            </span>
          </div>
          {[
            { label: "Document Auth", val: 99, color: "#c9940a" },
            { label: "Biometric Match", val: 97, color: "#22c55e" },
            { label: "Fraud Risk", val: 4, color: "#ef4444" },
          ].map((row) => (
            <div key={row.label}>
              <div className="flex justify-between mb-1">
                <span className="text-xs text-black/60">{row.label}</span>
                <span
                  className="text-xs font-bold"
                  style={{ color: row.color }}
                >
                  {row.val}%
                </span>
              </div>
              <div
                className="h-1.5 rounded-full w-full"
                style={{ background: "rgba(0,0,0,0.06)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${row.val}%`, background: row.color }}
                />
              </div>
            </div>
          ))}
          <div className="pt-2 flex gap-2">
            <div
              className="flex-1 p-2 rounded-lg text-center"
              style={{
                background: "rgba(201,148,10,0.08)",
                border: "1px solid rgba(201,148,10,0.2)",
              }}
            >
              <div
                className="text-xs font-black text-black"
                style={{ fontFamily: "'Georgia',serif" }}
              >
                PASS
              </div>
              <div
                className="text-lg font-black"
                style={{ color: "#c9940a", fontFamily: "'Georgia',serif" }}
              >
                94%
              </div>
            </div>
            <div
              className="flex-1 p-2 rounded-lg text-center"
              style={{
                background: "rgba(239,68,68,0.06)",
                border: "1px solid rgba(239,68,68,0.15)",
              }}
            >
              <div
                className="text-xs font-black text-black/60"
                style={{ fontFamily: "'Georgia',serif" }}
              >
                FLAG
              </div>
              <div
                className="text-lg font-black text-red-400"
                style={{ fontFamily: "'Georgia',serif" }}
              >
                6%
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      headline: "Stop document fraud with consortium intelligence",
      desc: "Falcon Trust Network pools fraud intelligence across thousands of organisations, helping you spot fraudulent document patterns before they reach your onboarding flow.",
      features: [
        "Shared document fraud signals",
        "Synthetic identity detection",
        "Cross-industry risk intelligence",
        "Real-time pattern alerts",
      ],
      ui: (
        <div className="p-5">
          <div
            className="text-xs font-black text-black mb-3"
            style={{ fontFamily: "'Georgia',serif" }}
          >
            Network Signals
          </div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {["Genuine", "Review", "Fraud"].map((l, i) => (
              <div
                key={l}
                className="p-2 rounded-lg text-center"
                style={{
                  background: [
                    "rgba(34,197,94,0.08)",
                    "rgba(234,179,8,0.08)",
                    "rgba(239,68,68,0.08)",
                  ][i],
                  border: `1px solid ${["rgba(34,197,94,0.2)", "rgba(234,179,8,0.2)", "rgba(239,68,68,0.2)"][i]}`,
                }}
              >
                <div
                  className="text-sm font-black"
                  style={{
                    color: ["#16a34a", "#ca8a04", "#dc2626"][i],
                    fontFamily: "'Georgia',serif",
                  }}
                >
                  {[3104, 241, 55][i]}
                </div>
                <div className="text-xs" style={{ color: "rgba(0,0,0,0.5)" }}>
                  {l}
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
              <span className="text-xs text-black/60">Network size</span>
              <span className="text-xs font-bold text-black">2,400+ orgs</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
              <span className="text-xs text-black/60">Daily signals</span>
              <span className="text-xs font-bold text-black">1.2M+</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
              <span className="text-xs text-black/60">Fraud prevented</span>
              <span className="text-xs font-bold text-black">$87M+</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal className="text-center mb-12">
          <GoldLabel>How to deploy</GoldLabel>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mt-2 mb-4 max-w-2xl mx-auto leading-tight"
            style={{ fontFamily: "'Georgia',serif" }}
          >
            Connect safely and instantly
          </h2>
          <p className="text-black/50 text-sm max-w-xl mx-auto leading-relaxed">
            Choose the path that fits your business needs — from no-code setup
            to enterprise-grade fraud intelligence.
          </p>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setActiveTab(i)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeTab === i
                  ? "text-black shadow-lg"
                  : "text-black/40 hover:text-black/60"
              }`}
              style={
                activeTab === i
                  ? {
                      background: "linear-gradient(135deg,#c9940a,#f5d87a)",
                      fontFamily: "'Georgia',serif",
                    }
                  : { fontFamily: "'Georgia',serif" }
              }
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal delay={0.1}>
            <h3
              className="text-2xl sm:text-3xl font-black text-black mb-4 leading-tight"
              style={{ fontFamily: "'Georgia',serif" }}
            >
              {tabContent[activeTab].headline}
            </h3>
            <p className="text-black/55 text-sm leading-relaxed mb-6">
              {tabContent[activeTab].desc}
            </p>
            <ul className="space-y-2.5 mb-8">
              {tabContent[activeTab].features.map((f) => (
                <CheckItem key={f}>{f}</CheckItem>
              ))}
            </ul>
            
          </Reveal>

          <Reveal delay={0.2} direction="left">
            <UICard
              className="p-0 overflow-hidden"
              style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.12)" }}
            >
              {tabContent[activeTab].ui}
            </UICard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 10 — FAQ SECTION (NEW)
═══════════════════════════════════════════════════════════════════ */
const FAQ_ITEMS: FAQItem[] = [
  {
    q: "What document types does Falcon support?",
    a: "Falcon supports over 200 document types across 195 countries, including passports, driver's licenses, national IDs, residence permits, and visas. Our system continuously adds support for new document types based on customer needs.",
  },
  {
    q: "How accurate is Falcon's verification?",
    a: "Falcon achieves 99.7% accuracy in document authentication and biometric matching, with continuous improvements through our machine learning models that process millions of verifications daily.",
  },
  {
    q: "How long does verification take?",
    a: "Most verifications complete in under 4 seconds from document capture to final decision. Complex cases may require additional review but are typically resolved within minutes.",
  },
  {
    q: "Is Falcon compliant with global regulations?",
    a: "Yes, Falcon meets KYC, AML, and data privacy requirements across major jurisdictions including GDPR (Europe), CCPA (California), and local regulations in over 50 countries. We maintain SOC 2 Type II certification and regular third-party audits.",
  },
  {
    q: "Can Falcon integrate with our existing systems?",
    a: "Absolutely. We offer REST APIs, SDKs for iOS and Android, and pre-built integrations with major identity platforms. Falcon Go provides no-code options for quick deployment without engineering resources.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <GoldLabel>FAQ</GoldLabel>
          <h2
            className="text-3xl sm:text-4xl font-black text-black mt-2 mb-4"
            style={{ fontFamily: "'Georgia',serif" }}
          >
            Frequently asked questions
          </h2>
          <p className="text-black/50 text-sm max-w-xl mx-auto">
            Everything you need to know about Falcon's identity verification
            platform.
          </p>
        </Reveal>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => (
            <Reveal key={item.q} delay={idx * 0.05}>
              <div
                className="rounded-xl overflow-hidden transition-all"
                style={{
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <span
                    className="font-bold text-black text-sm sm:text-base"
                    style={{ fontFamily: "'Georgia',serif" }}
                  >
                    {item.q}
                  </span>
                  <span
                    className="text-xl transition-transform duration-200"
                    style={{
                      transform:
                        openIndex === idx ? "rotate(45deg)" : "rotate(0)",
                      color: "#c9940a",
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ${
                    openIndex === idx ? "pb-4 max-h-96" : "max-h-0"
                  }`}
                >
                  <p className="text-black/55 text-sm leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-10">
          <GoldBtn outline>View all FAQs →</GoldBtn>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN EXPORT COMPONENT
═══════════════════════════════════════════════════════════════════ */
export default function IdentityVerificationLanding() {
  // Add global animations styles
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes floatCard {
        0% { transform: translateY(0px); }
        100% { transform: translateY(-8px); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.2); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <HeroSection />
      <KYCAutomationSection />
      <DueDiligenceSection />
      <FalconGoSection />
      <DocumentAuthSection />
      <HardwareBanner />
      <EstablishTrustSection />
      <TestimonialBanner />
      <ConnectSafelySection />
      <FAQSection />
    </main>
  );
}
