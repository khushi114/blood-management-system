import React from 'react';
// Removed Menu, HeartHandshake, Home, Info, Handshake, Newspaper, Mail as they are likely in Navbar
// Keep only what's needed for the homepage content itself

const HomePage = () => {
  // No need for isMenuOpen state or toggleMenu function if Navbar is external
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const toggleMenu = () => { setIsMenuOpen(!isMenuOpen); };

  return (
    <div className="min-h-screen bg-gray-50 font-inter text-gray-800 relative overflow-hidden">
      {/* Background Dotted Lines and Building Outline - These are part of the page's unique background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Building Outline (simplified) */}
          <rect x="250" y="300" width="200" height="250" rx="10" fill="#E0F2F7"/>
          <rect x="270" y="320" width="30" height="40" rx="5" fill="#C4E8F0"/>
          <rect x="310" y="320" width="30" height="40" rx="5" fill="#C4E8F0"/>
          <rect x="350" y="320" width="30" height="40" rx="5" fill="#C4E8F0"/>
          <rect x="270" y="380" width="30" height="40" rx="5" fill="#C4E8F0"/>
          <rect x="310" y="380" width="30" height="40" rx="5" fill="#C4E8F0"/>
          <rect x="350" y="380" width="30" height="40" rx="5" fill="#C4E8F0"/>
          {/* Dotted Lines (simplified) */}
          <circle cx="200" cy="200" r="5" fill="#DCF0F7"/>
          <circle cx="250" cy="150" r="5" fill="#DCF0F7"/>
          <circle cx="300" cy="100" r="5" fill="#DCF0F7"/>
          <circle cx="400" cy="100" r="5" fill="#DCF0F7"/>
          <circle cx="500" cy="150" r="5" fill="#DCF0F7"/>
          <circle cx="550" cy="200" r="5" fill="#DCF0F7"/>
        </svg>
      </div>

      {/* The header section has been removed, as it will be handled by your existing Navbar component */}

      {/* Hero Section - This is the main content of the homepage */}
      <main className="relative z-10 flex flex-col md:flex-row items-center justify-center px-4 py-8 md:py-16 lg:px-12 xl:px-24 mt-0 md:mt-16"> {/* Adjust mt- for space below Navbar */}
        {/* Left Section - Illustrations */}
        <div className="relative w-full md:w-1/2 flex items-end justify-center mb-8 md:mb-0 md:pr-12">
          {/* Large Blood Drop */}
          <div className="absolute bottom-0 left-1/4 transform -translate-x-1/2 w-48 h-64 md:w-64 md:h-80 lg:w-80 lg:h-96 bg-red-500 rounded-b-full rounded-t-[50%] skew-y-6 origin-bottom-left" style={{ clipPath: 'polygon(0% 20%, 50% 0%, 100% 20%, 100% 100%, 0% 100%)' }}>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 bg-white rounded-full opacity-30 animate-pulse"></div>
          </div>

          {/* Doctor and Patient (Simplified Representation) */}
          <div className="relative z-10 flex items-end">
            <div className="w-24 h-32 md:w-32 md:h-40 bg-blue-300 rounded-t-full rounded-b-xl shadow-lg relative ml-24 md:ml-32"> {/* Patient */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-blue-400 rounded-full"></div> {/* Head */}
              <div className="absolute bottom-0 w-full h-1/3 bg-white rounded-b-xl"></div> {/* Shirt */}
            </div>
            <div className="w-28 h-36 md:w-36 md:h-44 bg-green-300 rounded-t-full rounded-b-xl shadow-lg -ml-4 z-20"> {/* Doctor */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-green-400 rounded-full"></div> {/* Head */}
              <div className="absolute bottom-0 w-full h-1/3 bg-white rounded-b-xl"></div> {/* Coat */}
            </div>
          </div>

          {/* Blood Bag Cabinet (Simplified) */}
          <div className="absolute bottom-0 right-1/4 transform translate-x-1/2 w-48 h-48 md:w-64 md:h-64 bg-gray-200 rounded-lg shadow-xl overflow-hidden">
            <div className="grid grid-cols-2 gap-1 p-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-full h-16 bg-red-400 rounded-md flex items-center justify-center text-white text-xs font-bold opacity-80">
                  BAG
                </div>
              ))}
            </div>
          </div>

          {/* Small plant */}
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-green-400 rounded-full opacity-60 blur-sm"></div>
          <div className="absolute bottom-12 right-12 w-12 h-12 bg-green-500 rounded-full opacity-80 blur-sm"></div>
        </div>

        {/* Right Section - Text Content */}
        <div className="w-full md:w-1/2 text-center md:text-left p-4 md:p-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
            BLOOD <br className="hidden md:inline"/> DONATION
          </h1>
          <p className="text-base md:text-lg text-gray-600 mb-8 max-w-xl mx-auto md:mx-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy euismod tempor tincidunt ut labore et dolore magna aliquam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </p>
          <button className="px-8 py-3 bg-red-500 text-white font-semibold rounded-full shadow-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300">
            LEARN MORE
          </button>
        </div>

        {/* Right side vertical dots */}
        <div className="hidden lg:flex flex-col space-y-4 absolute right-8 top-1/2 transform -translate-y-1/2">
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-3 bg-red-500 rounded-full"></div> {/* Active dot */}
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
        </div>
      </main>

      {/* Wavy bottom section - This is part of the page's unique background */}
      <div className="absolute bottom-0 left-0 w-full h-40 md:h-64 bg-gradient-to-r from-pink-400 to-purple-500 opacity-70" style={{ clipPath: 'ellipse(100% 50% at 50% 100%)' }}></div>
      <div className="absolute bottom-0 left-0 w-full h-32 md:h-52 bg-gradient-to-r from-red-400 to-pink-400 opacity-70" style={{ clipPath: 'ellipse(100% 50% at 50% 100%)' }}></div>
    </div>
  );
};

export default HomePage;
