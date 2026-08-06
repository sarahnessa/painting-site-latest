import { useState, useEffect } from "react";
import { paintings, seriesConfig } from "../data/paintings";
import type { Painting } from "../data/paintings";
import BlobShape from "../components/BlobShape";

interface SeriesPageProps {
  seriesId: "nature-spirit" | "science-art" | "travel-gems";
  onBidPlaced: (paintingId: string, title: string, bidAmount: number, series: string) => void;
  activeBids: Record<string, number>;
}

function useCountdown(endDate: Date) {
  const calc = () => {
    const diff = Math.max(0, endDate.getTime() - Date.now());
    const h = Math.floor(diff / 3_600_000);
    const m = Math.floor((diff % 3_600_000) / 60_000);
    const s = Math.floor((diff % 60_000) / 1000);
    return { h, m, s, expired: diff === 0 };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  });
  return time;
}

function AuctionTimer({ endDate }: { endDate: Date }) {
  const { h, m, s, expired } = useCountdown(endDate);
  if (expired) return <span className="text-sm font-medium" style={{ color: "#FF4D6D" }}>Auction ended</span>;
  const urgent = h < 6;
  return (
    <span
      className={`text-sm font-medium tabular-nums ${urgent ? "timer-pulse" : ""}`}
      style={{ color: urgent ? "#FF4D6D" : "#6B6880" }}
    >
      {String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}:{String(s).padStart(2, "0")} left
    </span>
  );
}

interface BidModalProps {
  painting: Painting;
  onClose: () => void;
  onBid: (amount: number) => void;
  currentUserBid: number | undefined;
}

