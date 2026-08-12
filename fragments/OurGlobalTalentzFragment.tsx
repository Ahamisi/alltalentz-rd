import GlobalTalentzHero from "@/components/our-global-talentz/global-talentz-hero";
import HowWeVet from "@/components/our-global-talentz/HowWeVet";
import TalentDeck from "@/components/our-global-talentz/TalentDeck";
import TrainedOn from "@/components/our-global-talentz/TrainedOn";
import ReadyToBuild from "@/components/shared/ReadyToBuild";

export default function OurGlobalTalentz() {
  return (
    <>
      {/* Hero */}
      <GlobalTalentzHero />

      {/* How we vet */}
      <HowWeVet />

      {/* Talent profile deck */}
      <TalentDeck />

      {/* Certifications professionals are trained on */}
      <TrainedOn />

      {/* Ready to build */}
      <ReadyToBuild />
    </>
  );
}
