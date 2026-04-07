import { Suspense } from "react";
import RequestTalentPageFragment from "@/fragments/RequestTalentPageFragment";

export default function RequestTalentPage() {
  return (
    <Suspense>
      <RequestTalentPageFragment />
    </Suspense>
  );
}
