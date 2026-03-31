"use client";

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

interface FeatureItem {
  icon: string;
  title: string;
  desc: string;
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

interface CTACard {
  icon: string;
  t: string;
  d: string;
}

interface BusinessRiskMetric {
  label: string;
  score: number;
  status: "low" | "medium" | "high";
  change: string;
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
   SECTION 1 — HERO: KNOW YOUR BUSINESS (KYB)
═══════════════════════════════════════════════════════════════════ */
function HeroSection() {
  const words: string[] = [
    "business verification",
    "fraud detection",
    "compliance",
    "trust",
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 sm:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT */}
          <div>
            <Reveal delay={0}>
              <Pill>Business Verification</Pill>
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
                  business
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-black/55 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
                Verify business entities with confidence. Our AI-powered KYB platform 
                authenticates company documents, identifies ultimate beneficial owners, 
                and screens against global watchlists to stop business fraud.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="flex flex-wrap gap-3">
                <GoldBtn>Start KYB verification</GoldBtn>
                <GoldBtn outline>Talk to compliance experts →</GoldBtn>
              </div>
            </Reveal>

            {/* Feature bullet list */}
            <Reveal delay={0.32}>
              <ul className="mt-8 space-y-3">
                <CheckItem>Verify 150+ business document types globally</CheckItem>
                <CheckItem>AI-powered fraud detection for shell companies</CheckItem>
                <CheckItem>UBO identification and ownership structure mapping</CheckItem>
                <CheckItem>8-second average verification time</CheckItem>
                <CheckItem>Real-time sanctions & PEP screening</CheckItem>
              </ul>
            </Reveal>
          </div>

          {/* RIGHT — Business Verification UI Mockup */}
          <Reveal delay={0.18} direction="left">
            <div
              className="relative"
              style={{ height: "clamp(460px,55vw,600px)" }}
            >
              {/* Main Business Card UI */}
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
                      <span className="text-sm">🏢</span>
                    </div>
                    <span
                      className="font-black text-sm text-black"
                      style={{ fontFamily: "'Georgia',serif" }}
                    >
                      Falcon KYB
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-xs text-black/40">Verified Entity</span>
                  </div>
                </div>

                {/* Business Document Preview */}
                <div
                  className="rounded-xl p-4 mb-4"
                  style={{
                    background: "linear-gradient(135deg,#1e3a5f,#2c4c6e)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-16 h-16 rounded-lg bg-white/20 flex items-center justify-center text-3xl"
                    >
                      🏭
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white/80 text-xs font-bold">BUSINESS REGISTRATION</span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-green-400/20 text-green-300">
                          VERIFIED
                        </span>
                      </div>
                      <div className="text-white text-sm font-bold mb-1">Apex Technologies Ltd</div>
                      <div className="text-white/70 text-xs mb-2">Registration #: 12456789</div>
                      <div className="grid grid-cols-2 gap-2 text-[10px] text-white/60">
                        <div>Jurisdiction: UK</div>
                        <div>Incorporated: 2019</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Verification Steps */}
                <div className="space-y-3">
                  {[
                    { label: "Business registration verified", status: "complete", icon: "📄" },
                    { label: "UBO identification", status: "complete", icon: "👥" },
                    { label: "Sanctions screening", status: "complete", icon: "⚠️" },
                    { label: "Ownership structure analysis", status: "complete", icon: "🔗" },
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
                      <span className="text-sm text-black/70 flex-1">{step.label}</span>
                      <span className="text-xs text-green-600 font-bold">Verified</span>
                    </div>
                  ))}
                </div>

                {/* Risk Score Banner */}
                <div
                  className="mt-4 p-3 rounded-xl flex items-center justify-between"
                  style={{
                    background: "rgba(201,148,10,0.08)",
                    border: "1px solid rgba(201,148,10,0.2)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-black text-xs font-bold">
                      !
                    </div>
                    <div>
                      <div className="text-xs font-bold text-black">Risk Score</div>
                      <div className="text-xs text-black/50">Low risk • Approved</div>
                    </div>
                  </div>
                  <div
                    className="text-lg font-black"
                    style={{ color: "#c9940a", fontFamily: "'Georgia',serif" }}
                  >
                    12/100
                  </div>
                </div>
              </UICard>

              {/* Floating Trust Card */}
              <UICard
                className="absolute -bottom-4 -right-4 w-48 p-3"
                style={{
                  animation: "floatCard 4s ease-in-out infinite alternate",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-black/60">Business Trust Score</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-black/40">Confidence</span>
                  <span
                    className="text-sm font-black"
                    style={{ color: "#c9940a", fontFamily: "'Georgia',serif" }}
                  >
                    98.7%
                  </span>
                </div>
                <div
                  className="h-1.5 rounded-full w-full mt-1"
                  style={{ background: "rgba(0,0,0,0.06)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "98.7%",
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
              title: "Prevent fraud",
              desc: "Detect shell companies, nominee directors, and complex fraud schemes before onboarding.",
            },
            {
              icon: "⚡",
              title: "Onboard faster",
              desc: "8-second verification gets legitimate businesses onboard quickly, reducing drop-off.",
            },
            {
              icon: "📋",
              title: "Global compliance",
              desc: "Meet global KYB, AML, and regulatory requirements with automated compliance.",
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
   SECTION 2 — BUSINESS FRAUD DETECTION
═══════════════════════════════════════════════════════════════════ */
function BusinessFraudDetectionSection() {
  const fraudStats = [
    { label: "Shell Companies Detected", value: "234K+", trend: "+12%", color: "#ef4444" },
    { label: "Suspicious Ownership", value: "189K+", trend: "+8%", color: "#f97316" },
    { label: "Fraud Prevention Rate", value: "99.3%", trend: "+2.4%", color: "#22c55e" },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT - Text Content */}
          <Reveal>
            <GoldLabel>Fraud Prevention</GoldLabel>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mt-3 mb-5 leading-tight"
              style={{ fontFamily: "'Georgia',serif" }}
            >
              Detect and prevent sophisticated business fraud
            </h2>
            <p className="text-black/55 text-sm sm:text-base leading-relaxed mb-6 max-w-lg">
              Our AI-powered fraud detection engine identifies complex business fraud patterns, 
              including shell companies, nominee directors, and synthetic business identities. 
              Protect your organization from financial crime and regulatory penalties.
            </p>
            <ul className="space-y-3 mb-8">
              <CheckItem>Shell company detection with ownership analysis</CheckItem>
              <CheckItem>Nominee director and shadow director identification</CheckItem>
              <CheckItem>Cross-border entity verification</CheckItem>
              <CheckItem>Fraud ring detection and pattern matching</CheckItem>
            </ul>
            <GoldBtn>Explore fraud prevention →</GoldBtn>
          </Reveal>

          {/* RIGHT - Fraud Detection Dashboard */}
          <Reveal delay={0.15} direction="left">
            <UICard
              className="p-6"
              style={{
                background: "linear-gradient(135deg,#0f0f1a,#1a1a2e)",
                border: "1px solid rgba(201,148,10,0.2)",
              }}
            >
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-bold text-white"
                    style={{ fontFamily: "'Georgia',serif" }}
                  >
                    Fraud Detection Dashboard
                  </span>
                  <span className="text-xs text-red-400 animate-pulse">● Live Monitoring</span>
                </div>
                
                {/* Fraud Metrics */}
                <div className="space-y-3 mb-4">
                  {fraudStats.map((stat) => (
                    <div key={stat.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/60">{stat.label}</span>
                        <div className="flex gap-2">
                          <span className="text-white font-bold">{stat.value}</span>
                          <span className="text-red-400">{stat.trend}</span>
                        </div>
                      </div>
                      <div
                        className="h-1.5 rounded-full w-full"
                        style={{ background: "rgba(255,255,255,0.1)" }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: stat.label === "Fraud Prevention Rate" ? "99%" : "65%",
                            background: stat.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Alerts */}
                <div className="space-y-2">
                  <div className="text-xs text-white/40 mb-2">Recent Fraud Alerts</div>
                  {[
                    { type: "Shell Company", entity: "Global Trading LLC", risk: "High", time: "2m ago" },
                    { type: "UBO Mismatch", entity: "Apex Holdings", risk: "Medium", time: "5m ago" },
                    { type: "Sanctions Hit", entity: "Meridian Group", risk: "Critical", time: "12m ago" },
                  ].map((alert) => (
                    <div
                      key={alert.entity}
                      className="flex items-center justify-between p-2 rounded-lg"
                      style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.05)" }}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{
                            background: alert.risk === "Critical" ? "#ef4444" : alert.risk === "High" ? "#f97316" : "#eab308",
                          }}
                        />
                        <span className="text-xs text-white/80">{alert.type}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-white/60">{alert.entity}</span>
                        <span className="text-xs text-red-400">{alert.risk}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </UICard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 3 — UBO IDENTIFICATION & OWNERSHIP STRUCTURE
═══════════════════════════════════════════════════════════════════ */
function UBOIdentificationSection() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal className="text-center mb-14">
          <GoldLabel>Ownership Transparency</GoldLabel>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mt-2 mb-4 max-w-2xl mx-auto leading-tight"
            style={{ fontFamily: "'Georgia',serif" }}
          >
            Map ultimate beneficial owners and complex structures
          </h2>
          <p className="text-black/50 text-sm max-w-xl mx-auto leading-relaxed">
            Uncover hidden ownership structures, identify beneficial owners, and understand
            complex corporate hierarchies with automated ownership mapping.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT - Ownership Structure Visualization */}
          <Reveal direction="right">
            <UICard className="p-6">
              <div className="text-center mb-4">
                <span
                  className="text-xs font-black text-black"
                  style={{ fontFamily: "'Georgia',serif" }}
                >
                  Ownership Structure Map
                </span>
              </div>
              
              {/* Visual Org Chart */}
              <div className="relative min-h-[300px] flex items-center justify-center">
                <div className="relative w-full">
                  {/* Root Company */}
                  <div className="text-center mb-8">
                    <div
                      className="inline-block px-4 py-2 rounded-lg text-sm font-bold"
                      style={{
                        background: "linear-gradient(135deg,#c9940a,#f5d87a)",
                        color: "#000",
                      }}
                    >
                      Apex Technologies Ltd
                    </div>
                    <div className="text-xs text-black/40 mt-1">Parent Company</div>
                  </div>

                  {/* Ownership Lines */}
                  <svg className="absolute top-20 left-1/2 w-full h-32 -translate-x-1/2" style={{ zIndex: 0 }}>
                    <line x1="50%" y1="0" x2="25%" y2="100%" stroke="#c9940a" strokeWidth="2" strokeDasharray="4,4" />
                    <line x1="50%" y1="0" x2="75%" y2="100%" stroke="#c9940a" strokeWidth="2" strokeDasharray="4,4" />
                  </svg>

                  {/* Subsidiaries */}
                  <div className="grid grid-cols-2 gap-4 mt-12 relative z-10">
                    <div className="text-center">
                      <div
                        className="inline-block px-3 py-1.5 rounded-lg text-xs font-bold bg-white border"
                        style={{ borderColor: "rgba(201,148,10,0.3)" }}
                      >
                        Tech Solutions Inc
                      </div>
                      <div className="text-[10px] text-black/40 mt-1">80% owned</div>
                      <div className="text-[10px] text-black/30 mt-1">UBO: John Mitchell</div>
                    </div>
                    <div className="text-center">
                      <div
                        className="inline-block px-3 py-1.5 rounded-lg text-xs font-bold bg-white border"
                        style={{ borderColor: "rgba(201,148,10,0.3)" }}
                      >
                        Digital Services Ltd
                      </div>
                      <div className="text-[10px] text-black/40 mt-1">100% owned</div>
                      <div className="text-[10px] text-black/30 mt-1">UBO: Sarah Chen</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-black/10">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-black/60">Identified UBOs:</span>
                  <span className="font-bold text-black">2 individuals</span>
                </div>
                <div className="flex items-center justify-between text-xs mt-1">
                  <span className="text-black/60">Ownership complexity:</span>
                  <span className="text-green-600 font-bold">Moderate</span>
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
                  Automated UBO identification
                </h3>
                <p className="text-black/55 text-sm leading-relaxed mb-4">
                  Identify ultimate beneficial owners across complex corporate structures 
                  using AI-powered ownership mapping. Our system analyzes corporate registries, 
                  shareholder records, and public data to reveal true ownership.
                </p>
                <ul className="space-y-2">
                  <CheckItem>Ownership chain analysis up to 10 levels deep</CheckItem>
                  <CheckItem>Cross-jurisdictional ownership mapping</CheckItem>
                  <CheckItem>Shareholder registry integration</CheckItem>
                  <CheckItem>Automated UBO percentage calculation</CheckItem>
                </ul>
              </div>

              <div>
                <h3
                  className="text-xl sm:text-2xl font-black text-black mb-3"
                  style={{ fontFamily: "'Georgia',serif" }}
                >
                  Risk-based ownership screening
                </h3>
                <p className="text-black/55 text-sm leading-relaxed mb-4">
                  Automatically flag high-risk ownership structures, including opaque 
                  offshore entities, nominee arrangements, and concentrated ownership patterns.
                </p>
                <ul className="space-y-2">
                  <CheckItem>Offshore entity risk scoring</CheckItem>
                  <CheckItem>Concentration risk analysis</CheckItem>
                  <CheckItem>PEP exposure across ownership chain</CheckItem>
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
   SECTION 4 — GLOBAL BUSINESS VERIFICATION NETWORK
═══════════════════════════════════════════════════════════════════ */
function GlobalVerificationSection() {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* LEFT - Text */}
          <Reveal>
            <GoldLabel>Global Coverage</GoldLabel>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mt-3 mb-5 leading-tight"
              style={{ fontFamily: "'Georgia',serif" }}
            >
              Verify businesses across 150+ jurisdictions
            </h2>
            <p className="text-black/55 text-sm sm:text-base leading-relaxed mb-6 max-w-lg">
              Access real-time business registry data from over 150 countries. Our global network 
              provides comprehensive business verification data including registration status, 
              legal entity types, and corporate filings.
            </p>
            <ul className="space-y-3 mb-8">
              <CheckItem gold>150+ business registries integrated</CheckItem>
              <CheckItem gold>Real-time entity verification</CheckItem>
              <CheckItem gold>Cross-border entity matching</CheckItem>
              <CheckItem gold>Multi-language document processing</CheckItem>
            </ul>
            <div className="flex gap-3">
              <GoldBtn>Explore global coverage</GoldBtn>
              <GoldBtn outline>View jurisdictions →</GoldBtn>
            </div>
          </Reveal>

          {/* RIGHT - Global Map UI */}
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
                  Global Registry Coverage
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-bold"
                  style={{ background: "rgba(34,197,94,0.1)", color: "#16a34a" }}
                >
                  150+ Countries
                </span>
              </div>

              {/* World Map Stats */}
              <div className="space-y-3 mb-4">
                {[
                  { region: "North America", count: "87M+", entities: "Business entities", color: "#c9940a" },
                  { region: "Europe", count: "124M+", entities: "Companies", color: "#f5d87a" },
                  { region: "Asia-Pacific", count: "156M+", entities: "Business registrations", color: "#c9940a" },
                  { region: "Middle East & Africa", count: "43M+", entities: "Active entities", color: "#f5d87a" },
                ].map((region) => (
                  <div key={region.region} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                    <div>
                      <div className="text-xs font-bold text-black">{region.region}</div>
                      <div className="text-[10px] text-black/40">{region.entities}</div>
                    </div>
                    <div className="text-right">
                      <div
                        className="text-sm font-black"
                        style={{ color: region.color, fontFamily: "'Georgia',serif" }}
                      >
                        {region.count}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Top Sources */}
              <div className="pt-3 border-t border-black/10">
                <div className="text-xs text-black/40 mb-2">Top Registry Sources</div>
                <div className="flex flex-wrap gap-2">
                  {["Companies House (UK)", "SEC (US)", "ASIC (AU)", "HKMA (HK)", "ACRA (SG)"].map((source) => (
                    <span
                      key={source}
                      className="text-[10px] px-2 py-1 rounded-full bg-gray-100 text-black/60"
                    >
                      {source}
                    </span>
                  ))}
                </div>
              </div>
            </UICard>
          </Reveal>
        </div>

        {/* Business Document Authentication */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT - Document Authentication UI */}
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
                  Business Document Authentication
                </span>
              </div>

              {/* Document Types */}
              <div className="space-y-3 mb-4">
                {[
                  { doc: "Certificate of Incorporation", status: "Verified", icon: "📜" },
                  { doc: "Articles of Association", status: "Verified", icon: "📑" },
                  { doc: "Business License", status: "Verified", icon: "📋" },
                  { doc: "Tax Registration", status: "Pending", icon: "🏷️" },
                ].map((doc) => (
                  <div
                    key={doc.doc}
                    className="flex items-center justify-between p-2 rounded-lg bg-gray-50"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{doc.icon}</span>
                      <span className="text-xs text-black/80">{doc.doc}</span>
                    </div>
                    <span
                      className={`text-xs font-bold ${
                        doc.status === "Verified" ? "text-green-600" : "text-yellow-600"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* Authentication Checks */}
              <div className="space-y-2">
                <div className="text-xs text-black/40 mb-1">Security Features</div>
                {[
                  { check: "Official seal verification", passed: true },
                  { check: "Digital signature authenticity", passed: true },
                  { check: "Registry cross-reference", passed: true },
                  { check: "Issue date validation", passed: true },
                ].map((check) => (
                  <div key={check.check} className="flex items-center justify-between">
                    <span className="text-xs text-black/55">{check.check}</span>
                    <span className="text-xs text-green-600 font-bold">✓ Pass</span>
                  </div>
                ))}
              </div>
            </UICard>
          </Reveal>

          {/* RIGHT - Text */}
          <Reveal delay={0.15} direction="left">
            <GoldLabel>Document Authentication</GoldLabel>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mt-3 mb-5 leading-tight"
              style={{ fontFamily: "'Georgia',serif" }}
            >
              Authenticate business documents with forensic accuracy
            </h2>
            <p className="text-black/55 text-sm sm:text-base leading-relaxed mb-6 max-w-lg">
              Verify certificates of incorporation, articles of association, business licenses, 
              and other corporate documents with forensic-level analysis. Our AI detects forgeries, 
              alterations, and invalid documents in seconds.
            </p>
            <ul className="space-y-3 mb-8">
              <CheckItem gold>150+ business document types supported</CheckItem>
              <CheckItem gold>Forensic document analysis</CheckItem>
              <CheckItem gold>Registry cross-verification</CheckItem>
              <CheckItem gold>Digital signature validation</CheckItem>
            </ul>
            <GoldBtn outline>Learn about document authentication →</GoldBtn>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 5 — AML & SANCTIONS SCREENING
═══════════════════════════════════════════════════════════════════ */
function AMLComplianceSection() {
  const amlStats = [
    { name: "Global Watchlists", count: "2,400+", status: "Active" },
    { name: "Daily Updates", count: "1.2M+", status: "Real-time" },
    { name: "Sanctions Matches", count: "189K+", status: "Flagged" },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT - Text */}
          <Reveal>
            <GoldLabel>AML Compliance</GoldLabel>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mt-3 mb-5 leading-tight"
              style={{ fontFamily: "'Georgia',serif" }}
            >
              Automated AML & sanctions screening for businesses
            </h2>
            <p className="text-black/55 text-sm sm:text-base leading-relaxed mb-6">
              Screen business entities, directors, and UBOs against global sanctions lists, 
              PEP databases, and adverse media. Meet FATF recommendations and local AML 
              requirements with automated compliance workflows.
            </p>
            <ul className="space-y-3 mb-8">
              <CheckItem>Real-time sanctions screening</CheckItem>
              <CheckItem>PEP and RCA identification</CheckItem>
              <CheckItem>Adverse media monitoring</CheckItem>
              <CheckItem>Automated risk scoring</CheckItem>
              <CheckItem>Audit-ready compliance reports</CheckItem>
            </ul>
            <GoldBtn>View compliance solutions →</GoldBtn>
          </Reveal>

          {/* RIGHT - AML Dashboard */}
          <Reveal delay={0.15} direction="left">
            <UICard
              className="p-6"
              style={{
                background: "linear-gradient(135deg,#0a0a1a,#1a1a2a)",
                border: "1px solid rgba(201,148,10,0.2)",
              }}
            >
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-bold text-white"
                    style={{ fontFamily: "'Georgia',serif" }}
                  >
                    AML Screening Dashboard
                  </span>
                  <span className="text-xs text-green-400">● Compliant</span>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {amlStats.map((stat) => (
                    <div
                      key={stat.name}
                      className="text-center p-2 rounded-lg"
                      style={{ background: "rgba(255,255,255,0.05)" }}
                    >
                      <div
                        className="text-lg font-black text-white"
                        style={{ fontFamily: "'Georgia',serif" }}
                      >
                        {stat.count}
                      </div>
                      <div className="text-[10px] text-white/40">{stat.name}</div>
                    </div>
                  ))}
                </div>

                {/* Screening Results */}
                <div className="space-y-2">
                  <div className="text-xs text-white/40 mb-2">Recent Screening Results</div>
                  {[
                    { entity: "Global Trade Ltd", risk: "Low", checks: "5/5", status: "Clear" },
                    { entity: "Meridian Holdings", risk: "Medium", checks: "4/5", status: "Review" },
                    { entity: "Eastern Capital", risk: "High", checks: "2/5", status: "Flagged" },
                  ].map((result) => (
                    <div
                      key={result.entity}
                      className="flex items-center justify-between p-2 rounded-lg"
                      style={{ background: "rgba(0,0,0,0.3)" }}
                    >
                      <div>
                        <div className="text-xs text-white/80">{result.entity}</div>
                        <div className="text-[10px] text-white/40">Passed {result.checks}</div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-xs font-bold ${
                            result.risk === "Low" ? "text-green-400" : 
                            result.risk === "Medium" ? "text-yellow-400" : "text-red-400"
                          }`}
                        >
                          {result.risk} Risk
                        </div>
                        <div className="text-[10px] text-white/40">{result.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </UICard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 6 — INDUSTRY SOLUTIONS
═══════════════════════════════════════════════════════════════════ */
function IndustrySolutionsSection() {
  const industries = [
    { name: "Banking & Finance", icon: "🏦", desc: "Meet regulatory requirements for corporate banking, merchant services, and trade finance." },
    { name: "Fintech & Payments", icon: "💳", desc: "Onboard business clients with automated KYB checks for payment processors and digital wallets." },
    { name: "Crypto & Web3", icon: "₿", desc: "Verify corporate entities for exchange listings, wallet services, and DeFi platforms." },
    { name: "Real Estate", icon: "🏠", desc: "Screen property investors, developers, and corporate buyers for AML compliance." },
    { name: "Legal & Professional", icon: "⚖️", desc: "Verify client entities for legal firms, accounting practices, and consultancies." },
    { name: "Insurance", icon: "🛡️", desc: "Screen corporate policyholders and prevent fraudulent business insurance claims." },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <GoldLabel>Industries</GoldLabel>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mt-2 mb-4"
            style={{ fontFamily: "'Georgia',serif" }}
          >
            KYB solutions for every industry
          </h2>
          <p className="text-black/50 text-sm max-w-xl mx-auto">
            Tailored business verification solutions for high-compliance industries
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, i) => (
            <Reveal key={industry.name} delay={i * 0.05}>
              <div
                className="group p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                style={{
                  background: "#fff",
                  border: "1px solid rgba(201,148,10,0.15)",
                }}
              >
                <div className="text-3xl mb-3">{industry.icon}</div>
                <h3
                  className="font-black text-black text-base mb-2 group-hover:text-yellow-700 transition-colors"
                  style={{ fontFamily: "'Georgia',serif" }}
                >
                  {industry.name}
                </h3>
                <p className="text-black/50 text-xs leading-relaxed">{industry.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 7 — TRUST & SECURITY METRICS
═══════════════════════════════════════════════════════════════════ */
function TrustMetricsSection() {
  const [ref, visible] = useReveal(0.2);
  const n1 = useCounter(500, visible);
  const n2 = useCounter(150, visible);
  const n3 = useCounter(99.7, visible);
  const n4 = useCounter(8, visible);

  const trustPillars = [
    {
      icon: "🔒",
      title: "Enterprise-grade security",
      desc: "SOC 2 Type II certified with bank-level encryption and data protection standards.",
    },
    {
      icon: "⚖️",
      title: "Global compliance",
      desc: "Fully compliant with FATF recommendations, EU AML directives, and local regulations.",
    },
    {
      icon: "🤝",
      title: "Expert support",
      desc: "24/7 access to compliance specialists and forensic document examiners.",
    },
    {
      icon: "📊",
      title: "Audit trail",
      desc: "Complete audit logs and compliance reporting for regulatory examinations.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <GoldLabel>Trust & Security</GoldLabel>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mt-2 mb-4"
            style={{ fontFamily: "'Georgia',serif" }}
          >
            Trusted by leading financial institutions
          </h2>
          <p className="text-black/50 text-sm max-w-xl mx-auto">
            Industry-leading accuracy and security for business verification
          </p>
        </Reveal>

        {/* Stats row */}
        <div
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-14"
        >
          {[
            { val: n1, suffix: "+", label: "Businesses Verified", sub: "Annually" },
            { val: n2, suffix: "+", label: "Jurisdictions", sub: "Global coverage" },
            { val: n3, suffix: "%", label: "Accuracy Rate", sub: "Industry-leading" },
            { val: n4, suffix: "s", label: "Average Time", sub: "To verify" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} direction="scale">
              <div
                className="p-6 rounded-2xl text-center transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg,#000,#1a1000)",
                  border: "1px solid rgba(201,148,10,0.25)",
                }}
              >
                <div
                  className="text-2xl sm:text-3xl font-black mb-1"
                  style={{
                    fontFamily: "'Georgia',serif",
                    background: "linear-gradient(135deg,#c9940a,#f5d87a)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {s.val}{s.suffix}
                </div>
                <div
                  className="text-white font-bold text-xs mb-1"
                  style={{ fontFamily: "'Georgia',serif" }}
                >
                  {s.label}
                </div>
                <div className="text-white/40 text-[10px]">{s.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 4 trust pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trustPillars.map((p, i) => (
            <Reveal key={p.title} delay={0.08 * i}>
              <div
                className="group p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full"
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
   SECTION 8 — TESTIMONIAL
═══════════════════════════════════════════════════════════════════ */
function TestimonialSection() {
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
            Falcon's KYB platform reduced our manual review time by 75% and helped us identify 
            over $50M in potentially fraudulent business applications last year alone.
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
              MS
            </div>
            <div className="text-left">
              <p
                className="font-black text-white text-sm"
                style={{ fontFamily: "'Georgia',serif" }}
              >
                Maria Santos
              </p>
              <p className="text-white/40 text-xs">
                Head of AML Compliance, Global Bank Corporation
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
   SECTION 9 — FAQ
═══════════════════════════════════════════════════════════════════ */
const FAQ_ITEMS: FAQItem[] = [
  {
    q: "What business documents can Falcon verify?",
    a: "Falcon verifies over 150 types of business documents including certificates of incorporation, articles of association, business licenses, tax registrations, shareholder registers, and financial statements from 150+ jurisdictions worldwide.",
  },
  {
    q: "How does Falcon detect shell companies?",
    a: "Our AI analyzes ownership structures, cross-references multiple registries, detects nominee arrangements, and identifies red flags like offshore incorporation without substance, circular ownership, and dormant companies with suspicious activity patterns.",
  },
  {
    q: "What is UBO identification and why is it important?",
    a: "UBO (Ultimate Beneficial Owner) identification reveals the natural persons who ultimately own or control a legal entity. This is crucial for AML compliance, preventing money laundering, and understanding true business relationships and risks.",
  },
  {
    q: "How accurate is Falcon's KYB verification?",
    a: "Falcon achieves 99.7% accuracy in business verification and fraud detection, with continuous improvement through our machine learning models that analyze millions of corporate structures and fraud patterns.",
  },
  {
    q: "Does Falcon integrate with existing compliance systems?",
    a: "Yes, we offer REST APIs, pre-built connectors for major compliance platforms, and no-code options through Falcon Go. Our platform integrates with CRM systems, onboarding flows, and case management tools.",
  },
  {
    q: "How long does business verification take?",
    a: "Most business verifications complete in under 8 seconds. Complex ownership structures may require additional analysis but typically resolve within minutes.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
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
            Everything you need to know about Falcon's KYB verification platform
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
                      transform: openIndex === idx ? "rotate(45deg)" : "rotate(0)",
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
                  <p className="text-black/55 text-sm leading-relaxed">{item.a}</p>
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
export default function KYBVerificationLanding() {
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
      <BusinessFraudDetectionSection />
      <UBOIdentificationSection />
      <GlobalVerificationSection />
      <AMLComplianceSection />
      <IndustrySolutionsSection />
      <TrustMetricsSection />
      <TestimonialSection />
      <FAQSection />
      
    </main>
  );
}