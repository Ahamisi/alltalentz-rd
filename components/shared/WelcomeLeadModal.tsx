"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { CalendarDays, Loader2, Phone } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import GradientStar from "@/components/homeRD/GradientStar";

/**
 * Landing lead-capture popup.
 *
 * Shows once shortly after a visitor lands: headline, three proof points, a
 * short contact form, and "book a meeting" / phone escape hatches for people
 * who aren't ready to type. Deliberately short — the full brief lives on
 * /request-talentz, this only has to earn a reply.
 *
 * Frequency: every visit. Deliberately unthrottled — no localStorage snooze, no
 * once-per-session flag — so a returning visitor sees it again on every page
 * load. It only skips reopening on client-side navigation within one visit,
 * which would otherwise interrupt someone already browsing.
 *
 * Presentation is the shadcn/Base UI <Dialog>: it owns the portal, backdrop,
 * focus trap, escape handling and scroll lock, so this file only deals with
 * when to open and what to ask.
 */

const OPEN_DELAY_MS = 1200;
const CALENDLY_URL = "https://calendly.com/mnwoseh";

/** Sanity Studio is an admin surface — a lead popup over the CMS is never right. */
const SUPPRESSED_PREFIXES = ["/studio"];

const BENEFITS = [
  "Pre-vetted talent, assigned in under 48 hours",
  "Up to 75% less than a local hire",
  "No commitment, no hidden fees",
];

/** Sales line offered to visitors who'd rather talk than type. */
const PHONE_DISPLAY = "+1 (614) 502-1440";
const PHONE_HREF = "tel:+16145021440";

/** Outlined tile — quiet enough to stay below the submit button, still tappable. */
const secondaryActionClass = [
  "group/alt flex items-center gap-2.5 rounded-[10px] border border-[#EAEAEA] px-3 py-2.5 text-left",
  "transition-colors duration-200 hover:border-[#F99621]/50 hover:bg-[#FEF9F2]",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F99621]",
].join(" ");

const secondaryIconClass =
  "grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#F5F5F5] text-[#5A5A5A] transition-colors duration-200 group-hover/alt:bg-[#FEF5E9] group-hover/alt:text-[#F99621]";

interface FormState {
  name: string;
  email: string;
  phone: string;
  talentNeeded: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMPTY_FORM: FormState = { name: "", email: "", phone: "", talentNeeded: "" };

// ── Animated check mark ─────────────────────────────────────────────────────

/** Stroke-drawn tick — reads as "being confirmed" rather than a static glyph. */
const DrawnCheck = ({ delay = 0, size = 12 }: { delay?: number; size?: number }) => {
  const reduced = useReducedMotion();
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <motion.path
        d="M1.5 6.4L4.4 9.2L10.5 2.8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduced ? { opacity: 0 } : { pathLength: 0 }}
        animate={reduced ? { opacity: 1 } : { pathLength: 1 }}
        transition={{ duration: reduced ? 0.2 : 0.4, delay, ease: "easeOut" }}
      />
    </svg>
  );
};

// ── Component ───────────────────────────────────────────────────────────────

