"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

// Custom multi-select checkbox dropdown for roles
export default function RolesDropdown({
  roles,
  selected,
  onChange,
  error,
}: {
  roles: string[];
  selected: string[];
  onChange: (roles: string[]) => void;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = (role: string) => {
    if (selected.includes(role)) {
      onChange(selected.filter((r) => r !== role));
    } else {
      onChange([...selected, role]);
    }
  };

  const displayText =
    selected.length === 0
      ? "Select roles"
      : selected.length === 1
        ? selected[0]
        : `${selected.length} roles selected`;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full rounded-[10px] border px-4 py-3.5 text-left text-[15px] flex items-center justify-between transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#F99621] ${
          error ? "border-red-400 bg-red-50" : "border-transparent bg-[#F2F2F2] hover:bg-[#ECECEC]"
        } ${selected.length === 0 ? "text-gray-400" : "text-[#121212]"}`}
      >
        <span className="truncate">{displayText}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 shrink-0 ml-2 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Selected role tags */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selected.map((role) => (
            <span
              key={role}
              className="inline-flex items-center gap-1 rounded-full bg-[#FEF3E2] text-[#C97D10] text-sm px-3 py-1 font-medium"
            >
              {role}
              <button
                type="button"
                onClick={() => toggle(role)}
                className="hover:text-[#F99621] ml-1"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Dropdown panel */}
      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-[10px] bg-white border border-gray-200 shadow-lg max-h-60 overflow-y-auto">
          {roles.map((role) => (
            <label
              key={role}
              className="flex items-center gap-3 px-4 py-3 hover:bg-[#FEF3E2] cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={selected.includes(role)}
                onChange={() => toggle(role)}
                className="w-4 h-4 accent-[#F99621] rounded-sm"
              />
              <span className="text-gray-700 text-sm">{role}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
