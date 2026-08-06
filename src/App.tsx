import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import EntryModal from "./components/EntryModal";
import CartPanel from "./components/CartPanel";
import Home from "./pages/Home";
import SeriesPage from "./pages/SeriesPage";
import Contact from "./pages/Contact";
import BlobShape from "./components/BlobShape";

type Page = "home" | "nature-spirit" | "science-art" | "travel-gems" | "contact";

interface BidEntry {
  paintingId: string;
  title: string;
  bidAmount: number;
  series: string;
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(true);
  const [page, setPage] = useState<Page>("home");
  const [cartOpen, setCartOpen] = useState(false);
  const [bids, setBids] = useState<BidEntry[]>([]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const handleBidPlaced = (paintingId: string, title: string, bidAmount: number, series: string) => {
    setBids((prev) => {
      const existing = prev.findIndex((b) => b.paintingId === paintingId);
      if (existing >= 0) {
        const next = [...prev];
        next[existing] = { paintingId, title, bidAmount, series };
        return next;
      }
      return [...prev, { paintingId, title, bidAmount, series }];
    });
    setCartOpen(true);
  };

  const handleRemoveBid = (paintingId: string) => {
    setBids((prev) => prev.filter((b) => b.paintingId !== paintingId));
  };

  const activeBids: Record<string, number> = {};
  bids.forEach((b) => { activeBids[b.paintingId] = b.bidAmount; });

  return (
    <div style={{ backgroundColor: "#FAFAFA", minHeight: "100vh" }}>
      {/* Entry modal */}
      {modalOpen && <EntryModal onClose={() => setModalOpen(false)} />}

      {/* Cart panel */}
      {cartOpen && (
        <CartPanel
          bids={bids}
          onClose={() => setCartOpen(false)}
          onRemove={handleRemoveBid}
        />
      )}

      {/* Nav */}
      <Nav
        page={page}
        onNav={(p) => setPage(p as Page)}
        cartCount={bids.length}
        onCartOpen={() => setCartOpen(true)}
      />

      {/* Pages */}
      <main>
        {page === "home" && <Home onNav={(p) => setPage(p as Page)} />}
        {(page === "nature-spirit" || page === "science-art" || page === "travel-gems") && (
          <SeriesPage
            seriesId={page}
            onBidPlaced={handleBidPlaced}
            activeBids={activeBids}
          />
        )}
        {page === "contact" && <Contact />}
      </main>

      {/* Footer */}
      <footer
        className="relative overflow-hidden mt-16"
        style={{ backgroundColor: "#1C1B2E", color: "white" }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="blob-a absolute -bottom-20 -right-20 opacity-20">
            <BlobShape color="#FFD15C" opacity={0.35} size={400} variant="b" />
          </div>
          <div className="blob-b absolute -top-20 left-0 opacity-10">
            <BlobShape color="#F5F271" opacity={0.3} size={300} variant="d" />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <p className="font-display text-2xl mb-3">
              <span style={{ color: "#FFD15C" }}>S.</span> Nessa
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#9CA3AF" }}>
              Oil painter, studio artist.
              Paintings will be available by open auction.
            </p>
          </div>

          <div>
            <p className="text-xs font-medium tracking-[0.2em] uppercase mb-4" style={{ color: "#FFD15C" }}>
              Series
            </p>
            <div className="space-y-2">
              {[
                { id: "nature-spirit", label: "Nature × Spirit" },
                { id: "science-art", label: "Science × Art" },
                { id: "travel-gems", label: "Travel Gems" },
              ].map((s) => (
                <button
                  key={s.id}
                  // Disabled Series links -- Uncomment in order to enable
                  // onClick={() => setPage(s.id as Page)}
                  className="block text-sm transition-colors hover:opacity-70"
                  style={{ color: "#D1D5DB" }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium tracking-[0.2em] uppercase mb-4" style={{ color: "#FFD15C" }}>
              Studio
            </p>
            <div className="space-y-2">
              {["San Francisco, CA", "sarahnessaart@gmail.com", "Ships worldwide"].map((item) => (
                <p key={item} className="text-sm" style={{ color: "#9CA3AF" }}>{item}</p>
              ))}
              <button
                onClick={() => setPage("contact")}
                className="mt-3 block text-sm font-medium transition-opacity hover:opacity-70"
                style={{ color: "#FFD15C" }}
              >
                Get in touch →
              </button>
            </div>
          </div>
        </div>

        <div
          className="relative z-10 border-t px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-3 max-w-7xl mx-auto"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs" style={{ color: "#6B7280" }}>
            © 2026 Sarah Nessa. All paintings are original works.
          </p>
          <p className="text-xs" style={{ color: "#6B7280" }}>
            Auction bids are binding upon close.
          </p>
        </div>
      </footer>
    </div>
  );
}
