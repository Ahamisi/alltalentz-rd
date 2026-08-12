import CallToAction from "@/components/homeRD/CallToAction";
import Footer from "@/components/shared/Footer";
import HireTalentzHero from "@/components/hire-talentz/hire-talentz-hero";
import TalentNiches from "@/components/hire-talentz/talent-niches";
import ReadyToBuild from "@/components/shared/ReadyToBuild";

export default function HireTalentz() {
  return (
    <main className="relative overflow-hidden overflow-y-hidden">
      {/* Hero */}
      <HireTalentzHero />

      {/* Find the right talent for your industry — tabbed niche deck */}
      <TalentNiches />

      {/* Don't see your role? — CTA */}
      <CallToAction
        heading={
          <>
            Don&apos;t see your role?
            <br />
            We source beyond our listed verticals.
          </>
        }
        text="Tell us what you need"
        url="/request-talent"
      />

      <ReadyToBuild/>
    </main>
  );
}
