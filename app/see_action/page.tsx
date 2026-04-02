"use client";
import { useEffect, useRef, useState, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

interface GoldBadgeProps {
  children: ReactNode;
  dark?: boolean;
}

interface FeatureRowProps {
  icon: string;
  title: string;
  desc: string;
  delay?: number;
  dark?: boolean;
}

interface DashboardMockProps {
  dark?: boolean;
}

interface IntegrationGridProps {
  dark?: boolean;
}

interface StatItem {
  val: string;
  label: string;
}

interface PlatformCard {
  icon: string;
  title: string;
  desc: string;
  features: string[];
}

interface MetricItem {
  label: string;
  val: string;
  delta: string;
  color: string;
}

interface DashboardDataItem {
  name: string;
  status: string;
  score: number;
  color: string;
}

interface PositionPoint {
  t: string;
  l: string;
}

function useInView(threshold: number = 0.1) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return { ref, inView };
}

function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} ${className}`}
    >
      {children}
    </div>
  );
}

function GoldBadge({ children, dark = false }: GoldBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold tracking-widest uppercase
      ${dark ? "border-amber-400/40 bg-amber-400/10 text-amber-400" : "border-amber-500/40 bg-amber-50 text-amber-700"}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full animate-pulse ${dark ? "bg-amber-400" : "bg-amber-600"}`}
      />
      {children}
    </span>
  );
}

