import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-red-50 to-white flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        {/* Header */}
        <div className="w-full max-w-4xl flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
            Connecting <span className="text-red-600 underline decoration-red-400">Lives</span> Through Blood Donation
          </h1>
          <p className="text-lg md:text-xl text-gray-500 italic text-center max-w-2xl mb-10">
            Our blood donation platform empowers communities to save lives by simplifying the process of donating and receiving blood. Join us in making a difference—one drop at a time.
          </p>
        </div>
        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-lg shadow flex items-center gap-2 text-lg transition">
            <span className="material-icons">favorite</span>
            Become a Donor
          </button>
          <button className="border border-red-600 text-red-600 hover:bg-red-50 font-bold px-8 py-4 rounded-lg shadow text-lg transition">
            Learn More
          </button>
        </div>
        {/* Stats */}
        <div className="flex gap-10 mb-12 text-gray-700 text-base md:text-lg">
          <div className="flex items-center gap-2">
            <span className="material-icons text-red-600">opacity</span>
            <span>10,000+ donations</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-icons text-red-600">groups</span>
            <span>5,000+ lives saved</span>
          </div>
        </div>
        {/* Illustration */}
        <div className="flex justify-center">
          <svg width="340" height="220" viewBox="0 0 340 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="170" cy="110" rx="150" ry="90" fill="#FEE2E2" />
            <rect x="70" y="60" width="70" height="110" rx="20" fill="#E5E7EB" />
            <rect x="80" y="80" width="50" height="70" rx="10" fill="#fff" />
            <rect x="80" y="110" width="50" height="40" rx="10" fill="#EF4444" />
            <circle cx="105" cy="125" r="8" fill="#fff" />
            <path d="M140 140 Q170 170 210 140" stroke="#EF4444" strokeWidth="4" fill="none" />
            <path d="M210 140 Q240 120 230 90 Q220 60 190 80 Q160 100 210 140" fill="#fff" stroke="#EF4444" strokeWidth="4" />
            <path d="M210 140 Q240 120 230 90 Q220 60 190 80 Q160 100 210 140" fill="#EF4444" fillOpacity="0.6" />
          </svg>
        </div>
      </main>
    </div>
  );
};

export default HomePage;