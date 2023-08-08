import React from "react";

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Tailwind,
  Text,
} from "@react-email/components";


export const Email = ({
  name,
  email,
  company,
  phone,
  service
}) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] w-[465px] rounded border border-solid border-secondary p-[20px]">
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              You got a message!
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hello AllTalentz,
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              You got an email from <strong>{name}</strong>. Their email is{" "}
              {email}.<br /><span className="font-bold">The message</span>: <br />
                Hi, I Need a Talent  <br />
                <span className="font-bold">Company Name</span> : {company}<br />
                <span className="font-bold">Phone Number</span>: {phone}<br />
                <span className="font-bold">Service</span>: {service}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};