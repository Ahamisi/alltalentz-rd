import AgencyVsEnterprise from "@/components/outsourcing/agency-vs-enterprise";
import Certifications from "@/components/outsourcing/certifications";
import OutsourcingHero from "@/components/outsourcing/outsourcing-hero";
import TheProcess from "@/components/outsourcing/the-process";
import WhoThisIsFor from "@/components/outsourcing/who-this-is-for";
import ReadyToBuild from "@/components/shared/ReadyToBuild";

export default function Outsourcing() {
  return (
    <main className="relative overflow-hidden overflow-y-hidden">
      {/* Hero */}
      <OutsourcingHero />

      {/* Agency vs Enterprise comparison matrix */}
      <AgencyVsEnterprise />

      {/* Who this is for */}
      <WhoThisIsFor />

      {/* The Process — four-step engagement flow */}
      <TheProcess />

      {/* Certifications */}
      <Certifications />

      {/* Read to Build */}
      <ReadyToBuild/>
    </main>
  );
}
