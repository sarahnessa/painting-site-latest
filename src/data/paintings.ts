export interface Painting {
  id: string;
  title: string;
  series: string;
  medium: string;
  size: string;
  year: number;
  imageUrl: string;
  startingBid: number;
  currentBid: number;
  auctionEnds: Date;
  bidCount: number;
  description: string;
}

const hoursFromNow = (h: number) => new Date(Date.now() + h * 3600_000);

export const paintings: Painting[] = [
  // Nature X Spirit
  {
    id: "ns-001",
    title: "Ember Grove",
    series: "nature-spirit",
    medium: "Oil on canvas",
    size: '24" × 30"',
    year: 2024,
    imageUrl: "https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=800&h=1000&fit=crop&auto=format",
    startingBid: 480,
    currentBid: 720,
    auctionEnds: hoursFromNow(52),
    bidCount: 7,
    description: "Amber light diffuses through ancient oak canopy; the forest holds its breath between seasons.",
  },
  {
    id: "ns-002",
    title: "Tide Meditation",
    series: "nature-spirit",
    medium: "Oil on canvas",
    size: '30" × 40"',
    year: 2024,
    imageUrl: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&h=1000&fit=crop&auto=format",
    startingBid: 650,
    currentBid: 1100,
    auctionEnds: hoursFromNow(29),
    bidCount: 11,
    description: "The sea recedes, leaving still pools that mirror a violet sky. A study in presence.",
  },
  {
    id: "ns-003",
    title: "Mountain Liturgy",
    series: "nature-spirit",
    medium: "Oil on canvas",
    size: '36" × 48"',
    year: 2025,
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1000&fit=crop&auto=format",
    startingBid: 900,
    currentBid: 1450,
    auctionEnds: hoursFromNow(76),
    bidCount: 9,
    description: "Stacked ridges dissolve into mist; the summit becomes a question, not an answer.",
  },
  {
    id: "ns-004",
    title: "Field Oracle",
    series: "nature-spirit",
    medium: "Oil on canvas",
    size: '20" × 24"',
    year: 2025,
    imageUrl: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=1000&fit=crop&auto=format",
    startingBid: 380,
    currentBid: 560,
    auctionEnds: hoursFromNow(41),
    bidCount: 5,
    description: "Wild grasses and seed heads caught in golden hour, each stalk a small sermon on impermanence.",
  },

  // Science X Art
  {
    id: "sa-001",
    title: "Cell Memory",
    series: "science-art",
    medium: "Oil on canvas",
    size: '30" × 30"',
    year: 2024,
    imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=800&fit=crop&auto=format",
    startingBid: 720,
    currentBid: 1280,
    auctionEnds: hoursFromNow(38),
    bidCount: 13,
    description: "Mitochondrial forms rendered in coral and gold — the architecture of life seen from within.",
  },
  {
    id: "sa-002",
    title: "Nebula Cartography",
    series: "science-art",
    medium: "Oil on canvas",
    size: '40" × 50"',
    year: 2024,
    imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=1000&fit=crop&auto=format",
    startingBid: 1200,
    currentBid: 2100,
    auctionEnds: hoursFromNow(60),
    bidCount: 18,
    description: "Mapped what cannot be measured — the emotional topography of a star-forming region.",
  },
  {
    id: "sa-003",
    title: "Wave Equation",
    series: "science-art",
    medium: "Oil on canvas",
    size: '24" × 36"',
    year: 2025,
    imageUrl: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=800&h=1200&fit=crop&auto=format",
    startingBid: 580,
    currentBid: 870,
    auctionEnds: hoursFromNow(22),
    bidCount: 8,
    description: "Schrödinger's palette — the painting exists in superposition until you choose which truth to see.",
  },
  {
    id: "sa-004",
    title: "Synaptic Garden",
    series: "science-art",
    medium: "Oil on canvas",
    size: '28" × 36"',
    year: 2025,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop&auto=format",
    startingBid: 640,
    currentBid: 940,
    auctionEnds: hoursFromNow(84),
    bidCount: 6,
    description: "Neural pathways rendered as tangled vines — the garden that grows only when we think.",
  },

  // Travel Gems
  {
    id: "tg-001",
    title: "Medina Blue Hour",
    series: "travel-gems",
    medium: "Oil on canvas",
    size: '24" × 30"',
    year: 2023,
    imageUrl: "https://images.unsplash.com/photo-1489493512598-d08130f49bea?w=800&h=1000&fit=crop&auto=format",
    startingBid: 520,
    currentBid: 880,
    auctionEnds: hoursFromNow(47),
    bidCount: 10,
    description: "Morocco at dusk: tiled archways, the scent of cumin, a call to prayer dissolving into indigo sky.",
  },
  {
    id: "tg-002",
    title: "Tuscany, Ripe",
    series: "travel-gems",
    medium: "Oil on canvas",
    size: '36" × 24"',
    year: 2023,
    imageUrl: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1200&h=800&fit=crop&auto=format",
    startingBid: 600,
    currentBid: 1020,
    auctionEnds: hoursFromNow(33),
    bidCount: 12,
    description: "Harvest season on a hillside outside Siena — vineyards turning the colour of old copper.",
  },
  {
    id: "tg-003",
    title: "Aegean Séance",
    series: "travel-gems",
    medium: "Oil on canvas",
    size: '30" × 30"',
    year: 2024,
    imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&h=800&fit=crop&auto=format",
    startingBid: 680,
    currentBid: 1150,
    auctionEnds: hoursFromNow(55),
    bidCount: 9,
    description: "Santorini's white cubes against impossible blue — architecture as argument with the sky.",
  },
  {
    id: "tg-004",
    title: "Kyoto Rain Poem",
    series: "travel-gems",
    medium: "Oil on canvas",
    size: '20" × 30"',
    year: 2024,
    imageUrl: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=1200&fit=crop&auto=format",
    startingBid: 490,
    currentBid: 730,
    auctionEnds: hoursFromNow(70),
    bidCount: 7,
    description: "A bamboo grove after rain: each drop a syllable, each leaf a pause in the sentence.",
  },
];

export const seriesConfig = {
  "nature-spirit": {
    id: "nature-spirit",
    label: "Nature × Spirit",
    tagline: "Where the wild world speaks in metaphor.",
    description:
      "This series explores the spiritual dimension latent in natural landscapes — the way a storm-lit meadow or a still tidal pool holds something that defies explanation. Each canvas is painted outdoors, then reworked in the studio to distill the felt presence of place.",
    accent: "#E68A00",
    accentSoft: "#FFF6D0",
  },
  "science-art": {
    id: "science-art",
    label: "Science × Art",
    tagline: "The equations we cannot see, painted.",
    description:
      "Drawing on microscopy, astrophysics, and neuroscience, this series asks what it would look like if invisible forces had a colour. Each piece begins with a scientific image or concept and is then freed from literalism — allowed to become feeling rather than diagram.",
    accent: "#4338CA",
    accentSoft: "#EEF2FF",
  },
  "travel-gems": {
    id: "travel-gems",
    label: "Travel Gems",
    tagline: "Places that changed how I see.",
    description:
      "Oil sketches and studio paintings born from travels — not the postcard version, but the specific slant of afternoon light, the texture of a market wall, the colour memory that lingers months after the return flight. Collected from California, Indonesia, Mexico, and beyond.",
    accent: "#C0003B",
    accentSoft: "#FFD6E3",
  },
};
