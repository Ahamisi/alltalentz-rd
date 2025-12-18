"use client"
import React, { useEffect } from 'react';

export default function SecureTestForm() {
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    // Disable keyboard shortcuts for copy, paste, cut, select all
    const handleKeyDown = (e) => {
      // Disable Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+A, Ctrl+S, Ctrl+P
      if (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'x' || e.key === 'a' || e.key === 's' || e.key === 'p')) {
        e.preventDefault();
        return false;
      }
      // Disable F12 (DevTools)
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }
      // Disable Ctrl+Shift+I (DevTools)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
      }
      // Disable Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        return false;
      }
      // Disable Ctrl+U (View Source)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
      }
      // Disable Ctrl+Shift+C (Inspect Element)
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        return false;
      }
    };

    // Disable text selection
    const handleSelectStart = (e) => {
      e.preventDefault();
      return false;
    };

    // Disable drag
    const handleDragStart = (e) => {
      e.preventDefault();
      return false;
    };

    // Disable copy event
    const handleCopy = (e) => {
      e.preventDefault();
      return false;
    };

    // Disable cut event
    const handleCut = (e) => {
      e.preventDefault();
      return false;
    };

    // Disable paste event
    const handlePaste = (e) => {
      e.preventDefault();
      return false;
    };

    // Detect DevTools opening
    let devtools = { open: false };
    const detectDevTools = () => {
      const threshold = 160;
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!devtools.open) {
          devtools.open = true;
          // Show warning when DevTools is detected
          alert('Please close Developer Tools to continue with the test.');
        }
      } else {
        devtools.open = false;
      }
    };

    // Additional screenshot prevention - detect common screenshot shortcuts
    const handleScreenshotKeys = (e) => {
      // Windows: Print Screen, Alt+Print Screen, Win+Shift+S
      // Mac: Cmd+Shift+3, Cmd+Shift+4, Cmd+Shift+5
      if (e.key === 'PrintScreen' || 
          (e.altKey && e.key === 'PrintScreen') ||
          (e.metaKey && e.shiftKey && (e.key === '3' || e.key === '4' || e.key === '5'))) {
        e.preventDefault();
        alert('Screenshots are not allowed during the test.');
        return false;
      }
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keydown', handleScreenshotKeys);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCut);
    document.addEventListener('paste', handlePaste);
    
    // Prevent screenshot using visibility API
    let hidden, visibilityChange;
    if (typeof document.hidden !== "undefined") {
      hidden = "hidden";
      visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
      hidden = "msHidden";
      visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      hidden = "webkitHidden";
      visibilityChange = "webkitvisibilitychange";
    }

    const handleVisibilityChange = () => {
      if (document[hidden]) {
        // Page is hidden - user might be taking screenshot
        console.warn('Page visibility changed');
      }
    };

    if (typeof document.addEventListener !== "undefined" && hidden) {
      document.addEventListener(visibilityChange, handleVisibilityChange, false);
    }

    // Monitor for DevTools
    const devToolsInterval = setInterval(detectDevTools, 500);

    // Add CSS to prevent text selection
    const style = document.createElement('style');
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
      /* Prevent screenshot overlays and add watermark */
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
    `;
    document.head.appendChild(style);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keydown', handleScreenshotKeys);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCut);
      document.removeEventListener('paste', handlePaste);
      if (typeof document.removeEventListener !== "undefined" && hidden) {
        document.removeEventListener(visibilityChange, handleVisibilityChange, false);
      }
      clearInterval(devToolsInterval);
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: '90vh' }}>
        <div className="bg-[#F99621] text-white p-4 text-center">
          <h1 className="text-2xl font-bold">Professional Development Programme - Assessment Test</h1>
          <p className="text-sm mt-2">Please complete this test to advance to the next stage.</p>
        </div>
        <div className="w-full h-full" style={{ height: 'calc(90vh - 80px)' }}>
          <iframe
            src="https://forms.cloud.microsoft/r/S6sxduh4um?origin=lprLink"
            className="w-full h-full border-0"
            title="Assessment Test"
            allow="camera; microphone; fullscreen"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
            style={{ pointerEvents: 'auto' }}
          />
        </div>
      </div>
    </div>
  );
}

