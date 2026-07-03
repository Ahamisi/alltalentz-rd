import { render } from "@react-email/components";
import { Email } from "@/components/Email";
import { EmailWaitlist } from "@/components/EmailWaitlist";
import { EmailInternshipApplication } from "@/components/EmailInternshipApplication";

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


export async function renderContactEmail(props: ContactEmailProps): Promise<string> {
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

interface InternshipEmailProps {
  fullName: string;
  email: string;
  phone: string;
  courseOfStudy: string;
  department: string;
  alternativeDepartment: string;
  whyInterested: string;
  expectations: string;
  achievement: string;
  resumeUrl: string;
}

export async function renderInternshipEmail(props: InternshipEmailProps): Promise<string> {
  return render(
    <EmailInternshipApplication
      name={props.fullName}
      email={props.email}
      phone={props.phone}
      courseOfStudy={props.courseOfStudy}
      department={props.department}
      alternativeDepartment={props.alternativeDepartment}
      whyInterested={props.whyInterested}
      expectations={props.expectations}
      achievement={props.achievement}
      resumeUrl={props.resumeUrl}
    />
  );
}

export async function renderWaitlistEmail(props: WaitlistEmailProps): Promise<string> {
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
