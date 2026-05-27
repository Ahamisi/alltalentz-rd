interface LogoTaglineProps {
  theme?: "dark" | "light";
}

export default function LogoTagline({ theme = "dark" }: LogoTaglineProps) {
  const colorClass = theme === "light" ? "text-[#555555]" : "text-white/85";

  return (
    <span
      className={`block text-[5px] sm:text-[5px] md:text-[6.7px] tracking-[0.16em] uppercase font-medium pl-1 md:pl-0 mt-1 leading-none whitespace-nowrap ${colorClass}`}
    >
      Restoring excellence globally
    </span>
  );
}
