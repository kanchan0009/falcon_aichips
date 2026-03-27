"use client";

import React, { useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════════════════ */
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

interface StoryCardProps {
  title: string;
  excerpt: string;
  logo: string;
  delay?: number;
}

interface StatBubbleProps {
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
}

interface ServiceCardProps {
  icon: string;
  title: string;
  desc: string;
  year: string;
  delay?: number;
}

interface FloatingOrbProps {
  size: string;
  top: string;
  left: string;
  delay: number;
  opacity?: number;
}

interface ServiceItem {
  icon: string;
  title: string;
  year: string;
  points: string[];
  desc: string;
}

/* ═══════════════════════════════════════════════════════════════════
   HOOKS & UTILITIES
═══════════════════════════════════════════════════════════════════ */
function useReveal(threshold = 0.1) {
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
      { threshold }
    );
    obs.observe(el);
    
    return () => obs.disconnect();
  }, [threshold]);
  
  return [ref, visible] as const;
}

function Reveal({ children, delay = 0, direction = "up", className = "" }: RevealProps) {
  const [ref, visible] = useReveal();
  
  const map = {
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
        transform: visible ? "none" : map[direction],
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function useCounter(end: number, active: boolean) {
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
      } else {
        setVal(n);
      }
    }, 18);
    
    return () => clearInterval(t);
  }, [active, end]);
  
  return val;
}

/* ═══════════════════════════════════════════════════════════════════
   SHARED UI ATOMS
═══════════════════════════════════════════════════════════════════ */
function GoldBtn({ children, sm = false }: { children: React.ReactNode; sm?: boolean }) {
  return (
    <button
      className={`inline-flex items-center gap-2 rounded-xl font-bold transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap ${
        sm ? "px-4 py-2 text-xs" : "px-6 py-3 text-sm"
      }`}
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

function Pill({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
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
}: {
  className?: string;
  label?: string;
  style?: React.CSSProperties;
  overlay?: boolean;
}) {
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
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)" }}
        />
      )}
      <span
        className="text-yellow-600/40 text-xs font-bold tracking-widest uppercase px-2 text-center relative z-10"
        style={{ fontFamily: "'Georgia',serif" }}
      >
        {label}
      </span>
    </div>
  );
}

/* ── Story card ─────────────────────────────────────────────────── */
function StoryCard({ title, excerpt, logo, delay = 0 }: StoryCardProps) {
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
        className="group p-6 rounded-2xl h-full cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)" }}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h3
              className="font-black text-black text-base mb-1 group-hover:text-yellow-700 transition-colors"
              style={{ fontFamily: "'Georgia',serif" }}
            >
              {title}
            </h3>
            <p className="text-xs text-black/50 leading-relaxed line-clamp-3">{excerpt}</p>
          </div>
          <div
            className="flex-shrink-0 w-16 h-10 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(201,148,10,0.06)", border: "1px solid rgba(201,148,10,0.15)" }}
          >
            <span
              className="text-xs font-black text-yellow-700 tracking-wider uppercase"
              style={{ fontFamily: "'Georgia',serif" }}
            >
              {logo}
            </span>
          </div>
        </div>
        <span
          className="inline-flex items-center gap-1 text-xs font-bold text-yellow-600 group-hover:text-yellow-500 transition-colors"
          style={{ fontFamily: "'Georgia',serif" }}
        >
          Read story
          <svg
            className="w-3 h-3 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </div>
  );
}

/* ── Stat bubble ─────────────────────────────────────────────────── */
function StatBubble({ value, suffix = "", label, delay = 0 }: StatBubbleProps) {
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
        className="p-5 sm:p-6 rounded-2xl text-center"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(201,148,10,0.2)",
          backdropFilter: "blur(8px)",
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
          {count}
          {suffix}
        </div>
        <div className="text-white/60 text-xs uppercase tracking-widest">{label}</div>
      </div>
    </div>
  );
}

