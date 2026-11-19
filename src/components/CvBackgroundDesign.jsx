import React from 'react';

// Deterministic dot-grid points for subtle engineered texture (no SVG <pattern> for 100% html2canvas reliability)
const RIGHT_TOP_DOTS = [];
for (let row = 0; row < 7; row++) {
  for (let col = 0; col < 10; col++) {
    RIGHT_TOP_DOTS.push({ x: 560 + col * 22, y: 26 + row * 22 });
  }
}

const RIGHT_BOTTOM_DOTS = [];
for (let row = 0; row < 6; row++) {
  for (let col = 0; col < 9; col++) {
    RIGHT_BOTTOM_DOTS.push({ x: 582 + col * 22, y: 976 + row * 22 });
  }
}

const SIDEBAR_DOTS = [];
for (let row = 0; row < 8; row++) {
  for (let col = 0; col < 7; col++) {
    SIDEBAR_DOTS.push({ x: 24 + col * 32, y: 840 + row * 32 });
  }
}

/**
 * Full-bleed vector background artwork (794 x 1123 px A4) tailored per theme.
 * Uses pure inline SVG primitives & gradients (no CSS blend modes or SVG patterns)
 * for razor-sharp rendering in screen preview, print, and html2canvas PDF capture.
 */
export function CvBackgroundDesign({ theme = 'blueprint' }) {
  if (theme === 'midnight') {
    return (
      <svg
        width="794"
        height="1123"
        viewBox="0 0 794 1123"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="cv-bg-svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="mid-base" x1="0" y1="0" x2="794" y2="1123" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#09101f" />
            <stop offset="55%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#0b1324" />
          </linearGradient>
          <linearGradient id="mid-sidebar" x1="0" y1="0" x2="252" y2="1123" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#13203b" />
            <stop offset="60%" stopColor="#0e182e" />
            <stop offset="100%" stopColor="#0a1222" />
          </linearGradient>
          <radialGradient id="mid-glow-tr" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(740 80) rotate(135) scale(460)">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.16" />
            <stop offset="50%" stopColor="#0284c7" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="mid-glow-bl" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(110 980) rotate(45) scale(380)">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.14" />
            <stop offset="55%" stopColor="#38bdf8" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#0b1120" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="mid-accent-bar" x1="0" y1="0" x2="794" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="32%" stopColor="#0ea5e9" />
            <stop offset="70%" stopColor="#6366f1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Base & Sidebar */}
        <rect width="794" height="1123" fill="url(#mid-base)" />
        <rect x="0" y="0" width="252" height="1123" fill="url(#mid-sidebar)" />

        {/* Ambient radial washes matching portfolio aesthetic */}
        <rect width="794" height="1123" fill="url(#mid-glow-tr)" />
        <rect width="794" height="1123" fill="url(#mid-glow-bl)" />

        {/* Top precision accent strip */}
        <rect x="0" y="0" width="794" height="4" fill="url(#mid-accent-bar)" />

        {/* Architectural vertical column divider */}
        <line x1="252" y1="0" x2="252" y2="1123" stroke="#38bdf8" strokeOpacity="0.22" strokeWidth="1" />
        <line x1="256" y1="36" x2="256" y2="1087" stroke="#38bdf8" strokeOpacity="0.06" strokeWidth="1" />

        {/* Top-right orbital / wireframe geometric network */}
        <circle cx="775" cy="40" r="110" stroke="#38bdf8" strokeOpacity="0.12" strokeWidth="1" />
        <circle cx="775" cy="40" r="168" stroke="#38bdf8" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="4 6" />
        <circle cx="775" cy="40" r="230" stroke="#38bdf8" strokeOpacity="0.06" strokeWidth="1" />
        <path d="M590 0 L794 204" stroke="#38bdf8" strokeOpacity="0.08" strokeWidth="1" />
        <path d="M655 0 L794 139" stroke="#7dd3fc" strokeOpacity="0.09" strokeWidth="1" />

        {/* Geometric hexagonal crystal facets bottom-right */}
        <polygon points="735,980 785,1008 785,1064 735,1092 685,1064 685,1008" stroke="#38bdf8" strokeOpacity="0.14" strokeWidth="1" fill="#38bdf8" fillOpacity="0.025" />
        <polygon points="650,1040 692,1064 692,1112 650,1136 608,1112 608,1064" stroke="#6366f1" strokeOpacity="0.16" strokeWidth="1" fill="#6366f1" fillOpacity="0.025" />
        <line x1="685" y1="1008" x2="650" y2="1040" stroke="#38bdf8" strokeOpacity="0.12" strokeWidth="1" />

        {/* Sidebar subtle diagonal drafting lines */}
        <path d="M0 160 L252 38" stroke="#38bdf8" strokeOpacity="0.07" strokeWidth="1" />
        <path d="M0 192 L252 70" stroke="#38bdf8" strokeOpacity="0.045" strokeWidth="1" />
        <path d="M0 1050 L190 1123" stroke="#38bdf8" strokeOpacity="0.09" strokeWidth="1" />
        <circle cx="0" cy="1123" r="155" stroke="#38bdf8" strokeOpacity="0.1" strokeWidth="1" />
        <circle cx="0" cy="1123" r="215" stroke="#6366f1" strokeOpacity="0.09" strokeWidth="1" />

        {/* Subtle precision dot matrix */}
        {RIGHT_TOP_DOTS.map((pt, idx) => (
          <circle key={`mt-${idx}`} cx={pt.x} cy={pt.y} r="1.2" fill="#38bdf8" fillOpacity="0.18" />
        ))}
        {SIDEBAR_DOTS.map((pt, idx) => (
          <circle key={`ms-${idx}`} cx={pt.x} cy={pt.y} r="1.1" fill="#7dd3fc" fillOpacity="0.12" />
        ))}

        {/* Corner registration marks */}
        <path d="M760 1094 H776 M768 1086 V1102" stroke="#38bdf8" strokeOpacity="0.3" strokeWidth="1" />
        <path d="M18 26 H30 M24 20 V32" stroke="#38bdf8" strokeOpacity="0.3" strokeWidth="1" />
      </svg>
    );
  }

  if (theme === 'topo') {
    return (
      <svg
        width="794"
        height="1123"
        viewBox="0 0 794 1123"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="cv-bg-svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="topo-paper" x1="252" y1="0" x2="794" y2="1123" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fbfbf9" />
            <stop offset="55%" stopColor="#f6f5f0" />
            <stop offset="100%" stopColor="#efede6" />
          </linearGradient>
          <linearGradient id="topo-sidebar" x1="0" y1="0" x2="252" y2="1123" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#18181b" />
            <stop offset="65%" stopColor="#1c1c21" />
            <stop offset="100%" stopColor="#131316" />
          </linearGradient>
          <radialGradient id="topo-warm-wash" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(760 70) rotate(140) scale(380)">
            <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#fbfbf9" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Base paper & dark charcoal editorial sidebar */}
        <rect width="794" height="1123" fill="url(#topo-paper)" />
        <rect width="794" height="1123" fill="url(#topo-warm-wash)" />
        <rect x="0" y="0" width="252" height="1123" fill="url(#topo-sidebar)" />

        {/* Editorial top stripe */}
        <rect x="0" y="0" width="252" height="5" fill="#0284c7" />
        <rect x="252" y="0" width="542" height="5" fill="#18181b" fillOpacity="0.08" />

        {/* Organic Topographic Contours — Top Right */}
        <path
          d="M520 -10 C555 58, 620 42, 665 95 C705 142, 745 130, 810 175"
          stroke="#0284c7"
          strokeOpacity="0.16"
          strokeWidth="1.2"
        />
        <path
          d="M555 -15 C590 42, 648 34, 688 80 C725 122, 760 112, 815 148"
          stroke="#0284c7"
          strokeOpacity="0.13"
          strokeWidth="1.1"
        />
        <path
          d="M595 -15 C625 28, 678 24, 712 64 C745 102, 772 95, 815 122"
          stroke="#18181b"
          strokeOpacity="0.09"
          strokeWidth="1"
        />
        <path
          d="M640 -12 C666 18, 706 18, 738 48 C765 74, 785 74, 815 92"
          stroke="#18181b"
          strokeOpacity="0.075"
          strokeWidth="1"
        />
        <path
          d="M475 -10 C520 75, 595 62, 646 118 C695 170, 740 156, 812 208"
          stroke="#18181b"
          strokeOpacity="0.055"
          strokeWidth="1"
        />

        {/* Organic Topographic Contours — Bottom Right */}
        <path
          d="M480 1135 C530 1068, 598 1085, 650 1032 C698 982, 738 996, 808 942"
          stroke="#18181b"
          strokeOpacity="0.08"
          strokeWidth="1.1"
        />
        <path
          d="M525 1138 C568 1082, 626 1094, 672 1048 C716 1004, 752 1015, 810 968"
          stroke="#0284c7"
          strokeOpacity="0.14"
          strokeWidth="1.15"
        />
        <path
          d="M572 1140 C608 1096, 656 1104, 696 1064 C734 1026, 764 1034, 812 996"
          stroke="#0284c7"
          strokeOpacity="0.11"
          strokeWidth="1"
        />
        <path
          d="M622 1142 C650 1110, 688 1114, 722 1082 C752 1054, 776 1058, 812 1028"
          stroke="#18181b"
          strokeOpacity="0.07"
          strokeWidth="1"
        />

        {/* Sidebar engraved contour waves */}
        <path
          d="M-10 925 C50 905, 95 955, 155 935 C205 918, 225 948, 260 936"
          stroke="#38bdf8"
          strokeOpacity="0.14"
          strokeWidth="1"
        />
        <path
          d="M-10 955 C55 935, 100 985, 162 965 C210 950, 228 978, 260 968"
          stroke="#a1a1aa"
          strokeOpacity="0.13"
          strokeWidth="1"
        />
        <path
          d="M-10 985 C60 965, 105 1015, 168 996 C214 982, 230 1008, 260 1000"
          stroke="#a1a1aa"
          strokeOpacity="0.1"
          strokeWidth="1"
        />
        <path
          d="M-10 1015 C64 996, 110 1044, 174 1026 C218 1014, 234 1038, 260 1030"
          stroke="#38bdf8"
          strokeOpacity="0.1"
          strokeWidth="1"
        />

        {/* Subtle editorial perimeter framing on light paper */}
        <rect x="272" y="20" width="502" height="1083" stroke="#18181b" strokeOpacity="0.055" strokeWidth="1" />
        <line x1="252" y1="0" x2="252" y2="1123" stroke="#0284c7" strokeOpacity="0.35" strokeWidth="1.5" />
      </svg>
    );
  }

  if (theme === 'geometric') {
    return (
      <svg
        width="794"
        height="1123"
        viewBox="0 0 794 1123"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="cv-bg-svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="geo-left" x1="0" y1="0" x2="0" y2="1123" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#eff6fc" />
            <stop offset="55%" stopColor="#f3f7fb" />
            <stop offset="100%" stopColor="#e8f1f9" />
          </linearGradient>
          <linearGradient id="geo-right" x1="252" y1="0" x2="794" y2="1123" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f8fafc" />
          </linearGradient>
          <linearGradient id="geo-navy-wedge" x1="0" y1="0" x2="260" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e3a5f" />
          </linearGradient>
        </defs>

        {/* Clean Swiss two-tone split */}
        <rect x="252" y="0" width="542" height="1123" fill="url(#geo-right)" />
        <rect x="0" y="0" width="252" height="1123" fill="url(#geo-left)" />

        {/* Architectural top-left geometric crest */}
        <path d="M0 0 H252 V18 L0 74 Z" fill="url(#geo-navy-wedge)" />
        <path d="M0 74 L252 18 V30 L0 86 Z" fill="#0ea5e9" fillOpacity="0.22" />

        {/* Top-right Bauhaus quarter-arcs & accent geometry */}
        <path d="M794 0 H634 A160 160 0 0 0 794 160 Z" fill="#0f172a" fillOpacity="0.035" />
        <path d="M794 0 H686 A108 108 0 0 0 794 108 Z" fill="#0284c7" fillOpacity="0.085" />
        <circle cx="794" cy="0" r="196" stroke="#0284c7" strokeOpacity="0.16" strokeWidth="1" />
        <circle cx="794" cy="0" r="134" stroke="#0f172a" strokeOpacity="0.1" strokeWidth="1" />
        <rect x="742" y="24" width="28" height="4" fill="#0284c7" />
        <rect x="720" y="24" width="14" height="4" fill="#0f172a" fillOpacity="0.25" />

        {/* Sidebar lower Bauhaus circular counterbalance */}
        <circle cx="0" cy="1123" r="130" fill="#0284c7" fillOpacity="0.065" />
        <circle cx="0" cy="1123" r="175" stroke="#0f172a" strokeOpacity="0.08" strokeWidth="1" />
        <path d="M168 1123 L252 1039 V1123 Z" fill="#0f172a" fillOpacity="0.05" />

        {/* Bottom-right architectural stepped rule & arc */}
        <path d="M794 1123 H654 A140 140 0 0 1 794 983 Z" fill="#0284c7" fillOpacity="0.05" />
        <line x1="654" y1="1123" x2="794" y2="983" stroke="#0284c7" strokeOpacity="0.14" strokeWidth="1" />

        {/* Crisp structural Swiss grid hairlines */}
        <line x1="252" y1="0" x2="252" y2="1123" stroke="#cbd5e1" strokeWidth="1" />
        <rect x="251" y="0" width="3" height="120" fill="#0284c7" />

        {/* Subtle dot accents */}
        {RIGHT_BOTTOM_DOTS.map((pt, idx) => (
          <circle key={`gb-${idx}`} cx={pt.x} cy={pt.y} r="1.15" fill="#0369a1" fillOpacity="0.16" />
        ))}
      </svg>
    );
  }

  // Default: 'blueprint' — Architectural Slate & Engineered Light Paper
  return (
    <svg
      width="794"
      height="1123"
      viewBox="0 0 794 1123"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cv-bg-svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bp-paper" x1="252" y1="0" x2="794" y2="1123" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#f1f5f9" />
        </linearGradient>
        <linearGradient id="bp-sidebar" x1="0" y1="0" x2="252" y2="1123" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0b132b" />
          <stop offset="55%" stopColor="#0f1c3a" />
          <stop offset="100%" stopColor="#0d172e" />
        </linearGradient>
        <radialGradient id="bp-sky-wash" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(770 40) rotate(135) scale(410)">
          <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.34" />
          <stop offset="50%" stopColor="#e0f2fe" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#f8fafc" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bp-edge-glow" x1="0" y1="0" x2="0" y2="1123" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.95" />
          <stop offset="40%" stopColor="#0284c7" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* Main light engineered paper + dark navy architectural left spine */}
      <rect width="794" height="1123" fill="url(#bp-paper)" />
      <rect width="794" height="1123" fill="url(#bp-sky-wash)" />
      <rect x="0" y="0" width="252" height="1123" fill="url(#bp-sidebar)" />

      {/* Left sidebar architectural drafting geometry */}
      <polygon points="0,0 252,0 252,132 0,68" fill="#1e3a5f" fillOpacity="0.38" />
      <line x1="0" y1="68" x2="252" y2="132" stroke="#38bdf8" strokeOpacity="0.22" strokeWidth="1" />
      <line x1="0" y1="78" x2="252" y2="142" stroke="#38bdf8" strokeOpacity="0.08" strokeWidth="1" />

      {/* Sidebar precision arcs at bottom */}
      <circle cx="0" cy="1123" r="135" stroke="#38bdf8" strokeOpacity="0.16" strokeWidth="1" />
      <circle cx="0" cy="1123" r="185" stroke="#38bdf8" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="3 5" />
      <circle cx="0" cy="1123" r="238" stroke="#38bdf8" strokeOpacity="0.06" strokeWidth="1" />
      <line x1="0" y1="988" x2="252" y2="988" stroke="#38bdf8" strokeOpacity="0.07" strokeWidth="1" />

      {/* Crisp accent spine between sidebar and content */}
      <rect x="250" y="0" width="2.5" height="1123" fill="url(#bp-edge-glow)" />

      {/* Top-right architectural drafting arcs & vector grid */}
      <circle cx="794" cy="0" r="120" stroke="#0284c7" strokeOpacity="0.15" strokeWidth="1" />
      <circle cx="794" cy="0" r="175" stroke="#0284c7" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="4 6" />
      <circle cx="794" cy="0" r="235" stroke="#0f172a" strokeOpacity="0.055" strokeWidth="1" />
      <line x1="590" y1="0" x2="794" y2="204" stroke="#0284c7" strokeOpacity="0.08" strokeWidth="1" />

      {/* Bottom-right architectural angular facet & drafting contours */}
      <polygon points="620,1123 794,992 794,1123" fill="#0f172a" fillOpacity="0.032" />
      <polygon points="688,1123 794,1042 794,1123" fill="#0284c7" fillOpacity="0.06" />
      <line x1="600" y1="1123" x2="794" y2="977" stroke="#0284c7" strokeOpacity="0.14" strokeWidth="1" />
      <line x1="646" y1="1123" x2="794" y2="1012" stroke="#0f172a" strokeOpacity="0.06" strokeWidth="1" />

      {/* Subtle top-right & bottom-right coordinate dot grids */}
      {RIGHT_TOP_DOTS.map((pt, idx) => (
        <circle key={`bt-${idx}`} cx={pt.x} cy={pt.y} r="1.15" fill="#0284c7" fillOpacity="0.16" />
      ))}
      {RIGHT_BOTTOM_DOTS.map((pt, idx) => (
        <circle key={`bb-${idx}`} cx={pt.x} cy={pt.y} r="1.15" fill="#475569" fillOpacity="0.16" />
      ))}
      {SIDEBAR_DOTS.map((pt, idx) => (
        <circle key={`bs-${idx}`} cx={pt.x} cy={pt.y} r="1.1" fill="#38bdf8" fillOpacity="0.12" />
      ))}

      {/* Precision blueprint crosshairs */}
      <path d="M754 24 H768 M761 17 V31" stroke="#0284c7" strokeOpacity="0.35" strokeWidth="1" />
      <path d="M18 22 H30 M24 16 V28" stroke="#38bdf8" strokeOpacity="0.35" strokeWidth="1" />
      <path d="M276 1094 H288 M282 1088 V1100" stroke="#94a3b8" strokeOpacity="0.45" strokeWidth="1" />
    </svg>
  );
}
