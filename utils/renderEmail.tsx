import { render } from "@react-email/components";
import { Email } from "@/components/Email";
import { EmailWaitlist } from "@/components/EmailWaitlist";

interface ContactEmailProps {
  fullName: string;
  email: string;
  company: string;
  phone: string;
  industry: string;
  roles: string[];
  numberOfProfessionals: string;
  timeline: string;
  additionalRequirements?: string;
}

interface WaitlistEmailProps {
  fullName: string;
  email: string;
  yoe: string;
  phone: string;
  career: string;
}

export function renderContactEmail(props: ContactEmailProps): string {
  return render(
    <Email
      name={props.fullName}
      email={props.email}
      company={props.company}
      phone={props.phone}
      industry={props.industry}
      roles={props.roles}
      numberOfProfessionals={props.numberOfProfessionals}
      timeline={props.timeline}
      additionalRequirements={props.additionalRequirements}
    />
  );
}

export function renderWaitlistEmail(props: WaitlistEmailProps): string {
  return render(
    <EmailWaitlist
      name={props.fullName}
      email={props.email}
      yoe={props.yoe}
      phone={props.phone}
      career={props.career}
    />
  );
}