/* ── Service card ────────────────────────────────────────────────── */
function ServiceCard({ icon, title, desc, year, delay = 0 }: ServiceCardProps) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <Reveal delay={delay}>
      <div
        className="relative p-6 sm:p-7 rounded-2xl cursor-pointer overflow-hidden transition-all duration-400"
        style={{
          background: hovered ? "linear-gradient(135deg,#000,#1a1000)" : "#fff",
          border: hovered ? "1px solid rgba(201,148,10,0.5)" : "1px solid rgba(0,0,0,0.08)",
          boxShadow: hovered ? "0 20px 60px rgba(201,148,10,0.2)" : "0 2px 12px rgba(0,0,0,0.05)",
          transition: "all 0.4s cubic-bezier(.22,1,.36,1)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Shimmer top border on hover */}
        <div
          className="absolute top-0 left-0 right-0 h-px transition-opacity duration-300"
          style={{
            background: "linear-gradient(90deg,transparent,#c9940a,transparent)",
            opacity: hovered ? 1 : 0,
          }}
        />

        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 transition-all duration-300"
          style={{ background: hovered ? "rgba(201,148,10,0.15)" : "rgba(201,148,10,0.08)" }}
        >
          {icon}
        </div>
        <h3
          className="font-black text-base mb-2 transition-colors duration-300"
          style={{ fontFamily: "'Georgia',serif", color: hovered ? "#fff" : "#000" }}
        >
          {title}
        </h3>
        <p
          className="text-sm leading-relaxed mb-5 transition-colors duration-300"
          style={{ color: hovered ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)" }}
        >
          {desc}
        </p>
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold"
          style={{
            background: "linear-gradient(135deg,#c9940a,#f5d87a)",
            color: "#000",
            fontFamily: "'Georgia',serif",
          }}
        >
          {year}
        </div>
      </div>
    </Reveal>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE DATA
═══════════════════════════════════════════════════════════════════ */
const BRANDS = ["Barclays", "Santander", "Metro", "Lottoland", "betway", "Nike", "IBM", "Visa"];

const STORIES = [
  { title: "myPOS", excerpt: "myPOS leads KYC bottlenecks, boosting customer match rates by 35 percentage points in top markets and enabling customer onboarding across 30+ countries.", logo: "POS" },
  { title: "Premier League Club", excerpt: "Discover how a Premier League club enhanced matchday safety, reduced risk of reputational damage, and ran a proactive stance on fan integrity with identity verification.", logo: "PLC" },
  { title: "Weatherbys", excerpt: "Animal passions were raising the pace. Hear from Andy Rutherford, their Senior Money Laundering Reporting Officer (MLRO), on how the bank modernised onboarding with GBG Detect.", logo: "WBY" },
  { title: "MrQ", excerpt: "MrQ leverages GBG to instantly deceased customers, prevent fraud and maintain compliance with responsible gaming standards through data-driven verification.", logo: "MrQ" },
  { title: "Lothian Pension Fund", excerpt: "Lothian Pension Fund focuses its provisions with our investigation solution to maintain security and compliance.", logo: "LPF" },
  { title: "Suprnation", excerpt: "Suprnation was designed to achieve even higher player pass rates in its top specialism and offer a 10% boost on our tests over that period in.", logo: "SN" },
  { title: "CoinJar", excerpt: "CoinJar accelerates customer onboarding, ensuring data verification in seconds and an 80% first-time pass rate across all digital assets.", logo: "CJ" },
  { title: "Creditsafe", excerpt: "Creditsafe has partnered with us for over a decade, supporting its onboarding with our leading identity and fraud solutions. The partnership helps reach ever more genuine customers.", logo: "CS" },
  { title: "Atlantic Lottery", excerpt: "With GBG data verification, Atlantic Lottery's pass rate for iCasino players increased from 68% to 87%, a 19% increase in players overall.", logo: "AL" },
  { title: "Anthony Nolan", excerpt: "Anthony Nolan lowered donor reach and environmental impact by enhancing data accuracy across its register, helping supporters through a unique GBG approach.", logo: "AN" },
  { title: "KTC", excerpt: "Scaling seamless onboarding to deliver customer due diligence with GBG Instinct application fraud solutions at scale globally.", logo: "KTC" },
  { title: "Currencies Direct", excerpt: "Currencies Direct previously required employees to manually send documents. Now the time required signals with GBG Mobile Intelligence.", logo: "CD" },
  { title: "St James's Place", excerpt: "St James's Place partners with GBG to deliver customer due diligence with simpler, faster, data-driven onboarding decisions resulting in a 9% increase in its new customer pass rate.", logo: "SJP" },
  { title: "Heart of the South West Trading Standards", excerpt: "The Heart of the South West Trading Standards Service relies on GBG Investigate to track down rogue traders, stop criminal gangs and protect consumers.", logo: "TS" },
  { title: "The Royal Borough of Greenwich", excerpt: "The Royal Borough of Greenwich fights back against fraud with GBG Investigate to maintain compliance.", logo: "RBG" },
  { title: "Racing Stars", excerpt: "Racing Stars partnered with us to build a state-of-the-art onboarding process for scalable and affordable online gaming experiences.", logo: "RS" },
  { title: "Oxford City Council", excerpt: "GBG Investigate helps Oxford City Council save millions of pounds' worth of fraud by leveraging global data sources.", logo: "OCC" },
  { title: "Kiris Group", excerpt: "Central intelligence: GBG Investigate authenticates audiences, supports complex investigations and fraud cases instantly.", logo: "KG" },
  { title: "NSUS Group (GGPoker)", excerpt: "NSUS Group (GGPoker) partners with GBG to increase genuine gaming player pass rate by 35% to scale exponentially.", logo: "NSU" },
  { title: "Estatesearch", excerpt: "Estatesearch trusts GBG Investigate as its top tracing tool for estate and probate searches worldwide.", logo: "ES" },
  { title: "The Phone Casino", excerpt: "The Phone Casino's deposit pass rate increased to a consistent 91% in the UK, achieving a 3% increase in deposits and reduction in KYC costs.", logo: "TPC" },
  { title: "Cyber Defence Alliance", excerpt: "GBG Investigate helps Cyber Defence Alliance arrest multi-billion-pound online frauds quickly and efficiently.", logo: "CDA" },
  { title: "Tipalti", excerpt: "Tipalti provides an end-to-end accounts payable software to automate the entire supplier payments operation, making global mass B2B payments effortless.", logo: "TIP" },
  { title: "Blackstage Forensics", excerpt: "Blackstage Forensics specialises in online investigations for clients spanning government agencies, law enforcement, the military, the film and music industry — supported by GBG.", logo: "BF" },
];

const SERVICES = [
  { icon: "🔐", title: "Identity Verification", desc: "Confirm customers are genuine with multi-source, global identity checks at onboarding and beyond.", year: "Core Product" },
  { icon: "📊", title: "Risk Assessment", desc: "Deliver confident risk decisions by drawing on hundreds of authoritative data sources worldwide.", year: "AI Powered" },
  { icon: "🛡️", title: "Fraud Prevention", desc: "Stop fraud and financial crime at first contact using consortium intelligence and network signals.", year: "Real-Time" },
  { icon: "🌐", title: "Global Compliance", desc: "Meet KYC, AML and data privacy obligations in 80+ countries with Falcon's compliance engine.", year: "80+ Countries" },
];

/* ═══════════════════════════════════════════════════════════════════
   ANIMATED HERO BACKGROUND
═══════════════════════════════════════════════════════════════════ */
function FloatingOrb({ size, top, left, delay, opacity = 0.12 }: FloatingOrbProps) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        top,
        left,
        background: "radial-gradient(circle, rgba(201,148,10,0.35) 0%, transparent 70%)",
        opacity,
        animation: `floatOrb ${6 + delay}s ease-in-out ${delay}s infinite alternate`,
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE EXPORT
═══════════════════════════════════════════════════════════════════ */
export default function CustomersPage(): React.ReactElement {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Finance", "Gaming", "Government", "Retail"];

  return (
    <main className="bg-white overflow-x-hidden w-full" style={{ fontFamily: "'Georgia',serif" }}>

      {/* ── GLOBAL KEYFRAMES ──────────────────────────────────────── */}
      <style>{`
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
        @keyframes counterUp {
          from { opacity:0; transform:translateY(12px); }
          to { opacity:1; transform:translateY(0); }
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
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
      `}</style>

      {/* ════════════════════════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[85vh] sm:min-h-screen flex items-center overflow-hidden"
        style={{ background: "linear-gradient(135deg,#000 0%,#0d0800 30%,#1a1000 55%,#3d2900 80%,#7a5500 100%)" }}
      >

        {/* Floating orbs */}
        <FloatingOrb size="400px" top="-100px" left="-100px" delay={0} />
        <FloatingOrb size="300px" top="60%" left="70%" delay={2} opacity={0.1} />
        <FloatingOrb size="200px" top="20%" left="60%" delay={1} opacity={0.08} />

        {/* Geometric grid lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-full"
              style={{ left: `${12.5 * i}%`, background: "linear-gradient(180deg,transparent,#c9940a,transparent)" }}
            />
          ))}
        </div>

        {/* Rotating ring deco – desktop only */}
        <div
          className="absolute right-[-80px] top-1/2 -translate-y-1/2 w-96 h-96 rounded-full hidden lg:block pointer-events-none"
          style={{ border: "1px solid rgba(201,148,10,0.12)", animation: "rotateSlow 40s linear infinite" }}
        >
          <div
            className="absolute top-4 left-1/2 w-3 h-3 rounded-full -translate-x-1/2"
            style={{ background: "#c9940a", boxShadow: "0 0 12px rgba(201,148,10,0.8)" }}
          />
        </div>
        <div
          className="absolute right-[40px] top-1/2 -translate-y-1/2 w-64 h-64 rounded-full hidden lg:block pointer-events-none"
          style={{ border: "1px solid rgba(201,148,10,0.08)", animation: "rotateSlow 28s linear infinite reverse" }}
        />

        {/* Shimmer top border */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg,transparent,#c9940a 30%,#f5d87a 50%,#c9940a 70%,transparent)" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* LEFT TEXT */}
            <div>
              <div className="hero-animate">
                <Pill>Customer Stories</Pill>
              </div>
              <h1
                className="hero-animate-2 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.04] mt-4 mb-6"
                style={{ fontFamily: "'Georgia',serif" }}
              >
                <span className="text-white">Building trust.</span><br />
                <span className="shimmer-text">Growing business.</span>
              </h1>
              <p className="hero-animate-3 text-white/55 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
                Learn how businesses use Falcon to grow with confidence around the world — verifying identities, fighting fraud, and staying compliant.
              </p>
              <div className="hero-animate-4 flex flex-wrap gap-3">
                <GoldBtn>Explore stories</GoldBtn>
                <button
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white/70 hover:text-white transition-colors border border-white/10 hover:border-white/30"
                  style={{ fontFamily: "'Georgia',serif" }}
                >
                  Get a demo →
                </button>
              </div>

              {/* Stat row */}
              <div className="hero-animate-4 grid grid-cols-3 gap-3 mt-10">
                {[
                  { v: 20000, s: "+", l: "Businesses" },
                  { v: 80, s: "+", l: "Countries" },
                  { v: 99, s: "%", l: "Accuracy" },
                ].map((st) => (
                  <StatBubble key={st.l} value={st.v} suffix={st.s} label={st.l} delay={0.7} />
                ))}
              </div>
            </div>

            {/* RIGHT IMAGE MOSAIC */}
            <div className="hero-animate-3 relative hidden sm:block">
              <div className="grid grid-cols-2 gap-3 sm:gap-4" style={{ height: "clamp(320px,45vw,480px)" }}>
                <ImgBox className="row-span-2 h-full" label="Business Leaders" overlay style={{ borderRadius: "24px" }} />
                <ImgBox label="Identity Check" style={{ height: "48%" }} />
                <ImgBox label="Dashboard View" style={{ height: "48%" }} />
              </div>
              {/* Floating badge */}
              <div
                className="absolute -bottom-4 -left-4 sm:-left-6 rounded-2xl px-4 py-3"
                style={{ background: "linear-gradient(135deg,#c9940a,#f5d87a)", boxShadow: "0 12px 40px rgba(201,148,10,0.5)" }}
              >
                <div className="text-xs font-bold text-black/60 uppercase tracking-wider">Complete Projects</div>
                <div className="text-xl font-black text-black" style={{ fontFamily: "'Georgia',serif" }}>1,283k+</div>
              </div>
              {/* Pulse ring */}
              <div className="absolute top-8 right-8 w-4 h-4">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ background: "#c9940a", animation: "pulseRing 2s ease-out infinite" }}
                />
                <div className="w-4 h-4 rounded-full" style={{ background: "#c9940a" }} />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          SUCCESS METRICS BAND
      ════════════════════════════════════════════════════════════ */}
      <section
        className="py-16 sm:py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#000 0%,#1a1000 50%,#3d2900 100%)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,148,10,0.08) 0%, transparent 70%)" }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal className="text-center mb-10">
            <p className="text-yellow-500 text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "'Georgia',serif" }}>— Our Company Status —</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white" style={{ fontFamily: "'Georgia',serif" }}>
              The Success of our Solutions
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.title} {...s} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SOLUTION SYSTEM DESIGN — SPLIT SECTION
      ════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl"
            style={{ border: "1px solid rgba(0,0,0,0.07)" }}
          >

            {/* Left image */}
            <Reveal direction="right">
              <ImgBox
                className="w-full"
                label="Business Team at Work"
                style={{ height: "clamp(280px,45vw,480px)", borderRadius: "0" }}
              />
            </Reveal>

            {/* Right dark panel */}
            <Reveal delay={0.15} direction="left">
              <div
                className="relative p-8 sm:p-12 flex flex-col justify-center h-full"
                style={{
                  background: "linear-gradient(135deg,#0d0800,#1a1000,#3d2900)",
                  minHeight: "clamp(280px,45vw,480px)",
                }}
              >
                {/* Deco circle */}
                <div
                  className="absolute right-8 bottom-8 w-32 h-32 rounded-full opacity-20 pointer-events-none"
                  style={{ background: "radial-gradient(circle,#c9940a,transparent)" }}
                />

                <Pill>Solution System Design</Pill>
                <h3
                  className="text-2xl sm:text-3xl font-black text-white mt-4 mb-4 leading-tight"
                  style={{ fontFamily: "'Georgia',serif" }}
                >
                  Every team has a culture and set of actions that have either been created or evolved naturally over time.
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-8">
                  Falcon's identity platform integrates into your existing workflows, giving you confident customer decisions at every touchpoint — without the friction.
                </p>
                {/* Avatar row */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex -space-x-2">
                    {["A", "B", "C", "D"].map((letter, i) => (
                      <div
                        key={letter}
                        className="w-8 h-8 rounded-full border-2 border-yellow-700 flex items-center justify-center text-xs font-bold text-black"
                        style={{
                          background: "linear-gradient(135deg,#c9940a,#f5d87a)",
                          zIndex: 4 - i,
                        }}
                      >
                        {letter}
                      </div>
                    ))}
                  </div>
                  <span className="text-white/60 text-xs">More →</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/40 text-xs italic">29,000 customers with our services.</span>
                  <GoldBtn sm>Let&apos;s Started</GoldBtn>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          FILTER TABS + CUSTOMER STORIES GRID
      ════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24" style={{ background: "#f8f8f8" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-10 sm:mb-14">
            <Pill>Case Studies</Pill>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mt-3 mb-4" style={{ fontFamily: "'Georgia',serif" }}>
              Real stories. Real results.
            </h2>
            <p className="text-black/50 max-w-xl mx-auto text-sm sm:text-base">
              See how organisations of every size use Falcon to onboard confidently, fight fraud and stay compliant.
            </p>
          </Reveal>

          {/* Filter tabs */}
          <Reveal className="flex flex-wrap justify-center gap-2 mb-10">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-2 rounded-full text-sm font-bold transition-all duration-200"
                style={{
                  background: activeTab === tab ? "linear-gradient(135deg,#c9940a,#f5d87a)" : "#fff",
                  color: activeTab === tab ? "#000" : "rgba(0,0,0,0.5)",
                  border: activeTab === tab ? "1px solid transparent" : "1px solid rgba(0,0,0,0.1)",
                  fontFamily: "'Georgia',serif",
                  boxShadow: activeTab === tab ? "0 4px 16px rgba(201,148,10,0.3)" : "none",
                  transform: activeTab === tab ? "scale(1.04)" : "scale(1)",
                }}
              >
                {tab}
              </button>
            ))}
          </Reveal>

          {/* Stories grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-5">
            {STORIES.map((story, i) => (
              <StoryCard key={story.title} {...story} delay={(i % 4) * 0.08} />
            ))}
          </div>

          {/* Load more */}
          <Reveal className="text-center mt-12">
            <button
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-105"
              style={{
                border: "1.5px solid #c9940a",
                color: "#c9940a",
                fontFamily: "'Georgia',serif",
                background: "transparent",
              }}
            >
              Load more stories →
            </button>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          KINDS OF SERVICES
      ════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12 sm:mb-16">
            <p className="text-yellow-600 text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "'Georgia',serif" }}>— Our Best Service —</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black" style={{ fontFamily: "'Georgia',serif" }}>
              We Power Every Kind of Business
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {[
              {
                icon: "📈", title: "Business of Growth", year: "015",
                points: ["Rapid KYC onboarding at scale", "Real-time identity decisioning"],
                desc: "We business standard chunk of Ipsum used since is Agency & Startup.",
              },
              {
                icon: "🔗", title: "Solution to Business", year: "022",
                points: ["Fraud prevention at first contact", "Multi-layered compliance checks"],
                desc: "We business standard chunk of Ipsum used since is Agency & Startup.",
              },
              {
                icon: "🎯", title: "Marketing of Solution", year: "037",
                points: ["Deep customer intelligence", "Conversion-optimised flows"],
                desc: "We business standard chunk of Ipsum used since is Agency & Startup.",
              },
            ].map((svc: ServiceItem, i) => (
              <Reveal key={svc.title} delay={i * 0.12}>
                <div
                  className="group relative p-7 rounded-3xl transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl"
                  style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)" }}
                >

                  {/* Diamond icon bg */}
                  <div className="relative w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <div
                      className="absolute inset-0 rotate-45 rounded-xl"
                      style={{
                        background: "linear-gradient(135deg,rgba(201,148,10,0.08),rgba(201,148,10,0.2))",
                        border: "1px solid rgba(201,148,10,0.2)",
                      }}
                    />
                    <span className="text-2xl relative z-10">{svc.icon}</span>
                  </div>

                  <p className="text-xs text-black/40 text-center mb-2">{svc.desc}</p>
                  <h3
                    className="font-black text-black text-center text-base mb-2 group-hover:text-yellow-700 transition-colors"
                    style={{ fontFamily: "'Georgia',serif" }}
                  >
                    {svc.title}
                  </h3>

                  <ul className="space-y-1.5 mb-5">
                    {svc.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-xs text-black/50">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#c9940a" }} />
                        {p}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-black/20" style={{ fontFamily: "'Georgia',serif" }}>{svc.year}</span>
                    <span
                      className="text-xs font-bold text-yellow-600 cursor-pointer hover:text-yellow-500 transition-colors"
                      style={{ fontFamily: "'Georgia',serif" }}
                    >
                      Read More ⟫
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          CTA BANNER
      ════════════════════════════════════════════════════════════ */}
      <section
        className="py-16 sm:py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#000 0%,#0d0800 30%,#3d2900 70%,#7a5500 100%)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,148,10,0.1) 0%, transparent 70%)" }}
        />
        {/* Shimmer border top */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg,transparent,#c9940a 30%,#f5d87a 50%,#c9940a 70%,transparent)" }}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <Reveal>
            <Pill>Join 20,000+ Businesses</Pill>
            <h2
              className="text-3xl sm:text-4xl lg:text-6xl font-black text-white mt-4 mb-5 leading-tight"
              style={{ fontFamily: "'Georgia',serif" }}
            >
              Ready to build trust?<br />
              <span className="shimmer-text">Start growing.</span>
            </h2>
            <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto">
              Join thousands of businesses using Falcon to verify identities, fight fraud and grow with confidence around the world.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <GoldBtn>Get a demo</GoldBtn>
              <button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white border border-white/15 hover:border-white/30 transition-colors"
                style={{ fontFamily: "'Georgia',serif" }}
              >
                Read case studies →
              </button>
            </div>
          </Reveal>
        </div>
      </section>

    </main>
  );
}