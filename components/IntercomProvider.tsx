"use client";

import { useEffect } from "react";
import Intercom from "@intercom/messenger-js-sdk";

export default function IntercomProvider() {
  useEffect(() => {
    // const appId = process.env.NEXT_PUBLIC_INTERCOM_APP_ID;
    const appId = "coayar8y";
    if (!appId) return;

    Intercom({ app_id: appId });

    return () => {
      if (typeof window !== "undefined" && (window as any).Intercom) {
        (window as any).Intercom("shutdown");
      }
    };
  }, []);

  return null;
}
