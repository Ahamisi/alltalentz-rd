declare module "*.css" {
  const styles: { [className: string]: string };
  export default styles;
}

export {};

declare global {
  interface Window {
    // reCAPTCHA callbacks (set via inline <Script> in ContactForm)
    onRecaptchaSuccess: (token: string) => void;
    onRecaptchaExpired: () => void;
    recaptchaToken: string | null;

    // Google Analytics
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;

    // LinkedIn Insight Tag
    _linkedin_partner_id: string;
    _linkedin_data_partner_ids: string[];
    lintrk: ((event: string, data?: object) => void) & {
      q: [string, object?][];
    };

    // Tawk.to
    Tawk_API: Record<string, unknown>;
    Tawk_LoadStart: Date;
  }
}
