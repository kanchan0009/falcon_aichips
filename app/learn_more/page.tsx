"use client";
import { useEffect, useRef, useState, ReactNode } from "react";

/* ─── Types ─── */
interface RiskSection {
  title: string;
  content: string;
  icon?: string;
}

interface RiskCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  keyPoints: string[];
  details: RiskSection[];
}

interface RedFlag {
  category: string;
  flags: string[];
  icon: string;
}

interface Framework {
  name: string;
  description: string;
  icon: string;
}

/* ─── Custom Hooks ─── */
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
      { threshold }
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

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
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

/* ─── Data ─── */
const RISK_CATEGORIES: RiskCategory[] = [
  {
    id: "identification",
    title: "Risk Identification",
    icon: "🔍",
    color: "amber",
    description: "Identifying internal and external threats, including financial misrepresentation and asset misappropriation (theft/embezzlement).",
    keyPoints: [
      "Internal threats: employee fraud, misappropriation of assets",
      "External threats: vendor fraud, customer fraud, cyber attacks",
      "Financial misrepresentation: falsified statements, revenue manipulation",
      "Asset misappropriation: theft of cash, inventory, or intellectual property"
    ],
    details: [
      {
        title: "Internal Threat Assessment",
        content: "Evaluate potential for employee misconduct, including embezzlement, payroll fraud, and expense reimbursement abuse. Consider access levels, authority limits, and historical incident patterns.",
        icon: "🏢"
      },
      {
        title: "External Threat Mapping",
        content: "Identify vulnerabilities from vendors, partners, customers, and cyber adversaries. Analyze third-party access points, payment processing vulnerabilities, and customer identity fraud vectors.",
        icon: "🌐"
      },
      {
        title: "Process Vulnerability Analysis",
        content: "Map critical financial processes to identify weak points where fraud could occur. Focus on cash handling, accounts payable, procurement, and financial reporting cycles.",
        icon: "⚙️"
      }
    ]
  },
  {
    id: "behavioral",
    title: "Behavioral Analysis",
    icon: "📊",
    color: "white",
    description: "Monitoring user behavior for deviations, such as unusual login times, location changes, or multiple failed login attempts.",
    keyPoints: [
      "Unusual login times and patterns",
      "Geographic location anomalies",
      "Multiple failed authentication attempts",
      "Rapid account changes or profile updates"
    ],
    details: [
      {
        title: "User Behavior Analytics (UBA)",
        content: "Establish baseline behavioral profiles for each user based on historical activity. Monitor for deviations including time-based anomalies (off-hours access), volume anomalies (unusual transaction sizes), and pattern anomalies (unusual workflows).",
        icon: "👤"
      },
      {
        title: "Session Analysis",
        content: "Track session duration, navigation patterns, and click sequences. Rapid account changes, multiple password resets, or unusual navigation paths may indicate account takeover or credential compromise.",
        icon: "⏱️"
      },
      {
        title: "Device & Location Intelligence",
        content: "Monitor device fingerprints, IP addresses, and geographic locations. Flag access from new devices, high-risk jurisdictions, VPN/proxy usage, or impossible travel scenarios (same user logging from distant locations within impossible timeframes).",
        icon: "📍"
      }
    ]
  },
  {
    id: "transaction",
    title: "Transaction Monitoring",
    icon: "💰",
    color: "amber",
    description: "Real-time analysis of transactions to flag anomalies, such as unusual activity near period-ends or high-volume transfers.",
    keyPoints: [
      "Real-time anomaly detection",
      "Period-end unusual activity monitoring",
      "High-volume transfer alerts",
      "Pattern-based flagging systems"
    ],
    details: [
      {
        title: "Real-Time Transaction Screening",
        content: "Analyze transactions as they occur against pre-defined rules and ML models. Flag amounts exceeding thresholds, velocity violations (multiple transactions in short periods), and structured transactions (amounts just below reporting thresholds).",
        icon: "⚡"
      },
      {
        title: "Pattern Recognition",
        content: "Identify known fraud patterns including round-dollar amounts, unusual transaction sequences (deposit then immediate withdrawal), cross-border flows to high-risk jurisdictions, and transactions inconsistent with customer profile.",
        icon: "🔄"
      },
      {
        title: "Temporal Anomaly Detection",
        content: "Monitor for unusual timing patterns including period-end adjustments, weekend large transfers, after-hours activity spikes, and transactions that circumvent normal approval workflows.",
        icon: "📅"
      }
    ]
  },
  {
    id: "assessment",
    title: "Assessment Levels",
    icon: "📋",
    color: "white",
    description: "Evaluations occur at enterprise, thematic, or detailed levels depending on organization size and complexity.",
    keyPoints: [
      "Enterprise-wide risk assessment",
      "Thematic evaluations for specific risk areas",
      "Detailed process-level analysis",
      "Scalable approach by organization size"
    ],
    details: [
      {
        title: "Enterprise-Level Assessment",
        content: "Organization-wide evaluation of fraud risk across all business units, geographies, and processes. Establishes overall risk appetite and prioritization for resource allocation. Recommended for large, complex organizations.",
        icon: "🏛️"
      },
      {
        title: "Thematic Assessment",
        content: "Deep-dive evaluation focused on specific risk areas such as procurement fraud, payroll fraud, or revenue recognition. Suitable for organizations targeting known vulnerability areas or responding to specific incidents.",
        icon: "🎯"
      },
      {
        title: "Detailed Process Assessment",
        content: "Granular analysis of individual processes and control points. Identifies specific failure modes and control gaps. Recommended for organizations with mature risk programs or those implementing new processes.",
        icon: "🔬"
      }
    ]
  }
];

