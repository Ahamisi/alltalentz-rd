import React from "react";
import { Body, Container, Head, Heading, Html, Tailwind, Text } from "@react-email/components";

interface EmailProps {
  name: string;
  email: string;
  company: string;
  phone: string;
  industry: string;
  roles: string[];
  numberOfProfessionals: string;
  timeline: string;
  additionalRequirements?: string;
}

export const Email = ({
  name,
  email,
  company,
  phone,
  industry,
  roles,
  numberOfProfessionals,
  timeline,
  additionalRequirements,
}: EmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] w-[465px] rounded border border-solid border-secondary p-[20px]">
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              New Talent Request
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">Hello AllTalentz,</Text>
            <Text className="text-[14px] leading-[24px] text-black">
              You received a new talent request from <strong>{name}</strong> ({email}).
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              <span className="font-bold">Company:</span> {company}
              <br />
              <span className="font-bold">Phone:</span> {phone}
              <br />
              <span className="font-bold">Industry / Vertical:</span> {industry}
              <br />
              <span className="font-bold">Role(s) Needed:</span> {roles.join(", ")}
              <br />
              <span className="font-bold">Number of Professionals:</span> {numberOfProfessionals}
              <br />
              <span className="font-bold">Timeline:</span> {timeline}
              {additionalRequirements && (
                <>
                  <br />
                  <span className="font-bold">Additional Requirements:</span>{" "}
                  {additionalRequirements}
                </>
              )}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