const WelcomeLeadModal = () => {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  /** Drives the invalid-input nudge only — never the entrance, which is CSS. */
  const shakeControls = useAnimationControls();
  const headingRef = useRef<HTMLHeadingElement>(null);
  /** One open per page load — survives client-side route changes. */
  const hasOpenedRef = useRef(false);

  const isSuppressedRoute = SUPPRESSED_PREFIXES.some((p) => pathname?.startsWith(p));

  // ── Open on landing ───────────────────────────────────────────────────────
  useEffect(() => {
    if (isSuppressedRoute) return;
    if (hasOpenedRef.current) return;

    const timer = setTimeout(() => {
      hasOpenedRef.current = true;
      setIsOpen(true);
    }, OPEN_DELAY_MS);

    return () => clearTimeout(timer);
  }, [isSuppressedRoute]);

  // Lenis owns the scroll position, so the dialog's overflow lock alone doesn't
  // freeze the page — the smooth-scroll loop has to be paused too.
  useEffect(() => {
    if (!isOpen) return;
    window.__lenis?.stop();
    return () => window.__lenis?.start();
  }, [isOpen]);

  // ── Form ──────────────────────────────────────────────────────────────────

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => (prev[name as keyof FormState] ? { ...prev, [name]: undefined } : prev));
  };

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = "Please tell us your name";
    if (!form.email.trim()) next.email = "Please add your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      next.email = "Please check that email address";
    // Phone stays optional — email is enough to follow up, and one more
    // required field is the cheapest way to lose a lead here.
    if (!form.talentNeeded.trim()) next.talentNeeded = "Let us know the roles you need";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      // A short lateral nudge on the settled card — cheaper to read than a
      // banner, and it points attention back at the fields.
      if (!reduced) {
        shakeControls.start({
          x: [0, -7, 7, -4, 4, 0],
          transition: { duration: 0.4, ease: "easeInOut" },
        });
      }
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/quick-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          talentNeeded: form.talentNeeded.trim(),
          source: pathname ?? "/",
        }),
      });
    } catch (error) {
      // The lead is low-friction by design — never block the visitor on a
      // network hiccup, the thank-you state is the point.
      console.error("[welcome-lead-modal] submit failed:", error);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const inputClass = (field: keyof FormState) =>
    [
      "w-full rounded-[10px] border bg-[#F5F5F5] px-4 py-3 text-[15px] text-[#121212]",
      "placeholder-[#9A9A9A] transition-colors duration-200",
      "focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#F99621]",
      errors[field] ? "border-red-400 bg-red-50" : "border-transparent hover:bg-[#EFEFEF]",
    ].join(" ");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        // Focus the heading rather than the first input, so mobile keyboards
        // don't fly up the moment the popup lands.
        initialFocus={headingRef}
        overlayClassName="bg-[#121212]/60 supports-backdrop-filter:backdrop-blur-[3px]"
        className="max-h-[90dvh] w-full max-w-[calc(100%-2rem)] gap-0 overflow-y-auto rounded-[20px] bg-white p-0 ring-0 shadow-[0_30px_80px_-20px_rgba(18,18,18,0.45)] sm:max-w-[480px]"
      >
        {/* Warm glow behind the header — anchors the card in the v26 palette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full bg-[#F99621]/25 blur-[70px]"
        />

        {isSubmitted ? (
          /* ── Thank-you state ──────────────────────────────────────────── */
          <div className="relative px-6 py-14 text-center sm:px-10">
            <DialogTitle
              ref={headingRef}
              className="mt-6 text-[24px] leading-[1.2] font-semibold tracking-[-2%] text-[#121212]"
            >
              <motion.span
                className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-[#FEF5E9] text-[#F99621]"
                initial={reduced ? { opacity: 0 } : { scale: 0.5, opacity: 0 }}
                animate={reduced ? { opacity: 1 } : { scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.05 }}
              >
                <DrawnCheck size={28} delay={0.25} />
              </motion.span>
              Request received.
            </DialogTitle>
            <p className="mx-auto mt-2 max-w-[300px] text-[15px] leading-[1.55] text-[#5A5A5A]">
              A talent partner will reach out within 24 business hours with matched profiles.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#121212] px-6 py-3 text-[15px] font-medium text-white transition-transform duration-200 hover:-translate-y-0.5"
              >
                Book a Meeting
              </a>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-[14px] text-[#8A8A8A] underline underline-offset-4 transition-colors hover:text-[#121212]"
              >
                Keep browsing
              </button>
            </div>
          </div>
        ) : (
          /* ── Form state ───────────────────────────────────────────────── */
          <motion.div
            animate={shakeControls}
            className="relative px-6 pt-9 pb-7 sm:px-8 sm:pt-10"
          >
            {/* Header */}
            <div className="pr-10">
              <div className="flex items-center gap-1.5">
                <GradientStar id="wlm-star-1" className="h-3.5 w-3.5" />
                <GradientStar id="wlm-star-2" delay={0.6} className="h-3.5 w-3.5" />
                <span className="ml-1 text-[12px] font-medium tracking-[0.08em] text-[#8A8A8A] uppercase">
                  Hire in under 48 hours
                </span>
              </div>
              <DialogTitle
                ref={headingRef}
                tabIndex={-1}
                className="mt-3 text-[26px] leading-[1.15] font-semibold tracking-[-2%] text-[#121212] outline-hidden sm:text-[30px]"
              >
                {"Let's find your next hire."}
              </DialogTitle>
            </div>

            {/* Proof points */}
            <ul className="mt-5 flex flex-col gap-2.5">
              {BENEFITS.map((benefit, index) => (
                <li
                  key={benefit}
                  className="flex items-start gap-2.5 text-[14.5px] leading-[1.45] text-[#3A3A3A]"
                >
                  <span className="mt-0.5 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full bg-[#FEF5E9] text-[#F99621]">
                    <DrawnCheck delay={0.35 + index * 0.12} size={10} />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="mt-7 flex flex-col gap-3.5">
              <div>
                <label htmlFor="wlm-name" className="sr-only">
                  Name
                </label>
                <input
                  id="wlm-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "wlm-name-error" : undefined}
                  className={inputClass("name")}
                />
                {errors.name && (
                  <p id="wlm-name-error" className="mt-1.5 text-[12.5px] text-red-500">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="wlm-email" className="sr-only">
                  Email
                </label>
                <input
                  id="wlm-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "wlm-email-error" : undefined}
                  className={inputClass("email")}
                />
                {errors.email && (
                  <p id="wlm-email-error" className="mt-1.5 text-[12.5px] text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="wlm-phone" className="sr-only">
                  Phone number
                </label>
                <input
                  id="wlm-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "wlm-phone-error" : undefined}
                  className={inputClass("phone")}
                />
                {errors.phone && (
                  <p id="wlm-phone-error" className="mt-1.5 text-[12.5px] text-red-500">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="wlm-talent" className="sr-only">
                  Talent needed
                </label>
                <textarea
                  id="wlm-talent"
                  name="talentNeeded"
                  rows={3}
                  placeholder="Let us know the roles you need."
                  value={form.talentNeeded}
                  onChange={handleChange}
                  aria-invalid={!!errors.talentNeeded}
                  aria-describedby={errors.talentNeeded ? "wlm-talent-error" : undefined}
                  className={inputClass("talentNeeded") + " resize-none"}
                />
                {errors.talentNeeded && (
                  <p id="wlm-talent-error" className="mt-1.5 text-[12.5px] text-red-500">
                    {errors.talentNeeded}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group mt-1 inline-flex h-13 w-full items-center justify-center gap-2 bg-[#F99621] text-[15px] font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E5871A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#121212] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Submit
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 ease-out group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </>
                )}
              </button>
            </form>

            {/* Secondary path — two escape hatches for anyone not ready to type.
                Rules either side of the label keep them clearly subordinate to
                the submit button rather than competing with it. */}
            <div className="mt-6">
              <div className="flex items-center gap-3">
                <span className="h-px flex-1 bg-[#EDEDED]" />
                <span className="text-[12.5px] text-[#9A9A9A]">Not sure yet?</span>
                <span className="h-px flex-1 bg-[#EDEDED]" />
              </div>

              {/* Stacked on phones — side by side the number has to truncate. */}
              <div className="mt-3.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={secondaryActionClass}
                >
                  <span className={secondaryIconClass}>
                    <CalendarDays className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13.5px] leading-tight font-medium text-[#121212]">
                      Book a Meeting
                    </span>
                    <span className="block text-[12px] leading-tight text-[#9A9A9A]">
                      Pick a time that suits
                    </span>
                  </span>
                </a>

                <a href={PHONE_HREF} className={secondaryActionClass}>
                  <span className={secondaryIconClass}>
                    <Phone className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13.5px] leading-tight font-medium text-[#121212]">
                      Talk to Our Team
                    </span>
                    <span className="block truncate text-[12px] leading-tight text-[#9A9A9A]">
                      {PHONE_DISPLAY}
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeLeadModal;
