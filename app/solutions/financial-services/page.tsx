"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════════════════ */
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  className?: string;
}

interface FeatureCardProps {
  number: string;
  title: string;
  desc: string;
  delay?: number;
}

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  logo?: string;
}

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  country: string;
  jobTitle: string;
  message: string;
  consent: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  phone?: string;
  country?: string;
  jobTitle?: string;
  message?: string;
  consent?: string;
}

interface GoldBtnProps {
  children: React.ReactNode;
  full?: boolean;
  outline?: boolean;
  sm?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

interface PillProps {
  children: React.ReactNode;
}

interface GoldLabelProps {
  children: React.ReactNode;
}

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface ProductData {
  label: string;
  headline: string;
  desc: string;
  features: string[];
  ui: React.ReactNode;
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
    scale: "scale(0.92) translateY(20px)",
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
    }, 16);
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
  type = "button",
  disabled = false,
}: GoldBtnProps) {
  const base = `inline-flex items-center justify-center gap-2 rounded-xl font-black transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap ${sm ? "px-4 py-2 text-xs" : "px-6 py-3 text-sm"} ${full ? "w-full" : ""} ${disabled ? "opacity-50 cursor-not-allowed hover:scale-100" : ""}`;
  if (outline)
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={base}
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
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={base}
      style={{
        background: disabled
          ? "#999"
          : "linear-gradient(135deg,#c9940a,#f5d87a)",
        color: "#000",
        fontFamily: "'Georgia',serif",
        boxShadow: disabled ? "none" : "0 4px 20px rgba(201,148,10,0.38)",
        letterSpacing: "0.02em",
      }}
    >
      {children}
    </button>
  );
}

