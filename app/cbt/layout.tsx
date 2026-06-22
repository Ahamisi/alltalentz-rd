import type { ReactNode } from "react";
export const metadata = {
  title: "AllTalentz CBT",
  description:
    "Welcome to AllTalentz, the leading platform for recruiting the best remote talent from Africa at a fraction of the cost.",
  alternates: { canonical: "https://alltalentz.com/cbt" },
};

export default function CBTLayout({ children }: { children: ReactNode }) {
  return children;
}
