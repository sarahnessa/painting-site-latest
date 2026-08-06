
interface NavProps {
  page: string;
  onNav: (page: string) => void;
  cartCount: number;
  onCartOpen: () => void;
}

const SERIES_IDS = new Set(["nature-spirit", "science-art", "travel-gems"]);

export default function Nav({ page, onNav, cartCount, onCartOpen }: NavProps) {
  const links = [
    { id: "home", label: "Home", wip: false },
    { id: "nature-spirit", label: "Nature × Spirit", wip: true },
    { id: "science-art", label: "Science × Art", wip: true },
    { id: "travel-gems", label: "Travel Gems", wip: true },
    { id: "contact", label: "Contact", wip: false },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40"
      style={{
        backgroundColor: "rgba(250,250,248,0.9)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid #EDE8D8",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNav("home")}
          className="font-display text-xl font-normal tracking-tight"
          style={{ color: "#1C1B2E" }}
        >
          <span style={{ color: "#FFD15C" }}>S.</span> Nessa
        </button>

        {/* Links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((link) =>
            link.wip ? (
              <span
                key={link.id}
                className="wip-tooltip text-sm font-medium cursor-default select-none"
                data-tip="Work in progress"
                style={{ color: "#C4BAA8", borderBottom: "1.5px solid transparent", paddingBottom: "2px" }}
              >
                {link.label}
              </span>
            ) : (
              <button
                key={link.id}
                onClick={() => onNav(link.id)}
                className="text-sm font-medium transition-colors"
                style={{
                  color: page === link.id ? "#E68A00" : "#6B6880",
                  borderBottom: page === link.id ? "1.5px solid #FFD15C" : "1.5px solid transparent",
                  paddingBottom: "2px",
                }}
              >
                {link.label}
              </button>
            )
          )}
        </div>

        {/* Cart button */}
        <button
          onClick={onCartOpen}
          className="relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105"
          style={{ backgroundColor: "#FFF6D0", color: "#E68A00" }}
        >
          {/* Flat blob cart icon */}
          <svg width="18" height="18" viewBox="-10 -10 20 20" fill="none" aria-hidden="true">
            <path
              d="M8,-2 C9,2 7,7 3,9 C-1,11 -6,9 -8,5 C-10,1 -8,-4 -4,-7 C0,-10 7,-6 8,-2 Z"
              fill="#FFD15C"
              opacity="0.5"
            />
            <rect x="-6" y="-3" width="12" height="8" rx="1.5" fill="currentColor" opacity="0.85" />
            <path d="M-3,-3 L-3,-5 C-3,-7 3,-7 3,-5 L3,-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.7" />
          </svg>
          Bids
          {cartCount > 0 && (
            <span
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center font-medium"
              style={{ backgroundColor: "#FF4D6D" }}
            >
              {cartCount}
            </span>
          )}
        </button>
      </nav>

      {/* Mobile nav strip */}
      <div
        className="md:hidden flex overflow-x-auto gap-5 px-6 pb-3"
        style={{ borderTop: "1px solid #F5F0E8" }}
      >
        {links.map((link) =>
          link.wip ? (
            <span
              key={link.id}
              className="hidden md:block wip-tooltip top-full mt-2 text-sm whitespace-nowrap font-medium pt-2 cursor-default"
              data-tip="Work in progress"
              style={{ color: "#D4CABC" }}
            >
              {link.label}
            </span>
          ) : (
            <button
              key={link.id}
              onClick={() => onNav(link.id)}
              className="text-sm whitespace-nowrap font-medium pt-2 transition-colors"
              style={{ color: page === link.id ? "#E68A00" : "#9CA3AF" }}
            >
              {link.label}
            </button>
          )
        )}
      </div>
    </header>
  );
}
