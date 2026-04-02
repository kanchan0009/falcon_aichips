"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState, ReactNode, CSSProperties, ChangeEvent, FocusEvent ,JSX} from "react";


/* ═══════════════════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════════════════ */
interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  className?: string;
}

interface GoldBtnProps {
  children: ReactNode;
  full?: boolean;
  sm?: boolean;
  onClick?: () => void;
}

interface PillProps {
  children: ReactNode;
}

interface GoldLabelProps {
  children: ReactNode;
}

interface SelectedState {
  date: string;
  time: string;
  name: string;
  email: string;
  company: string;
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  logo: string;
}

interface Office {
  city: string;
  x: string;
  y: string;
  main: boolean;
}

interface FAQItem {
  cat: string;
  q: string;
  a: string;
}

/* ═══════════════════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════════════════ */
function useReveal(threshold = 0.1): [React.RefObject<HTMLDivElement | null>, boolean] {
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
  
  return [ref, visible];
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
  
  const styles: CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : map[direction] || map.up,
    transition: `opacity 0.7s ease ${delay}s, transform 0.75s cubic-bezier(.22,1,.36,1) ${delay}s`,
  };

  return (
    <div ref={ref} className={className} style={styles}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ATOMS
═══════════════════════════════════════════════════════════════════ */
function GoldBtn({ children, full = false, sm = false, onClick }: GoldBtnProps) {
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

function Pill({ children }: PillProps) {
  return (
    <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
      style={{ 
        background: "rgba(201,148,10,0.12)", 
        border: "1px solid rgba(201,148,10,0.4)", 
        color: "#c9940a", 
        fontFamily: "'Georgia',serif" 
      }}>
      {children}
    </span>
  );
}

function GoldLabel({ children }: GoldLabelProps) {
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
   SECTION 1 — SCHEDULE A LIVE DEMO
═══════════════════════════════════════════════════════════════════ */
function ScheduleDemo() {
  const [step, setStep] = useState<number>(1);
  const [selected, setSelected] = useState<SelectedState>({ 
    date: "", 
    time: "", 
    name: "", 
    email: "", 
    company: "" 
  });
  
  const dates: string[] = ["Mon 14", "Tue 15", "Wed 16", "Thu 17", "Fri 18", "Mon 21", "Tue 22"];
  const times: string[] = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

  const handleInputChange = (key: keyof SelectedState) => (e: ChangeEvent<HTMLInputElement>) => {
    setSelected(s => ({ ...s, [key]: e.target.value }));
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "#c9940a";
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "rgba(0,0,0,0.1)";
  };

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Content */}
          <div>
            <Reveal>
              <Pill>Schedule a Demo</Pill>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-black mt-4 mb-6 leading-tight" style={{ fontFamily: "'Georgia',serif" }}>
                See Falcon in<br />
                <span style={{ background: "linear-gradient(135deg,#c9940a,#f5d87a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  action
                </span>
              </h1>
              <p className="text-black/50 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
                Book a personalised 30-minute demo with our solutions team. We'll show you how Falcon verifies identities, prevents fraud, and keeps you compliant — all in real time.
              </p>
            </Reveal>

            {/* Step Indicator */}
            <Reveal delay={0.2}>
              <div className="flex items-center gap-4 mb-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ 
                        background: step >= s ? "linear-gradient(135deg,#c9940a,#f5d87a)" : "rgba(0,0,0,0.05)",
                        color: step >= s ? "#000" : "rgba(0,0,0,0.3)",
                        fontFamily: "'Georgia',serif"
                      }}
                    >
                      {s}
                    </div>
                    {s < 3 && (
                      <div 
                        className="w-8 h-px"
                        style={{ background: step > s ? "#c9940a" : "rgba(0,0,0,0.1)" }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right Form Card */}
          <Reveal delay={0.3} direction="left">
            <div 
              className="p-6 sm:p-8 rounded-3xl"
              style={{ 
                background: "linear-gradient(135deg,#fafafa 0%,#fff 50%,#fafafa 100%)",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.08)"
              }}
            >
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <GoldLabel>Select Date</GoldLabel>
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                      {dates.map((date) => (
                        <button
                          key={date}
                          onClick={() => setSelected(s => ({ ...s, date }))}
                          className="p-3 rounded-xl text-xs font-bold transition-all duration-200"
                          style={{
                            background: selected.date === date ? "linear-gradient(135deg,#c9940a,#f5d87a)" : "#fff",
                            color: selected.date === date ? "#000" : "rgba(0,0,0,0.5)",
                            border: selected.date === date ? "none" : "1px solid rgba(0,0,0,0.1)",
                            fontFamily: "'Georgia',serif"
                          }}
                        >
                          {date}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <GoldLabel>Select Time</GoldLabel>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {times.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelected(s => ({ ...s, time }))}
                          className="p-3 rounded-xl text-xs font-bold transition-all duration-200"
                          style={{
                            background: selected.time === time ? "linear-gradient(135deg,#c9940a,#f5d87a)" : "#fff",
                            color: selected.time === time ? "#000" : "rgba(0,0,0,0.5)",
                            border: selected.time === time ? "none" : "1px solid rgba(0,0,0,0.1)",
                            fontFamily: "'Georgia',serif"
                          }}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <GoldBtn full onClick={() => selected.date && selected.time && setStep(2)}>
                    Continue →
                  </GoldBtn>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm text-black/40" style={{ fontFamily: "'Georgia',serif" }}>
                      {selected.date} at {selected.time}
                    </span>
                    <button 
                      onClick={() => setStep(1)}
                      className="text-xs text-yellow-600 hover:text-yellow-500 underline"
                    >
                      Change
                    </button>
                  </div>

                  {[
                    { key: "name" as const, label: "Full Name", placeholder: "James Harlow", type: "text" },
                    { key: "email" as const, label: "Work Email", placeholder: "james@company.com", type: "email" },
                    { key: "company" as const, label: "Company", placeholder: "Your Company Ltd.", type: "text" },
                  ].map(({ key, label, placeholder, type }) => (
                    <div key={key}>
                      <label className="block text-xs font-bold text-black/50 mb-1.5 uppercase tracking-wider" style={{ fontFamily: "'Georgia',serif" }}>
                        {label}
                      </label>
                      <input 
                        type={type} 
                        placeholder={placeholder}
                        value={selected[key]}
                        onChange={handleInputChange(key)}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                        style={{
                          border: "1.5px solid rgba(0,0,0,0.1)",
                          fontFamily: "'Georgia',serif",
                          background: "#fafafa",
                        }}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                    </div>
                  ))}

                  <div className="flex gap-3 pt-2">
                    <button 
                      onClick={() => setStep(1)} 
                      className="flex-1 py-3 rounded-xl text-sm font-bold text-black/50 border border-black/10 hover:border-black/20 transition-colors" 
                      style={{ fontFamily: "'Georgia',serif" }}
                    >
                      ← Back
                    </button>
                    <div className="flex-[2]">
                      <GoldBtn full onClick={() => selected.name && selected.email && setStep(3)}>
                        Continue → Details
                      </GoldBtn>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="text-center py-8">
                  <div 
                    className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg,#c9940a,#f5d87a)" }}
                  >
                    <svg className="w-10 h-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-black mb-2" style={{ fontFamily: "'Georgia',serif" }}>
                    Demo Scheduled!
                  </h3>
                  <p className="text-black/50 text-sm mb-6">
                    We&apos;ll send a calendar invite to {selected.email} for {selected.date} at {selected.time}.
                  </p>
                  <GoldBtn onClick={() => {
                    setStep(1);
                    setSelected({ date: "", time: "", name: "", email: "", company: "" });
                  }}>
                    Schedule Another
                  </GoldBtn>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════════════════════════════
   SECTION 3 — CLIENT SUCCESS STORIES CAROUSEL
═══════════════════════════════════════════════════════════════════ */
const TESTIMONIALS: Testimonial[] = [
  {
    name: "Michael Schneider",
    role: "Chief Compliance Officer",
    company: "NeoBank Global",
    text: "Partnering with Falcon has been a game-changer. We cut onboarding time by 60% while maintaining 99.2% compliance accuracy across 28 markets. The ROI was visible within the first quarter.",
    rating: 5,
    logo: "NB",
  },
  {
    name: "Sarah Chen",
    role: "VP of Product",
    company: "TradeFi International",
    text: "The integration was seamless. Within days, we were verifying identities across 40+ countries with sub-second response times. Falcon's API documentation is world-class.",
    rating: 5,
    logo: "TF",
  },
  {
    name: "David Okonkwo",
    role: "Head of Risk",
    company: "African Fintech Alliance",
    text: "Fraud attempts dropped 78% in the first month. The machine learning models adapt quickly to new threat patterns, giving us confidence in every customer decision.",
    rating: 5,
    logo: "AF",
  },
  {
    name: "Emma Richardson",
    role: "CEO",
    company: "VerifyNow UK",
    text: "We evaluated 12 vendors. Falcon won on accuracy, speed, and support. Their team feels like an extension of ours — responsive, knowledgeable, genuinely invested in our success.",
    rating: 5,
    logo: "VN",
  },
];

function ClientSuccessStories() {
  const [idx, setIdx] = useState<number>(0);
  const total: number = TESTIMONIALS.length;
  
  const prev = (): void => setIdx((i) => (i - 1 + total) % total);
  const next = (): void => setIdx((i) => (i + 1) % total);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]); // Added dependency

  const current = TESTIMONIALS[idx];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <Pill>Success Stories</Pill>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mt-4" style={{ fontFamily: "'Georgia',serif" }}>
            Trusted by <span style={{ background: "linear-gradient(135deg,#c9940a,#f5d87a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>industry leaders</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="relative max-w-4xl mx-auto">
            {/* Main Card */}
            <div 
              className="p-8 sm:p-12 rounded-3xl relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg,#fafafa 0%,#fff 50%,#fafafa 100%)",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.06)"
              }}
            >
              {/* Quote Icon */}
              <div 
                className="absolute top-6 right-6 text-6xl sm:text-8xl font-black opacity-10"
                style={{ 
                  fontFamily: "'Georgia',serif",
                  color: "#c9940a",
                  lineHeight: 1
                }}
              >
                &ldquo;
              </div>

              <div className="relative z-10">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(current.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="#c9940a" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-lg sm:text-xl text-black/70 leading-relaxed mb-8 italic" style={{ fontFamily: "'Georgia',serif" }}>
                  &ldquo;{current.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div 
                    className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-black"
                    style={{ 
                      background: "linear-gradient(135deg,#c9940a,#f5d87a)",
                      color: "#000",
                      fontFamily: "'Georgia',serif"
                    }}
                  >
                    {current.logo}
                  </div>
                  <div>
                    <div className="font-black text-black" style={{ fontFamily: "'Georgia',serif" }}>{current.name}</div>
                    <div className="text-sm text-black/50">{current.role}, {current.company}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button 
                onClick={prev}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ 
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.1)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
                }}
              >
                <svg className="w-5 h-5 text-black/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {/* Dots */}
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className="w-2 h-2 rounded-full transition-all duration-200"
                    style={{
                      background: i === idx ? "#c9940a" : "rgba(0,0,0,0.15)",
                      transform: i === idx ? "scale(1.3)" : "scale(1)"
                    }}
                  />
                ))}
              </div>

              <button 
                onClick={next}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ 
                  background: "linear-gradient(135deg,#c9940a,#f5d87a)",
                  boxShadow: "0 4px 16px rgba(201,148,10,0.3)"
                }}
              >
                <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 4 — FAQ
