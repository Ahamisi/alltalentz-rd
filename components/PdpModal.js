"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function PdpModal() {
  const [pdpModalOpen, setPdpModalOpen] = useState(false);

  if (!pdpModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-lg">
        <div className="relative">
          <button
            onClick={() => setPdpModalOpen(false)}
            className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-white/80 hover:bg-white transition-colors shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          <Link
            href="/professional-development-programme"
            onClick={() => setPdpModalOpen(false)}
            className="block cursor-pointer"
          >
            <Image
              src="/pdp-banner.jpg"
              alt="Professional Development Programme"
              width={800}
              height={600}
              className="w-full h-auto rounded-2xl"
              priority
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
