"use client";
import React, { useEffect } from "react";
import { USE_EMBEDDED_FORM, MICROSOFT_FORM_URL } from "@/utils/testConfig";

export default function SecureTestForm() {
  const [formReady, setFormReady] = React.useState(false);

  // Anti-cheating measures, only active when the test is embedded
  useEffect(() => {
    if (!USE_EMBEDDED_FORM) {
      return;
    }

    // Block right-click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      alert("⚠️ Right-click is disabled during the test.");
      return false;
    };

    // Block middle/right mouse buttons
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 2 || e.button === 1) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }
    };

    // Block ctrl/cmd + scroll zoom
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Block copy/paste, devtools, view-source and screenshot shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (["c", "v", "x", "a", "s", "p", "C", "V", "X", "A", "S", "P"].includes(e.key)) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          alert("⚠️ Copy, paste, and other shortcuts are disabled during the test.");
          return false;
        }
        if (e.shiftKey) {
          if (["i", "I", "j", "J", "c", "C", "k", "K"].includes(e.key)) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            alert("⚠️ Developer tools are not allowed during the test.");
            return false;
          }
        }
        if (["u", "U"].includes(e.key)) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          return false;
        }
        if (["w", "W"].includes(e.key)) {
          if (!confirm("⚠️ Are you sure you want to close this tab? Your progress may be lost.")) {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }
        }
      }

      if (e.key === "F12") {
        e.preventDefault();
        e.stopPropagation();
        alert("⚠️ Developer tools are not allowed during the test.");
        return false;
      }

      if (e.shiftKey && e.key === "F10") {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      if (e.key === "PrintScreen" || e.keyCode === 44) {
        e.preventDefault();
        e.stopPropagation();
        alert("⚠️ Screenshots are not allowed during the test.");
        return false;
      }

      if (e.altKey && e.key === "Tab") {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Block text selection and drag
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Block copy/cut/paste
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
      e.clipboardData?.setData("text/plain", "");
      alert("Copying is not allowed during the test.");
      return false;
    };

    const handleCut = (e: ClipboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
      e.clipboardData?.setData("text/plain", "");
      alert("Cutting is not allowed during the test.");
      return false;
    };

    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
      e.clipboardData?.setData("text/plain", "");
      alert("Pasting is not allowed during the test.");
      return false;
    };

    // Warn if devtools appears to be open
    let devtools = { open: false };
    const detectDevTools = () => {
      const threshold = 160;
      if (
        window.outerHeight - window.innerHeight > threshold ||
        window.outerWidth - window.innerWidth > threshold
      ) {
        if (!devtools.open) {
          devtools.open = true;
          alert("Please close Developer Tools to continue with the test.");
        }
      } else {
        devtools.open = false;
      }
    };

    // Block common screenshot shortcuts
    const handleScreenshotKeys = (e: KeyboardEvent) => {
      if (
        e.key === "PrintScreen" ||
        (e.altKey && e.key === "PrintScreen") ||
        (e.metaKey && e.shiftKey && (e.key === "3" || e.key === "4" || e.key === "5"))
      ) {
        e.preventDefault();
        alert("Screenshots are not allowed during the test.");
        return false;
      }
    };

    // Register listeners on capture phase so they fire first
    document.addEventListener("contextmenu", handleContextMenu, true);
    document.addEventListener("mousedown", handleMouseDown, true);
    document.addEventListener("wheel", handleWheel, true);
    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("keydown", handleScreenshotKeys, true);
    document.addEventListener("selectstart", handleSelectStart, true);
    document.addEventListener("dragstart", handleDragStart, true);
    document.addEventListener("copy", handleCopy, true);
    document.addEventListener("cut", handleCut, true);
    document.addEventListener("paste", handlePaste, true);

    window.addEventListener("contextmenu", handleContextMenu, true);
    window.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("keydown", handleScreenshotKeys, true);

    let hidden: string | undefined, visibilityChange: string | undefined;
    if (typeof document.hidden !== "undefined") {
      hidden = "hidden";
      visibilityChange = "visibilitychange";
    } else if (typeof (document as any).msHidden !== "undefined") {
      hidden = "msHidden";
      visibilityChange = "msvisibilitychange";
    } else if (typeof (document as any).webkitHidden !== "undefined") {
      hidden = "webkitHidden";
      visibilityChange = "webkitvisibilitychange";
    }

    const handleVisibilityChange = () => {
      if (hidden && (document as any)[hidden]) {
        console.warn("Page visibility changed");
      }
    };

    if (typeof document.addEventListener !== "undefined" && hidden && visibilityChange) {
      document.addEventListener(visibilityChange, handleVisibilityChange, false);
    }

    const devToolsInterval = setInterval(detectDevTools, 500);

    // Disable selection/drag and add a confidential watermark
    const style = document.createElement("style");
    style.textContent = `
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }
      input, textarea {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
      }
      body::before {
        content: 'All Talentz - Confidential Assessment';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 999998;
        pointer-events: none;
        background: repeating-linear-gradient(
          45deg,
          transparent,
          transparent 10px,
          rgba(0, 0, 0, 0.03) 10px,
          rgba(0, 0, 0, 0.03) 20px
        );
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        color: rgba(0, 0, 0, 0.05);
        font-weight: bold;
      }
      iframe {
        position: relative;
      }
      * {
        -webkit-user-drag: none !important;
        -khtml-user-drag: none !important;
        -moz-user-drag: none !important;
        -o-user-drag: none !important;
        user-drag: none !important;
      }
    `;
    document.head.appendChild(style);

    // One-time security notice overlay
    let warningShown = false;
    const showWarning = () => {
      if (warningShown) return;
      warningShown = true;
      const warning = document.createElement("div");
      warning.id = "security-warning";
      warning.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.95);
        color: white;
        padding: 30px;
        border-radius: 10px;
        z-index: 9999999;
        text-align: center;
        max-width: 500px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.5);
      `;
      warning.innerHTML = `
        <h2 style="color: #F99621; margin-bottom: 15px;">⚠️ Security Notice</h2>
        <p style="margin-bottom: 15px;">Copy, paste, and screenshot features are disabled during this test.</p>
        <p style="margin-bottom: 20px; font-size: 0.9em; color: #ccc;">Any attempt to copy content or take screenshots will be logged and may result in disqualification.</p>
        <button onclick="this.parentElement.remove(); warningShown = false;" style="background: #F99621; color: black; border: none; padding: 10px 30px; border-radius: 5px; font-weight: bold; cursor: pointer;">
          I Understand
        </button>
      `;
      document.body.appendChild(warning);

      setTimeout(() => {
        if (warning.parentElement) {
          warning.remove();
          warningShown = false;
        }
      }, 10000);
    };

    setTimeout(showWarning, 3000);

    let lastFocusTime = Date.now();
    const handleFocus = () => {
      const now = Date.now();
      if (now - lastFocusTime > 5000) {
        console.warn("User returned after being away");
      }
      lastFocusTime = now;
    };

    const handleBlur = () => {
      lastFocusTime = Date.now();
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    // Clean up listeners, timers and injected DOM on unmount
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu, true);
      document.removeEventListener("mousedown", handleMouseDown, true);
      document.removeEventListener("wheel", handleWheel, true);
      document.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("keydown", handleScreenshotKeys, true);
      document.removeEventListener("selectstart", handleSelectStart, true);
      document.removeEventListener("dragstart", handleDragStart, true);
      document.removeEventListener("copy", handleCopy, true);
      document.removeEventListener("cut", handleCut, true);
      document.removeEventListener("paste", handlePaste, true);
      window.removeEventListener("contextmenu", handleContextMenu, true);
      window.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("keydown", handleScreenshotKeys, true);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
      if (typeof document.removeEventListener !== "undefined" && hidden && visibilityChange) {
        document.removeEventListener(visibilityChange, handleVisibilityChange, false);
      }
      clearInterval(devToolsInterval);
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
      const warning = document.getElementById("security-warning");
      if (warning) {
        warning.remove();
      }
    };
  }, []);

  // Confirmation + fallback button (the test opens in a new tab from the submit handler)
  if (!USE_EMBEDDED_FORM) {
    return (
      <div className="w-full h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg overflow-hidden p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your application was submitted!</h2>
          <p className="text-gray-600 mb-6">
            Your assessment test should have opened in a new tab. If it didn&apos;t open, please
            click the button below to start it.
          </p>
          <a
            href={MICROSOFT_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#F99621] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#e0851a] transition-colors"
          >
            Open Assessment Test
          </a>
          <p className="text-sm text-gray-400 mt-4">
            Tip: if a popup was blocked, allow popups for this site or use the button above.
          </p>
        </div>
      </div>
    );
  }

  // Embedded form view
  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div
        className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden"
        style={{ height: "90vh" }}
      >
        <div className="bg-[#F99621] text-white p-4 text-center">
          <h1 className="text-2xl font-bold">
            Professional Development Programme - Assessment Test
          </h1>
          <p className="text-sm mt-2">Please complete this test to advance to the next stage.</p>
        </div>
        <div className="w-full h-full relative" style={{ height: "calc(90vh - 80px)" }}>
          {!formReady && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white p-4 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F99621]"></div>
              <h2 className="text-xl font-bold text-gray-800 mt-6 mb-2">
                Preparing your assessment...
              </h2>
              <p className="text-gray-600 max-w-md">
                Please wait a moment while the test loads. Do not refresh or close this page.
                The assessment will be ready shortly.
              </p>
            </div>
          )}
          <iframe
            id="microsoft-form-iframe"
            src="https://forms.office.com/Pages/ResponsePage.aspx?id=fhgFiTIHCkquTYO-BRMRBfQf36Oi-MZHkm_eYMKcGU9UMjhYSVpETFpLSkg4V05BTDQxR1Q2N0xaOS4u&embed=true"
            className="w-full h-full border-0"
            title="Assessment Test"
            allow="camera; microphone; fullscreen"
            style={{
              pointerEvents: formReady ? "auto" : "none",
              width: "100%",
              height: "100%",
              border: "none",
            }}
            allowFullScreen
            frameBorder="0"
            onLoad={(e) => {
              console.warn("Test form loaded. Security measures are active.");
              try {
                const iframe = e.target as HTMLIFrameElement;
                if (iframe.contentWindow) {
                  console.log("Iframe loaded successfully");
                }
              } catch (err) {
                console.log("Iframe loaded (cross-origin restrictions apply)");
              }
              setTimeout(() => setFormReady(true), 500);
            }}
          />
        </div>
      </div>
    </div>
  );
}
