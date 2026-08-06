import React from "react";
import { Body, Container, Head, Heading, Html, Tailwind, Text } from "@react-email/components";

interface EmailGeneralEnquiryProps {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const EmailGeneralEnquiry = ({ name, email, phone, message }: EmailGeneralEnquiryProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] w-[465px] rounded border border-solid border-secondary p-[20px]">
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              New Contact Enquiry
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">Hello All Talentz,</Text>
            <Text className="text-[14px] leading-[24px] text-black">
              <strong>{name}</strong> reached out through the contact page.
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              <span className="font-bold">Email:</span> {email}
              <br />
              <span className="font-bold">Phone:</span> {phone}
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              <span className="font-bold">Message:</span>
              <br />
              {message}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
