// Flat wide blob-graphic icons — no emojis, no line-icon sets.
// Each icon is a distinctive organic blob shape with a flat geometric element.

type BlobIconType =
  | "palette"
  | "brush"
  | "timer"
  | "plane"
  | "frame"
  | "location"
  | "email"
  | "clock"
  | "package"
  | "sparkle";

interface BlobIconProps {
  type: BlobIconType;
  size?: number;
  bg?: string;
  fg?: string;
}

const icons: Record<BlobIconType, (fg: string) => React.ReactNode> = {
  palette: (fg) => (
    <>
      {/* Wide painterly blob */}
      <path
        d="M78,-18 C82,10 70,42 48,58 C26,74 -8,76 -38,62 C-68,48 -86,18 -82,-12 C-78,-42 -52,-72 -18,-78 C16,-84 50,-72 68,-50 C74,-42 74,-46 78,-18 Z"
        fill={fg}
        opacity="0.15"
      />
      {/* Three color dollops */}
      <circle cx="-28" cy="10" r="14" fill={fg} opacity="0.9" />
      <circle cx="4" cy="-16" r="10" fill={fg} opacity="0.6" />
      <circle cx="30" cy="16" r="12" fill={fg} opacity="0.75" />
      {/* Brush dab mark */}
      <ellipse cx="-4" cy="32" rx="18" ry="7" fill={fg} opacity="0.35" transform="rotate(-15,-4,32)" />
    </>
  ),

  brush: (fg) => (
    <>
      {/* Wide horizontal swipe blob */}
      <path
        d="M80,-8 C84,20 66,52 36,66 C6,80 -30,72 -56,50 C-82,28 -90,-8 -76,-38 C-62,-68 -26,-88 10,-82 C46,-76 76,-36 80,-8 Z"
        fill={fg}
        opacity="0.14"
      />
      {/* Brush stroke shape */}
      <path
        d="M-58,-4 C-44,-18 -10,-24 20,-16 C50,-8 72,8 74,24 C72,28 60,24 36,18 C12,12 -20,14 -44,22 C-58,26 -66,10 -58,-4 Z"
        fill={fg}
        opacity="0.85"
      />
      {/* Handle nub */}
      <ellipse cx="-62" cy="14" rx="8" ry="5" fill={fg} opacity="0.5" transform="rotate(-20,-62,14)" />
    </>
  ),

  timer: (fg) => (
    <>
      {/* Round-ish blob */}
      <path
        d="M72,-10 C78,22 62,58 32,72 C2,86 -36,76 -60,50 C-84,24 -86,-16 -68,-46 C-50,-76 -16,-94 18,-86 C52,-78 66,-42 72,-10 Z"
        fill={fg}
        opacity="0.14"
      />
      {/* Clock face arc */}
      <circle cx="4" cy="4" r="38" fill="none" stroke={fg} strokeWidth="7" opacity="0.9" />
      {/* Hands */}
      <line x1="4" y1="4" x2="4" y2="-24" stroke={fg} strokeWidth="7" strokeLinecap="round" opacity="0.9" />
      <line x1="4" y1="4" x2="22" y2="14" stroke={fg} strokeWidth="5" strokeLinecap="round" opacity="0.7" />
    </>
  ),

  plane: (fg) => (
    <>
      {/* Wide horizontal swoosh */}
      <path
        d="M86,-6 C88,22 66,54 30,66 C-6,78 -50,66 -72,38 C-94,10 -90,-28 -68,-52 C-46,-76 -6,-84 34,-72 C74,-60 84,-34 86,-6 Z"
        fill={fg}
        opacity="0.14"
      />
      {/* Stylized plane */}
      <path
        d="M-60,4 L20,-20 L60,-2 L20,6 Z"
        fill={fg}
        opacity="0.9"
      />
      <path
        d="M-20,-14 L0,-36 L16,-24 Z"
        fill={fg}
        opacity="0.7"
      />
      <path
        d="M10,6 L18,26 L28,14 Z"
        fill={fg}
        opacity="0.6"
      />
      {/* Trail dots */}
      <circle cx="-68" cy="10" r="4" fill={fg} opacity="0.35" />
      <circle cx="-76" cy="18" r="2.5" fill={fg} opacity="0.25" />
    </>
  ),

  frame: (fg) => (
    <>
      {/* Chunky asymmetric blob */}
      <path
        d="M70,-20 C84,8 78,44 52,64 C26,84 -14,82 -46,62 C-78,42 -94,8 -84,-26 C-74,-60 -42,-86 -4,-88 C34,-90 56,-48 70,-20 Z"
        fill={fg}
        opacity="0.14"
      />
      {/* Frame rectangle */}
      <rect x="-42" y="-34" width="84" height="64" rx="4" fill="none" stroke={fg} strokeWidth="7" opacity="0.9" />
      {/* Inner canvas line */}
      <rect x="-28" y="-20" width="56" height="36" rx="2" fill={fg} opacity="0.2" />
      {/* Corner brackets */}
      <circle cx="-42" cy="-34" r="5" fill={fg} opacity="0.7" />
      <circle cx="42" cy="-34" r="5" fill={fg} opacity="0.7" />
      <circle cx="42" cy="30" r="5" fill={fg} opacity="0.7" />
      <circle cx="-42" cy="30" r="5" fill={fg} opacity="0.7" />
    </>
  ),

  location: (fg) => (
    <>
      {/* Tall teardrop blob */}
      <path
        d="M52,-50 C70,-28 72,4 60,32 C48,60 20,84 -4,80 C-28,76 -44,52 -52,24 C-60,-4 -56,-36 -38,-58 C-20,-80 8,-90 30,-80 C52,-70 34,-72 52,-50 Z"
        fill={fg}
        opacity="0.14"
      />
      {/* Pin drop */}
      <circle cx="4" cy="-16" r="26" fill={fg} opacity="0.9" />
      <circle cx="4" cy="-16" r="10" fill="white" opacity="0.9" />
      <path d="M4,10 L-10,42 L4,56 L18,42 Z" fill={fg} opacity="0.85" />
    </>
  ),

  email: (fg) => (
    <>
      {/* Wide oval blob */}
      <path
        d="M86,-4 C88,24 66,56 30,68 C-6,80 -50,68 -72,40 C-94,12 -90,-26 -66,-50 C-42,-74 0,-84 38,-72 C76,-60 84,-32 86,-4 Z"
        fill={fg}
        opacity="0.14"
      />
      {/* Envelope */}
      <rect x="-52" y="-28" width="104" height="64" rx="8" fill={fg} opacity="0.85" />
      <path d="M-52,-28 L4,12 L60,-28" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" opacity="0.9" />
    </>
  ),

  clock: (fg) => (
    <>
      {/* Near-circular blob */}
      <path
        d="M74,-8 C80,22 64,58 32,72 C0,86 -38,76 -62,48 C-86,20 -86,-18 -66,-48 C-46,-78 -10,-96 26,-88 C62,-80 68,-38 74,-8 Z"
        fill={fg}
        opacity="0.14"
      />
      <circle cx="4" cy="4" r="42" fill={fg} opacity="0.15" />
      <circle cx="4" cy="4" r="42" fill="none" stroke={fg} strokeWidth="6" opacity="0.85" />
      <line x1="4" y1="4" x2="4" y2="-26" stroke={fg} strokeWidth="6" strokeLinecap="round" opacity="0.9" />
      <line x1="4" y1="4" x2="26" y2="18" stroke={fg} strokeWidth="5" strokeLinecap="round" opacity="0.75" />
      <circle cx="4" cy="4" r="4" fill={fg} opacity="1" />
    </>
  ),

  package: (fg) => (
    <>
      {/* Boxy-ish blob */}
      <path
        d="M68,-24 C84,4 80,38 58,60 C36,82 0,86 -32,70 C-64,54 -84,18 -80,-18 C-76,-54 -50,-86 -16,-92 C18,-98 52,-52 68,-24 Z"
        fill={fg}
        opacity="0.14"
      />
      {/* Box */}
      <rect x="-44" y="-12" width="88" height="58" rx="6" fill={fg} opacity="0.85" />
      {/* Lid */}
      <path d="M-50,-22 L50,-22 L44,-12 L-44,-12 Z" fill={fg} opacity="0.7" />
      {/* Ribbon */}
      <line x1="0" y1="-22" x2="0" y2="46" stroke="white" strokeWidth="10" opacity="0.3" />
      <rect x="-14" y="-28" width="28" height="16" rx="4" fill="white" opacity="0.5" />
    </>
  ),

  sparkle: (fg) => (
    <>
      {/* Wide airy blob */}
      <path
        d="M80,-10 C86,22 68,58 36,72 C4,86 -34,78 -60,52 C-86,26 -92,-12 -76,-44 C-60,-76 -24,-98 14,-92 C52,-86 74,-42 80,-10 Z"
        fill={fg}
        opacity="0.14"
      />
      {/* Star/sparkle mark */}
      <path d="M4,-48 L8,-8 L44,-2 L8,6 L12,46 L0,10 L-36,18 L-2,4 L-30,-28 L4,-8 Z" fill={fg} opacity="0.85" />
    </>
  ),
};

export default function BlobIcon({ type, size = 80, bg = "#FFF6D0", fg = "#FFD15C" }: BlobIconProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
      }}
    >
      <svg
        width={size * 0.85}
        height={size * 0.85}
        viewBox="-96 -96 192 192"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {icons[type]?.(fg)}
      </svg>
    </div>
  );
}
