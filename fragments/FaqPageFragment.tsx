import FaqHero from "@/components/faq/FaqHero";
import FaqExplorer from "@/components/faq/FaqExplorer";
import ReadyToBuild from "@/components/shared/ReadyToBuild";
import type { SanityFaqCategory } from "@/types/faq";

/**
 * /faq — heading, then a pinned search + category rail beside the grouped
 * accordion, closed out by the shared "ready to build" CTA.
 *
 * Content is passed in by the route (fetched from Sanity), so this stays a
 * server component and only the interactive rail/accordion ship JS.
 */
export default function FaqPageFragment({
  categories,
}: {
  categories: SanityFaqCategory[];
}) {
  return (
    // overflow-x-clip, not overflow-hidden: `hidden` makes <main> a scroll
    // container, and a scroll-container ancestor disables the sidebar's sticky.
    <main className="relative overflow-x-clip">
      <section className="bg-white px-[24px] md:px-[40px] pt-[96px] pb-[80px] md:pt-[128px] md:pb-[120px]">
        <div className="container mx-auto max-w-(--breakpoint-xl)">
          <FaqHero />
          <FaqExplorer categories={categories} />
        </div>
      </section>

      <ReadyToBuild />
    </main>
  );
}