function FeatureRow({
  icon,
  title,
  desc,
  delay = 0,
  dark = false,
}: FeatureRowProps) {
  return (
    <Reveal delay={delay} className="flex gap-4 items-start group">
      <div
        className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-lg transition-colors duration-300
        ${
          dark
            ? "border border-amber-400/30 bg-amber-400/10 text-amber-400 group-hover:bg-amber-400/20"
            : "border border-amber-500/25 bg-amber-50 text-amber-700 group-hover:bg-amber-100"
        }`}
      >
        {icon}
      </div>
      <div>
        <div
          className={`font-semibold text-sm mb-1 ${dark ? "text-white" : "text-zinc-900"}`}
        >
          {title}
        </div>
        <div className="text-zinc-500 text-xs leading-relaxed">{desc}</div>
      </div>
    </Reveal>
  );
}

function DashboardMock({ dark = true }: DashboardMockProps) {
  const wrap = dark
    ? "bg-zinc-900/80 border-white/10"
    : "bg-white border-zinc-200 shadow-xl";
  const row = dark ? "border-white/5" : "border-zinc-100";
  const urlBg = dark ? "bg-white/5" : "bg-zinc-100";
  const urlTx = dark ? "text-zinc-600" : "text-zinc-400";
  const nm = dark ? "text-white" : "text-zinc-800";
  const sc = dark ? "text-zinc-500" : "text-zinc-400";

  const dashboardData: DashboardDataItem[] = [
    {
      name: "Sarah K.",
      status: "Verified",
      score: 98,
      color: "text-green-500",
    },
    { name: "James M.", status: "Pending", score: 72, color: "text-amber-500" },
    { name: "Liu W.", status: "Verified", score: 95, color: "text-green-500" },
    { name: "Amara O.", status: "Review", score: 61, color: "text-red-400" },
    { name: "Tom H.", status: "Verified", score: 99, color: "text-green-500" },
  ];

  return (
    <div className={`relative rounded-2xl border overflow-hidden p-4 ${wrap}`}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-400/70" />
        <div className="w-3 h-3 rounded-full bg-amber-400/70" />
        <div className="w-3 h-3 rounded-full bg-green-400/70" />
        <div
          className={`flex-1 mx-3 h-5 rounded ${urlBg} flex items-center px-2`}
        >
          <span className={`text-xs ${urlTx}`}>
            app.falconidentity.com/dashboard
          </span>
        </div>
      </div>
      {dashboardData.map((r: DashboardDataItem, i: number) => (
        <div
          key={i}
          className={`flex items-center gap-3 py-2 border-b last:border-0 ${row}`}
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400/40 to-amber-600/20 flex items-center justify-center text-amber-600 text-xs font-bold shrink-0">
            {r.name[0]}
          </div>
          <div className={`flex-1 text-xs font-medium ${nm}`}>{r.name}</div>
          <div className={`text-xs font-semibold ${r.color}`}>{r.status}</div>
          <div className={`text-xs ${sc}`}>{r.score}%</div>
        </div>
      ))}
    </div>
  );
}

function IntegrationGrid({ dark = true }: IntegrationGridProps) {
  const logos: string[] = [
    "Stripe",
    "Salesforce",
    "HubSpot",
    "Plaid",
    "Twilio",
    "Okta",
    "AWS",
    "Azure",
    "Slack",
    "GitHub",
    "Notion",
    "Figma",
  ];
  return (
    <div className="grid grid-cols-4 gap-3">
      {logos.map((l: string, i: number) => (
        <Reveal key={l} delay={i * 40}>
          <div
            className={`h-12 rounded-xl border flex items-center justify-center text-xs font-semibold transition-all duration-300 cursor-default
            ${
              dark
                ? "border-white/8 bg-white/4 text-zinc-500 hover:border-amber-400/30 hover:text-amber-400"
                : "border-zinc-200 bg-zinc-50 text-zinc-400 hover:border-amber-400/50 hover:text-amber-600"
            }`}
          >
            {l}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default function FalconPlatformPage() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  useEffect(() => setMounted(true), []);
  if (!mounted) return null as any;

  const platformCards: PlatformCard[] = [
    {
      icon: "🪪",
      title: "Identity Verification",
      desc: "Verify documents and selfies in real time. Support for passports, driver's licenses, national IDs, and more across 200+ countries.",
      features: [
        "Document OCR & NFC",
        "Liveness detection",
        "Database crosscheck",
      ],
    },
    {
      icon: "🏢",
      title: "Business Verification (KYB)",
      desc: "Verify businesses instantly with real-time access to corporate registries, UBO checks, and adverse media screening.",
      features: [
        "Global registry lookup",
        "UBO mapping",
        "Watchlist screening",
      ],
    },
    {
      icon: "🤖",
      title: "Fraud Intelligence",
      desc: "Stop sophisticated fraud before it starts with device signals, behavioural biometrics, and an always-learning ML risk engine.",
      features: [
        "Device fingerprinting",
        "Velocity rules",
        "Network graph analysis",
      ],
    },
  ];

  const expertiseItems: Array<{ icon: string; stat: string; label: string }> = [
    { icon: "🏆", stat: "30+", label: "Years of identity expertise" },
    { icon: "🌐", stat: "200+", label: "Countries and territories" },
    { icon: "🔐", stat: "SOC 2", label: "Type II certified" },
    { icon: "⚡", stat: "2.1s", label: "Average verification time" },
  ];

  const beforeFalcon: string[] = [
    "KYC vendor",
    "KYB vendor",
    "Fraud vendor",
    "AML vendor",
    "Document vendor",
  ];
  const withFalcon: string[] = [
    "Identity verification",
    "Business verification",
    "Fraud detection",
    "AML screening",
    "Document intelligence",
  ];
  const regions: string[] = [
    "Americas",
    "Europe",
    "Asia-Pac",
    "MEA",
    "Latam",
    "Africa",
  ];

  const positionPoints: PositionPoint[] = [
    { t: "15%", l: "20%" },
    { t: "40%", l: "55%" },
    { t: "60%", l: "30%" },
    { t: "25%", l: "75%" },
    { t: "70%", l: "65%" },
  ];

  return (
    <div
      className="overflow-x-hidden"
      style={{ fontFamily: "'DM Sans',sans-serif" }}
    >
      {/* ── GLOBAL STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=Playfair+Display:wght@700;800;900&display=swap');

        :root {
          --gold:#D4AF37; --gold-deep:#8B6914; --gold-mid:#B8960C;
        }

        @keyframes shimmer {
          0%   { background-position:-200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes floatOrb {
          0%,100% { transform:translateY(0)   translateX(0)   scale(1);    }
          33%     { transform:translateY(-24px) translateX(12px) scale(1.04); }
          66%     { transform:translateY(12px)  translateX(-10px) scale(.97); }
        }
        @keyframes grain {
          0%,100%{transform:translate(0,0)}  10%{transform:translate(-2%,-3%)} 20%{transform:translate(-5%,2%)}
          30%{transform:translate(3%,-4%)}   40%{transform:translate(-1%,6%)}  50%{transform:translate(-4%,1%)}
          60%{transform:translate(4%,2%)}    70%{transform:translate(0,4%)}    80%{transform:translate(-2%,1%)}
          90%{transform:translate(4%,-1%)}
        }
        @keyframes borderGlow {
          0%,100%{box-shadow:0 0 20px rgba(212,175,55,.15);}
          50%    {box-shadow:0 0 40px rgba(212,175,55,.35);}
        }
        @keyframes tickerScroll {
          0%   { transform:translateX(0);    }
          100% { transform:translateX(-50%); }
        }
        @keyframes scaleIn {
          from{opacity:0;transform:scale(.93);}  to{opacity:1;transform:scale(1);}
        }
        @keyframes fadeUp {
          from{opacity:0;transform:translateY(20px);} to{opacity:1;transform:translateY(0);}
        }

        /* shimmer on DARK bg */
        .gs-dark {
          background:linear-gradient(90deg,#D4AF37,#F5E17B,#D4AF37,#B8960C,#D4AF37);
          background-size:200% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          background-clip:text; animation:shimmer 4s linear infinite;
        }
        /* shimmer on LIGHT bg */
        .gs-light {
          background:linear-gradient(90deg,#B8960C,#D4AF37,#8B6914,#D4AF37,#B8960C);
          background-size:200% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          background-clip:text; animation:shimmer 4s linear infinite;
        }

        .grain-overlay::after {
          content:''; position:fixed; top:-50%; left:-50%; width:200%; height:200%;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          animation:grain 8s steps(10) infinite; pointer-events:none; z-index:100; opacity:.2;
        }

        .gold-btn { background:linear-gradient(135deg,#D4AF37,#B8960C); color:#000; font-weight:700; transition:all .3s cubic-bezier(.23,1,.32,1); }
        .gold-btn:hover { transform:translateY(-2px); box-shadow:0 8px 30px rgba(212,175,55,.45); }

        .ghost-dark  { border:1px solid rgba(212,175,55,.4); color:#D4AF37; transition:all .3s ease; }
        .ghost-dark:hover { background:rgba(212,175,55,.1); border-color:#D4AF37; }
        .ghost-light { border:1px solid rgba(180,140,20,.35); color:#8B6914; transition:all .3s ease; background:transparent; }
        .ghost-light:hover { background:rgba(212,175,55,.08); border-color:#B8960C; }

        .card-dark  { transition:all .4s cubic-bezier(.23,1,.32,1); }
        .card-dark:hover  { transform:translateY(-3px); box-shadow:0 20px 60px rgba(212,175,55,.14); border-color:rgba(212,175,55,.35)!important; }
        .card-light { transition:all .4s cubic-bezier(.23,1,.32,1); }
        .card-light:hover { transform:translateY(-3px); box-shadow:0 20px 60px rgba(212,175,55,.18); border-color:rgba(180,140,20,.4)!important; }

        .ticker-inner { display:flex; animation:tickerScroll 30s linear infinite; width:max-content; }
        .ticker-inner:hover { animation-play-state:paused; }

        .div-gold  { height:1px; background:linear-gradient(90deg,transparent,rgba(212,175,55,.35),transparent); }
        .div-light { height:1px; background:linear-gradient(90deg,transparent,rgba(180,140,20,.2),transparent); }

        .grid-dark  { background-image:linear-gradient(rgba(212,175,55,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,.05) 1px,transparent 1px); background-size:60px 60px; }
        .grid-light { background-image:linear-gradient(rgba(180,140,20,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(180,140,20,.06) 1px,transparent 1px); background-size:60px 60px; }

        /* alternating section backgrounds */
        .s-black     { background:#0a0a0a; }
        .s-darkgray  { background:#111111; }
        .s-white     { background:#ffffff; }
        .s-offwhite  { background:#fafaf8; }
      `}</style>

      <div className="grain-overlay fixed inset-0 pointer-events-none z-50" />

      {/* ══════════════ §1  HERO — dark ══════════════ */}
      <section className="s-black grid-dark relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 pb-24 overflow-hidden">
        {/* ambient orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-0 left-1/3 w-[700px] h-[500px] rounded-full"
            style={{
              background:
                "radial-gradient(circle,rgba(212,175,55,.10) 0%,transparent 70%)",
              animation: "floatOrb 14s ease-in-out infinite",
            }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full"
            style={{
              background:
                "radial-gradient(circle,rgba(255,255,255,.04) 0%,transparent 70%)",
              animation: "floatOrb 20s ease-in-out infinite reverse",
            }}
          />
          <div
            className="absolute top-1/2 left-0 w-80 h-80 rounded-full"
            style={{
              background:
                "radial-gradient(circle,rgba(212,175,55,.04) 0%,transparent 70%)",
              animation: "floatOrb 17s ease-in-out infinite 3s",
            }}
          />
        </div>

        <div
          style={{ animation: "scaleIn .8s cubic-bezier(.23,1,.32,1) both" }}
        >
          <GoldBadge dark>
            The All-in-One Identity Platform for Growth
          </GoldBadge>
        </div>

        <h1
          className="mt-7 text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black leading-none tracking-tight"
          style={{
            fontFamily: "'Playfair Display',serif",
            animation: "scaleIn .9s cubic-bezier(.23,1,.32,1) .1s both",
          }}
        >
          <span className="text-white">Verify identity.</span>
          <br />
          <span className="gs-dark">Build trust.</span>
          <br />
          <span className="text-white">Scale fast.</span>
        </h1>

        <p
          className="mt-6 text-zinc-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          style={{ animation: "fadeUp 1s ease .25s both" }}
        >
          Falcon unifies KYC, KYB, fraud detection, and identity intelligence
          into one powerful platform — so you can onboard users confidently,
          comply effortlessly, and grow without limits.
        </p>

        <div
          className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
          style={{ animation: "fadeUp 1s ease .35s both" }}
        >
          <button className="ghost-dark px-8 py-3.5 rounded-xl text-sm font-semibold">
            Watch demo
          </button>
        </div>
      </section>

      <div className="div-light" />

      {/* ══════════════ §3  GROW WITH FALCON — white ══════════════ */}
      <section className="s-white grid-light relative py-24 px-4 overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle,rgba(212,175,55,.07) 0%,transparent 70%)",
            animation: "floatOrb 16s ease-in-out infinite",
          }}
        />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal>
              <GoldBadge>Global Coverage</GoldBadge>
            </Reveal>
            <Reveal delay={100}>
              <h2
                className="mt-4 text-4xl md:text-5xl font-black leading-tight text-zinc-900"
                style={{ fontFamily: "'Playfair Display',serif" }}
              >
                Grow with Falcon —<br />
                <span className="gs-light">Go anywhere</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 text-zinc-500 leading-relaxed max-w-lg">
                Reach global customers faster. Falcon's coverage across 200+
                countries means you can verify anyone, anywhere — without
                stitching together a patchwork of local vendors.
              </p>
            </Reveal>
            <div className="mt-10 space-y-6">
              <FeatureRow
                delay={300}
                icon="🌍"
                title="Global identity graph"
                desc="Access to 6B+ identity records across passports, national IDs, driver's licenses, and more."
              />
              <FeatureRow
                delay={380}
                icon="⚡"
                title="Real-time decisioning"
                desc="Sub-3-second decisions powered by ML models trained on hundreds of millions of verifications."
              />
              <FeatureRow
                delay={460}
                icon="🔒"
                title="Privacy by design"
                desc="SOC 2 Type II, ISO 27001, GDPR, CCPA compliant. Your users' data stays protected."
              />
            </div>
            <Reveal delay={540}>
              <button className="mt-8 gold-btn px-6 py-3 rounded-xl text-sm">
                Explore coverage →
              </button>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl card-light">
              <div className="aspect-video rounded-xl overflow-hidden bg-zinc-50 border border-zinc-100 mb-4 flex items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <svg
                    viewBox="0 0 800 400"
                    className="w-full h-full"
                    fill="none"
                  >
                    {Array.from({ length: 40 }).map((_, i: number) => (
                      <circle
                        key={i}
                        cx={20 + Math.sin(i * 1.7) * 360 + 380}
                        cy={30 + Math.cos(i * 2.3) * 150 + 180}
                        r={2 + Math.random() * 3}
                        fill="#B8960C"
                        opacity={0.5 + Math.random() * 0.5}
                      />
                    ))}
                  </svg>
                </div>
                <div className="text-center z-10 relative">
                  <div
                    className="text-6xl font-black gs-light"
                    style={{ fontFamily: "'Playfair Display',serif" }}
                  >
                    200+
                  </div>
                  <div className="text-zinc-500 text-sm mt-1">
                    Countries Covered
                  </div>
                </div>
                {positionPoints.map((p: PositionPoint, i: number) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3"
                    style={{ top: p.t, left: p.l }}
                  >
                    <span
                      className="absolute inset-0 rounded-full bg-amber-500 animate-ping opacity-30"
                      style={{ animationDelay: `${i * 0.5}s` }}
                    />
                    <span className="relative inline-flex w-3 h-3 rounded-full bg-amber-500" />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {regions.map((r: string) => (
                  <div
                    key={r}
                    className="rounded-lg bg-amber-50 border border-amber-100 px-3 py-2 text-center"
                  >
                    <div className="text-amber-700 text-xs font-semibold">
                      {r}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="div-light" />

      {/* ══════════════ §4  PLATFORM CARDS — dark ══════════════ */}
      <section className="s-darkgray grid-dark relative py-24 px-4 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse,rgba(212,175,55,.07) 0%,transparent 70%)",
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <Reveal>
              <GoldBadge dark>Platform</GoldBadge>
            </Reveal>
            <Reveal delay={100}>
              <h2
                className="mt-4 text-4xl md:text-5xl font-black text-white"
                style={{ fontFamily: "'Playfair Display',serif" }}
              >
                Get started with
                <br />
                <span className="gs-dark">Falcon — unified</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
                Connect to global identity data, run fraud intelligence, and
                orchestrate complex workflows — all from one platform.
              </p>
            </Reveal>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {platformCards.map((card: PlatformCard, i: number) => (
              <Reveal key={card.title} delay={i * 120}>
                <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-6 h-full card-dark group cursor-default">
                  <div className="w-12 h-12 rounded-xl border border-amber-400/30 bg-amber-400/10 flex items-center justify-center text-2xl mb-4 group-hover:bg-amber-400/20 transition-colors duration-300">
                    {card.icon}
                  </div>
                  <h3
                    className="text-white font-bold text-lg mb-2"
                    style={{ fontFamily: "'Playfair Display',serif" }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-4">
                    {card.desc}
                  </p>
                  <ul className="space-y-1.5">
                    {card.features.map((f: string) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-zinc-400 text-xs"
                      >
                        <svg
                          className="w-3.5 h-3.5 text-amber-400 shrink-0"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="div-gold" />

      {/* ══════════════ §5  EMPOWER TEAMS — white ══════════════ */}
      <section className="s-offwhite relative py-24 px-4 overflow-hidden">
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle,rgba(212,175,55,.06) 0%,transparent 70%)",
            animation: "floatOrb 18s ease-in-out infinite",
          }}
        />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <Reveal className="order-2 lg:order-1">
            <DashboardMock dark={false} />
          </Reveal>
          <div className="order-1 lg:order-2">
            <Reveal>
              <GoldBadge>Workflow Tools</GoldBadge>
            </Reveal>
            <Reveal delay={100}>
              <h2
                className="mt-4 text-4xl md:text-5xl font-black leading-tight text-zinc-900"
                style={{ fontFamily: "'Playfair Display',serif" }}
              >
                Empower your teams
                <br />
                <span className="gs-light">with data tools</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 text-zinc-500 leading-relaxed">
                Give compliance, ops, and engineering teams the tools they
                actually need — flexible case management, audit trails, and
                no-code workflow builders.
              </p>
            </Reveal>
            <div className="mt-10 space-y-5">
              <FeatureRow
                delay={300}
                icon="📋"
                title="No-code flow builder"
                desc="Drag-and-drop your verification flows. Change logic instantly without a deploy."
              />
              <FeatureRow
                delay={380}
                icon="🔍"
                title="Case management"
                desc="Review, escalate, and resolve identity cases from a single unified queue."
              />
              <FeatureRow
                delay={460}
                icon="📊"
                title="Real-time analytics"
                desc="Monitor pass rates, friction points, and fraud signals with live dashboards."
              />
              <FeatureRow
                delay={540}
                icon="🔗"
                title="Webhooks & APIs"
                desc="Integrate with your existing stack in minutes with REST APIs and event webhooks."
              />
            </div>
          </div>
        </div>
      </section>

      <div className="div-light" />

      {/* ══════════════ §6  GO BEYOND POINT SOLUTIONS — white ══════════════ */}
      <section className="s-white relative py-24 px-4 overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle,rgba(212,175,55,.05) 0%,transparent 70%)",
            animation: "floatOrb 22s ease-in-out infinite reverse",
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <Reveal>
              <GoldBadge>Integrations</GoldBadge>
            </Reveal>
            <Reveal delay={100}>
              <h2
                className="mt-4 text-4xl md:text-5xl font-black text-zinc-900"
                style={{ fontFamily: "'Playfair Display',serif" }}
              >
                Go beyond what
                <br />
                <span className="gs-light">point solutions can offer</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-4 text-zinc-500 max-w-xl mx-auto">
                Stop managing five vendors. Falcon replaces your fragmented
                stack with one unified platform that does more, costs less, and
                scales with you.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Reveal>
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 card-light">
                <h3 className="text-zinc-400 text-xs font-semibold tracking-widest uppercase mb-4">
                  Before Falcon
                </h3>
                <div className="space-y-3">
                  {beforeFalcon.map((v: string) => (
                    <div
                      key={v}
                      className="flex items-center gap-3 p-3 rounded-lg bg-red-50 border border-red-100"
                    >
                      <svg
                        className="w-4 h-4 text-red-400 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      <span className="text-zinc-500 text-sm">{v}</span>
                      <span className="ml-auto text-red-400 text-xs">
                        Separate contract
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div
                className="rounded-2xl border border-amber-200 bg-white p-8 shadow-lg card-light"
                style={{ boxShadow: "0 0 40px rgba(212,175,55,.10)" }}
              >
                <h3 className="text-amber-700 text-xs font-semibold tracking-widest uppercase mb-4">
                  With Falcon
                </h3>
                <div className="space-y-3">
                  {withFalcon.map((v: string) => (
                    <div
                      key={v}
                      className="flex items-center gap-3 p-3 rounded-lg bg-amber-50 border border-amber-100"
                    >
                      <svg
                        className="w-4 h-4 text-amber-600 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-zinc-800 text-sm font-medium">
                        {v}
                      </span>
                      <span className="ml-auto text-amber-600 text-xs">
                        One platform
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8">
              <h3
                className="text-zinc-800 font-bold text-center mb-6"
                style={{ fontFamily: "'Playfair Display',serif" }}
              >
                Connects with your existing stack
              </h3>
              <IntegrationGrid dark={false} />
            </div>
          </Reveal>
        </div>
      </section>

      <div className="div-light" />

  

      {/* ══════════════ §8  CTA — white ══════════════ */}
      <section className="s-white relative py-24 px-4 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%,rgba(212,175,55,.07) 0%,transparent 70%)",
          }}
        />
        <Reveal>
          <div className="max-w-3xl mx-auto rounded-3xl border-2 border-amber-200 bg-white p-10 md:p-14 text-center relative overflow-hidden shadow-[0_0_80px_rgba(212,175,55,.15)]">
            {/* corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-amber-400/60 rounded-tl-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-amber-400/60 rounded-br-3xl pointer-events-none" />
            <div
              className="absolute inset-0 pointer-events-none rounded-3xl"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 50% 0%,rgba(212,175,55,.08) 0%,transparent 70%)",
              }}
            />

            <div className="relative z-10">
              <GoldBadge>Start Today</GoldBadge>
              <h2
                className="mt-5 text-4xl md:text-5xl font-black text-zinc-900 leading-tight"
                style={{ fontFamily: "'Playfair Display',serif" }}
              >
                Build your own
                <br />
                <span className="gs-light">identity journey</span>
              </h2>
              <p className="mt-4 text-zinc-500 max-w-lg mx-auto leading-relaxed">
                Start verifying in minutes. No long procurement cycles, no
                hidden fees. Get your first 100 verifications free.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  placeholder="your@company.com"
                  className="flex-1 px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-800 placeholder-zinc-400 text-sm focus:outline-none focus:border-amber-400 transition-colors duration-200"
                />
                <button className="gold-btn px-6 py-3 rounded-xl text-sm whitespace-nowrap">
                  Get started →
                </button>
              </div>
              <p className="mt-4 text-zinc-400 text-xs">
                No credit card required · Free sandbox · SOC 2 compliant
              </p>
              <div className="mt-8 flex items-center justify-center gap-3"></div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
