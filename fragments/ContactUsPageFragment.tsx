import ContactHero from "@/components/contact-us/contact-hero";
import ContactFormSection from "@/components/contact-us/contact-form-section";
import ReadyToBuild from "@/components/shared/ReadyToBuild";

export default function ContactUsPage() {
  const services = [
    "Estimators ",
    "Administrative Assistants ",
    "Virtual Assistants ",
    "Telemarketing Assistant ",
    "Digital Marketers",
    "Account Receivables ",
    "Designers / Software Developers ",
    "Quick book Specialists ",
    "Compliance Specialists",
  ];

  return (
    <>
      {/* Contact Hero */}
      <ContactHero />

      {/* Contact Form */}
      <ContactFormSection services={services} />

      {/* Ready to build */}
      <ReadyToBuild/>
    </>
  );
}
