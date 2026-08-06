import BlobShape from "../components/BlobShape";
import BlobIcon from "../components/BlobIcon";
import sarahImg from '../images/sarah-nessa-profile.jpg';
import cacti from '../images/cacti.jpg';
import mitosis from '../images/mitosis.jpg';
import joshua from '../images/joshua-tree.jpg';
import pollen from '../images/pollen.jpg';
import gingko from '../images/gingko.jpg';


interface HomeProps {
  onNav: (page: string) => void;
}

const homepagePaintings = [
  {
    url: cacti,
    title: "The Lucid Ones",
    series: "Nature × Spirit",
  },
  {
    url: mitosis,
    title: "Cellular Reproduction",
    series: "Science × Art",
  },
  {
    url: joshua,
    title: "The Joshua Hour",
    series: "Travel Gems",
  },
  {
    url: pollen,
    title: "Pollinator",
    series: "Science × Art",
  },
  {
    url: gingko,
    title: "Looking for Light Gingko",
    series: "Nature × Spirit",
  },
];


export default function Home({ onNav }: HomeProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAFAFA" }}>
      {/* Hero / About section */}
      <section className="relative max-w-7xl mx-auto px-6 pt-32 pb-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center overflow-hidden">
        {/* Blob decorations */}
        <div className="blob-a absolute -top-8 -left-16 pointer-events-none">
          <BlobShape color="#FFD15C" opacity={0.28} size={440} variant="a" />
        </div>
        <div className="blob-b absolute top-20 right-0 pointer-events-none">
          <BlobShape color="#F5F271" opacity={0.35} size={320} variant="b" />
        </div>
        <div className="blob-c absolute bottom-0 left-1/3 pointer-events-none">
          <BlobShape color="#FF4D6D" opacity={0.14} size={380} variant="d" />
        </div>
        <div className="blob-a absolute bottom-24 right-1/4 pointer-events-none" style={{ animationDelay: "-4s" }}>
          <BlobShape color="#818CF8" opacity={0.1} size={280} variant="f" />
        </div>

        {/* Avatar column */}
        <div className="relative flex flex-col items-center md:items-start">
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full scale-110"
              style={{
                background: "conic-gradient(from 0deg, #FFD15C, #F5F271, #FF4D6D, #818CF8, #FFD15C)",
                filter: "blur(10px)",
                opacity: 0.55,
              }}
            />
            <div
              className="relative w-64 h-64 rounded-full overflow-hidden"
              style={{ border: "4px solid white", boxShadow: "0 0 0 4px #FFF6D0" }}
            >
              <img
                src={sarahImg}
                alt="Artist portrait"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Flat blob badge replacing emoji badge */}
          <div
            className="mt-5 px-5 py-2.5 rounded-full flex items-center gap-3"
            style={{ backgroundColor: "#FFF6D0", color: "#E68A00" }}
          >
            <BlobIcon type="brush" size={28} bg="transparent" fg="#FFD15C" />
            <span className="text-sm font-medium">Oil Painter · Studio Artist</span>
          </div>
        </div>

        {/* Bio column */}
        <div className="relative z-10">
          <p
            className="text-sm font-medium tracking-[0.2em] uppercase mb-3"
            style={{ color: "#E68A00" }}
          >
            About the Artist
          </p>
          <h1
            className="font-display text-5xl md:text-6xl leading-[1.08] mb-6"
            style={{ color: "#1C1B2E" }}
          >
            Sarah Nessa
          </h1>
          <div
            className="w-10 h-0.5 mb-6"
            style={{ backgroundColor: "#FFD15C" }}
          />
          <p className="text-lg leading-relaxed mb-5" style={{ color: "#3D3B52" }}>
            I paint what attention feels like — the specific quality of light on a forest floor,
            the uncanny geometry of a cell, the emotional residue of a place long after
            the trip is over.
          </p>
          <p className="text-base leading-relaxed mb-8" style={{ color: "#6B6880" }}>
            Based out of a north-facing studio in San Francisco, California, I work exclusively in oil on canvas,
            building surfaces slowly over weeks — glazing, scraping, returning. My three ongoing
            series each explore a different conversation: nature and spirit, science and art,
            and the gem-like places travel has given me.
          </p>

          <div className="flex flex-wrap gap-3">
            {[
              { label: "Nature × Spirit", page: "nature-spirit", color: "#FFF6D0", text: "#E68A00" },
              { label: "Science × Art", page: "science-art", color: "#EEF2FF", text: "#4338CA" },
              { label: "Travel Gems", page: "travel-gems", color: "#FFD6E3", text: "#C0003B" },
            ].map((s) => (
              <button
                key={s.page}
                // Disabled Series button clicks for now -- Add Variable s.page in order to enable
                onClick={() => onNav('')}
                className="px-5 py-2.5 rounded-full text-base font-medium transition-all hover:scale-105"
                style={{ backgroundColor: s.color, color: s.text }}
              >
                {s.label} →
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Painting collage */}
      <section className="w-full pb-0">
        <div className="max-w-7xl mx-auto px-6 mb-8 flex items-end justify-between">
          <div>
            <p
              className="text-sm font-medium tracking-[0.2em] uppercase mb-1"
              style={{ color: "#E68A00" }}
            >
              Selected Works
            </p>
            <h2 className="font-display text-3xl" style={{ color: "#1C1B2E" }}>
              From the Studio
            </h2>
          </div>
          <button
            onClick={() => onNav("contact")}
            className="text-base font-medium transition-colors hover:opacity-70"
            style={{ color: "#E68A00" }}
          >
            Inquire →
          </button>
        </div>

        {/* Full-width collage strip */}
        <div className="w-full flex gap-2 overflow-hidden" style={{ height: "480px" }}>
          {homepagePaintings.map((p, i) => (
            <div
              key={p.title}
              className="relative flex-none overflow-hidden group cursor-pointer transition-all duration-500"
              style={{ flex: "1 1 0", minWidth: 0 }}
            >
              <img
                src={p.url}
                alt={p.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ filter: "saturate(0.92)" }}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 overflow-hidden break-words"
                style={{
                  background: "linear-gradient(to top, rgba(28,27,46,0.78) 0%, transparent 60%)",
                }}
              >
                <p className="bottom-4 left-4 hidden md:block text-sm font-display text-white md:text-lg leading-tight">{p.title}</p>
                <p className="bottom-4 left-4 hidden md:block text-xs mt-1 md:text-sm" style={{ color: "#FFD15C" }}>{p.series}</p>
              </div>
              <div
                className="absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                style={{ backgroundColor: "white", color: "#E68A00" }}
              >
                {i + 1}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Studio values strip */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              iconType: "brush" as const,
              bg: "#FFF6D0",
              fg: "#FFD15C",
              iconBg: "#FFEBA0",
              title: "Oil on Canvas",
              body: "Every work is built in oil, painted slowly. Surfaces are layered over weeks, not hours.",
            },
            {
              iconType: "timer" as const,
              bg: "#EEF2FF",
              fg: "#818CF8",
              iconBg: "#C7D2FE",
              title: "Auction Bidding",
              body: "Paintings sell by open bid. The highest bid when the timer closes wins the original.",
            },
            {
              iconType: "plane" as const,
              bg: "#FFD6E3",
              fg: "#FF4D6D",
              iconBg: "#FFB3C6",
              title: "Ships Worldwide",
              body: "Paintings are gallery-wrapped and shipped in archival packaging to collectors everywhere.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-3xl p-8"
              style={{ backgroundColor: card.bg }}
            >
              <div className="mb-5">
                <BlobIcon type={card.iconType} size={64} bg={card.iconBg} fg={card.fg} />
              </div>
              <h3 className="font-display text-2xl mb-3" style={{ color: "#1C1B2E" }}>
                {card.title}
              </h3>
              <p className="text-base leading-relaxed" style={{ color: "#6B6880" }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