const RED_FLAGS: RedFlag[] = [
  {
    category: "Behavioral Red Flags",
    icon: "⚠️",
    flags: [
      "Employees avoiding vacation or refusing to delegate duties",
      "Living beyond visible means or unexplained wealth",
      "Excessive secrecy about work responsibilities",
      "Reluctance to share information or undergo audits",
      "Defensive behavior when questioned about processes",
      "Unusual close relationships with vendors or customers"
    ]
  },
  {
    category: "Documentation Red Flags",
    icon: "📄",
    flags: [
      "Missing documents or gaps in documentation",
      "Photocopied invoices instead of originals",
      "Sequential invoice numbers from the same vendor",
      "Unusual endorsements or alterations",
      "Duplicate payments or invoices",
      "Missing approval signatures or authorizations"
    ]
  },
  {
    category: "Control Environment Red Flags",
    icon: "🔒",
    flags: [
      "Lack of segregation of duties",
      "Overrides of controls by senior management",
      "Missing audit trails or logging gaps",
      "Weak password policies or access controls",
      "Unreviewed exception reports",
      "Delayed or incomplete reconciliations"
    ]
  }
];

const FRAMEWORKS: Framework[] = [
  {
    name: "Fraud Triangle",
    description: "Analyzing motivation (pressure/incentive), opportunity (weak controls), and rationalization (justification) to understand and mitigate fraud risk at its source.",
    icon: "🔺"
  },
  {
    name: "Quantitative/Qualitative Methods",
    description: "Utilizing numeric scoring for risk probability and impact combined with expert judgment to prioritize risk mitigation efforts.",
    icon: "📈"
  },
  {
    name: "Failure Modes & Effects Analysis (FMEA)",
    description: "Proactively identifying potential failure points in processes and assessing their severity, occurrence, and detectability.",
    icon: "⚙️"
  },
  {
    name: "Bowtie Analysis",
    description: "Visualizing both causes (threats) and consequences (impacts) of risk events, showing preventive and detective controls.",
    icon: "🎀"
  },
  {
    name: "Fault Tree Analysis (FTA)",
    description: "Analyzing root causes of system failure using boolean logic to map combinations of events leading to a risk event.",
    icon: "🌳"
  }
];

const TECH_CATEGORIES = [
  {
    title: "AI and Machine Learning",
    description: "Training systems to recognize emerging patterns of fraudulent behavior and provide continuous adaptation to new techniques.",
    icon: "🤖",
    features: ["Supervised learning on labeled fraud data", "Unsupervised anomaly detection", "Continuous model retraining", "Pattern recognition across millions of transactions"]
  },
  {
    title: "Data Analytics",
    description: "Analyzing large datasets to detect irregularities and patterns that may indicate fraudulent activity.",
    icon: "📊",
    features: ["Benford's Law analysis", "Statistical outlier detection", "Regression analysis", "Cluster analysis for collusion detection"]
  },
  {
    title: "Predictive Analytics",
    description: "Assessing risk by analyzing customer data to predict potential fraud and enhance security proactively.",
    icon: "🔮",
    features: ["Risk scoring models", "Customer behavior prediction", "Early warning systems", "Pre-transaction screening"]
  }
];

