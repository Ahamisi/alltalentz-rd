import React from "react";

interface HeaderTextProps {
  bold?: boolean;
  variant?: "h1" | "h2" | "h3";
  children: React.ReactNode;
  otherCSS?: string;
}

const HeaderText = ({ bold, variant, children, otherCSS }: HeaderTextProps) => {
  return (
    <h3
      className={`${bold ? "font-bold" : "font-normal"} ${variant == "h1" ? "text-[65px] leading-[80px] font-[700]" : variant == "h2" ? "text-[65px] leading-[80px]" : "text-[45px] leading-[60px]"} ${otherCSS} `}
    >
      {children}
    </h3>
  );
};

export default HeaderText;
