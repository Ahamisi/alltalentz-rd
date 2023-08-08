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


export const EmailWaitlist = ({
  name,
  email,
  yoe,
  phone,
  career
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
                Hi, I Want to be on your Waitlist  <br />
                <span className="font-bold">Phone Number</span>: {phone}<br />
                <span className="font-bold">Years of Experience</span> : {yoe}<br />
                <span className="font-bold">Career Field</span>: {career}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};