═══════════════════════════════════════════════════════════════════ */
const FAQ_CATEGORIES: string[] = ["General", "Compliance", "Technical", "Pricing", "Security", "Integrations"];

const FAQS: FAQItem[] = [
  { cat: "General", q: "How quickly can we go live with Falcon?", a: "Most integrations go live within 2–4 weeks. Our sandbox environment is available immediately, and our developer documentation includes ready-to-use code samples for React, Node.js, Python, and mobile SDKs." },
  { cat: "General", q: "What regions does Falcon cover?", a: "Falcon provides identity verification and fraud prevention across 80+ countries, with local data sources in North America, Europe, APAC, Latin America, and Africa." },
  { cat: "Compliance", q: "Is Falcon compliant with GDPR and CCPA?", a: "Yes. Falcon is fully GDPR and CCPA compliant. We process data as a processor under Article 28, provide DPA agreements, and maintain SOC 2 Type II and ISO 27001 certifications." },
  { cat: "Technical", q: "What APIs and SDKs do you offer?", a: "We offer REST APIs, GraphQL endpoints, and native SDKs for iOS, Android, React Native, and Flutter. Web components are also available for drop-in integration." },
  { cat: "Pricing", q: "How is Falcon priced?", a: "We offer usage-based pricing with volume discounts. Enterprise plans include dedicated support, custom SLA, and bespoke model training. Contact sales for a tailored quote." },
  { cat: "Security", q: "How do you protect customer data?", a: "All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We operate on isolated infrastructure with zero-trust networking and regular penetration testing." },
  { cat: "Integrations", q: "Can Falcon integrate with our existing CRM?", a: "Yes. We offer native integrations with Salesforce, HubSpot, Zendesk, and custom webhooks for any CRM or internal system." },
];

