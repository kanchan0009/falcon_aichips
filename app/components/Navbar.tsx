"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

interface DropdownItem {
  title: string;
  desc: string;
}

interface NavItem {
  label: string;
  href?: string;
  dropdown: DropdownItem[] | null;
}

const navItems: NavItem[] = [
  {
    label: "Products",
    dropdown: [
      { title: "Identity Verification", desc: "Verify identities instantly" },
      { title: "Fraud Detection", desc: "AI-powered fraud prevention" },
      { title: "Document Verification", desc: "Authenticate documents fast" },
      { title: "Age Verification", desc: "Compliant age checks" },
    ],
  },
  {
    label: "Solutions",
    dropdown: [
      { title: "Financial Services", desc: "KYC & AML compliance" },
      { title: "Gaming & Gambling", desc: "Responsible gaming tools" },
      { title: "Insurance", desc: "Patient identity management" },
      { title: "Retail & eCommerce", desc: "Secure customer journeys" },
    ],
  },
  {
    label: "Resources",
    dropdown: [
      { title: "Blog", desc: "Insights & industry news" },
      { title: "Case Studies", desc: "Real-world results" },
      { title: "Documentation", desc: "Developer guides & API docs" },
      { title: "Webinars", desc: "Live & on-demand sessions" },
    ],
  },
  {
    label: "Customers",
    href: "/customers",
    dropdown: null,
  },
  {
    label: "About Us",
    href: "/about-us",
    dropdown: null,
  },
];

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function Navbar(): React.ReactElement {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Close mobile menu helper
  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
    setActiveDropdown(null);
    setLangOpen(false);
  }, []);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(e.target as Node)) {
      setActiveDropdown(null);
      setLangOpen(false);
      setMobileOpen(false);
      setMobileExpanded(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  // Handle mobile link click - closes menu for items without dropdown
  const handleMobileLinkClick = useCallback(() => {
    closeMobileMenu();
  }, [closeMobileMenu]);

  
  const handleMobileDropdownToggle = useCallback(
    (item: NavItem) => {
      if (item.dropdown) {
        
        setMobileExpanded((prev) => (prev === item.label ? null : item.label));
      } else {
        
        closeMobileMenu();
      }
    },
    [closeMobileMenu],
  );

  // Handle mobile dropdown item click
  const handleMobileDropdownItemClick = useCallback(() => {
    closeMobileMenu();
  }, [closeMobileMenu]);

  return (
    <nav
      ref={navRef}
      className="w-full sticky top-0 z-50"
      style={{
        background:
          "linear-gradient(135deg, #000000 0%, #1a1000 40%, #7a5500 75%, #c9940a 100%)",
        boxShadow: "0 2px 32px 0 rgba(180,130,0,0.18)",
      }}
    >
      {/* Golden shimmer line at top */}
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #c9940a 30%, #f5d87a 50%, #c9940a 70%, transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" onClick={handleMobileLinkClick}>
            <div className="flex items-center gap-3 flex-shrink-0 cursor-pointer hover:scale-[1.02] transition-transform duration-200">
              

              <div className="w-14 h-14 relative">
                <Image
                  src="/image0.jpeg" 
                  alt="Logo"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>

              <span
                className="text-white font-bold text-xl tracking-widest uppercase"
                style={{
                  fontFamily: "'Georgia', serif",
                  letterSpacing: "0.15em",
                  textShadow: "0 0 16px rgba(201,148,10,0.5)",
                }}
              >
                FALCON
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="flex items-center px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors duration-200 rounded-md hover:bg-white/5 group"
                    style={{
                      fontFamily: "'Georgia', serif",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors duration-200 rounded-md hover:bg-white/5 group"
                    style={{
                      fontFamily: "'Georgia', serif",
                      letterSpacing: "0.03em",
                    }}
                    onMouseEnter={() =>
                      item.dropdown && setActiveDropdown(item.label)
                    }
                    onClick={() =>
                      item.dropdown &&
                      setActiveDropdown(
                        activeDropdown === item.label ? null : item.label,
                      )
                    }
                  >
                    {item.label}
                    {item.dropdown && (
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 text-yellow-400 ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </button>
                )}

                {/* Dropdown */}
                {item.dropdown && activeDropdown === item.label && (
                  <div
                    className="absolute top-full left-0 mt-2 w-64 rounded-xl overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(160deg, #0d0900 0%, #2a1c00 60%, #5a3e00 100%)",
                      border: "1px solid rgba(201,148,10,0.3)",
                      boxShadow:
                        "0 16px 48px rgba(0,0,0,0.7), 0 0 24px rgba(201,148,10,0.15)",
                    }}
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {/* Shimmer top line */}
                    <div
                      className="h-px w-full"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, #c9940a 50%, transparent)",
                      }}
                    />
                    <div className="p-2">
                      {item.dropdown.map((d) => (
                        <Link
                          key={d.title}
                          href={`/${slugify(item.label)}/${slugify(d.title)}`}
                          className="w-full text-left px-4 py-3 rounded-lg group hover:bg-white/5 transition-colors duration-150 block"
                        >
                          <div
                            className="text-sm font-semibold text-white group-hover:text-yellow-300 transition-colors"
                            style={{ fontFamily: "'Georgia', serif" }}
                          >
                            {d.title}
                          </div>
                          <div className="text-xs text-white/50 mt-0.5">
                            {d.desc}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {/* CTA Button */}
            <Link href="/demo">
              <button
                className="px-5 py-2 rounded-lg text-sm font-bold text-black transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background:
                    "linear-gradient(135deg, #c9940a 0%, #f5d87a 50%, #c9940a 100%)",
                  backgroundSize: "200% 100%",
                  boxShadow:
                    "0 0 20px rgba(201,148,10,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
                  fontFamily: "'Georgia', serif",
                  letterSpacing: "0.04em",
                }}
              >
                Get a demo
              </button>
            </Link>
          </div>

          {/* Hamburger (mobile) */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-yellow-400 transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-yellow-400 transition-all duration-300 ${
                mobileOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-yellow-400 transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          borderTop: "1px solid rgba(201,148,10,0.2)",
          background: "linear-gradient(180deg, #0d0900 0%, #1a1000 100%)",
        }}
      >
        <div className="px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <div key={item.label}>
              {item.href ? (
                // Items with href - close menu on click
                <Link
                  href={item.href}
                  onClick={handleMobileLinkClick}
                  className="w-full block px-4 py-3 rounded-lg text-white/90 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <span
                    className="font-medium text-sm"
                    style={{
                      fontFamily: "'Georgia', serif",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {item.label}
                  </span>
                </Link>
              ) : (
                // Items with dropdown - toggle or close
                <button
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-white/90 hover:text-white hover:bg-white/5 transition-colors"
                  onClick={() => handleMobileDropdownToggle(item)}
                >
                  <span
                    className="font-medium text-sm"
                    style={{
                      fontFamily: "'Georgia', serif",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {item.label}
                  </span>
                  {item.dropdown && (
                    <svg
                      className={`w-4 h-4 text-yellow-400 transition-transform duration-200 ${
                        mobileExpanded === item.label ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </button>
              )}

              {/* Mobile Dropdown */}
              {item.dropdown && mobileExpanded === item.label && (
                <div className="ml-4 mt-1 mb-2 space-y-1 pl-3 border-l border-yellow-700/40">
                  {item.dropdown.map((d) => (
                    <Link
                      key={d.title}
                      href={`/${slugify(item.label)}/${slugify(d.title)}`}
                      onClick={handleMobileDropdownItemClick}
                      className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors block"
                    >
                      <div
                        className="text-sm font-semibold text-white/90 hover:text-yellow-300"
                        style={{ fontFamily: "'Georgia', serif" }}
                      >
                        {d.title}
                      </div>
                      <div className="text-xs text-white/40 mt-0.5">
                        {d.desc}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          {/* Mobile lang + CTA */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <button
              className="flex items-center gap-2 text-white/70 text-sm px-2 py-1"
              onClick={() => setLangOpen(!langOpen)}
            >
              <svg
                className="w-4 h-4 text-yellow-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
              </svg>
              {selectedLang}
            </button>
            <Link href="/demo" onClick={handleMobileLinkClick}>
              <button
                className="px-5 py-2 rounded-lg text-xs font-bold text-black"
                style={{
                  background:
                    "linear-gradient(135deg, #c9940a 0%, #f5d87a 50%, #c9940a 100%)",
                  boxShadow: "0 0 16px rgba(201,148,10,0.35)",
                  fontFamily: "'Georgia', serif",
                }}
              >
                Get a demo
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
