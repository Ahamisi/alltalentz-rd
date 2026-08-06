"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MainFooter from "@/components/MainFooter";
import PdpHero from "@/components/pdp/pdp-hero";
import PdpApplicationModal from "@/components/pdp/pdp-application-modal";
import MobileWarningModal from "@/components/pdp/mobile-warning-modal";
import RolesMarquee from "@/components/pdp/roles-marquee";
import WhatIsPdp from "@/components/pdp/what-is-pdp";
import ProgrammeHighlights from "@/components/pdp/programme-highlights";
import HowToApply from "@/components/pdp/how-to-apply";
import PdpFaq from "@/components/pdp/pdp-faq";
import { pdpExplainerVideoUrl, pdpMarqueeRoles, pdpTestimonialVideos } from "@/components/pdp/pdp-data";
import TrainingApproach from "@/components/homeRD/TrainingApproach";
import ConferenceVideo from "@/components/homeRD/ConferenceVideo";
import PreTestNoticeModal from "@/components/PreTestNoticeModal";
import { useIsMobile } from "@/hooks/useIsMobile";
import ReadyToBuild from "@/components/shared/ReadyToBuild";

/** Flip to false to reopen applications for the next PDP cycle. */
const APPLICATIONS_CLOSED = true;

/**
 * Professional Development Programme page. Composes the page sections and owns
 * the application flow only: hero CTA → mobile check → pre-test notice →
 * application modal → test portal. The form itself lives in
 * `components/pdp/pdp-application-modal`.
 */
export default function PdpPageFragment() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const isMobile = useIsMobile();
  const router = useRouter();

  /**
   * With applications closed the modal only carries the closed notice, so the
   * pre-test notice is skipped and it opens directly.
   */
  const openApplicationFlow = () => {
    if (APPLICATIONS_CLOSED) return setIsFormOpen(true);
    setShowNoticeModal(true);
  };

  const handleApply = () => {
    if (!APPLICATIONS_CLOSED && isMobile) return setShowMobileWarning(true);
    openApplicationFlow();
  };

  /** Guard the test page against direct navigation, then hand off. */
  const goToTest = () => {
    setIsFormOpen(false);
    sessionStorage.setItem("pdp-test-access", "granted");
    router.push("/professional-development-programme/test");
  };

  return (
    <main className="relative overflow-hidden overflow-y-hidden">
      <PdpHero onApply={handleApply} />

      <WhatIsPdp videoUrl={pdpExplainerVideoUrl} />

      <ProgrammeHighlights />

      <HowToApply />

      <PdpApplicationModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        applicationsClosed={APPLICATIONS_CLOSED}
        onSubmitted={goToTest}
      />

      {/* <RolesMarquee roles={pdpMarqueeRoles} /> */}

      {/* <TrainingApproach /> */}

      {/* <section id="bootcampVideos">
        <ConferenceVideo
          title="PDP Testimonials"
          description="Watch our students transform into industry professionals."
          videos={pdpTestimonialVideos}
        />
      </section> */}

      <PdpFaq />

      <MobileWarningModal
        isOpen={showMobileWarning}
        onClose={() => setShowMobileWarning(false)}
        onContinue={() => {
          setShowMobileWarning(false);
          openApplicationFlow();
        }}
      />

      <PreTestNoticeModal
        isOpen={showNoticeModal}
        onClose={() => setShowNoticeModal(false)}
        onBeginTest={() => {
          setShowNoticeModal(false);
          setIsFormOpen(true);
        }}
      />

      <ReadyToBuild/>
    </main>
  );
}
