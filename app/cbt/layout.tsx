import type { ReactNode } from "react";
export const metadata = {
  title: 'All Talentz CBT',
  description: 'Welcome to All Talentz, the leading platform for recruiting the best remote talent from Africa at a fraction of the cost.',
  alternates: { canonical: 'https://alltalentz.com/cbt' },
};

export default function CBTLayout({ children }: { children: ReactNode }) {
  return children;
}
