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
   SECTION 1 — HERO: FAST AND SECURE AGE CERTAINTY
═══════════════════════════════════════════════════════════════════ */
function HeroSection() {
  const words: string[] = ["certainty", "protection", "compliance", "confidence"];
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
      icon: "🛡️",
      title: "Prevent underage access",
      desc: "Stop minors from accessing age-restricted content, services, products and venues.",
    },
    {
      icon: "🔐",
      title: "Adaptive journeys",
      desc: "Treat every customer as an individual with age verification on our all-in-one identity platform.",
    },
    {
      icon: "⚡",
      title: "Fast and hassle-free",
      desc: "Verify age quickly and securely without impacting the experience of genuine customers.",
    },
    {
      icon: "🌍",
      title: "Global coverage",
      desc: "80+ checks and one API to verify genuine customers everywhere with accurate risk analysis.",
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
              <Pill>Age Verification</Pill>
            </Reveal>
            <Reveal delay={0.08}>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-black mt-4 mb-5 leading-[1.04]"
                style={{
                  fontFamily: "'Georgia',serif",
                  letterSpacing: "-0.02em",
                }}
              >
                Fast and secure age{" "}
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
                Prevent underage access to age-restricted content, services, products and venues, ensuring minors and your business are fully protected.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="flex flex-wrap gap-3">
                <GoldBtn>Get a demo</GoldBtn>
                <GoldBtn outline>Learn more →</GoldBtn>
              </div>
            </Reveal>

            {/* Feature bullet list */}
            <Reveal delay={0.32}>
              <ul className="mt-8 space-y-3">
                <CheckItem>
                  Ensure a safe onboarding process online and in-store
                </CheckItem>
                <CheckItem>
                  Safeguard minors and stop fake IDs with document validation
                </CheckItem>
                <CheckItem>
                  Accelerate customer acquisition while meeting compliance
                </CheckItem>
                <CheckItem>
                  Verify anyone, anywhere with 190+ country coverage
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
                  background: "linear-gradient(135deg,#1a1000,#3d2900,#7a5500)",
                  border: "1px solid rgba(201,148,10,0.2)",
                }}
              >
                <span
                  className="absolute inset-0 flex items-center justify-center text-yellow-600/30 text-sm font-bold uppercase tracking-widest"
                  style={{ fontFamily: "'Georgia',serif" }}
                >
                  Age Verification
                </span>
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5) 100%)",
                  }}
                />
              </div>

              {/* Floating card: age check */}
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
                    🔞
                  </div>
                  <span
                    className="text-xs font-black text-black"
                    style={{ fontFamily: "'Georgia',serif" }}
                  >
                    Age Check
                  </span>
                </div>
                <div
                  className="h-1.5 rounded-full w-full mb-1.5"
                  style={{ background: "rgba(0,0,0,0.06)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "100%",
                      background: "linear-gradient(90deg,#c9940a,#f5d87a)",
                    }}
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-xs text-black/50">Age: 25+ Verified</span>
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
                  Document Verified
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">🆔</span>
                  <div>
                    <div className="text-xs font-bold text-black">
                      Driver's License • UK
                    </div>
                    <div className="text-xs text-green-500 font-bold">
                      ✓ Age Confirmed
                    </div>
                  </div>
                </div>
              </UICard>

              {/* Floating card: step tracker */}
              <UICard
                className="absolute bottom-8 right-5 w-40"
                style={{
                  animation:
                    "floatCard 3.5s ease-in-out 0.5s infinite alternate",
                }}
              >
                <div
                  className="text-xs font-black text-black mb-2"
                  style={{ fontFamily: "'Georgia',serif" }}
                >
                  Verification
                </div>
                {["Document", "Age Check", "Complete"].map((s, i) => (
                  <div key={s} className="flex items-center gap-2 mb-1">
                    <div
                      className="w-3.5 h-3.5 rounded-full flex items-center justify-center"
                      style={{
                        background:
                          i < 2
                            ? "linear-gradient(135deg,#c9940a,#f5d87a)"
                            : "rgba(0,0,0,0.08)",
                      }}
                    >
                      {i < 2 && (
                        <svg
                          className="w-2 h-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="#000"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <span
                      className="text-xs"
                      style={{ color: i < 2 ? "#000" : "rgba(0,0,0,0.35)" }}
                    >
                      {s}
                    </span>
                  </div>
                ))}
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

        {/* Falcon Go banner */}
        <Reveal delay={0.1} className="mt-10 sm:mt-14">
          <div
            className="rounded-2xl p-5 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            style={{
              background: "linear-gradient(135deg,#000,#1a1000)",
              border: "1px solid rgba(201,148,10,0.25)",
            }}
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-black"
                  style={{
                    background: "linear-gradient(135deg,#c9940a,#f5d87a)",
                    fontFamily: "'Georgia',serif",
                  }}
                >
                  G
                </div>
                <span
                  className="text-yellow-400 text-xs font-bold uppercase tracking-wider"
                  style={{ fontFamily: "'Georgia',serif" }}
                >
                  Falcon Go
                </span>
              </div>
              <p
                className="text-white font-bold text-sm sm:text-base"
                style={{ fontFamily: "'Georgia',serif" }}
              >
                The all-in-one identity platform for fast, easy, and safe business growth.
              </p>
              <p className="text-white/45 text-xs mt-1">
                Verify genuine customers everywhere with 80+ checks and one API.
              </p>
            </div>
            <div className="flex-shrink-0">
              <GoldBtn sm>Explore Falcon Go →</GoldBtn>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 2 — GLOBAL COVERAGE
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

