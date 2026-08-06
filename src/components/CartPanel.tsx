import BlobIcon from "./BlobIcon";

interface BidEntry {
  paintingId: string;
  title: string;
  bidAmount: number;
  series: string;
}

interface CartPanelProps {
  bids: BidEntry[];
  onClose: () => void;
  onRemove: (id: string) => void;
}

const seriesLabel: Record<string, string> = {
  "nature-spirit": "Nature × Spirit",
  "science-art": "Science × Art",
  "travel-gems": "Travel Gems",
};

const seriesColor: Record<string, string> = {
  "nature-spirit": "#E68A00",
  "science-art": "#4338CA",
  "travel-gems": "#FF4D6D",
};

export default function CartPanel({ bids, onClose, onRemove }: CartPanelProps) {
  const total = bids.reduce((sum, b) => sum + b.bidAmount, 0);

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="flex-1 bg-black/25" onClick={onClose} />

      {/* Panel */}
      <div
        className="cart-panel w-full max-w-sm bg-white h-full flex flex-col shadow-2xl"
        style={{ borderLeft: "1px solid #EDE8D8" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6" style={{ borderBottom: "1px solid #EDE8D8" }}>
          <div>
            <h2 className="font-display text-2xl" style={{ color: "#1C1B2E" }}>Your Bids</h2>
            <p className="text-sm mt-0.5" style={{ color: "#E68A00" }}>
              {bids.length === 0 ? "No active bids" : `${bids.length} active bid${bids.length > 1 ? "s" : ""}`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-amber-50 text-lg"
            style={{ color: "#6B6880" }}
          >
            ✕
          </button>
        </div>

        {/* Bids list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {bids.length === 0 ? (
            <div className="text-center py-16 flex flex-col items-center gap-4">
              <BlobIcon type="frame" size={88} bg="#FFF6D0" fg="#FFD15C" />
              <p className="text-base" style={{ color: "#9CA3AF" }}>
                Place a bid on any painting to track it here.
              </p>
            </div>
          ) : (
            bids.map((bid) => (
              <div
                key={bid.paintingId}
                className="rounded-2xl p-5"
                style={{ backgroundColor: "#FAFAF5", border: "1px solid #EDE8D8" }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-base truncate" style={{ color: "#1C1B2E" }}>
                      {bid.title}
                    </p>
                    <p
                      className="text-sm mt-0.5"
                      style={{ color: seriesColor[bid.series] ?? "#E68A00" }}
                    >
                      {seriesLabel[bid.series] ?? bid.series}
                    </p>
                  </div>
                  <button
                    onClick={() => onRemove(bid.paintingId)}
                    className="text-sm opacity-40 hover:opacity-80 transition-opacity shrink-0"
                    style={{ color: "#6B6880" }}
                  >
                    Remove
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm" style={{ color: "#9CA3AF" }}>Your bid</span>
                  <span className="font-display text-xl" style={{ color: "#1C1B2E" }}>
                    ${bid.bidAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {bids.length > 0 && (
          <div className="p-6" style={{ borderTop: "1px solid #EDE8D8" }}>
            <div className="flex justify-between items-center mb-4">
              <span className="text-base font-medium" style={{ color: "#6B6880" }}>Total committed</span>
              <span className="font-display text-2xl" style={{ color: "#1C1B2E" }}>
                ${total.toLocaleString()}
              </span>
            </div>
            <p className="text-sm mb-4 leading-relaxed" style={{ color: "#9CA3AF" }}>
              Winning bidders are contacted by email within 24 hours of auction close to arrange payment and shipping.
            </p>
            <button
              className="w-full py-3.5 rounded-full text-base font-medium transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #FFD15C, #FFBD2E)", color: "#1C1B2E" }}
            >
              Contact Artist to Confirm →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
