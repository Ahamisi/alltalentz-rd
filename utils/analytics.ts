// Wrapper around gtag.js (loaded once in app/layout.tsx). gtag is injected by an
// afterInteractive <Script>, so it can legitimately be missing when a user
// interacts early — these calls no-op rather than throw.

type EventParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(eventName: string, params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, params);
      return;
    }
    // gtag.js hasn't executed yet — queue on dataLayer so it replays on load.
    if (!Array.isArray(window.dataLayer)) window.dataLayer = [];
    window.dataLayer.push(["event", eventName, params]);
  } catch {
    // analytics must never break a form
  }
}

export const trackFormStart = (formName: string) =>
  trackEvent("form_start", { form_name: formName });

export const trackFormValidationError = (formName: string, fields: string[]) =>
  trackEvent("form_validation_error", {
    form_name: formName,
    error_fields: fields.join(","),
  });

// Mirrored onto GA's recommended generate_lead event so it can be marked a key event.
export function trackLeadSubmitted(formName: string, params: EventParams = {}): void {
  trackEvent("form_submit", { form_name: formName, ...params });
  trackEvent("generate_lead", { form_name: formName, ...params });
}

export const trackFormSubmitError = (formName: string, reason: string) =>
  trackEvent("form_submit_error", { form_name: formName, reason });

// `location` is the page/section the CTA sits in, so the same button can be
// compared across placements.
export function trackCtaClick(
  ctaName: string,
  location: string,
  params: EventParams = {}
): void {
  trackEvent("cta_click", { cta_name: ctaName, cta_location: location, ...params });
}

// A booking-link click counts as a lead: same commercial signal as a form submit.
export const trackOutboundClick = (
  ctaName: string,
  location: string,
  url: string,
  isLead = false
) => {
  trackCtaClick(ctaName, location, { link_url: url, outbound: true });
  if (isLead) trackEvent("generate_lead", { form_name: ctaName, method: "booking_link" });
};

export const trackContactClick = (
  ctaName: string,
  location: string,
  method: "phone" | "email",
  target: string
) => {
  trackCtaClick(ctaName, location, { link_url: target, contact_method: method });
  trackEvent("generate_lead", { form_name: ctaName, method });
};
