"use client";
import { useCallback, useEffect, useRef } from "react";

const isValidEmail = (email: unknown): boolean =>
  typeof email === "string" && /\S+@\S+\.\S+/.test(email.trim());

type FormData = Record<string, unknown> & { email?: unknown };

interface UseFormPersistReturn {
  clearPersisted: () => void;
  onEmailBlur: () => void;
}

/**
 * useFormPersist
 *
 * Reusable hook that persists form state to localStorage as the user types
 * and captures partial submissions in three ways:
 *   1. Email blur  — fires as soon as the email field loses focus with a valid email
 *   2. Idle timer  — fires after 5 s of no input changes once a valid email exists
 *   3. beforeunload — safety-net for tab close / hard navigation
 *
 * Only one beacon is sent per session. Calling clearPersisted() (on successful
 * submit) marks the session as sent so beforeunload doesn't repeat it.
 */
export function useFormPersist<T extends FormData>(
  formKey: string,
  formData: T
): UseFormPersistReturn {
  const storageKey = `partial_form__${formKey}`;

  const formDataRef = useRef<T>(formData);
  const sentRef = useRef(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── 1. Keep ref current
  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  // ── 2. Persist on every formData change
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(formData));
    } catch {
      // fail silently
    }
  }, [formData, storageKey]);

  // ── Core: send beacon once
  const sendBeaconNow = useCallback(
    (data: T) => {
      if (sentRef.current) return;
      const email = typeof data.email === "string" ? data.email.trim() : "";
      if (!email) return;

      sentRef.current = true;
      const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
      navigator.sendBeacon("/api/capture-partial", blob);

      try {
        localStorage.removeItem(storageKey);
      } catch {
        // fail silently
      }
    },
    [storageKey]
  );

  // ── 3. Idle timer: fire 5 s after the last change when email is valid
  useEffect(() => {
    if (sentRef.current) return;
    if (!isValidEmail(formData.email)) return;

    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

    idleTimerRef.current = setTimeout(() => {
      sendBeaconNow(formDataRef.current);
    }, 5000);

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [formData, sendBeaconNow]);

  // ── 4. beforeunload safety net
  useEffect(() => {
    const handleBeforeUnload = () => sendBeaconNow(formDataRef.current);
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [sendBeaconNow]);

  // ── 5. onEmailBlur: immediate capture when email field loses focus
  const onEmailBlur = useCallback(() => {
    if (isValidEmail(formDataRef.current.email)) {
      sendBeaconNow(formDataRef.current);
    }
  }, [sendBeaconNow]);

  // ── 6. clearPersisted — call on successful form submission
  const clearPersisted = useCallback(() => {
    sentRef.current = true;
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // fail silently
    }
  }, [storageKey]);

  return { clearPersisted, onEmailBlur };
}

export default useFormPersist;
