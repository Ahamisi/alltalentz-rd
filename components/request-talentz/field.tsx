import React from "react";

// Reusable field wrapper with label and inline error message
export default function Field({
  label,
  required,
  error,
  className = "",
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  /** Extra classes on the cell — used to span both grid columns. */
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
      <label className="text-[15px] font-normal text-[#121212]">
        {label}
        {required && <span className="text-[#F99621] ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-0.5">{error}</p>}
    </div>
  );
}
