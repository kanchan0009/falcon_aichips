"use client";

import Link from "next/link";

interface LinkItem {
  label: string;
  external?: boolean;
}

const footerDataLeft: Array<{ heading: string; links: string[] }> = [
  {
    heading: "Products",
    links: [
      "Identity data verification",
      "Documents & biometrics",
      "Document authentication",
      "Biometric verification",
      "Identity fraud",
      "Know your customer",
      "Know your business",
      "Falcon Trust",
      "Roadmap",
    ],
  },
  {
    heading: "Platform",
    links: ["Falcon Go"],
  },
];

const footerDataSolutions: Array<{ heading: string; links: string[] }> = [
  {
    heading: "Solutions",
    links: [
      "Financial services",
      "Retail",
      "Gaming",
      "Events",
      "Crypto & FX",
      "Pensions",
      "Public sector",
      "Insurance",
      "Marketplace",
    ],
  },
];

const footerDataResources: Array<{ heading: string; links: LinkItem[] }> = [
  {
    heading: "Resources",
    links: [
      { label: "Resource library" },
      { label: "Blog" },
      { label: "Events" },
      { label: "News" },
      { label: "Falcon Trust Centre", external: true },
      { label: "Our customers" },
      { label: "AI at Falcon" },
    ],
  },
];

const footerDataLegal: Array<{ heading: string; links: LinkItem[] }> = [
  {
    heading: "Legal",
    links: [
      { label: "Legal and regulatory centre", external: true },
      { label: "Privacy policy" },
      { label: "Products and services privacy policy" },
      { label: "Cookie policy" },
      { label: "Accessibility" },
    ],
  },
];

const footerDataCompany: Array<{ heading: string; links: LinkItem[] }> = [
  {
    heading: "Company",
    links: [
      { label: "Investors", external: true },
      { label: "Careers", external: true },
      { label: "About us", external: true },
      { label: "Partners" },
      { label: "ESG", external: true },
      { label: "Loqate.com", external: true },
    ],
  },
  {
    heading: "Contact us",
    links: [
      { label: "Sales enquiries" },
      { label: "Customer support" },
      { label: "Individual data requests" },
      { label: "Login" },
    ],
  },
];



function ExternalIcon() {
  return (
    <svg
      className="inline-block ml-1 w-3 h-3 text-yellow-500/70"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}

function LinkItem({ link }: { link: LinkItem | string }) {
  const label = typeof link === "string" ? link : link.label;
  const external = typeof link === "object" && link.external;
  return (
    <li>
      <a
        href="#"
        className="text-white/55 hover:text-yellow-300 transition-colors duration-150 text-sm leading-relaxed"
        style={{ fontFamily: "'Georgia', serif" }}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {label}
        {external && <ExternalIcon />}
      </a>
    </li>
  );
}

function FooterColumn({
  sections,
}: {
  sections: Array<{ heading: string; links: (LinkItem | string)[] }>;
}) {
  return (
    <div className="flex flex-col gap-8">
      {sections.map((section) => (
        <div key={section.heading}>
          <h3
            className="text-white font-bold text-sm mb-4 tracking-widest uppercase"
            style={{
              fontFamily: "'Georgia', serif",
              letterSpacing: "0.1em",
              textShadow: "0 0 10px rgba(201,148,10,0.3)",
            }}
          >
            {section.heading}
          </h3>
          <ul className="space-y-2">
            {section.links.map((link, index) => (
              <LinkItem key={index} link={link} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer
      className="w-full relative"
      style={{
        background:
          "linear-gradient(160deg, #000000 0%, #0d0800 35%, #2a1c00 70%, #7a5500 90%, #c9940a 100%)",
        borderTop: "1px solid rgba(201,148,10,0.25)",
      }}
    >
      {/* Shimmer top line */}
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #c9940a 30%, #f5d87a 50%, #c9940a 70%, transparent 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-12 lg:gap-16">
          {/* Left — Logo + Social */}
          <div className="flex flex-col justify-between gap-12">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 hover:scale-[1.02] transition-transform duration-200"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm"
                style={{
                  background: "linear-gradient(135deg, #c9940a, #f5d87a)",
                  color: "#000",
                  fontFamily: "'Georgia', serif",
                  boxShadow: "0 0 14px rgba(201,148,10,0.5)",
                }}
              >
                F
              </div>
              <span
                className="text-white font-bold text-xl tracking-widest uppercase"
                style={{
                  fontFamily: "'Georgia', serif",
                  letterSpacing: "0.15em",
                  textShadow: "0 0 16px rgba(201,148,10,0.4)",
                }}
              >
                FALCON
              </span>
            </Link>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {/* LinkedIn */}
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg flex items-center justify-center border border-white/15 text-white/50 hover:text-yellow-300 hover:border-yellow-500/50 transition-all duration-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.76 0-.97.78-1.76 1.75-1.76s1.75.79 1.75 1.76c0 .97-.78 1.76-1.75 1.76zm13.5 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.61z" />
                </svg>
              </a>
              {/* X / Twitter */}
              <a
                href="#"
                aria-label="X"
                className="w-9 h-9 rounded-lg flex items-center justify-center border border-white/15 text-white/50 hover:text-yellow-300 hover:border-yellow-500/50 transition-all duration-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right — Link grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6">
            {/* Column 1: Products + Platform */}
            <div className="col-span-1 flex flex-col gap-8">
              <div>
                <h3
                  className="text-white font-bold text-sm mb-4 tracking-widest uppercase"
                  style={{
                    fontFamily: "'Georgia', serif",
                    letterSpacing: "0.1em",
                    textShadow: "0 0 10px rgba(201,148,10,0.3)",
                  }}
                >
                  Products
                </h3>
                <ul className="space-y-2">
                  {footerDataLeft[0].links.map((link) => (
                    <LinkItem key={link} link={link} />
                  ))}
                </ul>
              </div>
              <div>
                <h3
                  className="text-white font-bold text-sm mb-4 tracking-widest uppercase"
                  style={{
                    fontFamily: "'Georgia', serif",
                    letterSpacing: "0.1em",
                    textShadow: "0 0 10px rgba(201,148,10,0.3)",
                  }}
                >
                  Platform
                </h3>
                <ul className="space-y-2">
                  {footerDataLeft[1].links.map((link) => (
                    <LinkItem key={link} link={link} />
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 2: Solutions */}
            <FooterColumn sections={footerDataSolutions} />

            {/* Column 3: Resources */}
            <FooterColumn sections={footerDataResources} />

            {/* Column 4: Legal */}
            <FooterColumn sections={footerDataLegal} />

            {/* Column 5: Company + Contact us */}
            <FooterColumn sections={footerDataCompany} />
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(201,148,10,0.15)" }}
        >
          <p
            className="text-white/30 text-xs"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            © {new Date().getFullYear()} Falcon. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Use", "Cookie Settings"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-white/30 hover:text-yellow-400/70 text-xs transition-colors duration-150"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {item}
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
