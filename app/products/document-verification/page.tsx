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
}: GoldBtnProps) {
  if (outline)
    return (
      <button
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
   SECTION 1 — HERO: SECURE ID AUTHENTICATION
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

  const features: FeatureItem[] = [
    {
      icon: "🆔",
      title: "Robust ID verification",
      desc: "Accurate, fast and forensic document checks across passports, driving licences and national IDs.",
    },
    {
      icon: "🔬",
      title: "Forensic ID checks",
      desc: "Advanced tamper detection and security feature analysis to catch sophisticated fraud attempts.",
    },
    {
      icon: "🛡️",
      title: "ID fraud protection",
      desc: "Multi-layer signals combine to identify counterfeit, altered and fraudulently obtained documents.",
    },
    {
      icon: "⚡",
      title: "Instant decisions",
      desc: "Real-time results delivered in seconds — no manual review queues for genuine customers.",
    },
  ];

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
              <Pill>Document Authentication</Pill>
            </Reveal>
            <Reveal delay={0.08}>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-black mt-4 mb-5 leading-[1.04]"
                style={{
                  fontFamily: "'Georgia',serif",
                  letterSpacing: "-0.02em",
                }}
              >
                Secure ID{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg,#c9940a,#f5d87a)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {displayed}
                  <span className="animate-pulse">|</span>
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-black/55 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
                Accurate, fast and forensic ID fraud prevention — authenticating
                identity documents quickly, efficiently and accurately so you
                can trust your customers.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="flex flex-wrap gap-3">
                <GoldBtn>Find out more</GoldBtn>
                <GoldBtn outline>Watch demo →</GoldBtn>
              </div>
            </Reveal>

            {/* Feature bullet list */}
            <Reveal delay={0.32}>
              <ul className="mt-8 space-y-3">
                <CheckItem>
                  Robust ID verification across 200+ document types worldwide
                </CheckItem>
                <CheckItem>
                  Forensic tamper and counterfeit detection in real time
                </CheckItem>
                <CheckItem>
                  ID fraud protection with multi-layer signal analysis
                </CheckItem>
                <CheckItem>
                  Expert document support team available 24/7
                </CheckItem>
              </ul>
            </Reveal>
          </div>

          {/* RIGHT — floating UI mockup */}
          <Reveal delay={0.18} direction="left">
            <div
              className="relative"
              style={{ height: "clamp(420px,55vw,560px)" }}
            >
              {/* Main portrait placeholder */}
              <div
                className="absolute inset-0 rounded-3xl overflow-hidden"
                style={{
                  backgroundImage:
                    'url("https://i.pinimg.com/736x/cd/b8/76/cdb876e10d4d0bdbd688d3d8428f9bb2.jpg")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  background: "linear-gradient(135deg,#1a1000,#3d2900,#7a5500)",
                  border: "1px solid rgba(201,148,10,0.2)",
                }}
              >
                <span
                  className="absolute inset-0 flex items-center justify-center text-yellow-600/30 text-sm font-bold uppercase tracking-widest"
                  style={{ fontFamily: "'Georgia',serif" }}
                >
                  Customer Portrait
                </span>
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5) 100%)",
                  }}
                />
              </div>

              {/* Floating card: face scan */}
              <UICard
                className="absolute top-5 right-5 w-48"
                style={{
                  animation: "floatCard 4s ease-in-out infinite alternate",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs"
                    style={{
                      background: "linear-gradient(135deg,#c9940a,#f5d87a)",
                    }}
                  >
                    🤳
                  </div>
                  <span
                    className="text-xs font-black text-black"
                    style={{ fontFamily: "'Georgia',serif" }}
                  >
                    Biometric Match
                  </span>
                </div>
                <div
                  className="h-1.5 rounded-full w-full mb-1.5"
                  style={{ background: "rgba(0,0,0,0.06)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "97%",
                      background: "linear-gradient(90deg,#c9940a,#f5d87a)",
                    }}
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-xs text-black/50">Match: 97.4%</span>
                </div>
              </UICard>

              {/* Floating card: document check */}
              <UICard
                className="absolute bottom-8 left-5 w-52"
                style={{
                  animation: "floatCard 5s ease-in-out 1s infinite alternate",
                }}
              >
                <div
                  className="text-xs font-black text-black mb-2"
                  style={{ fontFamily: "'Georgia',serif" }}
                >
                  Document Authenticated
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">🆔</span>
                  <div>
                    <div className="text-xs font-bold text-black">
                      Passport • UK
                    </div>
                    <div className="text-xs text-green-500 font-bold">
                      ✓ Authentic
                    </div>
                  </div>
                </div>
              </UICard>

              {/* Pulse ring deco */}
              <div className="absolute top-10 left-10 w-5 h-5">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "#c9940a",
                    animation: "pulseRing 2.4s ease-out infinite",
                  }}
                />
                <div
                  className="w-5 h-5 rounded-full"
                  style={{ background: "#c9940a" }}
                />
              </div>
            </div>
          </Reveal>
        </div>

        {/* 4-feature row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16 sm:mt-20">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={0.08 * i}>
              <div
                className="group p-5 sm:p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                style={{
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.07)",
                }}
              >
                <div className="text-2xl mb-3">{f.icon}</div>
                <h4
                  className="font-black text-black text-sm mb-1.5 group-hover:text-yellow-700 transition-colors"
                  style={{ fontFamily: "'Georgia',serif" }}
                >
                  {f.title}
                </h4>
                <p className="text-xs text-black/50 leading-relaxed">
                  {f.desc}
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
   SECTION 2 — FAST, FORENSIC AND SECURE DOCUMENT AUTHENTICATION
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
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
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
                  <GoldBtn>Learn more</GoldBtn>
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
   SECTION 3 — HARDWARE CTA BANNER
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
              <GoldBtn sm>Explore hardware →</GoldBtn>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 4 — ESTABLISH TRUST IN REAL TIME
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
   SECTION 5 — TESTIMONIAL BANNER
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
   SECTION 6 — CONNECT SAFELY / PRODUCT SHOWCASE
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
              Falcon Go Dashboard
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
            {[
              "Counterfeit document detected",
              "Altered ID flagged",
              "Cross-network match found",
            ].map((s, i) => (
              <div
                key={s}
                className="flex items-center gap-2 p-2 rounded-lg"
                style={{
                  background: "rgba(0,0,0,0.03)",
                  border: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <span className="text-sm">{["⚠️", "🚫", "🔗"][i]}</span>
                <span className="text-xs text-black/60">{s}</span>
                <span
                  className="ml-auto text-xs font-bold"
                  style={{ color: "#c9940a", fontFamily: "'Georgia',serif" }}
                >
                  View →
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  const tc = tabContent[activeTab];

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201,148,10,0.04) 0%, transparent 70%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal className="text-center mb-10 sm:mb-14">
          <GoldLabel>Product Suite</GoldLabel>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mt-2 mb-3"
            style={{ fontFamily: "'Georgia',serif" }}
          >
            Connect safely with every
            <br />
            genuine identity
          </h2>
          <p className="text-black/50 text-sm max-w-lg mx-auto">
            The purpose-built platform for document authentication and identity
            proofing — intelligent, connected and compliant.
          </p>
        </Reveal>

        {/* Tab switcher */}
        <Reveal delay={0.1} className="flex justify-center gap-2 mb-10">
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setActiveTab(i)}
              className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
              style={{
                background:
                  activeTab === i
                    ? "linear-gradient(135deg,#000,#3d2900)"
                    : "#fff",
                color: activeTab === i ? "#f5d87a" : "rgba(0,0,0,0.5)",
                border:
                  activeTab === i
                    ? "1px solid rgba(201,148,10,0.4)"
                    : "1px solid rgba(0,0,0,0.1)",
                fontFamily: "'Georgia',serif",
                boxShadow:
                  activeTab === i ? "0 4px 20px rgba(0,0,0,0.15)" : "none",
                transform: activeTab === i ? "scale(1.04)" : "scale(1)",
              }}
            >
              {t}
            </button>
          ))}
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text */}
          <Reveal direction="right">
            <h3
              className="text-2xl sm:text-3xl font-black text-black mb-4 leading-tight"
              style={{ fontFamily: "'Georgia',serif" }}
            >
              {tc.headline}
            </h3>
            <p className="text-black/55 text-sm sm:text-base leading-relaxed mb-6">
              {tc.desc}
            </p>
            <ul className="space-y-3 mb-8">
              {tc.features.map((f) => (
                <CheckItem key={f} gold>
                  {f}
                </CheckItem>
              ))}
            </ul>
            <div className="flex gap-3">
              <GoldBtn>Learn more</GoldBtn>
              <GoldBtn outline>See case study →</GoldBtn>
            </div>
          </Reveal>

          {/* UI mock */}
          <Reveal delay={0.15} direction="left">
            <UICard style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}>
              {tc.ui}
            </UICard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 7 — FAQ: IDENTITY PROOFING
