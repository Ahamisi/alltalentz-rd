import Image from "next/image";

interface AllTalentzLogoProps {
  className?: string;
  priority?: boolean;
}

export default function AllTalentzLogo({
  className = "w-[140px] md:w-[180px] h-auto",
  priority = false,
}: AllTalentzLogoProps) {
  return (
    <Image
      src="/alltalentz-excellence.png"
      alt="All Talentz — Home"
      width={3878}
      height={1162}
      className={className}
      priority={priority}
    />
  );
}
