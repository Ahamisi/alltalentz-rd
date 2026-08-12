export type CertificationId = "iso" | "soc2" | "great-place" | "hipaa";

export type Certification = {
  id: CertificationId;
  name: string;
  alt: string;
  href: string;
  description: string;
  src: string;
  /** Shape of the artwork inside the square file, for layouts that keep it. */
  artwork: { w: number; h: number };
  /**
   * Optical-size multiplier. Every badge file is a 3600x3600 square, but the
   * artwork inside fills a different share of it, so rows that size all four to
   * one common box use this to cancel out the padding and make them look equal.
   */
  scale: number;
  /** Rendered box, for layouts that size each badge individually. */
  box: { w: number; h: number };
};

/** Every badge file is a 3600x3600 square. */
export const CERT_INTRINSIC = { w: 3600, h: 3600 } as const;

export const CERTIFICATIONS: Certification[] = [
  {
    id: "iso",
    name: "ISO 27001",
    alt: "ISO 27001 certified by AssurancePoint",
    href: "https://www.iafcertsearch.org/certification/vD5DJrOP2lgDH3m3YPIqgqtH",
    description: "Your data protected by global security standards.",
    src: "/v26-images/certs/iso.png",
    artwork: { w: 676, h: 676 },
    scale: 1,
    box: { w: 170, h: 170 },
  },
  {
    id: "soc2",
    name: "SOC 2 Type II",
    alt: "AICPA SOC for Service Organizations",
    href: "https://us.aicpa.org/interestareas/frc/assuranceadvisoryservices/serviceorganization-smanagement.html",
    description: "Independently audited for security and trust.",
    src: "/v26-images/certs/aicpa.png",
    artwork: { w: 676, h: 671 },
    scale: 1.03,
    box: { w: 138, h: 138 },
  },
  {
    id: "great-place",
    name: "Great Place To Work",
    alt: "Great Place To Work certified, Oct 2025 – Oct 2026, Nigeria",
    href: "https://www.greatplacetowork.com/",
    description: "Certified for culture, care, and consistency.",
    src: "/v26-images/certs/great-place.png",
    artwork: { w: 475, h: 671 },
    scale: 1.02,
    box: { w: 92, h: 130 },
  },
  {
    id: "hipaa",
    name: "HIPAA Compliant",
    alt: "HIPAA compliant",
    href: "https://www.hhs.gov/hipaa/index.html",
    description: "Healthcare data handled safely, always compliant.",
    src: "/v26-images/certs/hipaa.png",
    artwork: { w: 1200, h: 635 },
    scale: 1.23,
    box: { w: 200, h: 106 },
  },
];

const BY_ID = new Map(CERTIFICATIONS.map((cert) => [cert.id, cert]));

export const certificationsInOrder = (...ids: CertificationId[]): Certification[] =>
  ids.map((id) => {
    const cert = BY_ID.get(id);
    if (!cert) throw new Error(`Unknown certification id: ${id}`);
    return cert;
  });
