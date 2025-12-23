"use client"
import React, { useEffect, useState } from 'react';
import { USE_EMBEDDED_FORM, MICROSOFT_FORM_URL } from '@/utils/testConfig';

export default function SecureTestForm() {
  const [showInstructions, setShowInstructions] = useState(true);
  const [readyForTest, setReadyForTest] = useState(false);

  // If not using embedded form, redirect immediately after instructions
  useEffect(() => {
    if (!USE_EMBEDDED_FORM && readyForTest) {
      window.location.href = MICROSOFT_FORM_URL;
    }
  }, [readyForTest]);
  // Only apply security measures if using embedded form
  useEffect(() => {
    if (!USE_EMBEDDED_FORM) {
      return; // Skip security measures if redirecting
    }

    // Disable right-click context menu - AGGRESSIVE MODE
    const handleContextMenu = (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      // Show warning
      alert('⚠️ Right-click is disabled during the test.');
      return false;
    };
    
    // Also block middle mouse button and other mouse buttons
    const handleMouseDown = (e) => {
      // Block right mouse button (button 2) and middle mouse button (button 1)
      if (e.button === 2 || e.button === 1) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }
    };
    
    // Block mouse wheel + Ctrl (zoom attempts)
    const handleWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Disable keyboard shortcuts for copy, paste, cut, select all - AGGRESSIVE MODE
    const handleKeyDown = (e) => {
      // Block ALL Ctrl/Cmd combinations
      if (e.ctrlKey || e.metaKey) {
        // Block copy, paste, cut, select all, save, print
        if (['c', 'v', 'x', 'a', 's', 'p', 'C', 'V', 'X', 'A', 'S', 'P'].includes(e.key)) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          alert('⚠️ Copy, paste, and other shortcuts are disabled during the test.');
          return false;
        }
        // Block Ctrl+Shift combinations (DevTools, Inspect, etc.)
        if (e.shiftKey) {
          if (['i', 'I', 'j', 'J', 'c', 'C', 'k', 'K'].includes(e.key)) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            alert('⚠️ Developer tools are not allowed during the test.');
            return false;
          }
        }
        // Block Ctrl+U (View Source)
        if (['u', 'U'].includes(e.key)) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          return false;
        }
        // Block Ctrl+W (Close tab) - warn but allow
        if (['w', 'W'].includes(e.key)) {
          if (!confirm('⚠️ Are you sure you want to close this tab? Your progress may be lost.')) {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }
        }
      }
      
      // Disable F12 (DevTools)
      if (e.key === 'F12') {
        e.preventDefault();
        e.stopPropagation();
        alert('⚠️ Developer tools are not allowed during the test.');
        return false;
      }
      
      // Disable right-click context menu shortcuts
      if (e.shiftKey && e.key === 'F10') {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      
      // Block Print Screen key
      if (e.key === 'PrintScreen' || e.keyCode === 44) {
        e.preventDefault();
        e.stopPropagation();
        alert('⚠️ Screenshots are not allowed during the test.');
        return false;
      }
      
      // Block Alt+Tab simulation attempts
      if (e.altKey && e.key === 'Tab') {
        e.preventDefault();
        e.stopPropagation();
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
      e.stopPropagation();
      e.clipboardData.setData('text/plain', '');
      alert('Copying is not allowed during the test.');
      return false;
    };

    // Disable cut event
    const handleCut = (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.clipboardData.setData('text/plain', '');
      alert('Cutting is not allowed during the test.');
      return false;
    };

    // Disable paste event
    const handlePaste = (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.clipboardData.setData('text/plain', '');
      alert('Pasting is not allowed during the test.');
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

    // Add event listeners - CAPTURE PHASE for maximum interception
    document.addEventListener('contextmenu', handleContextMenu, true); // true = capture phase
    document.addEventListener('mousedown', handleMouseDown, true);
    document.addEventListener('wheel', handleWheel, true);
    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('keydown', handleScreenshotKeys, true);
    document.addEventListener('selectstart', handleSelectStart, true);
    document.addEventListener('dragstart', handleDragStart, true);
    document.addEventListener('copy', handleCopy, true);
    document.addEventListener('cut', handleCut, true);
    document.addEventListener('paste', handlePaste, true);
    
    // Also add to window for global capture
    window.addEventListener('contextmenu', handleContextMenu, true);
    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('keydown', handleScreenshotKeys, true);
    
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

    // Add CSS to prevent text selection and add additional protections
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
      /* Add overlay protection for iframe */
      iframe {
        position: relative;
      }
      /* Prevent drag and drop */
      * {
        -webkit-user-drag: none !important;
        -khtml-user-drag: none !important;
        -moz-user-drag: none !important;
        -o-user-drag: none !important;
        user-drag: none !important;
      }
    `;
    document.head.appendChild(style);

    // Add periodic warning overlay
    let warningShown = false;
    const showWarning = () => {
      if (warningShown) return;
      warningShown = true;
      const warning = document.createElement('div');
      warning.id = 'security-warning';
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

    // Show warning after 3 seconds
    setTimeout(showWarning, 3000);

    // Monitor for focus changes (user might be switching windows)
    let lastFocusTime = Date.now();
    const handleFocus = () => {
      const now = Date.now();
      if (now - lastFocusTime > 5000) {
        // User was away for more than 5 seconds
        console.warn('User returned after being away');
      }
      lastFocusTime = now;
    };

    const handleBlur = () => {
      lastFocusTime = Date.now();
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu, true);
      document.removeEventListener('mousedown', handleMouseDown, true);
      document.removeEventListener('wheel', handleWheel, true);
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('keydown', handleScreenshotKeys, true);
      document.removeEventListener('selectstart', handleSelectStart, true);
      document.removeEventListener('dragstart', handleDragStart, true);
      document.removeEventListener('copy', handleCopy, true);
      document.removeEventListener('cut', handleCut, true);
      document.removeEventListener('paste', handlePaste, true);
      window.removeEventListener('contextmenu', handleContextMenu, true);
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('keydown', handleScreenshotKeys, true);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
      if (typeof document.removeEventListener !== "undefined" && hidden) {
        document.removeEventListener(visibilityChange, handleVisibilityChange, false);
      }
      clearInterval(devToolsInterval);
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
      const warning = document.getElementById('security-warning');
      if (warning) {
        warning.remove();
      }
    };
  }, []);

  // Show Savewyze instructions first
  if (showInstructions && !readyForTest) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Important Instructions</h2>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <h3 className="font-semibold text-blue-800 mb-2">To have a seamless onboarding on Savewyze, kindly follow the instructions below:</h3>
              </div>
              
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <span className="text-[#F99621] font-bold mr-3">1.</span>
                  <p className="flex-1">Ensure you have your <strong>NIN slip or card</strong> in your possession</p>
                </div>
                
                <div className="flex items-start">
                  <span className="text-[#F99621] font-bold mr-3">2.</span>
                  <p className="flex-1">Ensure you fill in your <strong>First Name and Last Name</strong> as seen on your NIN slip or card (<strong>Not your Middle Name</strong>). This makes your NIN verification process seamless</p>
                </div>
                
                <div className="flex items-start">
                  <span className="text-[#F99621] font-bold mr-3">3.</span>
                  <p className="flex-1">Your <strong>Wyze tag</strong> is a unique handle (like a Nickname) you can decide what that should be.</p>
                </div>
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Need help?</strong>
                </p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4">
                  <li>
                    • For <strong>Savewyze onboarding issues only</strong>, kindly reach out to{' '}
                    <a href="mailto:info@savewyze.com" className="text-[#F99621] hover:underline font-semibold">
                      info@savewyze.com
                    </a>
                  </li>
                  <li>
                    • For <strong>test difficulties or technical issues</strong>, please contact{' '}
                    <a href="mailto:recruitment@alltalentz.com" className="text-[#F99621] hover:underline font-semibold">
                      recruitment@alltalentz.com or hr@alltalentz.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowInstructions(false);
                  setReadyForTest(true);
                }}
                className="bg-[#F99621] text-black px-8 py-3 rounded font-bold hover:bg-opacity-90 transition-all"
              >
                Continue to Test
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If redirecting, show loading state (redirect happens in useEffect)
  if (!USE_EMBEDDED_FORM && readyForTest) {
    return (
      <div className="w-full h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F99621]"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Redirecting to Test...</h2>
          <p className="text-gray-600">Please wait while we redirect you to the assessment test.</p>
        </div>
      </div>
    );
  }

  // Embedded form view
  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: '90vh' }}>
        <div className="bg-[#F99621] text-white p-4 text-center">
          <h1 className="text-2xl font-bold">Professional Development Programme - Assessment Test</h1>
          <p className="text-sm mt-2">Please complete this test to advance to the next stage.</p>
        </div>
        <div className="w-full h-full relative" style={{ height: 'calc(90vh - 80px)' }}>
          <iframe
            id="microsoft-form-iframe"
            src="https://forms.office.com/r/S6sxduh4um?embed=true"
            className="w-full h-full border-0"
            title="Assessment Test"
            allow="camera; microphone; fullscreen"
            style={{ 
              pointerEvents: 'auto',
              width: '100%',
              height: '100%',
              border: 'none'
            }}
            allowFullScreen
            frameBorder="0"
            onLoad={(e) => {
              console.warn('Test form loaded. Security measures are active.');
              // Try to detect if form is properly loaded
              try {
                const iframe = e.target;
                // Check if iframe has content (limited due to cross-origin)
                if (iframe.contentWindow) {
                  console.log('Iframe loaded successfully');
                }
              } catch (err) {
                // Expected: cross-origin restrictions prevent access
                console.log('Iframe loaded (cross-origin restrictions apply)');
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

