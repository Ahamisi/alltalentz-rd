import Image from "next/image";
import Milestone from "@/components/homeRD/Milestone";
import MobileMilestone from "@/components/homeRD/MobileMilestone";
import Team from "@/components/homeRD/Team";
import MainFooter from "@/components/MainFooter";
import NicheSection from "@/components/homeRD/Niches";
import AboutHero from "@/components/about-company/about-hero";
import BeliefQuote from "@/components/about-company/belief-quote";
import OurStory from "@/components/about-company/our-story";
import RestoringExcellence from "@/components/about-company/restoring-excellence";
import LeadershipTeam from "@/components/about-company/leadership-team";
import ReadyToBuild from "@/components/shared/ReadyToBuild";

export default function About() {
  return (
    <main className="relative overflow-hidden overflow-y-hidden">
      <AboutHero />

      <BeliefQuote />

      {/* Our Story — scroll-driven timeline ride */}
      <OurStory />

      {/* Certifications on the dark doodle field */}
      <RestoringExcellence />

      {/* Leadership roster — auto-cycling filmstrip */}
      <LeadershipTeam />

      {/* Ready to build */}
      <ReadyToBuild/>
    </main>
  );
}
