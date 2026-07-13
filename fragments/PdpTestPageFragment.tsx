"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SecureTestForm from "@/components/SecureTestForm";

export default function TestPage() {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    // Only reachable after submitting the PDP application (guard set there).
    if (sessionStorage.getItem("pdp-test-access") === "granted") {
      setAllowed(true);
    } else {
      router.replace("/professional-development-programme");
    }
  }, [router]);

  if (!allowed) {
    return (
      <div className="w-full h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F99621]"></div>
      </div>
    );
  }

  return <SecureTestForm />;
}
