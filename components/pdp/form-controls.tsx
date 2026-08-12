"use client";
import React from "react";

/**
 * Form primitives shared by the PDP application form — a text input, a
 * drag-target-styled file picker, and the inline error line both use. Styling
 * is the v26 form treatment: flat borders, grey fill that whitens on focus,
 * orange focus ring.
 */

const ERROR_ICON_PATH =
  "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z";

/** Inline validation message shown under a field. Renders nothing when clean. */
export const FieldError = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d={ERROR_ICON_PATH} clipRule="evenodd" />
      </svg>
      {message}
    </p>
  );
};

type TextFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  min?: string;
};

/** Labelled text input with the required marker and its error line. */
export const TextField = ({ label, name, value, onChange, error, type = "text", placeholder, min }: TextFieldProps) => (
  <div>
    <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1.5">
      {label} <span className="text-red-400">*</span>
    </label>
    <input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      className={`w-full border px-4 py-3 text-sm text-gray-900 placeholder-gray-400 bg-gray-50 focus:outline-hidden focus:bg-white focus:border-[#F99621] focus:ring-1 focus:ring-[#F99621] transition-colors ${
        error
          ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-400"
          : "border-gray-200 hover:border-gray-300"
      }`}
    />
    <FieldError message={error} />
  </div>
);

type FileFieldProps = {
  label: string;
  name: string;
  file: File | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  /** Prompt shown before a file is picked, e.g. "Click to upload your CV". */
  prompt: string;
  accept?: string;
  /** Human-readable accepted formats, shown next to the label. */
  formats?: string;
  /** Same list phrased for the sub-line under the prompt. */
  formatsHint?: string;
};

/** Click-to-upload field: dashed box that turns green once a file is chosen. */
export const FileField = ({
  label,
  name,
  file,
  onChange,
  error,
  prompt,
  accept = ".pdf,.doc,.docx",
  formats = "PDF, DOC, DOCX",
  formatsHint = "PDF, DOC, or DOCX",
}: FileFieldProps) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
      {label} <span className="text-red-400">*</span>
      <span className="ml-1.5 text-xs font-normal text-gray-400">{formats}</span>
    </label>
    <label
      className={`flex items-center gap-4 border-2 border-dashed px-4 py-4 cursor-pointer transition-colors ${
        file
          ? "border-green-400 bg-green-50"
          : error
          ? "border-red-300 bg-red-50"
          : "border-gray-200 bg-gray-50 hover:border-[#F99621] hover:bg-amber-50/40"
      }`}
    >
      <div
        className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
          file ? "bg-green-100" : "bg-white border border-gray-200"
        }`}
      >
        {file ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        )}
      </div>
      <div className="flex-1 min-w-0">
        {file ? (
          <>
            <p className="text-sm font-semibold text-green-700 truncate">{file.name}</p>
            <p className="text-xs text-green-600 mt-0.5">File selected — click to change</p>
          </>
        ) : (
          <>
            <p className="text-sm font-medium text-gray-700">{prompt}</p>
            <p className="text-xs text-gray-400 mt-0.5">{formatsHint}</p>
          </>
        )}
      </div>
      <input type="file" name={name} accept={accept} onChange={onChange} className="hidden" />
    </label>
    <FieldError message={error} />
  </div>
);
