import { WHAT_HAPPENS_NEXT } from "@/lib/request-talent-data";

export default function WhatHappensNext() {
  return (
    <section className="bg-[#F8F8F8] py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="text-[#F99621] text-xs font-bold uppercase tracking-[0.2em] mb-3">
            After you submit
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Happens Next</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {WHAT_HAPPENS_NEXT.map((item) => (
            <div
              key={item.step}
              className="bg-white border border-gray-100 p-8 flex flex-col gap-5 hover:border-[#F99621]/40 hover:shadow-xs transition-all group"
            >
              <div className="flex items-start justify-between">
                <span className="text-6xl font-black text-gray-100 group-hover:text-[#FEF3E2] transition-colors leading-none select-none">
                  {item.step}
                </span>
              </div>
              <div>
                <h3 className="text-gray-900 font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