const MITIGATION_STRATEGIES = [
  {
    category: "Preventative Controls",
    icon: "🛡️",
    items: [
      "Fraud awareness training for all employees",
      "Segregation of duties across financial processes",
      "Mandatory vacation policies",
      "Background checks for sensitive positions",
      "Vendor due diligence and approval processes",
      "Access controls and least-privilege principles"
    ]
  },
  {
    category: "Detective Controls",
    icon: "🔍",
    items: [
      "Automated monitoring systems generating real-time alerts",
      "Regular reconciliations and exception reporting",
      "Surprise audits and spot checks",
      "Whistleblower hotlines and reporting mechanisms",
      "Data analytics and continuous monitoring",
      "Management review of control reports"
    ]
  },
  {
    category: "Regulatory Compliance",
    icon: "⚖️",
    items: [
      "BSA/AML (Bank Secrecy Act / Anti-Money Laundering) compliance",
      "OFAC sanctions screening",
      "GDPR and data protection requirements",
      "SOX compliance for public companies",
      "Industry-specific regulations (FINRA, FCA, etc.)",
      "Regular compliance audits and reporting"
    ]
  }
];

/* ─── Component ─── */
export default function FraudRiskAssessmentPage() {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("identification");

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const activeRiskData = RISK_CATEGORIES.find(c => c.id === activeCategory);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=Playfair+Display:wght@700;800;900&display=swap');

        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes floatOrb { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-20px) scale(1.04)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scaleIn { from{opacity:0;transform:scale(.94)} to{opacity:1;transform:scale(1)} }
        @keyframes lineGrow { from{width:0} to{width:3rem} }

        .gs-dark {
          background:linear-gradient(90deg,#D4AF37,#F5E17B,#D4AF37,#B8960C,#D4AF37);
          background-size:200% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation:shimmer 4s linear infinite;
        }

        .risk-card {
          transition:all .4s cubic-bezier(.23,1,.32,1);
        }
        .risk-card:hover {
          transform:translateY(-4px);
          box-shadow:0 20px 60px rgba(212,175,55,.12);
        }

        .grid-dots {
          background-image: radial-gradient(rgba(212,175,55,.12) 1px, transparent 1px);
          background-size: 32px 32px;
        }

        .tab-active {
          background:linear-gradient(135deg,#D4AF37,#B8960C);
          color:#000;
        }

        .red-flag-card:hover {
          border-color: rgba(212, 175, 55, 0.3);
          background: linear-gradient(135deg, #FFFBEB 0%, #FFFFFF 100%);
        }
      `}</style>

      {/* Ambient Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(212,175,55,.06) 0%,transparent 70%)", animation: "floatOrb 16s ease-in-out infinite" }} />
        <div className="absolute bottom-1/4 right-1/5 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle,rgba(0,0,0,.02) 0%,transparent 70%)", animation: "floatOrb 20s ease-in-out infinite reverse" }} />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16 px-4 text-center grid-dots overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%,rgba(212,175,55,.08) 0%,transparent 70%)" }} />

        <div style={{ animation: "scaleIn .8s cubic-bezier(.23,1,.32,1) both" }}>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-700 text-xs font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />Risk Intelligence
          </span>
        </div>

        <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl font-black leading-none tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif", animation: "scaleIn .9s ease .1s both" }}>
          <span className="text-zinc-900">Financial Services</span>
          <br />
          <span className="gs-dark">Fraud Risk Assessment</span>
        </h1>

        <div className="mt-5 mx-auto"
          style={{ height: "2px", background: "linear-gradient(90deg,transparent,#D4AF37,transparent)", animation: "lineGrow 1s ease .5s both", width: "3rem" }} />

        <p className="mt-6 text-zinc-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          style={{ animation: "fadeUp 1s ease .3s both" }}>
          Analyzing transactional, behavioral, and system data to identify potential vulnerabilities
          using AI and machine learning for real-time monitoring and prevention.
        </p>

        {/* Quick Stats */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-center" style={{ animation: "fadeUp 1s ease .5s both" }}>
          {[
            { val: "4", label: "Risk Categories" },
            { val: "18+", label: "Red Flags" },
            { val: "5", label: "Frameworks" },
            { val: "3", label: "Tech Pillars" },
          ].map((s, i) => (
            <div key={i} className="flex flex-col gap-0.5">
              <span className="text-2xl font-black gs-dark" style={{ fontFamily: "'Playfair Display', serif" }}>{s.val}</span>
              <span className="text-zinc-400 text-xs">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* Risk Categories Navigation */}
        <Reveal>
          <div className="mb-12">
            <h2 className="text-zinc-900 font-black text-2xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Key Components of Fraud Risk Assessment
            </h2>
            <p className="text-zinc-500 text-sm">Explore the four essential pillars of comprehensive fraud risk management</p>
          </div>
        </Reveal>

        <div className="flex flex-wrap gap-3 mb-8">
          {RISK_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-250 flex items-center gap-2
                ${activeCategory === cat.id
                  ? "tab-active shadow-md"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"}`}
            >
              <span className="text-base">{cat.icon}</span>
              {cat.title}
            </button>
          ))}
        </div>

        {/* Active Category Detail */}
        {activeRiskData && (
          <Reveal key={activeRiskData.id}>
            <div className={`rounded-2xl border p-8 mb-16 risk-card
              ${activeRiskData.color === "amber" ? "border-amber-200 bg-gradient-to-br from-amber-50 to-white" : "border-zinc-200 bg-white"}`}>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl bg-amber-400/10 border border-amber-400/30">
                  {activeRiskData.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-zinc-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {activeRiskData.title}
                  </h3>
                  <p className="text-zinc-600 leading-relaxed">{activeRiskData.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {activeRiskData.details.map((detail, idx) => (
                  <div key={idx} className="rounded-xl bg-white/80 border border-zinc-200 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">{detail.icon}</span>
                      <h4 className="font-bold text-zinc-800 text-sm">{detail.title}</h4>
                    </div>
                    <p className="text-zinc-500 text-xs leading-relaxed">{detail.content}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-amber-200/50">
                <div className="flex flex-wrap gap-2">
                  {activeRiskData.keyPoints.map((point, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700">
                      {point}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* Red Flags Section */}
        <Reveal delay={100}>
          <div className="mb-16">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-700 text-xs font-semibold tracking-widest uppercase mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />Warning Signs
              </span>
              <h2 className="text-zinc-900 font-black text-3xl mt-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Key Red Flags & Risk Indicators
              </h2>
              <p className="text-zinc-500 text-sm mt-2 max-w-2xl mx-auto">
                Recognizing these warning signs can help identify potential fraud before significant losses occur
              </p>
              <div className="mt-4 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {RED_FLAGS.map((category, idx) => (
                <div key={idx} className="rounded-xl border border-zinc-200 bg-white p-5 red-flag-card transition-all duration-300">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">{category.icon}</span>
                    <h3 className="font-bold text-zinc-800">{category.category}</h3>
                  </div>
                  <ul className="space-y-2">
                    {category.flags.map((flag, fidx) => (
                      <li key={fidx} className="flex items-start gap-2 text-sm text-zinc-600">
                        <span className="text-amber-500 text-xs mt-0.5">◆</span>
                        {flag}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Risk Assessment Frameworks */}
        <Reveal delay={150}>
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-zinc-900 font-black text-3xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                Risk Assessment Frameworks
              </h2>
              <p className="text-zinc-500 text-sm mt-2">Proven methodologies for identifying and evaluating fraud risk</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {FRAMEWORKS.map((framework, idx) => (
                <div key={idx} className="rounded-xl border border-zinc-200 bg-white p-5 risk-card">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-xl">
                      {framework.icon}
                    </div>
                    <h3 className="font-bold text-zinc-800">{framework.name}</h3>
                  </div>
                  <p className="text-zinc-500 text-sm leading-relaxed">{framework.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Technology in Fraud Detection */}
        <Reveal delay={200}>
          <div className="mb-16">
            <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-8">
              <div className="text-center mb-8">
                <span className="text-4xl mb-2 block">🤖</span>
                <h2 className="text-zinc-900 font-black text-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Technology in Fraud Detection
                </h2>
                <p className="text-zinc-500 text-sm mt-2">Leveraging advanced technology for real-time risk detection</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TECH_CATEGORIES.map((tech, idx) => (
                  <div key={idx} className="bg-white rounded-xl border border-zinc-200 p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{tech.icon}</span>
                      <h3 className="font-bold text-zinc-800">{tech.title}</h3>
                    </div>
                    <p className="text-zinc-500 text-xs mb-3">{tech.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {tech.features.map((feature, fidx) => (
                        <span key={fidx} className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-600">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Mitigation Strategies */}
        <Reveal delay={250}>
          <div>
            <div className="text-center mb-10">
              <h2 className="text-zinc-900 font-black text-3xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                Mitigation and Control Activities
              </h2>
              <p className="text-zinc-500 text-sm mt-2">Three lines of defense against financial fraud</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MITIGATION_STRATEGIES.map((strategy, idx) => (
                <div key={idx} className="rounded-xl border border-zinc-200 bg-white p-6 risk-card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-2xl">
                      {strategy.icon}
                    </div>
                    <h3 className="font-black text-zinc-800 text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {strategy.category}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {strategy.items.map((item, iidx) => (
                      <li key={iidx} className="flex items-start gap-2 text-sm text-zinc-600">
                        <span className="text-amber-500 text-xs mt-0.5">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>


      </main>
    </div>
  );
}