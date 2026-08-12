"use client";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";
import { REVEAL_IN_VIEW } from "@/lib/motion";

/**
 * Agency vs Enterprise comparison table — Outsourcing page.
 *
 * A cream card holding a 3-column matrix: capability label, then a tick/cross
 * per plan. The card fades up and the rows cascade in on scroll.
 */
type Column = {
  key: string;
  label: string;
};

type Row = {
  label: string;
  /** Keyed by Column.key — true renders a tick, false a cross. */
  included: Record<string, boolean>;
};

const COLUMNS: Column[] = [
  { key: "agency", label: "Agency" },
  { key: "enterprise", label: "Enterprise" },
];

const ROWS: Row[] = [
  { label: "Full-time staff required", included: { agency: false, enterprise: true } },
  { label: "Dedicated Account Manager", included: { agency: true, enterprise: true } },
  { label: "40 hrs/week or custom hours", included: { agency: true, enterprise: false } },
  { label: "Performance reporting", included: { agency: true, enterprise: true } },
  { label: "Scale up or down, no penalties", included: { agency: true, enterprise: false } },
];

const AgencyVsEnterprise = () => {
  const rootRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView(REVEAL_IN_VIEW);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Hide the card before first paint so the entrance always plays from
  // scratch.
  useLayoutEffect(() => {
    if (prefersReduced) return;
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(".ave-card", { autoAlpha: 0, y: 40 });
      gsap.set(".ave-head", { autoAlpha: 0, y: 12 });
      gsap.set(".ave-row", { autoAlpha: 0, y: 16 });
    }, rootRef);
    return () => ctx.revert();
  }, [prefersReduced]);

  useLayoutEffect(() => {
    if (!inView || prefersReduced) return;
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.to(".ave-card", {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      tl.to(
        ".ave-head",
        { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.1 },
        "-=0.45"
      );

      // Rows cascade in from the top of the matrix down.
      tl.to(
        ".ave-row",
        { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.09 },
        "-=0.25"
      );
    }, rootRef);

    return () => ctx.revert();
  }, [inView, prefersReduced]);

  const setRefs = (node: HTMLElement | null) => {
    rootRef.current = node;
    inViewRef(node);
  };

  return (
    <section
      ref={setRefs}
      className="relative overflow-hidden bg-white px-[24px] md:px-[40px] py-[80px] md:py-[120px]"
    >
      <div className="ave-card relative z-10 mx-auto w-full max-w-[1100px] rounded-[24px] bg-[#FDF8E9] px-[16px] py-[48px] md:rounded-[40px] md:px-[80px] md:py-[100px]">
        {/* border-spacing gives the gutters between the bars in the design. */}
        <table className="w-full table-fixed border-separate border-spacing-[6px] md:border-spacing-[12px]">
          <caption className="sr-only">
            What is included with the Agency plan versus the Enterprise plan
          </caption>
          <thead>
            <tr>
              {/* Label column has no header — the row labels carry the meaning. */}
              <th className="w-[46%] md:w-[45%]" />
              {COLUMNS.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="ave-head pb-[8px] text-center text-[16px] font-medium text-[#F99621] md:pb-[20px] md:text-[26px]"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.label} className="ave-row">
                <th
                  scope="row"
                  className="bg-[#5A4A22] px-[12px] py-[12px] text-left text-[12px] font-normal leading-snug text-white md:px-[24px] md:py-[16px] md:text-[16px]"
                >
                  {row.label}
                </th>
                {COLUMNS.map((column) => {
                  const included = row.included[column.key];
                  return (
                    <td
                      key={column.key}
                      className="bg-[#5A4A22] px-[8px] py-[12px] text-center md:py-[16px]"
                    >
                      <Image
                        src={
                          included
                            ? "/v26-images/agency/tables/check-icon.svg"
                            : "/v26-images/agency/tables/close-icon.svg"
                        }
                        alt={
                          included
                            ? `${row.label} is included with ${column.label}`
                            : `${row.label} is not included with ${column.label}`
                        }
                        width={included ? 26 : 19}
                        height={included ? 22 : 19}
                        className="mx-auto h-auto w-[16px] md:w-auto"
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AgencyVsEnterprise;