═══════════════════════════════════════════════════════════════════ */
const FAQS: FAQItem[] = [
  {
    q: "What is identity proofing?",
    a: "Identity proofing is the process of verifying that a person is who they claim to be, typically by checking an identity document and matching it to the individual presenting it — often via biometric comparison.",
  },
  {
    q: "What documents can Falcon authenticate?",
    a: "Falcon supports over 200 document types across 195 countries, including passports, national identity cards, driving licences, residence permits and more — with new document types added regularly.",
  },
  {
    q: "How does document tampering detection work?",
    a: "Our forensic engine analyses security features including holograms, UV patterns, microprint, font consistency and MRZ integrity. Any anomalies are flagged for review, with expert escalation available for complex cases.",
  },
  {
    q: "Can Falcon authenticate documents in real time?",
    a: "Yes. The majority of document checks are completed in under 4 seconds, delivering an immediate pass, fail or refer decision without any manual intervention required.",
  },
  {
    q: "Is biometric verification included?",
    a: "Yes. Falcon's platform includes liveness detection and facial biometric matching, ensuring the person presenting a document is genuinely present and corresponds to the identity being verified.",
  },
  {
    q: "How does Falcon handle edge cases and expert escalations?",
    a: "Our forensic document expert team is available around the clock to review complex or ambiguous cases. Escalations are typically resolved within a few hours, with a full written report provided.",
  },
];

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section
      className="py-16 sm:py-24 relative overflow-hidden"
      style={{ background: "#f8f8f8" }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal className="mb-10 sm:mb-14">
          <h2
            className="text-3xl sm:text-4xl font-black text-black leading-tight"
            style={{ fontFamily: "'Georgia',serif" }}
          >
            Frequently asked questions
            <br />
            <span
              style={{
                background: "linear-gradient(135deg,#c9940a,#f5d87a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              about identity proofing
            </span>
          </h2>
        </Reveal>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 0.04}>
              <div
                className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background:
                    openIdx === i
                      ? "linear-gradient(135deg,#000,#1a1000)"
                      : "#fff",
                  border:
                    openIdx === i
                      ? "1px solid rgba(201,148,10,0.3)"
                      : "1px solid rgba(0,0,0,0.07)",
                  boxShadow:
                    openIdx === i ? "0 8px 32px rgba(201,148,10,0.12)" : "none",
                }}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                >
                  <span
                    className="font-bold text-sm sm:text-base transition-colors duration-300"
                    style={{
                      fontFamily: "'Georgia',serif",
                      color: openIdx === i ? "#fff" : "#000",
                    }}
                  >
                    {faq.q}
                  </span>
                  <div
                    className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300"
                    style={{
                      background:
                        openIdx === i
                          ? "rgba(201,148,10,0.2)"
                          : "rgba(0,0,0,0.05)",
                      transform:
                        openIdx === i ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke={openIdx === i ? "#c9940a" : "#666"}
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>
                <div
                  style={{
                    maxHeight: openIdx === i ? "200px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.4s cubic-bezier(.22,1,.36,1)",
                  }}
                >
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.55)" }}
                    >
                      {faq.a}
                    </p>
                  </div>
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
   SECTION 8 — BOTTOM CTA
═══════════════════════════════════════════════════════════════════ */
function BottomCTA() {
  const ctaCards: CTACard[] = [
    { icon: "🆔", t: "Document Auth", d: "200+ doc types" },
    { icon: "🧬", t: "Biometrics", d: "Liveness + face match" },
    { icon: "🔬", t: "Forensics", d: "Expert tamper checks" },
    { icon: "📊", t: "Analytics", d: "Full audit trail" },
  ];

  return (
    <section
      className="py-16 sm:py-24 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg,#000 0%,#0d0800 20%,#1a1000 45%,#3d2900 70%,#7a5500 90%,#c9940a 100%)",
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg,transparent,#c9940a 30%,#f5d87a 50%,#c9940a 70%,transparent)",
        }}
      />

      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { size: 320, top: "10%", left: "5%", delay: 0 },
          { size: 240, top: "60%", left: "70%", delay: 2 },
          { size: 180, top: "30%", left: "50%", delay: 1 },
        ].map((o, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: o.size,
              height: o.size,
              top: o.top,
              left: o.left,
              background:
                "radial-gradient(circle,rgba(201,148,10,0.15) 0%,transparent 70%)",
              animation: `floatOrb ${6 + o.delay}s ease-in-out ${o.delay}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Geometric ring deco */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none">
        {[80, 140, 200].map((s) => (
          <div
            key={s}
            className="absolute rounded-full"
            style={{
              width: s,
              height: s,
              border: "1px solid rgba(201,148,10,0.12)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          />
        ))}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
          style={{
            background: "#c9940a",
            boxShadow: "0 0 16px rgba(201,148,10,0.8)",
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal>
            <p
              className="text-yellow-500/60 text-xs uppercase tracking-widest mb-3"
              style={{ fontFamily: "'Georgia',serif" }}
            >
              Get Started Today
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5 leading-tight"
              style={{ fontFamily: "'Georgia',serif" }}
            >
              Complete customer{" "}
              <span
                style={{
                  background: "linear-gradient(90deg,#c9940a,#f5d87a,#c9940a)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "shimmerSlide 3s linear infinite",
                }}
              >
                intelligence
              </span>
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-md">
              Connect safely with every genuine identity — fast, compliant, and
              at global scale.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <GoldBtn>Get a demo</GoldBtn>
              <button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white border border-white/15 hover:border-white/30 transition-colors"
                style={{ fontFamily: "'Georgia',serif" }}
              >
                Start free trial →
              </button>
            </div>
            <div className="flex flex-wrap gap-4 sm:gap-6 opacity-35">
              {["Aviva", "AXA", "HSBC", "Lloyds", "Barclays"].map((b) => (
                <span
                  key={b}
                  className="font-black text-white text-xs tracking-widest uppercase"
                  style={{ fontFamily: "'Georgia',serif" }}
                >
                  {b}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Right: feature recap cards */}
          <Reveal delay={0.15} direction="left">
            <div className="grid grid-cols-2 gap-3">
              {ctaCards.map((c) => (
                <div
                  key={c.t}
                  className="p-4 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(201,148,10,0.18)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div className="text-2xl mb-2">{c.icon}</div>
                  <div
                    className="font-black text-white text-sm"
                    style={{ fontFamily: "'Georgia',serif" }}
                  >
                    {c.t}
                  </div>
                  <div className="text-white/40 text-xs">{c.d}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
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
   ROOT
═══════════════════════════════════════════════════════════════════ */
export default function SecureIDPage() {
  return (
    <main
      className="bg-white overflow-x-hidden w-full"
      style={{ fontFamily: "'Georgia',serif" }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes floatCard {
          from { transform: translateY(0px); }
          to   { transform: translateY(-10px); }
        }
        @keyframes pulseRing {
          0%   { transform: scale(1);   opacity: 0.7; }
          100% { transform: scale(2.6); opacity: 0;   }
        }
        @keyframes shimmerSlide {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes floatOrb {
          from { transform: translate(0,0)    scale(1);    }
          to   { transform: translate(18px,-26px) scale(1.1); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(30px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
      `,
        }}
      />

      <HeroSection />
      <DocumentAuthSection />
      <HardwareBanner />
      <EstablishTrustSection />
      <TestimonialBanner />
      <ConnectSafelySection />
      <FAQSection />
      <BottomCTA />
    </main>
  );
}
