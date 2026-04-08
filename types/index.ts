// Form state shapes

export interface ContactFormData {
  fullName: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  redirect: boolean;
}

export interface WatchlistFormData {
  fullName: string;
  email: string;
  yoe: string;
  career: string;
  phone: string;
  cv: string;
}

export interface BootcampFormData {
  fullName: string;
  email: string;
  phone: string;
  yoe: string;
  career: string;
  cv: string;
  nysc: string;
}

// Schema markup helpers

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

// Media / component data

export interface ClientVideo {
  id: number;
  videoUrl: string;
}