function Pill({ children }: PillProps) {
  return (
    <span
      className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
      style={{
        background: "rgba(201,148,10,0.09)",
        border: "1px solid rgba(201,148,10,0.38)",
        color: "#c9940a",
        fontFamily: "'Georgia',serif",
      }}
    >
      {children}
    </span>
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

/* ── Floating glass card ─────────────────────────────────────────── */
function GlassCard({ children, className = "", style = {} }: GlassCardProps) {
  return (
    <div
      className={`rounded-2xl p-4 ${className}`}
      style={{
        background: "#fff",
        boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
        border: "1px solid rgba(0,0,0,0.07)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── Feature numbered card ───────────────────────────────────────── */
function FeatureCard({ number, title, desc, delay = 0 }: FeatureCardProps) {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        className="relative p-6 rounded-2xl cursor-pointer h-full transition-all duration-400"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          background: hov ? "linear-gradient(135deg,#000,#1a1000)" : "#fff",
          border: hov
            ? "1px solid rgba(201,148,10,0.4)"
            : "1px solid rgba(0,0,0,0.08)",
          boxShadow: hov
            ? "0 20px 60px rgba(201,148,10,0.18)"
            : "0 2px 12px rgba(0,0,0,0.05)",
          transition: "all 0.4s cubic-bezier(.22,1,.36,1)",
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px rounded-t-2xl transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(90deg,transparent,#c9940a,transparent)",
            opacity: hov ? 1 : 0,
          }}
        />
        <div
          className="text-3xl font-black mb-3 transition-all duration-300"
          style={{
            fontFamily: "'Georgia',serif",
            background: "linear-gradient(135deg,#c9940a,#f5d87a)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {number}
        </div>
        <h3
          className="font-black text-base mb-2 transition-colors duration-300"
          style={{
            fontFamily: "'Georgia',serif",
            color: hov ? "#fff" : "#000",
          }}
        >
          {title}
        </h3>
        <p
          className="text-sm leading-relaxed transition-colors duration-300"
          style={{ color: hov ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)" }}
        >
          {desc}
        </p>
      </div>
    </Reveal>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 1 — HERO: STOP SCAMS AT CHECKOUT
═══════════════════════════════════════════════════════════════════ */
function HeroSection() {
  const [scanPct, setScanPct] = useState(0);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setScanPct((p) => {
        if (p >= 100) {
          setVerified(true);
          clearInterval(t);
          return 100;
        }
        return p + 2;
      });
    }, 40);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Layered bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 55% at 75% 35%, rgba(201,148,10,0.07) 0%, transparent 65%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 40% 40% at 5% 85%, rgba(0,0,0,0.03) 0%, transparent 60%)",
          }}
        />
      </div>
      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.025]">
        {[...Array(12)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full h-px"
            style={{
              top: `${i * 9}%`,
              background: "linear-gradient(90deg,transparent,#000,transparent)",
            }}
          />
        ))}
        {[...Array(16)].map((_, i) => (
          <div
            key={`v-${i}`}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT */}
          <div>
            <Reveal delay={0}>
              <Pill>Retail</Pill>
            </Reveal>
            <Reveal delay={0.08}>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-black mt-4 mb-5 leading-[1.04]"
                style={{
                  fontFamily: "'Georgia',serif",
                  letterSpacing: "-0.02em",
                }}
              >
                Stop scams at{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg,#c9940a,#f5d87a)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  checkout
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="text-black/55 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
                Our technology intelligence helps retailers identify, detect and
                stop increasingly sophisticated real-world and digital checkout
                scams before they damage your brand and your bottom line.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex flex-wrap gap-3">
                <GoldBtn>Find out more</GoldBtn>
                <GoldBtn outline>Watch demo →</GoldBtn>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — animated checkout mockup */}
          <Reveal delay={0.16} direction="left">
            <div
              className="relative"
              style={{ height: "clamp(420px,52vw,540px)" }}
            >
              {/* Main portrait placeholder */}
              <div
                className="absolute inset-0 rounded-3xl overflow-hidden"
                style={{
                  backgroundImage:
                    'url("https://i.pinimg.com/736x/18/a8/83/18a88374b6fd595f4b5ed69669b5c235.jpg")',
                  background: "linear-gradient(135deg,#1a1000,#3d2900,#7a5500)",
                  border: "1px solid rgba(201,148,10,0.2)",
                }}
              >
                <span
                  className="absolute inset-0 flex items-center justify-center text-yellow-600/25 text-xs font-bold uppercase tracking-widest"
                  style={{ fontFamily: "'Georgia',serif" }}
                >
                  Customer Portrait
                </span>
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom,transparent 30%,rgba(0,0,0,0.5) 100%)",
                  }}
                />
              </div>

              {/* Video call UI card */}

              {/* Scan progress card */}
              <GlassCard className="absolute bottom-6 left-5 w-52">
                <div
                  className="text-xs font-black text-black mb-2"
                  style={{ fontFamily: "'Georgia',serif" }}
                >
                  {verified ? "✓ Identity Confirmed" : "Scanning identity..."}
                </div>
                <div
                  className="h-1.5 rounded-full w-full mb-2"
                  style={{ background: "rgba(0,0,0,0.08)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${scanPct}%`,
                      background: `linear-gradient(90deg,#c9940a,${verified ? "#22c55e" : "#f5d87a"})`,
                    }}
                  />
                </div>
                {verified ? (
                  <p className="text-xs text-green-500 font-bold">
                    Face Biometric Match ✓
                  </p>
                ) : (
                  <p className="text-xs text-black/40">
                    Processing... {scanPct}%
                  </p>
                )}
              </GlassCard>

              {/* Pulse */}
              <div className="absolute top-8 left-8 w-4 h-4">
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
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 3 — REDUCE REFUND FRAUD
═══════════════════════════════════════════════════════════════════ */
function RefundFraudSection() {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 30% 50%, rgba(201,148,10,0.04) 0%, transparent 70%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT text */}
          <div>
            <Reveal delay={0}>
              <Pill>Refund Intelligence</Pill>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mt-4 mb-5 leading-tight"
                style={{ fontFamily: "'Georgia',serif" }}
              >
                Reduce refund fraud
              </h2>
              <p className="text-black/55 text-sm sm:text-base leading-relaxed mb-5 max-w-md">
                Retailers across the world face growing volumes of refund fraud.
                Understanding which customer identity is at the heart of a
                refund request means you can make confident, data-driven
                decisions, protecting your profits.
              </p>
              <p className="text-black/55 text-sm sm:text-base leading-relaxed mb-7 max-w-md">
                Falcon gives you the power to link returns to real identities
                and automatically flag suspicious patterns before they escalate.
              </p>
            </Reveal>
          </div>

          {/* RIGHT — animated UI mockup */}
          <Reveal delay={0.15} direction="left">
            <div
              className="relative"
              style={{ height: "clamp(340px,45vw,440px)" }}
            >
              {/* Portrait */}
              <div
                className="absolute inset-0 rounded-3xl overflow-hidden"
                style={{
                  background: "linear-gradient(135deg,#1a1000,#3d2800)",
                  border: "1px solid rgba(201,148,10,0.18)",
                }}
              >
                <span
                  className="absolute inset-0 flex items-center justify-center text-yellow-600/20 text-xs uppercase tracking-widest font-bold"
                  style={{ fontFamily: "'Georgia',serif" }}
                >
                  Customer Photo
                </span>
              </div>

              {/* Identity card overlay */}
              <GlassCard
                className="absolute bottom-5 left-4 w-52"
                style={{
                  animation: "floatCard 4.5s ease-in-out infinite alternate",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-black"
                    style={{
                      background: "linear-gradient(135deg,#c9940a,#f5d87a)",
                    }}
                  >
                    AK
                  </div>
                  <div>
                    <p
                      className="text-xs font-black text-black"
                      style={{ fontFamily: "'Georgia',serif" }}
                    >
                      Anna Klein
                    </p>
                    <p className="text-xs text-black/40">anna.k@email.com</p>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {[
                    { label: "Identity", status: "Verified", color: "#22c55e" },
                    { label: "Refund risk", status: "Low", color: "#22c55e" },
                    { label: "Returns", status: "2 / 90d", color: "#f59e0b" },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between"
                    >
                      <span className="text-xs text-black/50">{row.label}</span>
                      <span
                        className="text-xs font-bold"
                        style={{ color: row.color }}
                      >
                        {row.status}
                      </span>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Approved stamp */}
              <GlassCard
                className="absolute top-5 right-4 w-36"
                style={{
                  animation:
                    "floatCard 3.5s ease-in-out 0.5s infinite alternate",
                }}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">✅</div>
                  <div
                    className="text-xs font-black text-black"
                    style={{ fontFamily: "'Georgia',serif" }}
                  >
                    Refund Approved
                  </div>
                  <div className="text-xs text-green-500 font-bold">
                    Genuine Customer
                  </div>
                </div>
              </GlassCard>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 4 — CHECKOUT IDENTITY SECURITY
═══════════════════════════════════════════════════════════════════ */
function CheckoutIdentitySection() {
  return (
    <section
      className="py-16 sm:py-24 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg,#fafafa 0%,#fff8e6 50%,#fafafa 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT — animated network diagram */}
          <Reveal direction="right" className="order-2 lg:order-1">
            <div
              className="relative"
              style={{ height: "clamp(340px,45vw,440px)" }}
            >
              {/* Central node */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center z-20"
                style={{
                  background: "linear-gradient(135deg,#c9940a,#f5d87a)",
                  boxShadow: "0 0 40px rgba(201,148,10,0.5)",
                }}
              >
                <span className="text-2xl">👤</span>
              </div>
              {/* Pulse rings */}
              {[60, 100, 140].map((s) => (
                <div
                  key={`ring-${s}`}
                  className="absolute top-1/2 left-1/2 rounded-full pointer-events-none"
                  style={{
                    width: s * 2,
                    height: s * 2,
                    marginLeft: -s,
                    marginTop: -s,
                    border: "1px solid rgba(201,148,10,0.2)",
                    animation: `pulseRingLarge ${2 + s / 60}s ease-out infinite`,
                    animationDelay: `${s / 100}s`,
                  }}
                />
              ))}
              {/* Satellite nodes */}
              {[
                { icon: "🆔", label: "ID Check", angle: 0, dist: 130 },
                { icon: "🧠", label: "AI Score", angle: 72, dist: 130 },
                { icon: "📍", label: "Location", angle: 144, dist: 130 },
                { icon: "📱", label: "Device", angle: 216, dist: 130 },
                { icon: "💳", label: "Payment", angle: 288, dist: 130 },
              ].map((node) => {
                const rad = (node.angle * Math.PI) / 180;
                const cx = 50 + Math.cos(rad) * 36;
                const cy = 50 + Math.sin(rad) * 36;
                return (
                  <div
                    key={node.label}
                    className="absolute flex flex-col items-center gap-1"
                    style={{
                      left: `${cx}%`,
                      top: `${cy}%`,
                      transform: "translate(-50%,-50%)",
                      animation: `floatNode ${3 + node.angle / 100}s ease-in-out ${node.angle / 180}s infinite alternate`,
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                      style={{
                        background: "#fff",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                        border: "1px solid rgba(201,148,10,0.2)",
                      }}
                    >
                      {node.icon}
                    </div>
                    <span
                      className="text-xs font-bold text-black/50 whitespace-nowrap"
                      style={{ fontFamily: "'Georgia',serif" }}
                    >
                      {node.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </Reveal>

          {/* RIGHT text */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <Reveal>
              <Pill>Identity Security</Pill>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mt-4 mb-5 leading-tight"
                style={{ fontFamily: "'Georgia',serif" }}
              >
                Checkout identity security
              </h2>
              <p className="text-black/55 text-sm sm:text-base leading-relaxed mb-5 max-w-md mx-auto lg:mx-0">
                Fraudsters work around the clock to identify vulnerabilities in
                your checkout process. By connecting identity data, behavioural
                intelligence and device signals, Falcon gives you a real-time
                picture of every transaction.
              </p>
              <p className="text-black/55 text-sm leading-relaxed mb-7 max-w-md mx-auto lg:mx-0">
                Reduce chargebacks, stop account takeovers and protect genuine
                customers — all without adding unnecessary friction.
              </p>
              <div className="flex justify-center lg:justify-start"></div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 5 — RECONNECT WITH CUSTOMERS
═══════════════════════════════════════════════════════════════════ */
function ReconnectSection() {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT text */}
          <div>
            <Reveal>
              <Pill>Customer Reconnection</Pill>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mt-4 mb-5 leading-tight"
                style={{ fontFamily: "'Georgia',serif" }}
              >
                Reconnect with customers
              </h2>
              <p className="text-black/55 text-sm sm:text-base leading-relaxed mb-5 max-w-md">
                As customer data grows stale, it becomes harder to reach your
                most valuable audiences. Falcon helps you reconnect with dormant
                customers by verifying and enriching identity data, ensuring
                your communications land with the right people.
              </p>
              <p className="text-black/55 text-sm leading-relaxed mb-7 max-w-md">
                Maintain data hygiene, improve deliverability and ensure
                compliance with data privacy regulations at the same time.
              </p>
            </Reveal>
          </div>

          {/* RIGHT — network diagram */}
          <Reveal delay={0.15} direction="left">
            <div
              className="relative"
              style={{ height: "clamp(320px,42vw,420px)" }}
            >
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: "linear-gradient(135deg,#f8f8f8,#fff8e6)",
                  border: "1px solid rgba(201,148,10,0.12)",
                }}
              />

              {/* Center user */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center border-4"
                  style={{
                    background: "linear-gradient(135deg,#c9940a,#f5d87a)",
                    borderColor: "#fff",
                    boxShadow: "0 0 30px rgba(201,148,10,0.4)",
                  }}
                >
                  <span className="text-xl">👤</span>
                </div>
              </div>

              {/* Connected profiles */}
              {[
                { label: "Email ✓", x: "20%", y: "25%" },
                { label: "Mobile ✓", x: "72%", y: "22%" },
                { label: "Address ✓", x: "78%", y: "68%" },
                { label: "ID Match", x: "18%", y: "70%" },
              ].map((n) => (
                <div
                  key={n.label}
                  className="absolute flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{
                    left: n.x,
                    top: n.y,
                    background: "#fff",
                    border: "1px solid rgba(201,148,10,0.2)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: "#c9940a" }}
                  />
                  <span
                    className="text-xs font-bold text-black"
                    style={{ fontFamily: "'Georgia',serif" }}
                  >
                    {n.label}
                  </span>
                </div>
              ))}

              {/* Connection lines */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ opacity: 0.2 }}
              >
                {[
                  { x1: "50%", y1: "50%", x2: "23%", y2: "30%" },
                  { x1: "50%", y1: "50%", x2: "74%", y2: "27%" },
                  { x1: "50%", y1: "50%", x2: "80%", y2: "70%" },
                  { x1: "50%", y1: "50%", x2: "22%", y2: "73%" },
                ].map((l, i) => (
                  <line
                    key={`line-${i}`}
                    x1={l.x1}
                    y1={l.y1}
                    x2={l.x2}
                    y2={l.y2}
                    stroke="#c9940a"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                ))}
              </svg>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 6 — FEATURE CARDS ROW
═══════════════════════════════════════════════════════════════════ */
function FeatureCardsSection() {
  return (
    <section
      className="py-16 sm:py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg,#000 0%,#1a1000 50%,#3d2900 100%)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,148,10,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg,transparent,#c9940a 30%,#f5d87a 50%,#c9940a 70%,transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal className="text-center mb-12 sm:mb-16">
          <GoldLabel>Why Falcon</GoldLabel>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-2"
            style={{ fontFamily: "'Georgia',serif" }}
          >
            Built for retail at scale
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          <FeatureCard
            number="01"
            title="Reduce Refund Fraud"
            delay={0}
            desc="Accurately identify customers behind every refund request and automatically flag suspicious patterns before they damage your revenue."
          />
          <FeatureCard
            number="02"
            title="Lingerie Identity"
            delay={0.08}
            desc="Match customer identity across multiple touchpoints — online, in-store and returns — to build a single trusted view of every shopper."
          />
          <FeatureCard
            number="03"
            title="Comprehensive Identity Protection"
            delay={0.16}
            desc="Layer biometric verification, device intelligence and behavioural signals to deliver 360° protection at every stage of the customer journey."
          />
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
   SECTION 7 — CONNECT SAFELY PRODUCT TABS
═══════════════════════════════════════════════════════════════════ */
function ConnectSafelySection() {
  const [activeTab, setActiveTab] = useState<0 | 1>(0);

  const products: ProductData[] = [
    {
      label: "Falcon ",
      headline: "Launch identity verification in hours, not weeks.",
      desc: "Falcon  is the fastest way to get identity verification live for your retail business — no complex integration required. Ideal for growing businesses that need KYC quickly.",
      features: [
        "No-code setup in hours",
        "Pre-built compliance rules",
        "Plug-in to existing checkout",
        "Instant pass/fail decisions",
      ],
      ui: (
        <div className="p-4 space-y-3">
          <div
            className="text-xs font-black text-black mb-2"
            style={{ fontFamily: "'Georgia',serif" }}
          >
            Falcon Go Dashboard
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { v: "99.1%", l: "Pass Rate", c: "#22c55e" },
              { v: "0.2s", l: "Avg Decision", c: "#c9940a" },
              { v: "24/7", l: "Monitoring", c: "#3b82f6" },
              { v: "80+", l: "Countries", c: "#c9940a" },
            ].map((s) => (
              <div
                key={s.l}
                className="p-2.5 rounded-xl text-center"
                style={{
                  background: "rgba(201,148,10,0.06)",
                  border: "1px solid rgba(201,148,10,0.12)",
                }}
              >
                <div
                  className="text-base font-black"
                  style={{ color: s.c, fontFamily: "'Georgia',serif" }}
                >
                  {s.v}
                </div>
                <div className="text-xs text-black/40">{s.l}</div>
              </div>
            ))}
          </div>
          <div
            className="p-3 rounded-xl flex items-center gap-2"
            style={{
              background: "rgba(34,197,94,0.06)",
              border: "1px solid rgba(34,197,94,0.15)",
            }}
          >
            <span className="text-sm">✅</span>
            <span className="text-xs text-black/60">
              Customer verified in 0.18s
            </span>
          </div>
        </div>
      ),
    },
    {
      label: "Falcon Trust Network",
      headline:
        "Stop fraud with consortium intelligence across 20,000+ businesses.",
      desc: "Falcon Trust Network shares anonymised fraud signals across our global customer base, so you benefit from intelligence gathered across thousands of organisations.",
      features: [
        "Shared fraud signals",
        "Synthetic identity detection",
        "Cross-industry risk data",
        "Real-time pattern matching",
      ],
      ui: (
        <div className="p-4 space-y-3">
          <div
            className="text-xs font-black text-black mb-2"
            style={{ fontFamily: "'Georgia',serif" }}
          >
            Network Activity
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              {
                c: "rgba(34,197,94,0.08)",
                bc: "rgba(34,197,94,0.2)",
                t: "#16a34a",
                v: "2,847",
                l: "Trusted",
              },
              {
                c: "rgba(234,179,8,0.08)",
                bc: "rgba(234,179,8,0.2)",
                t: "#ca8a04",
                v: "193",
                l: "Review",
              },
              {
                c: "rgba(239,68,68,0.08)",
                bc: "rgba(239,68,68,0.2)",
                t: "#dc2626",
                v: "41",
                l: "Blocked",
              },
            ].map((s) => (
              <div
                key={s.l}
                className="p-2 rounded-lg text-center"
                style={{ background: s.c, border: `1px solid ${s.bc}` }}
              >
                <div
                  className="text-sm font-black"
                  style={{ color: s.t, fontFamily: "'Georgia',serif" }}
                >
                  {s.v}
                </div>
                <div className="text-xs text-black/50">{s.l}</div>
              </div>
            ))}
          </div>
          {[
            "Fraud signal match found",
            "Synthetic ID flagged",
            "Cross-network link",
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
              <span className="text-xs text-black/55">{s}</span>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-10 sm:mb-14">
          <GoldLabel>Product Suite</GoldLabel>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mt-2 mb-3"
            style={{ fontFamily: "'Georgia',serif" }}
          >
            Connect safely with every genuine identity
          </h2>
          <p className="text-black/45 text-sm max-w-lg mx-auto">
            The purpose-built platform for retail identity — preventing fraud
            and friction at the same time.
          </p>
        </Reveal>

        {/* Two product cards side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
          {products.map((product, i) => (
            <Reveal key={product.label} delay={i * 0.1}>
              <div
                className="rounded-2xl overflow-hidden h-full"
                style={{
                  border: "1px solid rgba(0,0,0,0.08)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                }}
              >
                {/* Header */}
                <div
                  className="p-5 sm:p-6"
                  style={{
                    background: "linear-gradient(135deg,#000,#1a1000)",
                    borderBottom: "1px solid rgba(201,148,10,0.2)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs text-black"
                      style={{
                        background: "linear-gradient(135deg,#c9940a,#f5d87a)",
                        fontFamily: "'Georgia',serif",
                      }}
                    >
                      F
                    </div>
                    <span
                      className="text-yellow-400 text-xs font-bold uppercase tracking-wider"
                      style={{ fontFamily: "'Georgia',serif" }}
                    >
                      {product.label}
                    </span>
                  </div>
                  <h3
                    className="text-white font-black text-base sm:text-lg mb-2 leading-snug"
                    style={{ fontFamily: "'Georgia',serif" }}
                  >
                    {product.headline}
                  </h3>
                  <p className="text-white/45 text-xs leading-relaxed">
                    {product.desc}
                  </p>
                </div>
                {/* UI mock */}
                <div style={{ background: "#fff" }}>{product.ui}</div>
                {/* Features */}
                <div
                  className="p-4 sm:p-5"
                  style={{
                    background: "#fafafa",
                    borderTop: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <ul className="space-y-2 mb-4">
                    {product.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-xs text-black/60"
                      >
                        <span
                          className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            background: "rgba(201,148,10,0.12)",
                            border: "1px solid rgba(201,148,10,0.25)",
                          }}
                        >
                          <svg
                            className="w-2 h-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="#c9940a"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
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
   SECTION 8 — CONTACT FORM (TYPESCRIPT)
═══════════════════════════════════════════════════════════════════ */
const COUNTRIES = [
  "United Kingdom",
  "United States",
  "Germany",
  "France",
  "Netherlands",
  "Singapore",
  "Australia",
  "Canada",
  "India",
  "Other",
];
const JOB_TITLES = [
  "C-Suite / Director",
  "VP / Head of",
  "Manager",
  "Technical Lead",
  "Analyst",
  "Other",
];

function validate(data: ContactFormData): FormErrors {
  const errs: FormErrors = {};
  if (!data.firstName.trim()) errs.firstName = "First name is required";
  if (!data.lastName.trim()) errs.lastName = "Last name is required";
  if (!data.email.trim()) errs.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errs.email = "Enter a valid email";
  if (!data.company.trim()) errs.company = "Company name is required";
  if (!data.country) errs.country = "Please select a country";
  if (!data.jobTitle) errs.jobTitle = "Please select a job title";
  if (!data.message.trim()) errs.message = "Please tell us about your needs";
  if (!data.consent) errs.consent = "You must accept to continue";
  return errs;
}

function ContactFormSection() {
  const [form, setForm] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    country: "",
    jobTitle: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<Set<string>>(new Set());

  const set = useCallback(
    (field: keyof ContactFormData, val: string | boolean) => {
      setForm((f) => ({ ...f, [field]: val }));
      setTouched((t) => new Set(t).add(field));
      // Live validation for touched field
      setErrors((e) => {
        const newForm = { ...form, [field]: val };
        const newErrs = validate(newForm as ContactFormData);
        return { ...e, [field]: newErrs[field as keyof FormErrors] };
      });
    },
    [form],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setTouched(new Set(Object.keys(form)));
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1400);
  };

  const inputStyle = (field: keyof ContactFormData): React.CSSProperties => ({
    border: `1.5px solid ${touched.has(field) && errors[field as keyof FormErrors] ? "#ef4444" : touched.has(field) && !errors[field as keyof FormErrors] ? "#22c55e" : "rgba(0,0,0,0.12)"}`,
    fontFamily: "'Georgia',serif",
    background: "#fafafa",
    borderRadius: "12px",
    padding: "12px 16px",
    fontSize: "14px",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s ease",
  });

  return (
    <section
      className="py-16 sm:py-24 relative overflow-hidden"
      style={{ background: "#f8f8f8" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(201,148,10,0.05) 0%, transparent 60%)",
        }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal className="text-center mb-10 sm:mb-14">
          <GoldLabel>Get In Touch</GoldLabel>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mt-2 mb-3"
            style={{ fontFamily: "'Georgia',serif" }}
          >
            Stop scams. Start a conversation.
          </h2>
          <p className="text-black/45 text-sm max-w-md mx-auto">
            Tell us about your checkout fraud challenges and we'll show you
            exactly how Falcon can help.
          </p>
        </Reveal>

        <Reveal delay={0.1} direction="scale">
          <div
            className="rounded-3xl overflow-hidden shadow-2xl"
            style={{ border: "1px solid rgba(201,148,10,0.15)" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* FORM */}
              <div className="lg:col-span-3 p-6 sm:p-10 bg-white">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mb-6 text-3xl"
                      style={{
                        background: "linear-gradient(135deg,#c9940a,#f5d87a)",
                        boxShadow: "0 0 40px rgba(201,148,10,0.5)",
                      }}
                    >
                      ✓
                    </div>
                    <h3
                      className="font-black text-black text-2xl mb-3"
                      style={{ fontFamily: "'Georgia',serif" }}
                    >
                      Message Sent!
                    </h3>
                    <p className="text-black/50 text-sm mb-2">
                      Thanks, {form.firstName}. Our team will be in touch within
                      24 hours.
                    </p>
                    <p className="text-black/35 text-xs mb-8">
                      We've sent a confirmation to {form.email}
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setForm({
                          firstName: "",
                          lastName: "",
                          email: "",
                          company: "",
                          phone: "",
                          country: "",
                          jobTitle: "",
                          message: "",
                          consent: false,
                        });
                        setErrors({});
                        setTouched(new Set());
                      }}
                      className="text-xs font-bold text-yellow-600 hover:text-yellow-500 transition-colors"
                      style={{ fontFamily: "'Georgia',serif" }}
                    >
                      Send another message →
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    {/* Name row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      {(["firstName", "lastName"] as const).map((field) => (
                        <div key={field}>
                          <label
                            className="block text-xs font-bold text-black/50 mb-1.5 uppercase tracking-wider"
                            style={{ fontFamily: "'Georgia',serif" }}
                          >
                            {field === "firstName" ? "First Name" : "Last Name"}{" "}
                            <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            value={form[field]}
                            onChange={(e) => set(field, e.target.value)}
                            placeholder={
                              field === "firstName" ? "James" : "Harlow"
                            }
                            style={inputStyle(field)}
                            onFocus={(e) => {
                              e.target.style.borderColor = "#c9940a";
                              e.target.style.background = "#fff";
                            }}
                            onBlur={(e) => {
                              e.target.style.background = "#fafafa";
                              if (!errors[field])
                                e.target.style.borderColor = "rgba(0,0,0,0.12)";
                            }}
                          />
                          {touched.has(field) && errors[field] && (
                            <p
                              className="text-xs text-red-400 mt-1"
                              style={{ fontFamily: "'Georgia',serif" }}
                            >
                              {errors[field]}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                      <label
                        className="block text-xs font-bold text-black/50 mb-1.5 uppercase tracking-wider"
                        style={{ fontFamily: "'Georgia',serif" }}
                      >
                        Work Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        placeholder="james@company.com"
                        style={inputStyle("email")}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#c9940a";
                          e.target.style.background = "#fff";
                        }}
                        onBlur={(e) => {
                          e.target.style.background = "#fafafa";
                        }}
                      />
                      {touched.has("email") && errors.email && (
                        <p className="text-xs text-red-400 mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Company + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label
                          className="block text-xs font-bold text-black/50 mb-1.5 uppercase tracking-wider"
                          style={{ fontFamily: "'Georgia',serif" }}
                        >
                          Company <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={form.company}
                          onChange={(e) => set("company", e.target.value)}
                          placeholder="Acme Retail Ltd"
                          style={inputStyle("company")}
                          onFocus={(e) => {
                            e.target.style.borderColor = "#c9940a";
                            e.target.style.background = "#fff";
                          }}
                          onBlur={(e) => {
                            e.target.style.background = "#fafafa";
                          }}
                        />
                        {touched.has("company") && errors.company && (
                          <p className="text-xs text-red-400 mt-1">
                            {errors.company}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          className="block text-xs font-bold text-black/50 mb-1.5 uppercase tracking-wider"
                          style={{ fontFamily: "'Georgia',serif" }}
                        >
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => set("phone", e.target.value)}
                          placeholder="+44 7700 900000"
                          style={inputStyle("phone")}
                          onFocus={(e) => {
                            e.target.style.borderColor = "#c9940a";
                            e.target.style.background = "#fff";
                          }}
                          onBlur={(e) => {
                            e.target.style.background = "#fafafa";
                          }}
                        />
                      </div>
                    </div>

                    {/* Country + Job Title */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      {[
                        {
                          field: "country" as const,
                          label: "Country",
                          options: COUNTRIES,
                        },
                        {
                          field: "jobTitle" as const,
                          label: "Job Title",
                          options: JOB_TITLES,
                        },
                      ].map(({ field, label, options }) => (
                        <div key={field}>
                          <label
                            className="block text-xs font-bold text-black/50 mb-1.5 uppercase tracking-wider"
                            style={{ fontFamily: "'Georgia',serif" }}
                          >
                            {label} <span className="text-red-400">*</span>
                          </label>
                          <select
                            value={form[field]}
                            onChange={(e) => set(field, e.target.value)}
                            style={{ ...inputStyle(field), appearance: "none" }}
                          >
                            <option value="">Select {label}</option>
                            {options.map((o) => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            ))}
                          </select>
                          {touched.has(field) && errors[field] && (
                            <p className="text-xs text-red-400 mt-1">
                              {errors[field]}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Message */}
                    <div className="mb-5">
                      <label
                        className="block text-xs font-bold text-black/50 mb-1.5 uppercase tracking-wider"
                        style={{ fontFamily: "'Georgia',serif" }}
                      >
                        How can we help? <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        value={form.message}
                        onChange={(e) => set("message", e.target.value)}
                        rows={4}
                        placeholder="Tell us about your checkout fraud challenges, current volumes and what you're looking to solve..."
                        style={{ ...inputStyle("message"), resize: "none" }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#c9940a";
                          e.target.style.background = "#fff";
                        }}
                        onBlur={(e) => {
                          e.target.style.background = "#fafafa";
                        }}
                      />
                      {touched.has("message") && errors.message && (
                        <p className="text-xs text-red-400 mt-1">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Consent */}
                    <div className="mb-6">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative flex-shrink-0 mt-0.5">
                          <input
                            type="checkbox"
                            checked={form.consent}
                            onChange={(e) => set("consent", e.target.checked)}
                            className="sr-only"
                          />
                          <div
                            className="w-5 h-5 rounded flex items-center justify-center transition-all duration-200"
                            style={{
                              border: `1.5px solid ${form.consent ? "#c9940a" : touched.has("consent") && errors.consent ? "#ef4444" : "rgba(0,0,0,0.2)"}`,
                              background: form.consent
                                ? "linear-gradient(135deg,#c9940a,#f5d87a)"
                                : "#fff",
                            }}
                          >
                            {form.consent && (
                              <svg
                                className="w-3 h-3 text-black"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
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
                        </div>
                        <span
                          className="text-xs text-black/50 leading-relaxed"
                          style={{ fontFamily: "'Georgia',serif" }}
                        >
                          I agree to Falcon's{" "}
                          <span className="text-yellow-600 underline cursor-pointer">
                            Privacy Policy
                          </span>{" "}
                          and consent to being contacted about Falcon's products
                          and services.
                        </span>
                      </label>
                      {touched.has("consent") && errors.consent && (
                        <p className="text-xs text-red-400 mt-1 ml-8">
                          {errors.consent}
                        </p>
                      )}
                    </div>

                    <GoldBtn type="submit" full disabled={loading}>
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4 animate-spin"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        "Send message →"
                      )}
                    </GoldBtn>
                  </form>
                )}
              </div>

              {/* RIGHT INFO PANEL */}
              <div
                className="lg:col-span-2 p-6 sm:p-10 flex flex-col gap-8"
                style={{
                  background: "linear-gradient(160deg,#000,#1a1000,#3d2900)",
                  borderLeft: "1px solid rgba(201,148,10,0.15)",
                }}
              >
                <div>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-black mb-5"
                    style={{
                      background: "linear-gradient(135deg,#c9940a,#f5d87a)",
                      fontFamily: "'Georgia',serif",
                    }}
                  >
                    F
                  </div>
                  <h3
                    className="font-black text-white text-lg mb-4"
                    style={{ fontFamily: "'Georgia',serif" }}
                  >
                    What happens next
                  </h3>
                  <ul className="space-y-5">
                    {[
                      {
                        icon: "📬",
                        t: "Confirmation",
                        d: "You'll receive an email confirming receipt of your message within minutes.",
                      },
                      {
                        icon: "📞",
                        t: "Expert call",
                        d: "A specialist will reach out within one business day to understand your needs.",
                      },
                      {
                        icon: "🎯",
                        t: "Tailored demo",
                        d: "We'll prepare a personalised demo focused on your specific fraud challenges.",
                      },
                      {
                        icon: "🚀",
                        t: "Fast onboarding",
                        d: "Most retail customers go live within 2–4 weeks of signing.",
                      },
                    ].map((item) => (
                      <li key={item.t} className="flex gap-3">
                        <span className="text-xl flex-shrink-0">
                          {item.icon}
                        </span>
                        <div>
                          <p
                            className="text-white font-bold text-sm"
                            style={{ fontFamily: "'Georgia',serif" }}
                          >
                            {item.t}
                          </p>
                          <p className="text-white/40 text-xs mt-0.5 leading-relaxed">
                            {item.d}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  {[
                    { v: "20k+", l: "Clients" },
                    { v: "80+", l: "Countries" },
                    { v: "99%", l: "Accuracy" },
                    { v: "24/7", l: "Support" },
                  ].map((s) => (
                    <div
                      key={s.l}
                      className="p-3 rounded-xl text-center"
                      style={{
                        background: "rgba(201,148,10,0.08)",
                        border: "1px solid rgba(201,148,10,0.2)",
                      }}
                    >
                      <div
                        className="font-black text-lg"
                        style={{
                          fontFamily: "'Georgia',serif",
                          background: "linear-gradient(135deg,#c9940a,#f5d87a)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {s.v}
                      </div>
                      <div className="text-white/45 text-xs">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════════════ */
export default function RetailPage() {
  return (
    <main
      className="bg-white overflow-x-hidden w-full"
      style={{ fontFamily: "'Georgia',serif" }}
    >
      <style>{`
        @keyframes floatCard { from{transform:translateY(0)} to{transform:translateY(-10px)} }
        @keyframes pulseRing { 0%{transform:scale(1);opacity:.7} 100%{transform:scale(2.6);opacity:0} }
        @keyframes pulseRingLarge { 0%{opacity:.3;transform:scale(1)} 100%{opacity:0;transform:scale(1.4)} }
        @keyframes floatNode { from{transform:translate(-50%,-50%) translateY(0)} to{transform:translate(-50%,-50%) translateY(-8px)} }
        @keyframes shimmerSlide { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes floatOrb { from{transform:translate(0,0) scale(1)} to{transform:translate(18px,-26px) scale(1.1)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>

      <HeroSection />

      <RefundFraudSection />
      <CheckoutIdentitySection />
      <ReconnectSection />
      <FeatureCardsSection />
      <ConnectSafelySection />
      <ContactFormSection />
    </main>
  );
}
