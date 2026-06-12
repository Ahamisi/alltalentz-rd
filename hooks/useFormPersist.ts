"use client";
import { useCallback, useEffect, useRef } from "react";

const isValidEmail = (email: unknown): boolean =>
  typeof email === "string" && /\S+@\S+\.\S+/.test(email.trim());

type FormData = Record<string, unknown> & { email?: unknown };

interface UseFormPersistReturn {
  clearPersisted: () => void;
  onEmailBlur: () => void;
}

// Sends a beacon on email blur, after 5s of inactivity, or on tab close — whichever comes first.
// sentRef makes sure we only fire once per session.
export function useFormPersist<T extends FormData>(
  formKey: string,
  formData: T
): UseFormPersistReturn {
  const storageKey = `partial_form__${formKey}`;

  const formDataRef = useRef<T>(formData);
  const sentRef = useRef(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(formData));
    } catch {
      // fail silently
    }
  }, [formData, storageKey]);

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

  // reset the idle timer on every keystroke
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

  useEffect(() => {
    const handleBeforeUnload = () => sendBeaconNow(formDataRef.current);
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [sendBeaconNow]);

  const onEmailBlur = useCallback(() => {
    if (isValidEmail(formDataRef.current.email)) {
      sendBeaconNow(formDataRef.current);
    }
  }, [sendBeaconNow]);

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