function GlobalCoverageSection() {
  const [ref, visible] = useReveal(0.2);
  const n1 = useCounter(600, visible);
  const n2 = useCounter(200, visible);
  const n3 = useCounter(190, visible);

  const stats: Array<{
    val: number;
    suffix: string;
    label: string;
    sub: string;
  }> = [
    {
      val: n1,
      suffix: "M",
      label: "Company",
      sub: "Records worldwide",
    },
    {
      val: n2,
      suffix: "+",
      label: "Registries",
      sub: "Beneficial ownership",
    },
    {
      val: n3,
      suffix: "+",
      label: "Countries",
      sub: "Identity verification",
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
          <GoldLabel>Global Coverage</GoldLabel>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mt-2 mb-3"
            style={{ fontFamily: "'Georgia',serif" }}
          >
            Complete business onboarding faster
          </h2>
          <p className="text-black/50 text-sm max-w-lg mx-auto leading-relaxed">
            Reduced time to revenue around the world with comprehensive identity intelligence.
          </p>
        </Reveal>

        {/* Stats row */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 mb-12 sm:mb-16"
        >
          {stats.map((s, i) => (
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
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 3 — TESTIMONIAL BANNER
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
            We achieved a 30% uplift in successful age verifications and preventing underage sign-ups, while allowing GGPoker to let more legitimate customers start playing.
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
              PB
            </div>
            <div className="text-left">
              <p
                className="font-black text-white text-sm"
                style={{ fontFamily: "'Georgia',serif" }}
              >
                Paul Burke
              </p>
              <p className="text-white/40 text-xs">
                Managing Director, NSUS Limited
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
   SECTION 4 — CONNECT SAFELY / PRODUCT SHOWCASE
═══════════════════════════════════════════════════════════════════ */
function ConnectSafelySection() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs: string[] = ["Falcon Go", "Document Authentication"];

  const tabContent: TabContent[] = [
    {
      headline: "Accelerate safe customer-centric growth with worldwide identity intelligence",
      desc: "Falcon Go is the all-in-one identity platform for fast, easy, and safe business growth. Verify genuine customers everywhere with 80+ checks and one API.",
      features: [
        "Complete customer compliance and conversion",
        "Accurate risk analysis in real-time",
        "Interrogate identities for fraud signals",
        "Block crime at first contact",
      ],
      ui: (
        <div className="p-5 space-y-3">
          {/* Mini dashboard mock */}
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-xs font-black text-black"
              style={{ fontFamily: "'Georgia',serif" }}
            >
              Identity Verification
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-bold"
              style={{ background: "rgba(34,197,94,0.1)", color: "#16a34a" }}
            >
              Live
            </span>
          </div>
          {[
            { label: "Age Verification", val: 96, color: "#c9940a" },
            { label: "Document Auth", val: 88, color: "#22c55e" },
            { label: "Fraud Risk", val: 12, color: "#ef4444", invert: true },
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
                VERIFIED
              </div>
              <div
                className="text-lg font-black"
                style={{ color: "#c9940a", fontFamily: "'Georgia',serif" }}
              >
                91%
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
                BLOCKED
              </div>
              <div
                className="text-lg font-black text-red-400"
                style={{ fontFamily: "'Georgia',serif" }}
              >
                9%
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      headline: "Authenticate government-issued IDs online or in-person with 50+ forensic tests",
      desc: "Tech-first document authentication using FaceMatch technology, active and passive liveness checks, and Smart Capture technology to validate over 4,000 different forms of identification.",
      features: [
        "50+ forensic document tests in seconds",
        "FaceMatch technology with liveness detection",
        "Smart Capture for optimal image quality",
        "Human forensic document experts",
      ],
      ui: (
        <div className="p-5">
          <div
            className="text-xs font-black text-black mb-3"
            style={{ fontFamily: "'Georgia',serif" }}
          >
            Document Analysis
          </div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {["Valid", "Suspicious", "Rejected"].map((l, i) => (
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
                  {[2847, 193, 41][i]}
                </div>
                <div className="text-xs" style={{ color: "rgba(0,0,0,0.5)" }}>
                  {l}
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {[
              "Hologram verified",
              "Microprint detected",
              "UV security features",
            ].map((s, i) => (
              <div
                key={s}
                className="flex items-center gap-2 p-2 rounded-lg"
                style={{
                  background: "rgba(0,0,0,0.03)",
                  border: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <span className="text-sm">{["✓", "✓", "✓"][i]}</span>
                <span className="text-xs text-black/60">{s}</span>
                <span
                  className="ml-auto text-xs font-bold"
                  style={{ color: "#c9940a", fontFamily: "'Georgia',serif" }}
                >
                  Passed →
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
            Prevent fake IDs & underage access
          </h2>
          <p className="text-black/50 text-sm max-w-lg mx-auto">
            Transact with confidence while delivering a verification experience that is fast, easy and hassle-free.
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
   SECTION 5 — FAQ
═══════════════════════════════════════════════════════════════════ */
const FAQS: FAQItem[] = [
  {
    q: "What is age verification?",
    a: "Age verification is the process of confirming a person's age to ensure they meet legal requirements for accessing age-restricted products, services or content. Our age verification solutions help businesses prevent underage access while staying compliant with global regulations.",
  },
  {
    q: "How could a person's age be verified?",
    a: "A person's age can be verified using identity data checks against trusted sources, document authentication of government-issued IDs, and biometric verification like selfie matching and liveness detection. These methods ensure fast, secure and accurate age confirmation with minimal friction.",
  },
  {
    q: "What is an age verification system?",
    a: "An age verification system is a digital solution that automates the process of checking a user's age. Our system combines data verification, document checks and biometric tools to confirm age and identity in real time, helping businesses onboard legitimate customers and block underage users.",
  },
  {
    q: "What is age verification software?",
    a: "Age verification software is a tool that enables businesses to verify customer age online or in person. We use global data sources, document validation and biometric checks to ensure compliance and prevent fraud while maintaining a smooth customer experience.",
  },
  {
    q: "What are age verification services?",
    a: "Age verification services include a suite of tools and technologies that help businesses confirm customer age. We offer services such as identity data verification, document authentication and real-time fraud detection to support compliance and protect minors.",
  },
  {
    q: "How quickly can we see results after go-live?",
    a: "Most customers see measurable improvement in age verification rates and underage prevention within the first 30 days of live operation. Our team provides ongoing tuning support to optimise performance.",
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
              about age verification
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
   SECTION 6 — BOTTOM CTA
═══════════════════════════════════════════════════════════════════ */
function BottomCTA() {
  const ctaCards: CTACard[] = [
    { icon: "🔞", t: "Age Verify", d: "Block underage" },
    { icon: "🛡️", t: "Fraud Guard", d: "Stop fake IDs" },
    { icon: "📋", t: "Compliance", d: "Meet regulations" },
    { icon: "🌍", t: "Global", d: "190+ countries" },
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
              {["Gaming", "Retail", "Alcohol", "Cannabis", "Media"].map((b) => (
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
export default function AgeVerificationPage() {
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
      <GlobalCoverageSection />
      <TestimonialBanner />
      <ConnectSafelySection />
      <FAQSection />
      <BottomCTA />
    </main>
  );
}