"use client";
import { useEffect, useRef, useState, ReactNode,RefObject } from "react";

/* ─── Types ─── */
interface Section {
  heading: string;
  body: string;
}
interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}
interface Stat {
  val: string;
  label: string;
}

interface Topic {
  id: string;
  category: string;
  icon: string;
  color: string;
  title: string;
  subtitle: string;
  overview: string;
  sections: Section[];
  keyTerms: string[];
  stats: Stat[];
}

interface FAQ {
  q: string;
  a: string;
}

interface Glossary {
  term: string;
  def: string;
}

interface TopicCardProps {
  topic: Topic;
  onClick: (topic: Topic) => void;
  index: number;
}

interface TopicModalProps {
  topic: Topic;
  onClose: () => void;
}

interface FAQItemProps {
  faq: FAQ;
  index: number;
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

/* ─── Data ─── */
const TOPICS: Topic[] = [
  {
    id: "kyc",
    category: "Identity",
    icon: "🪪",
    color: "amber",
    title: "Know Your Customer (KYC)",
    subtitle: "The foundation of identity compliance",
    overview: "KYC is a mandatory process financial institutions and regulated businesses use to verify the identity of their clients. It protects against money laundering, fraud, and terrorist financing by ensuring you know who you're actually dealing with.",
    sections: [
      {
        heading: "What is KYC?",
        body: "Know Your Customer (KYC) refers to the set of processes organisations follow to verify a customer's identity before entering a business relationship. It typically involves collecting and verifying personal data such as full legal name, date of birth, address, and government-issued identification.",
      },
      {
        heading: "The 3 Pillars of KYC",
        body: "Modern KYC frameworks rest on three pillars: Customer Identification Program (CIP) — collecting identity data; Customer Due Diligence (CDD) — assessing risk; and Enhanced Due Diligence (EDD) — deeper scrutiny for high-risk customers.",
      },
      {
        heading: "Ongoing Monitoring",
        body: "KYC is not a one-time event. Regulations require periodic re-verification and continuous transaction monitoring to detect behavioural changes that may indicate emerging risk.",
      },
    ],
    keyTerms: ["CIP", "CDD", "EDD", "AML", "PEP Screening", "Sanctions Lists"],
    stats: [{ val: "$3.1T", label: "Money laundered globally per year" }, { val: "47%", label: "Firms fail KYC audits annually" }, { val: "8 min", label: "Avg. manual KYC time" }],
  },
  {
    id: "kyb",
    category: "Business Verification",
    icon: "🏢",
    color: "white",
    title: "Know Your Business (KYB)",
    subtitle: "Verifying companies, not just people",
    overview: "KYB extends KYC principles to business entities. It involves verifying a company's legal existence, ownership structure, and beneficial owners (UBOs) to prevent shell companies and complex corporate structures from being used for illicit purposes.",
    sections: [
      {
        heading: "Why KYB Matters",
        body: "Fraudsters routinely use legal business entities — shell companies, complex holding structures — to obscure illicit funds. KYB cuts through corporate opacity by verifying registration documents, directors, shareholders, and ultimate beneficial ownership.",
      },
      {
        heading: "Ultimate Beneficial Ownership (UBO)",
        body: "Regulations in the EU (4AMLD/5AMLD/6AMLD), US (FinCEN CDD Rule), and UK (PSC Register) require identifying natural persons who own or control more than 25% of a company. Mapping UBO chains is central to KYB.",
      },
      {
        heading: "Digital Business Verification",
        body: "Modern platforms like Falcon connect to 350+ global business registries in real time, cross-referencing company data, filing history, directorships, and adverse media to produce an automated risk score within seconds.",
      },
    ],
    keyTerms: ["UBO", "Shell Companies", "Corporate Registry", "Beneficial Owner", "PSC Register", "6AMLD"],
    stats: [{ val: "2M+", label: "Shell companies registered globally" }, { val: "85%", label: "KYB checks are manual" }, { val: "12 days", label: "Avg. manual KYB completion time" }],
  },
  {
    id: "document-verification",
    category: "Document Intelligence",
    icon: "📄",
    color: "amber",
    title: "Document Verification",
    subtitle: "From paper trust to digital certainty",
    overview: "Document verification is the process of authenticating government-issued identity documents — passports, driver's licences, national ID cards — to confirm they are genuine, unaltered, and belong to the person presenting them.",
    sections: [
      {
        heading: "How Document Verification Works",
        body: "Modern document verification combines Optical Character Recognition (OCR) to extract data, Machine Learning classifiers to detect tampering, and database crosschecks to validate issuing authority standards. NFC chip reading adds a cryptographic layer for chip-enabled documents.",
      },
      {
        heading: "Types of Document Fraud",
        body: "Common threats include counterfeit documents (entirely fabricated), forged documents (altered genuine ones), identity substitution (real document + different photo), and digital injection attacks (injecting fake images into the camera stream).",
      },
      {
        heading: "Liveness Detection",
        body: "Liveness checks confirm the person presenting a document is physically present and not using a photo or pre-recorded video. Passive liveness uses a single selfie and ML analysis; active liveness requires real-time head movements or blinks.",
      },
    ],
    keyTerms: ["OCR", "NFC Reading", "Liveness Detection", "Deepfake Detection", "Injection Attacks", "ICAO 9303"],
    stats: [{ val: "650+", label: "Document types supported by Falcon" }, { val: "0.3s", label: "Average OCR extraction time" }, { val: "99.7%", label: "Forgery detection accuracy" }],
  },
  {
    id: "fraud-detection",
    category: "Fraud & Risk",
    icon: "🛡️",
    color: "white",
    title: "Fraud Detection & Prevention",
    subtitle: "Stopping bad actors before they cost you",
    overview: "Fraud detection is a multi-layered discipline that combines device intelligence, behavioural biometrics, network graph analysis, and machine learning to identify and block fraudulent activity in real time — without creating unnecessary friction for legitimate users.",
    sections: [
      {
        heading: "Identity Fraud Typology",
        body: "Synthetic identity fraud (fabricated identities using real + fake data), account takeover (ATO), first-party fraud (customers misrepresenting themselves), and third-party fraud (stolen identities) represent the four primary fraud vectors financial services must defend against.",
      },
      {
        heading: "Device Intelligence & Signals",
        body: "Device fingerprinting captures 50+ device attributes — browser, OS, screen, fonts, GPU — to build a unique device identity. Combined with IP geolocation, VPN detection, proxy analysis, and behavioural biometrics like typing cadence and mouse movement, it paints a rich risk picture.",
      },
      {
        heading: "ML Risk Scoring",
        body: "Rule-based engines provide explainability; ML models provide adaptability. Falcon's hybrid approach combines static rules with gradient-boosted models trained on billions of signals, producing a calibrated risk score (0–100) for every interaction, updated in real time.",
      },
    ],
    keyTerms: ["Synthetic Identity", "ATO", "Device Fingerprinting", "Velocity Checks", "Graph Analysis", "Risk Score"],
    stats: [{ val: "$485B", label: "Global fraud losses in 2023" }, { val: "73%", label: "Fraud attempts from mobile" }, { val: "1.8ms", label: "Falcon risk score latency" }],
  },
  {
    id: "aml",
    category: "Compliance",
    icon: "⚖️",
    color: "amber",
    title: "Anti-Money Laundering (AML)",
    subtitle: "Compliance that doesn't slow you down",
    overview: "AML refers to the laws, regulations, and procedures designed to prevent criminals from disguising illegally obtained funds as legitimate income. For businesses, AML compliance means screening customers, monitoring transactions, and reporting suspicious activity.",
    sections: [
      {
        heading: "The Money Laundering Lifecycle",
        body: "Money laundering occurs in three stages: Placement (introducing illicit funds into the financial system), Layering (obscuring the trail through complex transactions), and Integration (re-entering 'clean' money into the legitimate economy). AML controls target each stage.",
      },
      {
        heading: "Screening: PEPs, Sanctions & Adverse Media",
        body: "Politically Exposed Persons (PEPs) carry elevated corruption risk due to public office. Sanctions screening checks customers against OFAC, UN, EU, and other lists. Adverse media screening uses NLP to surface negative news — bribery, fraud, trafficking — that structured lists miss.",
      },
      {
        heading: "Transaction Monitoring",
        body: "Rule-based transaction monitoring flags patterns like structuring (breaking large amounts into smaller ones), rapid movement of funds, unusual geographic activity, or high-value cash transactions. Modern systems add ML to reduce the 95%+ false positive rates that plague legacy rule engines.",
      },
    ],
    keyTerms: ["FATF", "SAR", "CTR", "PEP", "OFAC", "Sanctions", "Structuring", "Typologies"],
    stats: [{ val: "2%", label: "Of laundered money is ever seized" }, { val: "95%", label: "AML alerts are false positives" }, { val: "$10.9B", label: "AML fines issued in 2023" }],
  },
  {
    id: "biometrics",
    category: "Biometric Auth",
    icon: "🧬",
    color: "white",
    title: "Biometric Verification",
    subtitle: "The body as the password",
    overview: "Biometric verification uses unique physiological or behavioural characteristics — face, fingerprint, voice, iris — to authenticate identity. Combined with document verification, biometrics creates a cryptographically strong link between a document and its rightful owner.",
    sections: [
      {
        heading: "Facial Recognition & Matching",
        body: "Face matching compares a live selfie against the portrait on a submitted identity document using deep neural networks. Falcon's models measure 128+ facial landmarks, achieving <0.1% false acceptance rate. Unlike 1:N recognition, 1:1 matching is purely about document-to-person verification.",
      },
      {
        heading: "Liveness & Anti-Spoofing",
        body: "ISO 30107-3 defines the framework for Presentation Attack Detection (PAD). Passive liveness (single frame analysis), active liveness (challenge-response), and 3D depth estimation collectively defend against print attacks, screen replay, and 3D mask attacks.",
      },
      {
        heading: "Privacy & Data Minimisation",
        body: "Biometric data is a 'special category' under GDPR. Best practice requires collecting the minimum necessary data, storing only cryptographic embeddings (not raw images), obtaining explicit consent, and providing clear deletion rights. Falcon processes biometrics ephemerally — no raw imagery is stored.",
      },
    ],
    keyTerms: ["FAR", "FRR", "PAD", "ISO 30107-3", "GDPR Article 9", "Deepfake", "3D Mask Attack"],
    stats: [{ val: "1 in 1M", label: "False acceptance rate (Falcon)" }, { val: "0.4s", label: "Face match latency" }, { val: "40+", label: "Liveness attack vectors defended" }],
  },
  {
    id: "digital-identity",
    category: "Digital Identity",
    icon: "🔑",
    color: "amber",
    title: "Digital Identity & eID",
    subtitle: "The shift to portable, verifiable identity",
    overview: "Digital identity standards — eID, verifiable credentials, and decentralised identity — are transforming how people prove who they are online. Governments and standards bodies are converging on interoperable frameworks that put users in control of their own identity data.",
    sections: [
      {
        heading: "Government eID Schemes",
        body: "Over 70 countries operate national eID programmes: Germany's ePA (NFC chip), UK's GOV.UK One Login, India's Aadhaar, and the EU Digital Identity Wallet (eIDAS 2.0). These schemes provide high-assurance identity that businesses can accept in lieu of manual document checks.",
      },
      {
        heading: "Verifiable Credentials (VCs)",
        body: "The W3C Verifiable Credentials standard defines a cryptographically signed, tamper-evident format for digital claims. A VC issued by a government authority can be presented to any relying party without contacting the issuer — the digital equivalent of showing a passport.",
      },
      {
        heading: "Decentralised Identity (DID)",
        body: "Decentralised Identifiers (DIDs) anchor identity to a blockchain or distributed ledger, eliminating central identity authorities. Combined with VCs, they enable self-sovereign identity (SSI) — where users hold and present their own credentials without intermediaries.",
      },
    ],
    keyTerms: ["eIDAS 2.0", "W3C VC", "DID", "SSI", "NFC ePassport", "ICAO 9303", "mdoc / mDL"],
    stats: [{ val: "73", label: "Countries with national eID" }, { val: "2026", label: "EU Digital Identity Wallet deadline" }, { val: "5B+", label: "People with mobile-accessible eID" }],
  },
  {
    id: "data-privacy",
    category: "Privacy & Compliance",
    icon: "🔐",
    color: "white",
    title: "Data Privacy & Regulatory Compliance",
    subtitle: "Building trust through responsible data use",
    overview: "Handling identity data comes with significant legal obligations under GDPR, CCPA, and sector-specific regulations. Understanding the legal bases for processing, data subject rights, and cross-border transfer mechanisms is essential for any business collecting personal data.",
    sections: [
      {
        heading: "GDPR Fundamentals for Identity",
        body: "The EU General Data Protection Regulation requires a lawful basis for processing (typically legitimate interest or legal obligation for KYC). Special category data — biometrics, health data — requires explicit consent or a specific statutory basis. Data Protection Impact Assessments (DPIAs) are mandatory for large-scale biometric processing.",
      },
      {
        heading: "Data Minimisation & Retention",
        body: "GDPR's Article 5 requires collecting only data that is adequate, relevant, and limited to what is necessary. Identity verification data should be retained only as long as required by law (typically 5–7 years for AML purposes) and then securely deleted.",
      },
      {
        heading: "Cross-Border Data Transfers",
        body: "Transferring identity data outside the EEA requires adequate protections: adequacy decisions (US under DPF 2023), Standard Contractual Clauses (SCCs), or Binding Corporate Rules (BCRs). Cloud infrastructure choices must align with data residency requirements.",
      },
    ],
    keyTerms: ["GDPR", "CCPA", "DPIA", "SCCs", "Data Residency", "Right to Erasure", "Legitimate Interest"],
    stats: [{ val: "€4B+", label: "GDPR fines issued to date" }, { val: "72 hrs", label: "Breach notification window" }, { val: "5-7 yrs", label: "Typical AML data retention" }],
  },
  {
    id: "risk-scoring",
    category: "Risk Intelligence",
    icon: "📊",
    color: "amber",
    title: "Risk Scoring & Decision Engines",
    subtitle: "From raw signals to confident decisions",
    overview: "A risk score is a calibrated numerical output that summarises the likelihood of fraud or compliance risk for a given customer, transaction, or event. Decision engines use risk scores — alongside rules, thresholds, and human review — to automate accept/decline/review outcomes at scale.",
    sections: [
      {
        heading: "Building a Risk Score",
        body: "Effective risk scores combine hundreds of signals: identity attributes (name, DOB, address), document authenticity, device intelligence, behavioural biometrics, network graph position, historical transaction patterns, and external data sources. Features are weighted by their predictive power on labelled fraud datasets.",
      },
      {
        heading: "Rule Engines vs. ML Models",
        body: "Rule engines (if-then logic) are transparent, fast to deploy, and easy to explain to regulators. ML models (XGBoost, neural networks) capture non-linear patterns and adapt to new fraud typologies. Best-in-class platforms combine both: rules for hard blocks, ML for nuanced scoring.",
      },
      {
        heading: "Champion-Challenger Testing",
        body: "Risk models degrade over time as fraudsters adapt. Champion-challenger frameworks continuously test new model versions against the live model on a traffic split, allowing safe, data-driven model updates without full production rollout.",
      },
    ],
    keyTerms: ["Risk Score", "Feature Engineering", "XGBoost", "Precision/Recall", "ROC Curve", "Model Drift", "Champion-Challenger"],
    stats: [{ val: "500+", label: "Signals in Falcon's risk engine" }, { val: "0.3%", label: "False positive rate (Falcon)" }, { val: "40%", label: "Avg. fraud reduction vs. rules-only" }],
  },
];

const CATEGORIES: string[] = ["All", ...Array.from(new Set(TOPICS.map(t => t.category)))];

/* ─── Topic Card ─── */
function TopicCard({ topic, onClick, index }: TopicCardProps) {
  const [ref, inView] = useInView(0.08);
  const isAmber = topic.color === "amber";
  return (
    <div ref={ref} style={{ transitionDelay: `${(index % 3) * 80}ms` }}
      className={`transition-all duration-600 ease-out cursor-pointer group ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      onClick={() => onClick(topic)}>
      <div className={`h-full rounded-2xl border p-6 flex flex-col gap-4 topic-card
        ${isAmber ? "border-white/10 bg-white shadow-sm" : "border-zinc-200 bg-white shadow-sm"}`}>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-300
          ${isAmber ? "border border-amber-400/30 bg-amber-400/10 group-hover:bg-amber-400/20" : "border border-amber-500/25 bg-amber-50 group-hover:bg-amber-100"}`}>
          {topic.icon}
        </div>
        <div>
          <span className={`text-xs font-semibold tracking-widest uppercase ${isAmber ? "text-amber-600" : "text-amber-600"}`}>{topic.category}</span>
          <h3 className={`mt-1 text-lg font-bold leading-snug text-zinc-900 group-hover:text-amber-700 transition-colors duration-300`}
            style={{ fontFamily: "'Playfair Display', serif" }}>
            {topic.title}
          </h3>
          <p className={`mt-2 text-xs leading-relaxed line-clamp-3 text-zinc-500`}>{topic.overview}</p>
        </div>
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-zinc-100">
          <div className="flex flex-wrap gap-1">
            {topic.keyTerms.slice(0, 3).map(t => (
              <span key={t} className={`text-xs px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-500`}>{t}</span>
            ))}
          </div>
          <svg className={`w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 text-amber-500/40 group-hover:text-amber-600`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─── Topic Detail Modal ─── */
function TopicModal({ topic, onClose }: TopicModalProps) {
  const [activeSection, setActiveSection] = useState<number>(0);
  const isAmber = topic.color === "amber";
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={e => e.target === e.currentTarget && onClose()}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      {/* Panel */}
      <div className="relative z-10 w-full sm:max-w-3xl max-h-[95vh] sm:max-h-[85vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-zinc-200 bg-white shadow-2xl"
        style={{ animation: "modalIn .35s cubic-bezier(.23,1,.32,1) both" }}>
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between p-6 bg-white/95 backdrop-blur-sm border-b border-zinc-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl border border-amber-400/30 bg-amber-400/10 flex items-center justify-center text-2xl shrink-0">
              {topic.icon}
            </div>
            <div>
              <span className="text-amber-600 text-xs font-semibold tracking-widest uppercase">{topic.category}</span>
              <h2 className="text-zinc-900 text-xl font-black" style={{ fontFamily: "'Playfair Display',serif" }}>{topic.title}</h2>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-600 hover:text-zinc-900 transition-colors duration-200 shrink-0 mt-1">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Overview */}
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
            <p className="text-zinc-700 text-sm leading-relaxed">{topic.overview}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {topic.stats.map((s, i) => (
              <div key={i} className="rounded-xl bg-zinc-50 border border-zinc-200 p-3 text-center">
                <div className="text-xl font-black gs-light" style={{ fontFamily: "'Playfair Display',serif" }}>{s.val}</div>
                <div className="text-zinc-500 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Section tabs */}
          <div>
            <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
              {topic.sections.map((s, i) => (
                <button key={i} onClick={() => setActiveSection(i)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-250 shrink-0
                    ${activeSection === i ? "bg-amber-500 text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"}`}>
                  {s.heading}
                </button>
              ))}
            </div>
            <div className="rounded-xl bg-zinc-50 border border-zinc-200 p-5">
              <h4 className="text-zinc-900 font-bold text-base mb-3" style={{ fontFamily: "'Playfair Display',serif" }}>
                {topic.sections[activeSection].heading}
              </h4>
              <p className="text-zinc-600 text-sm leading-relaxed">{topic.sections[activeSection].body}</p>
            </div>
          </div>

          {/* Key terms */}
          <div>
            <h4 className="text-zinc-500 text-xs font-semibold tracking-widest uppercase mb-3">Key Terms</h4>
            <div className="flex flex-wrap gap-2">
              {topic.keyTerms.map(t => (
                <span key={t} className="px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-medium">{t}</span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-xl bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 p-5 flex items-center justify-between gap-4">
            <div>
              <div className="text-zinc-900 font-bold text-sm" style={{ fontFamily: "'Playfair Display',serif" }}>See how Falcon handles {topic.title}</div>
              <div className="text-zinc-500 text-xs mt-0.5">Explore the product in a live sandbox environment</div>
            </div>
            <button className="gold-btn shrink-0 px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap">Try it free →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── FAQ ─── */
const FAQS: FAQ[] = [
  { q: "What's the difference between KYC and KYB?", a: "KYC (Know Your Customer) verifies natural persons. KYB (Know Your Business) verifies legal entities — companies, partnerships, trusts — and maps their ultimate beneficial owners back to natural persons. Both are required for complete onboarding compliance." },
  { q: "How does Falcon handle biometric data under GDPR?", a: "Falcon processes biometric data ephemerally. Raw selfie imagery is used only to generate a mathematical face embedding during the verification session and is never stored. Only the verification result and a confidence score are retained." },
  { q: "What is a risk score and how is it calculated?", a: "A risk score (0–100) is a calibrated probability that a given identity, transaction, or event represents fraud or compliance risk. Falcon's scores combine 500+ signals — document authenticity, device intelligence, behavioural biometrics, network graphs — using a hybrid rule + ML approach." },
  { q: "What regulations require AML screening?", a: "Key frameworks include FATF Recommendations (global), EU Anti-Money Laundering Directives (4AMLD/5AMLD/6AMLD), US Bank Secrecy Act / FinCEN CDD Rule, UK Money Laundering Regulations 2017, and sector-specific rules from FCA, FINMA, MAS, and others." },
  { q: "Does Falcon support NFC-based document verification?", a: "Yes. Falcon reads the NFC chip embedded in ePassports and national ID cards that comply with ICAO 9303. NFC verification provides the highest assurance level — the chip data is cryptographically signed by the issuing government and cannot be cloned." },
  { q: "What is synthetic identity fraud?", a: "Synthetic identity fraud involves creating a fictitious identity by combining real data (e.g. a legitimate SSN) with fabricated information (fake name, DOB, address). It's the fastest-growing fraud type in financial services, responsible for over $20B in annual losses in the US alone." },
  { q: "How quickly can we integrate Falcon?", a: "Most integrations go live in under 5 days using Falcon's SDKs (iOS, Android, Web) or REST API. No-code flow builders let compliance teams adjust verification logic without engineering involvement." },
  { q: "What does 'continuous monitoring' mean in practice?", a: "Continuous monitoring means re-screening existing customers against updated sanctions lists, PEP databases, and adverse media on an ongoing basis — not just at onboarding. Falcon's monitoring engine re-checks your entire customer base nightly and surfaces changes requiring review." },
];

function FAQItem({ faq, index }: FAQItemProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [ref, inView] = useInView(0.1);
  return (
    <div ref={ref} style={{ transitionDelay: `${index * 60}ms` }}
      className={`transition-all duration-600 ease-out border-b border-zinc-100 last:border-0 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
      <button className="w-full flex items-start justify-between gap-4 py-5 text-left group"
        onClick={() => setOpen(!open)}>
        <span className="text-zinc-900 font-semibold text-sm leading-snug group-hover:text-amber-600 transition-colors duration-200">{faq.q}</span>
        <svg className={`w-5 h-5 text-amber-500 shrink-0 mt-0.5 transition-transform duration-300 ${open ? "rotate-45" : ""}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-400 ease-out ${open ? "max-h-60 pb-5" : "max-h-0"}`}>
        <p className="text-zinc-500 text-sm leading-relaxed">{faq.a}</p>
      </div>
    </div>
  );
}

/* ─── GLOSSARY ─── */
const GLOSSARY: Glossary[] = [
  { term:"AML", def:"Anti-Money Laundering — laws and controls that prevent criminals from disguising illicit funds as legitimate income." },
  { term:"CDD", def:"Customer Due Diligence — the process of assessing a customer's risk profile by verifying identity and understanding the nature of their business." },
  { term:"Deepfake", def:"AI-generated synthetic media (images, video, audio) used to impersonate individuals in identity fraud attacks." },
  { term:"EDD", def:"Enhanced Due Diligence — additional scrutiny applied to high-risk customers such as PEPs, high-net-worth individuals, or customers in high-risk jurisdictions." },
  { term:"eIDAS", def:"Electronic Identification, Authentication and Trust Services — the EU regulation governing digital identity and electronic signatures." },
  { term:"FATF", def:"Financial Action Task Force — the inter-governmental body that sets global AML/CFT standards followed by 200+ jurisdictions." },
  { term:"KYC", def:"Know Your Customer — mandatory identity verification of customers before entering a business relationship." },
  { term:"Liveness", def:"A biometric control that confirms a real, live person is present during verification, defending against spoofing attacks." },
  { term:"OFAC", def:"Office of Foreign Assets Control — the US Treasury agency that administers and enforces economic and trade sanctions." },
  { term:"PAD", def:"Presentation Attack Detection — ISO 30107-3 standard for detecting fake biometric presentations (printed photos, masks, replays)." },
  { term:"PEP", def:"Politically Exposed Person — an individual entrusted with a prominent public function, requiring enhanced due diligence." },
  { term:"SAR", def:"Suspicious Activity Report — a mandatory filing submitted to financial intelligence units when suspicious behaviour is detected." },
  { term:"SSI", def:"Self-Sovereign Identity — a model where individuals own and control their identity data without relying on central intermediaries." },
  { term:"UBO", def:"Ultimate Beneficial Owner — the natural person who ultimately owns or controls a legal entity." },
  { term:"VC", def:"Verifiable Credential — a W3C standard for cryptographically signed, tamper-evident digital identity claims." },
];

/* ══════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════ */
export default function LearnMorePage() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [modalTopic, setModalTopic] = useState<Topic | null>(null);
  const [glossaryQ, setGlossaryQ] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("topics");

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const filtered: Topic[] = activeFilter === "All" ? TOPICS
    : TOPICS.filter(t => t.category === activeFilter);

  const filteredGlossary: Glossary[] = GLOSSARY.filter(g =>
    g.term.toLowerCase().includes(glossaryQ.toLowerCase()) ||
    g.def.toLowerCase().includes(glossaryQ.toLowerCase())
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-white" style={{ fontFamily:"'DM Sans',sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=Playfair+Display:wght@700;800;900&display=swap');

        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes floatOrb { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-20px) scale(1.04)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scaleIn { from{opacity:0;transform:scale(.94)} to{opacity:1;transform:scale(1)} }
        @keyframes modalIn { from{opacity:0;transform:translateY(30px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes lineGrow { from{width:0} to{width:3rem} }

        .gs-dark {
          background:linear-gradient(90deg,#D4AF37,#F5E17B,#D4AF37,#B8960C,#D4AF37);
          background-size:200% auto;
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;
          background-clip:text;animation:shimmer 4s linear infinite;
        }
        .gs-light {
          background:linear-gradient(90deg,#B8960C,#D4AF37,#8B6914,#D4AF37,#B8960C);
          background-size:200% auto;
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;
          background-clip:text;animation:shimmer 4s linear infinite;
        }

        .gold-btn { background:linear-gradient(135deg,#D4AF37,#B8960C); color:#000; font-weight:700; transition:all .3s cubic-bezier(.23,1,.32,1); }
        .gold-btn:hover { transform:translateY(-2px); box-shadow:0 8px 30px rgba(212,175,55,.45); }

        .topic-card { transition:all .4s cubic-bezier(.23,1,.32,1); }
        .topic-card:hover { transform:translateY(-4px); box-shadow:0 20px 60px rgba(212,175,55,.12); }

        .tab-active { background:linear-gradient(135deg,#D4AF37,#B8960C); color:#000; }

        .grid-dots {
          background-image: radial-gradient(rgba(212,175,55,.12) 1px, transparent 1px);
          background-size: 32px 32px;
        }

        .line-clamp-3 {
          display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;
        }
        .filter-chip { transition:all .25s cubic-bezier(.23,1,.32,1); }
        .filter-chip.active { background:linear-gradient(135deg,#D4AF37,#B8960C);color:#000;box-shadow:0 0 16px rgba(212,175,55,.35); }
      `}</style>

      {/* ── ambient orbs ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{ background:"radial-gradient(circle,rgba(212,175,55,.06) 0%,transparent 70%)", animation:"floatOrb 16s ease-in-out infinite" }} />
        <div className="absolute bottom-1/4 right-1/5 w-96 h-96 rounded-full"
          style={{ background:"radial-gradient(circle,rgba(0,0,0,.02) 0%,transparent 70%)", animation:"floatOrb 20s ease-in-out infinite reverse" }} />
      </div>

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative z-10 pt-20 pb-16 px-4 text-center grid-dots overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background:"radial-gradient(ellipse 70% 50% at 50% 0%,rgba(212,175,55,.08) 0%,transparent 70%)" }} />

        <div style={{ animation:"scaleIn .8s cubic-bezier(.23,1,.32,1) both" }}>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-700 text-xs font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />Knowledge Centre
          </span>
        </div>

        <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl font-black leading-none tracking-tight"
          style={{ fontFamily:"'Playfair Display',serif", animation:"scaleIn .9s ease .1s both" }}>
          <span className="text-zinc-900">Learn</span>{" "}
          <span className="gs-dark">everything</span>
          <br />
          <span className="text-zinc-900">about identity</span>
        </h1>

        <div className="mt-5 mx-auto"
          style={{ height:"2px", background:"linear-gradient(90deg,transparent,#D4AF37,transparent)", animation:"lineGrow 1s ease .5s both", width:"3rem" }} />

        <p className="mt-6 text-zinc-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          style={{ animation:"fadeUp 1s ease .3s both" }}>
          From KYC basics to deepfake defence — a comprehensive resource hub covering every dimension of fraud prevention, identity verification, and compliance.
        </p>

        {/* search */}
        <div className="mt-8 max-w-lg mx-auto relative" style={{ animation:"fadeUp 1s ease .4s both" }}>
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0" />
          </svg>
          <input
            value={glossaryQ} onChange={e => { setGlossaryQ(e.target.value); if (e.target.value) setActiveTab("glossary"); }}
            placeholder="Search topics, terms, acronyms…"
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-zinc-200 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:border-amber-400/50 transition-colors duration-200 shadow-sm" />
        </div>

        {/* quick stats */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-center" style={{ animation:"fadeUp 1s ease .5s both" }}>
          {[
            { val:"9", label:"Core Topics"   },
            { val:"15", label:"Key Terms"     },
            { val:"8",  label:"FAQs Answered" },
            { val:"30+", label:"Regulations Covered" },
          ].map((s,i)=>(
            <div key={i} className="flex flex-col gap-0.5">
              <span className="text-2xl font-black gs-dark" style={{ fontFamily:"'Playfair Display',serif" }}>{s.val}</span>
              <span className="text-zinc-400 text-xs">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════ TAB NAV ══════════════ */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3 py-3 overflow-x-auto">
          {[
            { id:"topics",    label:"📚 Topics"    },
            { id:"glossary",  label:"📖 Glossary"  },
            { id:"faq",       label:"❓ FAQ"        },
          ].map(tab=>(
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-250 whitespace-nowrap
                ${activeTab === tab.id ? "tab-active" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"}`}>
              {tab.label}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-zinc-400 text-xs hidden sm:block">Filter by:</span>
            {CATEGORIES.map(c=>(
              <button key={c} onClick={() => { setActiveFilter(c); setActiveTab("topics"); }}
                className={`filter-chip px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap
                  ${activeFilter === c && activeTab === "topics"
                    ? "active border-amber-400"
                    : "border-zinc-200 text-zinc-500 hover:border-amber-400/30 hover:text-zinc-700 bg-white"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* ══════════════ TOPICS TAB ══════════════ */}
        {activeTab === "topics" && (
          <>
            {/* topic count */}
            <Reveal>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-zinc-900 font-black text-2xl" style={{ fontFamily:"'Playfair Display',serif" }}>
                    {activeFilter === "All" ? "All Topics" : activeFilter}
                  </h2>
                  <p className="text-zinc-400 text-xs mt-0.5">{filtered.length} topic{filtered.length !== 1 ? "s" : ""} — click any card to dive deeper</p>
                </div>
                <div className="h-px flex-1 mx-6 bg-gradient-to-r from-transparent via-zinc-200 to-transparent hidden sm:block" />
              </div>
            </Reveal>

            {/* grid — alternates amber-dark and white cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((topic, i) => (
                <TopicCard key={topic.id} topic={topic} index={i} onClick={setModalTopic} />
              ))}
            </div>

            {/* learning path CTA */}
            <Reveal delay={200} className="mt-16">
              <div className="rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-8 md:p-12 relative overflow-hidden shadow-lg">
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-amber-400/40 rounded-tl-3xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-amber-400/40 rounded-br-3xl pointer-events-none" />
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background:"radial-gradient(ellipse 60% 50% at 50% 0%,rgba(212,175,55,.05) 0%,transparent 70%)" }} />
                <div className="relative z-10 max-w-2xl">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-700 text-xs font-semibold tracking-widest uppercase mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />Recommended Learning Path
                  </span>
                  <h3 className="text-zinc-900 text-3xl font-black leading-tight" style={{ fontFamily:"'Playfair Display',serif" }}>
                    Start with KYC → KYB → Fraud<br /><span className="gs-dark">→ AML → Biometrics</span>
                  </h3>
                  <p className="mt-4 text-zinc-600 text-sm leading-relaxed max-w-lg">
                    New to identity verification? Follow this path to build a complete mental model — from verifying individuals to detecting sophisticated fraud.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button className="gold-btn px-5 py-2.5 rounded-xl text-sm">Explore with Falcon sandbox →</button>
                    <button className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-zinc-200 text-zinc-600 hover:border-amber-400/30 hover:text-amber-700 transition-all duration-200 bg-white">Download compliance guide</button>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* compliance framework grid */}
            <Reveal delay={100} className="mt-16">
              <h2 className="text-zinc-900 font-black text-2xl mb-6" style={{ fontFamily:"'Playfair Display',serif" }}>
                Regulatory Frameworks at a Glance
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name:"FATF Recommendations", region:"🌐 Global", desc:"The 40 Recommendations set the baseline for AML/CFT controls that 200+ jurisdictions follow.", scope:"AML / CFT" },
                { name:"EU AML Directives", region:"🇪🇺 Europe", desc:"4AMLD through 6AMLD progressively tighten KYC, UBO disclosure, and sanctions screening requirements.", scope:"KYC / KYB / AML" },
                { name:"eIDAS 2.0", region:"🇪🇺 Europe", desc:"Creates the EU Digital Identity Wallet and mandates high-assurance eID acceptance across member states.", scope:"Digital Identity" },
                { name:"US Bank Secrecy Act", region:"🇺🇸 United States", desc:"Requires financial institutions to maintain anti-money laundering programmes and file SARs and CTRs.", scope:"AML / Reporting" },
                { name:"FinCEN CDD Rule", region:"🇺🇸 United States", desc:"Mandates collection and verification of beneficial ownership for US legal entity customers of banks.", scope:"KYB / UBO" },
                { name:"GDPR", region:"🇪🇺 Europe", desc:"Governs collection and processing of personal and biometric data with strict consent and deletion rights.", scope:"Privacy" },
                { name:"UK MLR 2017", region:"🇬🇧 United Kingdom", desc:"Implements FATF standards in UK law, requiring CDD, EDD, ongoing monitoring, and SAR filing.", scope:"AML / KYC" },
                { name:"MAS AML Notice", region:"🇸🇬 Singapore", desc:"MAS Notice 626 and related notices set AML/CFT obligations for Singapore-regulated financial institutions.", scope:"AML / KYC" },
              ].map((fw, i) => (
                <Reveal key={fw.name} delay={i * 60}>
                  <div className="rounded-xl border border-zinc-200 bg-white p-4 h-full hover:border-amber-400/30 transition-colors duration-300 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-zinc-500">{fw.region}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-semibold">{fw.scope}</span>
                    </div>
                    <h4 className="text-zinc-900 font-bold text-sm mb-1" style={{ fontFamily:"'Playfair Display',serif" }}>{fw.name}</h4>
                    <p className="text-zinc-500 text-xs leading-relaxed">{fw.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </>
        )}

        {/* ══════════════ GLOSSARY TAB ══════════════ */}
        {activeTab === "glossary" && (
          <>
            <Reveal>
              <div className="mb-8">
                <h2 className="text-zinc-900 font-black text-2xl" style={{ fontFamily:"'Playfair Display',serif" }}>Glossary of Terms</h2>
                <p className="text-zinc-400 text-xs mt-1">{filteredGlossary.length} term{filteredGlossary.length !== 1 ? "s" : ""} — use the search bar above to filter</p>
              </div>
            </Reveal>

            {/* search within glossary */}
            <Reveal delay={80}>
              <div className="relative mb-8 max-w-md">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0" />
                </svg>
                <input value={glossaryQ} onChange={e => setGlossaryQ(e.target.value)}
                  placeholder="Filter terms…"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-zinc-200 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:border-amber-400/50 transition-colors duration-200 shadow-sm" />
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGlossary.map((g, i) => (
                <Reveal key={g.term} delay={i * 40}>
                  <div className="rounded-xl border border-zinc-200 bg-white p-5 hover:border-amber-400/25 transition-colors duration-300 group shadow-sm">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-amber-700 font-black text-base" style={{ fontFamily:"'Playfair Display',serif" }}>{g.term}</span>
                      <div className="w-6 h-6 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                        <span className="text-amber-600 text-xs font-bold">{g.term[0]}</span>
                      </div>
                    </div>
                    <p className="text-zinc-600 text-xs leading-relaxed">{g.def}</p>
                  </div>
                </Reveal>
              ))}
              {filteredGlossary.length === 0 && (
                <div className="col-span-3 text-center py-12 text-zinc-400">
                  No terms match "<span className="text-zinc-600">{glossaryQ}</span>"
                </div>
              )}
            </div>
          </>
        )}

        {/* ══════════════ FAQ TAB ══════════════ */}
        {activeTab === "faq" && (
          <>
            <Reveal>
              <div className="mb-10">
                <h2 className="text-zinc-900 font-black text-2xl" style={{ fontFamily:"'Playfair Display',serif" }}>Frequently Asked Questions</h2>
                <p className="text-zinc-400 text-xs mt-1">Everything you need to know about identity, fraud, and compliance</p>
              </div>
            </Reveal>

            <div className="max-w-3xl">
              <div className="rounded-2xl border border-zinc-200 bg-white px-6 divide-y divide-zinc-100 shadow-sm">
                {FAQS.map((faq, i) => <FAQItem key={i} faq={faq} index={i} />)}
              </div>
            </div>

            {/* still have questions */}
            <Reveal delay={200} className="mt-14 max-w-3xl">
              <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-8 flex flex-col sm:flex-row items-center gap-6 shadow-md">
                <div className="w-14 h-14 rounded-2xl border border-amber-400/30 bg-amber-400/10 flex items-center justify-center text-3xl shrink-0">💬</div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-zinc-900 font-bold text-lg" style={{ fontFamily:"'Playfair Display',serif" }}>Still have questions?</h3>
                  <p className="text-zinc-500 text-sm mt-1">Our identity experts are available to walk you through any compliance or technical question.</p>
                </div>
                <button className="gold-btn px-5 py-2.5 rounded-xl text-sm whitespace-nowrap shrink-0">Talk to an expert →</button>
              </div>
            </Reveal>
          </>
        )}

      </main>

      {/* ══════════════ TOPIC MODAL ══════════════ */}
      {modalTopic && <TopicModal topic={modalTopic} onClose={() => setModalTopic(null)} />}

    </div>
  );
}