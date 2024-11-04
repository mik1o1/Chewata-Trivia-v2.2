import React, { useState, useEffect } from 'react';

export default function DescriptionAndCredits() {
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none relative z-20 hover:scale-105 p-1.5"
        onClick={() => setIsOpen(true)}
      >
        ስለ ጨዋታው
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90vw] max-w-[600px] max-h-[90vh] overflow-y-auto relative shadow-lg">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl"
              aria-label="Close"
            >
              ✖
            </button>
            <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
            ስለ ጨዋታው
            </h2>
            <div className="text-gray-700 text-lg leading-relaxed mb-4">
              {/* Content as before */}
            </div>
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
