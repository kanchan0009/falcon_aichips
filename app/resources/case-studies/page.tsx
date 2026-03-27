"use client";

import React, { useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════════════════════════
   TYPES & INTERFACES
═══════════════════════════════════════════════════════════════════ */

interface Blog {
  title: string;
  img: string;
}

interface BlogCardProps {
  blog: Blog;
  delay: number;
}

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
}

interface GoldBtnProps {
  children: React.ReactNode;
}

interface PillProps {
  children: React.ReactNode;
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
  }, []);

  return [ref, visible];
}

function Reveal({ children, delay = 0 }: RevealProps) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(40px)",
        transition: `all 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   UI COMPONENTS
═══════════════════════════════════════════════════════════════════ */
function GoldBtn({ children }: GoldBtnProps) {
  return (
    <button
      className="px-5 py-2 rounded-xl text-sm font-bold"
      style={{
        background: "linear-gradient(135deg,#c9940a,#f5d87a)",
        color: "#000",
      }}
    >
      {children}
    </button>
  );
}

function Pill({ children }: PillProps) {
  return (
    <span
      className="text-xs font-bold px-3 py-1 rounded-full"
      style={{
        background: "rgba(201,148,10,0.1)",
        color: "#c9940a",
      }}
    >
      {children}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   BLOG DATA
═══════════════════════════════════════════════════════════════════ */
const BLOGS: Blog[] = [
  {
    title: "KYC remediation made simple: A practical guide",
    img: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b",
  },
  {
    title: "What's the game plan for iGaming Alberta?",
    img: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72",
  },
  {
    title: "How will agentic AI redefine growth?",
    img: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f",
  },
  {
    title: "How precise address data powers identity verification",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  },
  {
    title: "The identity forecast: 5 predictions for building trust in 2026",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
  },
  {
    title: "Global KYC: How to build a compliant programme",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
  },
  {
    title: "A complete guide to implementing an end to end KYC process",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  },
  {
    title: "How to build the ideal KYB onboarding process",
    img: "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9",
  },
  {
    title: "Digital IDs: what they are and why they matter",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   BLOG CARD
═══════════════════════════════════════════════════════════════════ */
function BlogCard({ blog, delay }: BlogCardProps) {
  return (
    <Reveal delay={delay}>
      <div
        className="group cursor-pointer rounded-2xl overflow-hidden"
        style={{
          background: "#fff",
          border: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <div className="overflow-hidden">
          <img
            src={`${blog.img}?auto=format&fit=crop&w=800&q=80`}
            alt={blog.title}
            className="w-full h-[200px] object-cover group-hover:scale-105 transition duration-300"
          />
        </div>

        <div className="p-4">
          <p className="text-xs text-black/50 mb-2">Blog</p>

          <h3 className="text-sm font-bold text-black group-hover:text-yellow-700 transition">
            {blog.title}
          </h3>

          <div className="mt-3 text-xl">→</div>
        </div>
      </div>
    </Reveal>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════════ */
export default function BlogPage() {
  return (
    <main
      className="bg-white min-h-screen overflow-x-hidden"
      style={{ fontFamily: "'Georgia',serif" }}
    >
      {/* HERO */}
      <section className="py-16 sm:py-24 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
          
          {/* LEFT */}
          <Reveal>
            <h1 className="text-4xl sm:text-5xl font-black leading-tight text-black">
              Identity <br /> intelligence blogs
            </h1>
          </Reveal>

          {/* FEATURE CARD */}
          <Reveal delay={0.2}>
            <div
              className="p-6 rounded-2xl"
              style={{
                background: "#fff",
                border: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              <Pill>NEW</Pill>

              <h2 className="text-xl font-bold mt-4 mb-4">
                Is KYC system integration killing your business?
              </h2>

              <GoldBtn>Read now →</GoldBtn>

              <div className="mt-5 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
                  alt="Featured blog"
                  className="w-full h-[180px] object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="py-16 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {BLOGS.map((blog, i) => (
            <BlogCard key={blog.title} blog={blog} delay={i * 0.1} />
          ))}

        </div>

        {/* LOAD MORE */}
        <div className="text-center mt-12">
          <GoldBtn>Load more →</GoldBtn>
        </div>
      </section>
    </main>
  );
}