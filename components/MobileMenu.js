import React from 'react';
import Navigation from './Navigation';

const MobileMenu = ({ isOpen, onClose, children }) => {
  return (
    <div
    className={`fixed top-0 left-0 w-full h-full border-b-4 border-b-[#f99622] bg-white overflow-y-auto z-50 transform ${
      isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
    } transition-transform transition-opacity duration-300`}
  >
      <div className="p-4">
        {/* Add a close button (X) in the top right corner */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Render your navigation items */}
        {children}
      </div>
    </div>
  );
};

export default MobileMenu;
