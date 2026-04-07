import { Suspense } from "react";
import AlacrityPageFragment from "@/fragments/AlacrityPageFragment";

export default function AlacrityPage() {
  return (
    <Suspense>
      <AlacrityPageFragment />
    </Suspense>
  );
}
