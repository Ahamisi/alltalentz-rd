import React from "react";

import { Body, Container, Head, Heading, Html, Link, Tailwind, Text } from "@react-email/components";

interface EmailInternshipApplicationProps {
  name: string;
  email: string;
  phone: string;
  courseOfStudy: string;
  department: string;
  whyInterested: string;
  expectations: string;
  achievement: string;
  resumeUrl: string;
}

export const EmailInternshipApplication = ({
  name,
  email,
  phone,
  courseOfStudy,
  department,
  whyInterested,
  expectations,
  achievement,
  resumeUrl,
}: EmailInternshipApplicationProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] w-[465px] rounded border border-solid border-secondary p-[20px]">
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              New Internship Application!
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">Hello All Talentz,</Text>
            <Text className="text-[14px] leading-[24px] text-black">
              <strong>{name}</strong> just applied for the Graduate Internship Program.
              <br />
              <span className="font-bold">Email</span>: {email}
              <br />
              <span className="font-bold">Phone Number</span>: {phone}
              <br />
              <span className="font-bold">Course of Study</span>: {courseOfStudy}
              <br />
              <span className="font-bold">Department of Choice</span>: {department}
              <br />
              <span className="font-bold">Resume</span>: <Link href={resumeUrl}>{resumeUrl}</Link>
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              <span className="font-bold">Why are they interested?</span>
              <br />
              {whyInterested}
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              <span className="font-bold">Their expectations:</span>
              <br />
              {expectations}
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              <span className="font-bold">An achievement they&apos;re proud of:</span>
              <br />
              {achievement}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
