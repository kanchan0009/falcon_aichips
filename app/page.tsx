"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ── Types ─────────────────────────────────────────── */
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

interface FeatureCardProps {
  icon: string;
  title: string;
  desc: string;
  linkLabel?: string;
  onClick?: () => void;
}

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  sub: string;
}

/* ── Scroll-reveal hook ─────────────────────────────────────────── */
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);

    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible] as const;
}

/* ── Animated counter ───────────────────────────────────────────── */
function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useReveal(0.3);

  useEffect(() => {
    if (!visible) return;

    let start = 0;
    const step = Math.ceil(end / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [visible, end]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ── Reveal wrapper ─────────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: RevealProps) {
  const [ref, visible] = useReveal();

  const transforms = {
    up: "translateY(32px)",
    down: "translateY(-32px)",
    left: "translateX(32px)",
    right: "translateX(-32px)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : transforms[direction],
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Golden CTA button ──────────────────────────────────────────── */
function GoldBtn({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
      style={{
        background: "linear-gradient(135deg,#c9940a,#f5d87a)",
        color: "#000",
        fontFamily: "'Georgia',serif",
        boxShadow: "0 4px 20px rgba(201,148,10,0.35)",
      }}
    >
      {children}
    </button>
  );
}

/* ── Outline button ─────────────────────────────────────────────── */
function OutlineBtn({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 hover:bg-yellow-500/10 whitespace-nowrap"
      style={{
        border: "1.5px solid #c9940a",
        color: "#c9940a",
        fontFamily: "'Georgia',serif",
      }}
    >
      {children}
    </button>
  );
}

/* ── Section label pill ─────────────────────────────────────────── */
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3"
      style={{
        background: "rgba(201,148,10,0.1)",
        border: "1px solid rgba(201,148,10,0.35)",
        color: "#c9940a",
        fontFamily: "'Georgia',serif",
      }}
    >
      {children}
    </span>
  );
}

/* ── Image placeholder ──────────────────────────────────────────── */
function ImgBox({
  className = "",

  style = {},
}: {
  className?: string;
  label?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`rounded-2xl flex items-center justify-center overflow-hidden ${className}`}
      style={{
        background:
          "linear-gradient(135deg,#1a1000 0%,#3a2800 60%,#6b4800 100%)",
        border: "1px solid rgba(201,148,10,0.25)",
        minHeight: "80px",
        ...style,
      }}
    ></div>
  );
}

/* ── Feature card ───────────────────────────────────────────────── */
function FeatureCard({
  icon,
  title,
  desc,
  linkLabel = "Learn more",
  onClick,
}: FeatureCardProps) {
  return (
    <div
      className="group p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer h-full"
      style={{
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.07)",
      }}
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h4
        className="font-black text-black text-base mb-2 group-hover:text-yellow-700 transition-colors"
        style={{ fontFamily: "'Georgia',serif" }}
      >
        {title}
      </h4>
      <p className="text-black/50 text-sm leading-relaxed mb-4">{desc}</p>
      <button
        onClick={onClick}
        className="text-xs font-bold transition-colors hover:text-yellow-700 flex items-center gap-1"
        style={{ color: "#c9940a" }}
      >
        {linkLabel} →
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const valueProps = [
    {
      icon: "🛡️",
      title: "Verify identity",
      desc: "Confirm customers are who they claim to be with multi-layered document and biometric checks.",
      linkHref: "/products/identity-verification",
    },
    {
      icon: "📊",
      title: "Assess risk",
      desc: "Understand and manage risk across your customer base with continuous, AI-driven signals.",
      linkHref: "/products/document-verification",
    },
    {
      icon: "🔒",
      title: "Protect against fraud",
      desc: "Detect and block synthetic, stolen and fraudulent identities before they cause damage.",
      linkHref: "/products/fraud-detection",
    },
  ];

  const verifyFeatures = [
    {
      icon: "📄",
      title: "Data verification",
      desc: "Verify customer identity data against authoritative global sources in real time, with minimal friction.",
      linkHref: "/products/document-verification",
    },
    {
      icon: "🤳",
      title: "Biometric verification",
      desc: "Confirm customers are genuinely present using advanced facial biometric and liveness checks.",
      linkHref: "/products/identity-verification",
    },
    {
      icon: "🆔",
      title: "Identity scores",
      desc: "Combine signals into a single confidence score to assess identity reliability at every touchpoint.",
      linkHref: "/products/identity-verification",
    },
  ];

  const riskFeatures = [
    {
      icon: "👤",
      title: "Know your customer",
      desc: "Comprehensive KYC checks drawn from hundreds of global data sources, delivered in milliseconds.",
      linkHref: "/products/kyc",
    },
    {
      icon: "🏢",
      title: "Know your business",
      desc: "Verify corporate entities, UBOs and business relationships to meet AML and compliance obligations.",
      linkHref: "/products/kyb",
    },
    {
      icon: "🧠",
      title: "Risk intelligence",
      desc: "Continuously evaluate behavioural and transactional risk with adaptive AI models.",
      linkHref: "/products/document-verification",
    },
  ];

  const fraudFeatures = [
    {
      icon: "🌐",
      title: "Cross-industry network",
      desc: "Leverage consortium fraud signals from thousands of businesses to identify bad actors instantly.",
    },
    {
      icon: "👥",
      title: "Synthetic identities",
      desc: "Detect fabricated identities built from real and stolen data using advanced pattern recognition.",
    },
    {
      icon: "🔍",
      title: "Investigate identities",
      desc: "Dig deeper into suspect profiles with a rich investigation workspace and global data connections.",
    },
  ];

  const stats: StatItem[] = [
    {
      value: 60,
      suffix: "+",
      label: "Data sources",
      sub: "Authoritative global data",
    },
    {
      value: 4,
      suffix: "B+",
      label: "Identity records",
      sub: "Continuously updated",
    },
    { value: 80, suffix: "", label: "Countries", sub: "Full coverage" },
    {
      value: 750,
      suffix: "+",
      label: "Data suppliers",
      sub: "Trusted network",
    },
  ];

  const testimonials = [
    {
      quote:
        "Partnering with Falcon allows us to offer a suite of solutions combining multi-layered protection against payment fraud.",
      name: "Sarah Chen",
      role: "Chief Risk Officer",
      company: "NeoBank Pro",
    },
    {
      quote:
        "When we launched on Falcon's identity data platform, our pass-rate improved from 68% to 91% — exceptional results.",
      name: "James Harlow",
      role: "VP Product",
      company: "TradeFi Global",
    },
  ];

  const mapDots = [
    { top: "20%", left: "20%", label: "UK" },
    { top: "35%", left: "45%", label: "EU" },
    { top: "40%", right: "20%", label: "APAC" },
    { top: "62%", left: "22%", label: "Americas" },
  ];

  return (
    <main
      className="bg-white overflow-x-hidden w-full"
      style={{ fontFamily: "'Georgia',serif" }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
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
    `,
        }}
      />
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 65% 40%, rgba(201,148,10,0.07) 0%, transparent 70%)",
          }}
        />
        <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none hidden lg:block overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={`hero-ring-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${180 + i * 80}px`,
                height: `${180 + i * 80}px`,
                border: "1px solid rgba(201,148,10,0.06)",
                top: "50%",
                right: "-80px",
                transform: "translateY(-50%)",
              }}
            />
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <Reveal delay={0}>
                <Pill>AI-Powered Identity</Pill>
              </Reveal>
              <Reveal delay={0.1}>
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-black leading-[1.05] mb-5 mt-1"
                  style={{
                    fontFamily: "'Georgia',serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Complete
                  <br />
                  <span
                    style={{
                      background:
                        "linear-gradient(135deg,#c9940a,#f5d87a,#c9940a)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    customer
                  </span>
                  <br />
                  intelligence
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-black/55 text-base sm:text-lg leading-relaxed mb-7 max-w-md mx-auto lg:mx-0">
                  Identity intelligence for fast and rewarding customer
                  onboarding — every without compromise.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  <Link href="/demo">
                    <GoldBtn>Get a demo </GoldBtn>
                  </Link>
                  
                  
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.15} direction="left">
              <div
                className="grid grid-cols-3 grid-rows-3 gap-2 sm:gap-3"
                style={{ height: "clamp(350px,60vw,600px)" }}
              >
                <ImgBox
                  className="col-span-3 row-span-2"
                  style={{
                    backgroundImage:
                      "url('https://innefu.com/wp-content/uploads/2025/11/AI-Driven-Fraud-Detection.webp')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                <ImgBox
                  className="col-span-2 row-span-1"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                <ImgBox
                  className="col-span-1 row-span-1"
                  style={{
                    backgroundImage:
                      "url('https://career-advice.jobs.ac.uk/wp-content/uploads/New-colleagues.jpg.optimal.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PARTNER LOGOS ─────────────────────────────────────────── */}
      <Reveal className="mt-16 text-center">
        <p className="text-black/60 text-xm uppercase tracking-widest mb-6">
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

      {/* ── 3 VALUE PROPS ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {valueProps.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <FeatureCard
                  {...item}
                  linkLabel="Learn more"
                  onClick={() => {
                    // Use Next.js router or window.location for navigation
                    if (typeof window !== "undefined") {
                      window.location.href = item.linkHref;
                    }
                  }}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONNECT SECTION ───────────────────────────────────────── */}
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
              "radial-gradient(ellipse 60% 50% at 70% 50%, rgba(201,148,10,0.1) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <Reveal>
                <Pill>Product Spotlight</Pill>
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-2 mb-5 leading-tight"
                  style={{ fontFamily: "'Georgia',serif" }}
                >
                  Connect with every{" "}
                  <span
                    style={{
                      background: "linear-gradient(90deg,#c9940a,#f5d87a)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    genuine customer
                  </span>
                </h2>
                <p className="text-white/55 leading-relaxed mb-7 max-w-md mx-auto lg:mx-0">
                  Falcon Identify lets you offer fast, personal and compliant
                  customer journeys you — and your customers — can trust.
                </p>
                <div className="flex justify-center lg:justify-start">
                  <a href="/see_action">
                    <GoldBtn>See it in action</GoldBtn>
                  </a>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.2} direction="left">
              <div className="relative mt-6 lg:mt-0">
                <ImgBox
                  className="w-full"
                  style={{
                    height: "clamp(250px,45vw,400px)",
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    border: "none",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                    style={{
                      background: "linear-gradient(135deg,#c9940a,#f5d87a)",
                      boxShadow: "0 0 30px rgba(201,148,10,0.5)",
                    }}
                  >
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 ml-1 text-black"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── VERIFY CUSTOMERS ──────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center lg:text-left">
            <Reveal>
              <Pill>Identity Verification</Pill>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mt-2 mb-4 max-w-2xl mx-auto lg:mx-0 leading-tight"
                style={{ fontFamily: "'Georgia',serif" }}
              >
                Verify genuine customers, securing every step of the journey
              </h2>
              <div className="flex justify-center lg:justify-start mt-5 mb-10 sm:mb-14">
                <GoldBtn>Start now</GoldBtn>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden mb-12 sm:mb-16"
              style={{
                height: "clamp(200px,45vw,440px)",
                background: "linear-gradient(135deg,#0d0800,#3d2900)",
                border: "1px solid rgba(201,148,10,0.2)",
              }}
            >
              <ImgBox
                className="w-full h-full"
                style={{
                  backgroundImage:
                    "url('https://i.pinimg.com/1200x/18/30/8d/18308d46ce6699445930cef594ae5845.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  border: "none",
                  borderRadius: "0",
                }}
              />
              <div
                className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 rounded-xl p-3 sm:p-4 w-40 sm:w-52"
                style={{
                  background: "rgba(255,255,255,0.96)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                }}
              >
                <div className="text-xs text-black/50 mb-1">
                  Document verification
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-sm font-bold text-black">
                    Verified ✓
                  </span>
                </div>
                <div
                  className="mt-2 h-1 rounded-full w-full"
                  style={{
                    background: "linear-gradient(90deg,#c9940a,#f5d87a)",
                  }}
                />
              </div>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mt-16 sm:mt-20">
            {verifyFeatures.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <FeatureCard
                  {...item}
                  linkLabel="Explore"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.location.href = item.linkHref;
                    }
                  }}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── RISK ANALYSIS ─────────────────────────────────────────── */}
      <section
        className="py-16 sm:py-24 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg,#fafafa 0%,#fff8e6 50%,#fafafa 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Image — below text on mobile */}
            <Reveal direction="right" className="order-2 lg:order-1">
              <div className="relative mt-8 lg:mt-0 pb-6">
                <div
                  className="grid grid-cols-2 gap-3"
                  style={{ height: "clamp(220px,45vw,380px)" }}
                >
                  <ImgBox
                    className="row-span-2 h-full"
                    label="Customer Portrait"
                    style={{
                      backgroundImage:
                        "url('https://i.pinimg.com/736x/3c/63/1b/3c631b97815217aaa9716d368feb990a.jpg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />

                  <ImgBox
                    label="Risk Card"
                    style={{
                      backgroundImage:
                        "url('https://spd.tech/wp-content/uploads/2023/01/Credit-Card-Fraud-Detection-Using-Machine-Learning.webp')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />

                  <ImgBox
                    label="Score Graph"
                    style={{
                      backgroundImage:
                        "url('https://i.pinimg.com/1200x/1c/61/80/1c61808688674a3ddf1af4fa58e90978.jpg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </div>
                <div
                  className="absolute -bottom-2 right-0 sm:-right-2 rounded-2xl p-3 sm:p-4 w-40 sm:w-52"
                  style={{
                    background: "#000",
                    border: "1px solid rgba(201,148,10,0.4)",
                    boxShadow: "0 16px 48px rgba(0,0,0,0.3)",
                  }}
                >
                  <div className="text-xs text-yellow-400/70 mb-1 uppercase tracking-wider">
                    Risk Score
                  </div>
                  <div
                    className="text-xl sm:text-2xl font-black text-white"
                    style={{ fontFamily: "'Georgia',serif" }}
                  >
                    24 / Low
                  </div>
                  <div
                    className="mt-2 h-1.5 rounded-full w-full"
                    style={{ background: "rgba(255,255,255,0.1)" }}
                  >
                    <div
                      className="h-full rounded-full w-1/4"
                      style={{
                        background: "linear-gradient(90deg,#c9940a,#f5d87a)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </Reveal>
            {/* Text first on mobile */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <Reveal>
                <Pill>Risk Intelligence</Pill>
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mt-2 mb-5 leading-tight"
                  style={{ fontFamily: "'Georgia',serif" }}
                >
                  Complete customer compliance and conversion with accurate risk
                  analysis
                </h2>
                <p className="text-black/55 leading-relaxed mb-7 max-w-md mx-auto lg:mx-0">
                  Apply precise risk intelligence to every customer decision,
                  staying compliant and protecting revenue at the same time.
                </p>
                <div className="flex justify-center lg:justify-start">
                  <GoldBtn>Start now</GoldBtn>
                </div>
              </Reveal>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mt-16 sm:mt-20">
            {riskFeatures.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <FeatureCard
                  {...item}
                  linkLabel="Explore"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.location.href = item.linkHref;
                    }
                  }}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FRAUD ─────────────────────────────────────────────────── */}
      <section
        className="py-16 sm:py-24 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg,#000 0%,#1a1000 60%,#3d2900 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 30% 50%, rgba(201,148,10,0.08) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <Reveal>
                <Pill>Fraud Prevention</Pill>
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-2 mb-5 leading-tight"
                  style={{ fontFamily: "'Georgia',serif" }}
                >
                  Interrogate identities for fraud signals and block crime at
                  first contact
                </h2>
                <p className="text-white/55 leading-relaxed mb-7 max-w-md mx-auto lg:mx-0">
                  Combine network intelligence, synthetic identity detection and
                  investigative tools to stop fraud before it starts.
                </p>
                <div className="flex justify-center lg:justify-start">
                  <GoldBtn>Start now</GoldBtn>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.2} direction="left">
              <div
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden mt-6 lg:mt-0"
                style={{
                  height: "clamp(200px,40vw,300px)",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(201,148,10,0.2)",
                }}
              >
                <ImgBox
                  className="w-full h-full"
                  label="Fraud Detection UI"
                  style={{
                    border: "none",
                    borderRadius: "0",
                    backgroundImage:
                      "url('https://i.pinimg.com/1200x/02/ff/2a/02ff2a71c530737fea86161984443304.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </div>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 mt-12 sm:mt-16">
            {fraudFeatures.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <div
                  className="p-5 sm:p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl h-full"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(201,148,10,0.15)",
                  }}
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h4
                    className="font-bold text-white text-base mb-2"
                    style={{ fontFamily: "'Georgia',serif" }}
                  >
                    {item.title}
                  </h4>
                  <p className="text-white/45 text-sm leading-relaxed mb-3">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── GLOBAL COVERAGE ───────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <Reveal>
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mb-4 leading-tight"
                  style={{ fontFamily: "'Georgia',serif" }}
                >
                  Global coverage
                </h2>
                <p className="text-black/55 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                  Make the right customer decisions and complete onboarding
                  around the world with Falcon's unmatched data reach.
                </p>
                <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto sm:max-w-sm lg:max-w-none lg:mx-0">
                  {stats.map((stat) => (
                    <Reveal key={stat.label}>
                      <div
                        className="p-4 sm:p-5 rounded-2xl"
                        style={{
                          background: "#fafafa",
                          border: "1px solid rgba(0,0,0,0.06)",
                        }}
                      >
                        <div
                          className="text-2xl sm:text-3xl font-black mb-1"
                          style={{
                            fontFamily: "'Georgia',serif",
                            background:
                              "linear-gradient(135deg,#c9940a,#f5d87a)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          <Counter end={stat.value} suffix={stat.suffix} />
                        </div>
                        <div className="font-bold text-black text-sm">
                          {stat.label}
                        </div>
                        <div className="text-xs text-black/40 mt-0.5">
                          {stat.sub}
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.2} direction="left">
              <div className="relative mt-6 lg:mt-0">
                <ImgBox
                  className="w-full"
                  label="World Map Coverage"
                  style={{
                    height: "clamp(220px,45vw,320px)",
                    border: "1px solid rgba(201,148,10,0.2)",
                    background: `
                      linear-gradient(
                        135deg,
                        rgba(0,0,0,0.9) 0%, 
                        rgba(201,148,10,0.8) 50%, 
                        rgba(245,216,122,0.7) 100%
                    ),
                    url('https://i.pinimg.com/1200x/73/de/b9/73deb96f4648afd8c08dce3ec9ab1872.jpg')
                  `,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                {mapDots.map((dot) => (
                  <div
                    key={dot.label}
                    className="absolute flex items-center gap-1"
                    style={{
                      top: dot.top,
                      left: dot.left,
                      right: dot.right,
                    }}
                  >
                    <div
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full animate-pulse"
                      style={{
                        background: "#c9940a",
                        boxShadow: "0 0 8px rgba(201,148,10,0.8)",
                      }}
                    />
                    <span className="text-yellow-300 text-xs font-bold">
                      {dot.label}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ──────────────────────────────────────────── */}
      <section
        className="py-16 sm:py-24 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg,#000 0%,#1a1000 40%,#3d2900 80%,#7a5500 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2 leading-tight text-center"
              style={{ fontFamily: "'Georgia',serif" }}
            >
              20,000+ businesses
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg,#c9940a,#f5d87a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                partner with us
              </span>
            </h2>
            <div className="flex justify-center mt-5 mb-12 sm:mb-16">
              <GoldBtn>Get a demo today</GoldBtn>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.15}>
                <div
                  className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl h-full"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(201,148,10,0.2)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div
                    className="text-4xl sm:text-5xl text-yellow-600/30 leading-none mb-3"
                    style={{ fontFamily: "'Georgia',serif" }}
                  >
                    &ldquo;
                  </div>
                  <p className="text-white/80 leading-relaxed mb-5 italic text-sm sm:text-base">
                    {t.quote}
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-black font-bold text-sm flex-shrink-0"
                      style={{
                        background: "linear-gradient(135deg,#c9940a,#f5d87a)",
                      }}
                    >
                      {t.name[0]}
                    </div>
                    <div>
                      <div
                        className="font-bold text-white text-sm"
                        style={{ fontFamily: "'Georgia',serif" }}
                      >
                        {t.name}
                      </div>
                      <div className="text-white/40 text-xs">
                        {t.role}, {t.company}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,148,10,0.07) 0%, transparent 70%)",
          }}
        />
        <div className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none overflow-hidden hidden sm:block">
          <div
            className="absolute top-1/2 right-[-80px] -translate-y-1/2 w-64 h-64 rounded-full"
            style={{ border: "2px solid rgba(201,148,10,0.12)" }}
          />
          <div
            className="absolute top-1/2 right-[-40px] -translate-y-1/2 w-40 h-40 rounded-full"
            style={{ background: "rgba(201,148,10,0.05)" }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <Reveal>
                <Pill>Get Started</Pill>
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mt-2 mb-5 leading-tight"
                  style={{ fontFamily: "'Georgia',serif" }}
                >
                  Complete customer
                  <br />
                  <span
                    style={{
                      background: "linear-gradient(135deg,#c9940a,#f5d87a)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    intelligence
                  </span>
                </h2>
                <p className="text-black/55 leading-relaxed mb-7 max-w-md mx-auto lg:mx-0">
                  Connect safely with every genuine identity — at global scale,
                  in real time.
                </p>
                <div className="flex justify-center lg:justify-start">
                  <GoldBtn>Get a demo</GoldBtn>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.2} direction="left">
              <ImgBox
                className="w-full mt-6 lg:mt-0"
                label="CTA Visual"
                style={{
                  height: "clamp(180px,40vw,260px)",
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?auto=format&fit=crop&w=800&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
