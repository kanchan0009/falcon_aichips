"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

/* ═══════════════════════════════════════════════════════════════════
   TYPES & INTERFACES
═══════════════════════════════════════════════════════════════════ */
interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  className?: string;
}

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  variant?: "light" | "dark";
}

/* ═══════════════════════════════════════════════════════════════════
   ANIMATION HOOKS
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
  const map: Record<string, string> = {
    up: "translateY(36px)",
    down: "translateY(-36px)",
    left: "translateX(40px)",
    right: "translateX(-40px)",
    scale: "scale(0.92)",
  };

  return (
    <div 
      ref={ref} 
      className={className} 
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : map[direction] || map.up,
        transition: `opacity 0.7s ease ${delay}s, transform 0.75s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   UI COMPONENTS (GOLD/BLACK THEME)
═══════════════════════════════════════════════════════════════════ */
function GoldBtn({ children, full = false, sm = false, onClick }: { 
  children: ReactNode; 
  full?: boolean; 
  sm?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-black transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap ${full ? "w-full" : ""} ${sm ? "px-4 py-2 text-xs" : "px-6 py-3 text-sm"}`}
      style={{ 
        background: "linear-gradient(135deg,#c9940a,#f5d87a)", 
        color: "#000", 
        fontFamily: "'Georgia',serif", 
        boxShadow: "0 4px 24px rgba(201,148,10,0.4)", 
        letterSpacing: "0.02em" 
      }}
    >
      {children}
    </button>
  );
}

function GoldLabel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest mb-2"
      style={{ color: "#c9940a", fontFamily: "'Georgia',serif" }}>
      <span className="inline-block w-6 h-px" style={{ background: "#c9940a" }} />
      {children}
      <span className="inline-block w-6 h-px" style={{ background: "#c9940a" }} />
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 1 — HERO
═══════════════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative pt-20 pb-28 overflow-hidden"
      style={{ background: "linear-gradient(160deg,#000 0%,#0d0800 30%,#1a1000 60%,#3d2900 100%)" }}>
      
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle,rgba(201,148,10,0.4) 0%,transparent 70%)" }} />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle,rgba(201,148,10,0.3) 0%,transparent 70%)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left content */}
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ background: "rgba(201,148,10,0.15)", border: "1px solid rgba(201,148,10,0.3)" }}>
              <span className="w-2 h-2 rounded-full" style={{ background: "#c9940a" }} />
              <span className="text-xs font-bold" style={{ color: "#f5d87a", fontFamily: "'Georgia',serif" }}>
                Identity Verification Platform
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight"
              style={{ fontFamily: "'Georgia',serif" }}>
              Optimise customer onboarding with{" "}
              <span style={{ 
                background: "linear-gradient(90deg,#c9940a,#f5d87a)", 
                WebkitBackgroundClip: "text", 
                WebkitTextFillColor: "transparent" 
              }}>
                confidence
              </span>
            </h1>
            
            <p className="text-white/60 text-lg mb-8 max-w-lg leading-relaxed">
              The identity intelligence platform that helps you verify customers, 
              detect fraud, and make accurate onboarding decisions in seconds.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <GoldBtn>Get a live demo</GoldBtn>
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white border border-white/20 hover:border-white/40 transition-colors"
                style={{ fontFamily: "'Georgia',serif" }}>
                View pricing →
              </button>
            </div>
            
            {/* Trust badges */}
            <div className="mt-10 flex items-center gap-6 opacity-40">
              {["VISA", "Mastercard", "Stripe", "HSBC"].map((brand) => (
                <span key={brand} className="text-white font-black text-sm tracking-widest"
                  style={{ fontFamily: "'Georgia',serif" }}>
                  {brand}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Right - Dashboard Mockup */}
          <Reveal delay={0.2} direction="left">
            <div className="relative">
              {/* Main dashboard card */}
              <div className="rounded-2xl overflow-hidden shadow-2xl"
                style={{ 
                  background: "linear-gradient(135deg,#fff,#fafafa)",
                  border: "1px solid rgba(201,148,10,0.2)"
                }}>
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm"
                      style={{ background: "linear-gradient(135deg,#c9940a,#f5d87a)", color: "#000" }}>
                      F
                    </div>
                    <span className="font-bold text-gray-800" style={{ fontFamily: "'Georgia',serif" }}>
                      Falcon Dashboard
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                </div>
                
                {/* Dashboard content */}
                <div className="p-6 space-y-4">
                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: "Verified", value: "2,847", color: "#c9940a" },
                      { label: "Pending", value: "156", color: "#f5d87a" },
                      { label: "Flagged", value: "23", color: "#7a5500" },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center p-3 rounded-xl"
                        style={{ background: "rgba(201,148,10,0.05)" }}>
                        <p className="text-2xl font-black" style={{ color: stat.color, fontFamily: "'Georgia',serif" }}>
                          {stat.value}
                        </p>
                        <p className="text-xs text-gray-500">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Chart placeholder */}
                  <div className="h-32 rounded-xl flex items-end justify-between px-4 pb-4 gap-2"
                    style={{ background: "linear-gradient(180deg,rgba(201,148,10,0.05),rgba(201,148,10,0.1))" }}>
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75].map((h, i) => (
                      <div key={i} className="w-full rounded-t-sm transition-all duration-500"
                        style={{ 
                          height: `${h}%`, 
                          background: "linear-gradient(180deg,#c9940a,#f5d87a)"
                        }} />
                    ))}
                  </div>
                  
                  {/* Recent activity */}
                  <div className="space-y-2">
                    {["ID Verified - John Smith", "Document uploaded - Sarah Chen", "Face match confirmed - Mike Johnson"].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg"
                        style={{ background: "rgba(201,148,10,0.03)" }}>
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                          style={{ background: "rgba(201,148,10,0.2)", color: "#c9940a" }}>
                          ✓
                        </div>
                        <span className="text-sm text-gray-700">{item}</span>
                        <span className="ml-auto text-xs text-gray-400">Just now</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 px-4 py-2 rounded-xl shadow-lg"
                style={{ background: "linear-gradient(135deg,#c9940a,#f5d87a)" }}>
                <p className="text-xs font-black text-black" style={{ fontFamily: "'Georgia',serif" }}>
                  340% ROI
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 2 — KNOW YOUR CUSTOMER (Feature Grid)
═══════════════════════════════════════════════════════════════════ */
function KnowYourCustomerSection() {
  const features = [
    {
      icon: "🔍",
      title: "Competitor analysis",
      description: "Compare your verification metrics against industry benchmarks and competitors to identify optimization opportunities.",
      preview: [
        { label: "Your pass rate", value: "94%", good: true },
        { label: "Industry avg", value: "78%", good: false },
      ]
    },
    {
      icon: "👤",
      title: "Granular customer screening",
      description: "Deep-dive into individual customer profiles with comprehensive identity data and risk indicators.",
      preview: [
        { label: "Name", value: "Sarah Chen" },
        { label: "Risk Score", value: "Low", good: true },
        { label: "Status", value: "Verified" },
      ]
    },
    {
      icon: "🛡️",
      title: "Advanced document verification",
      description: "AI-powered document analysis detects tampering, forgeries, and expired IDs in real-time.",
      preview: ["ID Card", "Passport", "Driver License", "Utility Bill"]
    },
    {
      icon: "📊",
      title: "Real-time monitoring",
      description: "Continuous surveillance of customer accounts with instant alerts for suspicious activity.",
      preview: "Chart"
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201,148,10,0.05) 0%, transparent 70%)" }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal className="text-center mb-16">
          <GoldLabel>Platform Features</GoldLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mt-3 mb-4"
            style={{ fontFamily: "'Georgia',serif" }}>
            Know your customer better
          </h2>
          <p className="text-black/50 max-w-2xl mx-auto">
            Comprehensive tools to verify, monitor, and understand your customers at every touchpoint.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 0.1}>
              <div className="group rounded-2xl p-6 transition-all duration-300 hover:shadow-xl"
                style={{ 
                  background: "#fff",
                  border: "1px solid rgba(201,148,10,0.15)",
                }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg,rgba(201,148,10,0.1),rgba(201,148,10,0.05))" }}>
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-black text-lg mb-2 text-black" style={{ fontFamily: "'Georgia',serif" }}>
                      {feature.title}
                    </h3>
                    <p className="text-sm text-black/50 mb-4">{feature.description}</p>
                    
                    {/* Mini preview */}
                    <div className="rounded-xl p-3" style={{ background: "rgba(201,148,10,0.03)" }}>
                      {Array.isArray(feature.preview) && feature.preview[0]? (
                        <div className="space-y-2">
                          {feature.preview.map((item: any, idx: number) => (
                            <div key={idx} className="flex justify-between text-xs">
                              <span className="text-gray-500">{item.label}</span>
                              <span className="font-bold" style={{ color: item.good ? "#c9940a" : "#666" }}>
                                {item.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : feature.preview === "Chart" ? (
                        <div className="h-16 flex items-end gap-1">
                          {[30, 50, 40, 70, 60, 80, 75].map((h, idx) => (
                            <div key={idx} className="flex-1 rounded-t"
                              style={{ height: `${h}%`, background: "rgba(201,148,10,0.3)" }} />
                          ))}
                        </div>
                      ) : (
                        <div className="flex gap-2 flex-wrap">
                          
                        </div>
                      )}
                    </div>
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
   SECTION 3 — IDENTITY INTELLIGENCE
═══════════════════════════════════════════════════════════════════ */
function IdentityIntelligenceSection() {
  const capabilities = [
    { icon: "⚡", title: "Real-time verification", desc: "Sub-second identity verification with 99.9% uptime" },
    { icon: "🎯", title: "Precision matching", desc: "Advanced algorithms reduce false positives by 85%" },
    { icon: "🔒", title: "Fraud prevention", desc: "Detect synthetic identities and document tampering" },
  ];

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg,#f7f7f7 0%,#fff 50%,#fafafa 100%)" }}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left - Content */}
          <Reveal>
            <GoldLabel>Identity Intelligence</GoldLabel>
            <h2 className="text-3xl sm:text-4xl font-black text-black mb-6" style={{ fontFamily: "'Georgia',serif" }}>
              Identity intelligence for fast and accurate onboarding decisions
            </h2>
            <p className="text-black/50 mb-8 leading-relaxed">
              Our AI-powered platform analyzes hundreds of data points to deliver instant, 
              accurate identity verification decisions that you can trust.
            </p>
            
            <div className="space-y-4">
              {capabilities.map((cap, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl"
                  style={{ background: "rgba(201,148,10,0.03)", border: "1px solid rgba(201,148,10,0.1)" }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg,#c9940a,#f5d87a)" }}>
                    <span className="text-lg">{cap.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-black mb-1" style={{ fontFamily: "'Georgia',serif" }}>
                      {cap.title}
                    </h4>
                    <p className="text-sm text-black/50">{cap.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right - Score Visualization */}
          <Reveal delay={0.2} direction="left">
            <div className="relative">
              {/* Main score card */}
              <div className="rounded-3xl p-8 shadow-2xl"
                style={{ 
                  background: "linear-gradient(135deg,#000,#1a1000,#3d2900)",
                  border: "1px solid rgba(201,148,10,0.2)"
                }}>
                <div className="text-center mb-8">
                  <p className="text-white/50 text-sm mb-2">Identity Score</p>
                  <div className="relative inline-flex items-center justify-center">
                    {/* Circular progress */}
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle cx="64" cy="64" r="56" stroke="rgba(201,148,10,0.2)" strokeWidth="8" fill="none" />
                      <circle cx="64" cy="64" r="56" stroke="url(#goldGradient)" strokeWidth="8" fill="none"
                        strokeDasharray={`${0.85 * 351.86} 351.86`} strokeLinecap="round" />
                      <defs>
                        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#c9940a" />
                          <stop offset="100%" stopColor="#f5d87a" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-4xl font-black" 
                        style={{ color: "#f5d87a", fontFamily: "'Georgia',serif" }}>
                        85
                      </span>
                      <span className="block text-xs text-white/50">/ 100</span>
                    </div>
                  </div>
                </div>
                
                {/* Score breakdown */}
                <div className="space-y-3">
                  {[
                    { label: "Document Validity", score: 98 },
                    { label: "Biometric Match", score: 92 },
                    { label: "Liveness Check", score: 88 },
                    { label: "Risk Assessment", score: 85 },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <span className="text-xs text-white/60 w-32">{item.label}</span>
                      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                        <div className="h-full rounded-full transition-all duration-1000"
                          style={{ 
                            width: `${item.score}%`,
                            background: "linear-gradient(90deg,#c9940a,#f5d87a)"
                          }} />
                      </div>
                      <span className="text-xs font-bold" style={{ color: "#f5d87a" }}>{item.score}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Floating verification badge */}
              <div className="absolute -bottom-4 -left-4 px-4 py-3 rounded-xl shadow-xl"
                style={{ background: "#fff", border: "1px solid rgba(201,148,10,0.2)" }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(201,148,10,0.1)" }}>
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-black">Verified</p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 4 — DIVERSE IDENTITIES & BENCHMARK
═══════════════════════════════════════════════════════════════════ */
function DiverseIdentitiesSection() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        

        {/* Recognize Diverse Identities */}
        <Reveal delay={0.1}>
          <div className="rounded-3xl p-8 sm:p-12 mb-12"
            style={{ background: "linear-gradient(135deg,#fafafa,#f5f5f5)", border: "1px solid rgba(201,148,10,0.1)" }}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <GoldLabel>Inclusive Technology</GoldLabel>
                <h3 className="text-2xl sm:text-3xl font-black text-black mb-4" style={{ fontFamily: "'Georgia',serif" }}>
                  Recognise diverse identities
                </h3>
                <p className="text-black/50 mb-6">
                  Our AI is trained on diverse datasets to ensure accurate verification across all 
                  ethnicities, ages, and document types. No bias, just accurate results.
                </p>
                <div className="flex gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-black" style={{ color: "#c9940a", fontFamily: "'Georgia',serif" }}>99.2%</p>
                    <p className="text-xs text-black/50">Accuracy across demographics</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-black" style={{ color: "#c9940a", fontFamily: "'Georgia',serif" }}>150+</p>
                    <p className="text-xs text-black/50">Countries supported</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(201,148,10,0.08)" }}>
                    <div className="w-10 h-10 rounded-full"
                      style={{ 
                        background: "linear-gradient(135deg,#c9940a,#f5d87a)",
                        opacity: 0.3 + (i * 0.1)
                      }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Benchmark Results */}
        <Reveal delay={0.2}>
          <div className="rounded-3xl p-8 sm:p-12"
            style={{ background: "linear-gradient(160deg,#000,#0d0800,#1a1000)" }}>
            <div className="text-center mb-8">
              <GoldLabel>Performance</GoldLabel>
              <h3 className="text-2xl sm:text-3xl font-black text-white" style={{ fontFamily: "'Georgia',serif" }}>
                Benchmark test industry results
              </h3>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { label: "Verification Speed", value: "< 2s", desc: "Average processing time" },
                { label: "Pass Rate", value: "94%", desc: "First-time approvals" },
                { label: "Fraud Caught", value: "99.8%", desc: "Suspicious activity detected" },
              ].map((stat, i) => (
                <div key={i} className="text-center p-6 rounded-2xl"
                  style={{ background: "rgba(201,148,10,0.08)", border: "1px solid rgba(201,148,10,0.15)" }}>
                  <p className="text-3xl sm:text-4xl font-black mb-2" 
                    style={{ color: "#f5d87a", fontFamily: "'Georgia',serif" }}>
                    {stat.value}
                  </p>
                  <p className="text-white font-bold mb-1" style={{ fontFamily: "'Georgia',serif" }}>{stat.label}</p>
                  <p className="text-white/40 text-sm">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}



/* ═══════════════════════════════════════════════════════════════════
   ROOT EXPORT
═══════════════════════════════════════════════════════════════════ */
export default function LandingPage() {
  return (
    <main className="bg-white overflow-x-hidden w-full" style={{ fontFamily: "'Georgia',serif" }}>
      <style>{`
        @keyframes shimmerSlide {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes floatOrb {
          from { transform: translate(0,0) scale(1); }
          to { transform: translate(20px,-30px) scale(1.08); }
        }
        @keyframes twinkle {
          from { opacity: 0.1; transform: scale(0.8); }
          to { opacity: 0.6; transform: scale(1.2); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.4); opacity: 0; }
        }
      `}</style>

      <HeroSection />
      <KnowYourCustomerSection />
      <IdentityIntelligenceSection />
      <DiverseIdentitiesSection />
    
    </main>
  );
}