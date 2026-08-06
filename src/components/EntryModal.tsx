import BlobShape from "./BlobShape";
import BlobIcon from "./BlobIcon";

interface EntryModalProps {
  onClose: () => void;
}

export default function EntryModal({ onClose }: EntryModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ backgroundColor: "rgba(28,27,46,0.6)", backdropFilter: "blur(8px)" }}
    >
      <div
        className="modal-card relative bg-white rounded-3xl overflow-hidden max-w-lg w-full"
        style={{ boxShadow: "0 40px 100px rgba(255,209,92,0.22), 0 8px 32px rgba(28,27,46,0.18)" }}
      >
        {/* Blob decorations */}
        <div className="blob-a absolute -top-20 -right-20 pointer-events-none">
          <BlobShape color="#FFD15C" opacity={0.3} size={260} variant="a" />
        </div>
        <div className="blob-b absolute -bottom-20 -left-20 pointer-events-none">
          <BlobShape color="#FF4D6D" opacity={0.2} size={240} variant="c" />
        </div>
        <div className="blob-c absolute top-1/2 left-1/4 pointer-events-none" style={{ transform: "translateY(-50%)" }}>
          <BlobShape color="#818CF8" opacity={0.1} size={180} variant="e" />
        </div>

        <div className="relative z-10 p-10 text-center">
          {/* Blob palette icon */}
          <div className="mx-auto mb-6 flex items-center justify-center">
            <BlobIcon type="palette" size={76} bg="#FFF6D0" fg="#FFD15C" />
          </div>

          <p
            className="text-sm font-medium tracking-[0.2em] uppercase mb-3"
            style={{ color: "#E68A00" }}
          >
            Studio Notice
          </p>

          <h2
            className="font-display text-4xl mb-4 leading-tight"
            style={{ color: "#1C1B2E" }}
          >
            The Artist Is At Work
          </h2>

          <div
            className="w-12 h-px mx-auto mb-5"
            style={{ backgroundColor: "#FFD15C" }}
          />

          <p className="text-base leading-relaxed mb-3" style={{ color: "#6B6880" }}>
            New works are taking shape on the easel right now. The studio is actively
            expanding — come back soon to discover fresh paintings across all three series.
          </p>

          <p className="text-base mb-8 italic" style={{ color: "#E68A00" }}>
            Check back for additions to{" "}
            <span style={{ color: "#818CF8" }}>Nature × Spirit</span>,{" "}
            <span style={{ color: "#818CF8" }}>Science × Art</span>, and{" "}
            <span style={{ color: "#FF4D6D" }}>Travel Gems</span>.
          </p>

          <button
            onClick={onClose}
            className="px-8 py-3.5 rounded-full text-white text-base font-medium transition-all hover:opacity-90 hover:scale-105 active:scale-95"
            style={{ background: "linear-gradient(135deg, #FFD15C, #FFBD2E)" }}
          >
            <span style={{ color: "#1C1B2E" }}>Enter the Studio →</span>
          </button>

          {/* Auction-related Comment */}
          {/* <p className="text-sm mt-4" style={{ color: "#C4BAA8" }}>
            Live auctions are open — bids placed now count.
          </p> */}
        </div>
      </div>
    </div>
  );
}