function BidModal({ painting, onClose, onBid, currentUserBid }: BidModalProps) {
  const min = painting.currentBid + 50;
  const [amount, setAmount] = useState(String(min));
  const [error, setError] = useState("");

  const handle = () => {
    const val = parseInt(amount, 10);
    if (isNaN(val) || val < min) {
      setError(`Minimum bid is $${min.toLocaleString()}`);
      return;
    }
    onBid(val);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ backgroundColor: "rgba(28,27,46,0.5)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="modal-card bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: "0 24px 64px rgba(255,209,92,0.18), 0 4px 24px rgba(28,27,46,0.12)" }}
      >
        <h3 className="font-display text-2xl mb-1" style={{ color: "#1C1B2E" }}>
          Place a Bid
        </h3>
        <p className="text-base mb-6" style={{ color: "#E68A00" }}>
          {painting.title}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="rounded-2xl p-4" style={{ backgroundColor: "#FFF6D0" }}>
            <p className="text-sm mb-1" style={{ color: "#9CA3AF" }}>Current highest bid</p>
            <p className="font-display text-xl" style={{ color: "#1C1B2E" }}>
              ${painting.currentBid.toLocaleString()}
            </p>
            <p className="text-sm mt-0.5" style={{ color: "#E68A00" }}>
              {painting.bidCount} bid{painting.bidCount !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="rounded-2xl p-4" style={{ backgroundColor: "#FFF6D0" }}>
            <p className="text-sm mb-1" style={{ color: "#9CA3AF" }}>Minimum next bid</p>
            <p className="font-display text-xl" style={{ color: "#1C1B2E" }}>
              ${min.toLocaleString()}
            </p>
            <p className="text-sm mt-0.5" style={{ color: "#6B6880" }}>+$50 increment</p>
          </div>
        </div>

        {currentUserBid !== undefined && (
          <p className="text-sm mb-3 px-3 py-2 rounded-xl" style={{ backgroundColor: "#FFF6D0", color: "#92400E" }}>
            Your current bid: ${currentUserBid.toLocaleString()} — outbid yourself to increase.
          </p>
        )}

        <div className="relative mb-2">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-display text-xl" style={{ color: "#1C1B2E" }}>$</span>
          <input
            type="number"
            value={amount}
            min={min}
            onChange={(e) => { setAmount(e.target.value); setError(""); }}
            className="w-full pl-8 pr-4 py-3.5 rounded-2xl text-xl font-display outline-none"
            style={{
              border: `2px solid ${error ? "#FF4D6D" : "#EDE8D8"}`,
              color: "#1C1B2E",
              backgroundColor: "#FAFAF5",
            }}
          />
        </div>
        {error && <p className="text-sm mb-3" style={{ color: "#FF4D6D" }}>{error}</p>}

        {/* Quick bid buttons */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {[min, min + 100, min + 250, min + 500].map((v) => (
            <button
              key={v}
              onClick={() => setAmount(String(v))}
              className="px-4 py-2 rounded-full text-sm font-medium transition-colors hover:opacity-80"
              style={{
                backgroundColor: parseInt(amount) === v ? "#FFD15C" : "#FFF6D0",
                color: parseInt(amount) === v ? "#1C1B2E" : "#6B6880",
              }}
            >
              ${v.toLocaleString()}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-full text-base font-medium"
            style={{ backgroundColor: "#F5F0E8", color: "#6B6880" }}
          >
            Cancel
          </button>
          <button
            onClick={handle}
            className="flex-1 py-3 rounded-full text-base font-medium transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #FFD15C, #FFBD2E)", color: "#1C1B2E" }}
          >
            Confirm Bid →
          </button>
        </div>

        <p className="text-sm mt-4 text-center" style={{ color: "#9CA3AF" }}>
          Winning bidders are contacted within 24 h of auction close.
        </p>
      </div>
    </div>
  );
}

function PaintingCard({
  painting,
  accent,
  accentSoft,
  onBidClick,
  userBid,
}: {
  painting: Painting;
  accent: string;
  accentSoft: string;
  onBidClick: () => void;
  userBid?: number;
}) {
  return (
    <div
      className="rounded-3xl overflow-hidden flex flex-col group"
      style={{
        backgroundColor: "white",
        border: "1px solid #EDE8D8",
        boxShadow: "0 2px 16px rgba(255,209,92,0.08)",
        transition: "box-shadow 0.3s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 10px 36px rgba(255,209,92,0.22)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 16px rgba(255,209,92,0.08)";
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: "280px", backgroundColor: accentSoft }}>
        <img
          src={painting.imageUrl}
          alt={painting.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
          style={{ filter: "saturate(0.92)" }}
        />
        {/* Timer overlay */}
        <div
          className="absolute top-3 right-3 px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-1.5"
          style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
          <AuctionTimer endDate={painting.auctionEnds} />
        </div>
        {userBid !== undefined && (
          <div
            className="absolute top-3 left-3 px-3 py-1.5 rounded-full text-sm font-medium"
            style={{ backgroundColor: "#FFD15C", color: "#1C1B2E" }}
          >
            Your bid: ${userBid.toLocaleString()}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display text-xl mb-1" style={{ color: "#1C1B2E" }}>
          {painting.title}
        </h3>
        <p className="text-sm mb-3" style={{ color: "#9CA3AF" }}>
          {painting.medium} · {painting.size} · {painting.year}
        </p>
        <p className="text-base leading-relaxed mb-5 flex-1" style={{ color: "#6B6880" }}>
          {painting.description}
        </p>

        {/* Bid area */}
        <div
          className="rounded-2xl p-4 mb-4"
          style={{ backgroundColor: accentSoft }}
        >
          <div className="flex justify-between items-end">
            <div>
              <p className="text-sm mb-0.5" style={{ color: accent }}>Current bid</p>
              <p className="font-display text-2xl" style={{ color: "#1C1B2E" }}>
                ${painting.currentBid.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm mb-0.5" style={{ color: "#9CA3AF" }}>Starting</p>
              <p className="text-base font-medium" style={{ color: "#6B6880" }}>
                ${painting.startingBid.toLocaleString()}
              </p>
            </div>
          </div>
          <p className="text-sm mt-2" style={{ color: "#9CA3AF" }}>
            {painting.bidCount} bid{painting.bidCount !== 1 ? "s" : ""} placed
          </p>
        </div>

        <button
          onClick={onBidClick}
          className="w-full py-3 rounded-full text-sm font-medium text-white transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
          style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)` }}
        >
          {userBid !== undefined ? "Raise My Bid →" : "Place a Bid →"}
        </button>
      </div>
    </div>
  );
}

export default function SeriesPage({ seriesId, onBidPlaced, activeBids }: SeriesPageProps) {
  const config = seriesConfig[seriesId];
  const seriesPaintings = paintings.filter((p) => p.series === seriesId);
  const [bidTarget, setBidTarget] = useState<Painting | null>(null);

  const handleBid = (painting: Painting, amount: number) => {
    onBidPlaced(painting.id, painting.title, amount, painting.series);
    // Update the painting's currentBid in the local data for this session
    painting.currentBid = amount;
    painting.bidCount += 1;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAFAFA" }}>
      {/* Header */}
      <section
        className="relative overflow-hidden pt-28 pb-20"
        style={{ backgroundColor: config.accentSoft }}
      >
        {/* Blobs */}
        <div className="blob-a absolute -top-20 -right-20 pointer-events-none">
          <BlobShape color={config.accent} opacity={0.2} size={380} variant="b" />
        </div>
        <div className="blob-b absolute bottom-0 left-10 pointer-events-none">
          <BlobShape color={config.accent} opacity={0.12} size={280} variant="d" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <p
            className="text-sm font-medium tracking-[0.2em] uppercase mb-3"
            style={{ color: config.accent }}
          >
            Series
          </p>
          <h1 className="font-display text-5xl md:text-6xl mb-4" style={{ color: "#1C1B2E" }}>
            {config.label}
          </h1>
          <p className="text-xl mb-6 italic font-display" style={{ color: config.accent }}>
            {config.tagline}
          </p>
          <div className="w-12 h-0.5 mb-6" style={{ backgroundColor: config.accent }} />
          <p className="max-w-2xl text-base leading-relaxed" style={{ color: "#3D3B52" }}>
            {config.description}
          </p>

          <div className="mt-8 flex items-center gap-6">
            <div className="text-center">
              <p className="font-display text-3xl" style={{ color: "#1C1B2E" }}>{seriesPaintings.length}</p>
              <p className="text-sm" style={{ color: "#9CA3AF" }}>Works</p>
            </div>
            <div className="w-px h-10" style={{ backgroundColor: config.accent, opacity: 0.3 }} />
            <div className="text-center">
              <p className="font-display text-3xl" style={{ color: "#1C1B2E" }}>
                {seriesPaintings.reduce((s, p) => s + p.bidCount, 0)}
              </p>
              <p className="text-sm" style={{ color: "#9CA3AF" }}>Total bids</p>
            </div>
            <div className="w-px h-10" style={{ backgroundColor: config.accent, opacity: 0.3 }} />
            <div className="text-center">
              <p className="font-display text-3xl" style={{ color: "#1C1B2E" }}>Live</p>
              <p className="text-sm" style={{ color: "#9CA3AF" }}>All auctions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Paintings grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
          {seriesPaintings.map((painting) => (
            <PaintingCard
              key={painting.id}
              painting={painting}
              accent={config.accent}
              accentSoft={config.accentSoft}
              onBidClick={() => setBidTarget(painting)}
              userBid={activeBids[painting.id]}
            />
          ))}
        </div>

        <div
          className="mt-16 rounded-3xl p-8 text-center"
          style={{ backgroundColor: config.accentSoft }}
        >
          <p className="font-display text-xl mb-2" style={{ color: "#1C1B2E" }}>
            New works added regularly
          </p>
          <p className="text-sm mb-0" style={{ color: "#6B6880" }}>
            The studio is active. Follow along or reach out to enquire about upcoming pieces.
          </p>
        </div>
      </section>

      {/* Bid modal */}
      {bidTarget && (
        <BidModal
          painting={bidTarget}
          onClose={() => setBidTarget(null)}
          onBid={(amount) => handleBid(bidTarget, amount)}
          currentUserBid={activeBids[bidTarget.id]}
        />
      )}
    </div>
  );
}