function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<string>("General");
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const filtered: FAQItem[] = FAQS.filter(f => f.cat === activeCategory);

  return (
    <section className="py-16 sm:py-24" style={{ background: "#f8f8f8" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <Pill>FAQ</Pill>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mt-4" style={{ fontFamily: "'Georgia',serif" }}>
            Questions? <span style={{ background: "linear-gradient(135deg,#c9940a,#f5d87a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Answered.</span>
          </h2>
        </Reveal>

        {/* Category Tabs */}
        <Reveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {FAQ_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenIdx(null);
                }}
                className="px-4 py-2 rounded-full text-sm font-bold transition-all duration-200"
                style={{
                  background: activeCategory === cat ? "linear-gradient(135deg,#c9940a,#f5d87a)" : "#fff",
                  color: activeCategory === cat ? "#000" : "rgba(0,0,0,0.5)",
                  border: activeCategory === cat ? "none" : "1px solid rgba(0,0,0,0.1)",
                  fontFamily: "'Georgia',serif",
                  transform: activeCategory === cat ? "scale(1.05)" : "scale(1)"
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* FAQ Items */}
        <Reveal delay={0.2}>
          <div className="space-y-3">
            {filtered.map((faq, i) => {
              const isOpen = openIdx === i;
              return (
                <div 
                  key={i}
                  className="rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    background: "#fff",
                    border: "1px solid rgba(0,0,0,0.06)",
                    boxShadow: isOpen ? "0 8px 24px rgba(0,0,0,0.08)" : "0 2px 8px rgba(0,0,0,0.03)"
                  }}
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
                  >
                    <span className="font-bold text-black pr-4" style={{ fontFamily: "'Georgia',serif" }}>{faq.q}</span>
                    <span 
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                      style={{
                        background: isOpen ? "linear-gradient(135deg,#c9940a,#f5d87a)" : "rgba(0,0,0,0.05)",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"
                      }}
                    >
                      <svg 
                        className="w-4 h-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke={isOpen ? "#000" : "rgba(0,0,0,0.5)"}
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  
                  <div 
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: isOpen ? "200px" : "0px",
                      opacity: isOpen ? 1 : 0
                    }}
                  >
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-black/60 text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 5 — BOTTOM CTA BANNER
═══════════════════════════════════════════════════════════════════ */
function BottomCTA() {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg,#000 0%,#0d0800 25%,#1a1000 50%,#3d2900 75%,#7a5500 100%)" }}>
      
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(201,148,10,0.4) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, rgba(201,148,10,0.3) 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <Reveal>
          <Pill>Get Started</Pill>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white mt-4 mb-6 leading-tight" style={{ fontFamily: "'Georgia',serif" }}>
            Ready to see<br />
            <span style={{ color: "#c9940a" }}>Falcon in action?</span>
          </h2>
          <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-10 max-w-xl mx-auto">
            Join 20,000+ businesses using Falcon to verify identities, prevent fraud, and stay compliant — all in real time.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/see_action"><GoldBtn>Explore Falcon</GoldBtn></Link >
            
          </div>
        </Reveal>
      </div>
      
    </section>
    
    
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ROOT EXPORT
═══════════════════════════════════════════════════════════════════ */
export default function DemoPage(): JSX.Element {
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
          0% { transform: scale(1); opacity:0.7; }
          100% { transform: scale(2.4); opacity:0; }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <ScheduleDemo />
      
      <ClientSuccessStories />
      <FAQSection />
      <BottomCTA />
    </main>
  );
}