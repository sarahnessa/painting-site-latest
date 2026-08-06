import { useState } from "react";
import BlobShape from "../components/BlobShape";
import BlobIcon from "../components/BlobIcon";

export default function Contact(): import("react").JSX.Element {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm({ ...form, [key]: e.target.value }),
  });

  const [focused, setFocused] = useState<string | null>(null);

  const inputBase = {
    border: "1.5px solid #EDE8D8",
    color: "#1C1B2E",
    backgroundColor: "#FAFAF5",
    fontFamily: "DM Sans, sans-serif",
    fontSize: "15px",
  };
  const inputFocused = { ...inputBase, border: "1.5px solid #FFD15C" };
  const inputClass = "w-full px-5 py-4 rounded-2xl outline-none transition-colors";

  const contactDetails = [
    { iconType: "location" as const, label: "Location", value: "San Francisco, CA, USA", bg: "#FFF6D0", fg: "#FFD15C" },
    { iconType: "email" as const, label: "Email", value: "sarahnessaart@gmail.com", bg: "#EEF2FF", fg: "#818CF8" },
    { iconType: "clock" as const, label: "Response time", value: "1–3 business days", bg: "#FFF6D0", fg: "#FFBD2E" },
    { iconType: "plane" as const, label: "Shipping", value: "Worldwide via FedEx Art", bg: "#FFD6E3", fg: "#FF4D6D" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAFAFA" }}>
      {/* Header */}
      <section className="relative overflow-hidden pt-28 pb-16" style={{ backgroundColor: "#FFFBEC" }}>
        <div className="blob-a absolute -top-16 -right-16 pointer-events-none">
          <BlobShape color="#FFD15C" opacity={0.3} size={360} variant="a" />
        </div>
        <div className="blob-b absolute bottom-0 -left-10 pointer-events-none">
          <BlobShape color="#FF4D6D" opacity={0.14} size={280} variant="c" />
        </div>
        <div className="blob-c absolute top-10 left-1/2 pointer-events-none">
          <BlobShape color="#818CF8" opacity={0.1} size={200} variant="e" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <p className="text-sm font-medium tracking-[0.2em] uppercase mb-3" style={{ color: "#E68A00" }}>
            Get in Touch
          </p>
          <h1 className="font-display text-5xl md:text-6xl mb-4" style={{ color: "#1C1B2E" }}>
            Contact
          </h1>
          <div className="w-12 h-0.5 mb-5" style={{ backgroundColor: "#FFD15C" }} />
          <p className="max-w-xl text-base leading-relaxed" style={{ color: "#3D3B52" }}>
            Questions about a painting, auction, shipping, commission inquiries, or just to say hello — all
            messages are read and answered personally, usually within a couple of days.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-5 gap-16">
        {/* Left info */}
        <div className="md:col-span-2 space-y-10">
          <div>
            <h2 className="font-display text-2xl mb-6" style={{ color: "#1C1B2E" }}>Studio</h2>
            <div className="space-y-5">
              {contactDetails.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <BlobIcon type={item.iconType} size={52} bg={item.bg} fg={item.fg} />
                  <div>
                    <p className="text-sm font-medium" style={{ color: "#9CA3AF" }}>{item.label}</p>
                    <p className="text-base" style={{ color: "#1C1B2E" }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Comissions Explanation */}
          {/* <div>
            <h2 className="font-display text-2xl mb-3" style={{ color: "#1C1B2E" }}>Commissions</h2>
            <p className="text-base leading-relaxed" style={{ color: "#6B6880" }}>
              I accept a limited number of commissioned oil paintings each year. If you have a place,
              person, or concept in mind, reach out with details — I'll let you know if it's
              a project I can take on.
            </p>
          </div> */}

          <div>
            <h2 className="font-display text-2xl mb-4" style={{ color: "#1C1B2E" }}>Follow the Studio</h2>
            <div className="flex gap-3">
              {["Instagram", "Pinterest"].map((platform) => (
                <div
                  key={platform}
                  className="px-4 py-2.5 rounded-full text-sm font-medium"
                  style={{ backgroundColor: "#FFF6D0", color: "#E68A00" }}
                >
                  {platform}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="md:col-span-3">
          {sent ? (
            <div
              className="rounded-3xl p-12 text-center flex flex-col items-center"
              style={{ backgroundColor: "white", border: "1px solid #EDE8D8" }}
            >
              <BlobIcon type="sparkle" size={88} bg="#FFF6D0" fg="#FFD15C" />
              <h3 className="font-display text-2xl mt-6 mb-3" style={{ color: "#1C1B2E" }}>Message sent!</h3>
              <p className="text-base leading-relaxed" style={{ color: "#6B6880" }}>
                Thank you for reaching out. I'll read your message personally and get back
                to you within a few days from the studio.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-6 px-6 py-3 rounded-full text-base font-medium"
                style={{ backgroundColor: "#FFF6D0", color: "#E68A00" }}
              >
                Send another →
              </button>
            </div>
          ) : (
            <form
              onSubmit={handle}
              className="rounded-3xl p-8 space-y-5"
              style={{ backgroundColor: "white", border: "1px solid #EDE8D8" }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#6B6880" }}>Name</label>
                  <input
                    required
                    {...field("name")}
                    placeholder="Your name"
                    className={inputClass}
                    style={focused === "name" ? inputFocused : inputBase}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#6B6880" }}>Email</label>
                  <input
                    required
                    type="email"
                    {...field("email")}
                    placeholder="your@email.com"
                    className={inputClass}
                    style={focused === "email" ? inputFocused : inputBase}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#6B6880" }}>Subject</label>
                <select
                  required
                  {...field("subject")}
                  className={inputClass}
                  style={focused === "subject" ? inputFocused : inputBase}
                  onFocus={() => setFocused("subject")}
                  onBlur={() => setFocused(null)}
                >
                  <option value="">Select a topic…</option>
                  <option>Auction / Bidding question</option>
                  <option>Shipping & delivery</option>
                  <option>Commission enquiry</option>
                  <option>Press / Exhibition</option>
                  <option>Just saying hello</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#6B6880" }}>Message</label>
                <textarea
                  required
                  {...field("message")}
                  placeholder="Tell me what's on your mind…"
                  rows={6}
                  className={inputClass}
                  style={{ ...(focused === "message" ? inputFocused : inputBase), resize: "none" }}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full text-base font-medium transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg, #FFD15C, #FFBD2E)", color: "#1C1B2E" }}
              >
                Send Message →
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
