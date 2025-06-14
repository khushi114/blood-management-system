import { useEffect, useState } from 'react'; 

// Function to handle smooth scrolling
const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Handle smooth scrolling for anchor links
  useEffect(() => {
    const handleLinkClick = (e) => {
      const href = e.target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const sectionId = href.substring(1);
        scrollToSection(sectionId);
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => link.addEventListener('click', handleLinkClick));

    // Fade in animation
    setIsVisible(true);

    return () => {
      links.forEach(link => link.removeEventListener('click', handleLinkClick));
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-100">
      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-pink-500/10 to-rose-500/10">
          <div className="absolute top-20 left-10 w-20 h-20 bg-red-200/30 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-pink-200/30 rounded-full animate-bounce"></div>
          <div className="absolute bottom-40 left-1/4 w-12 h-12 bg-rose-200/30 rounded-full animate-ping"></div>
          <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-red-100/40 rounded-full animate-pulse"></div>
        </div>

        <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
            <div className="mb-4">
              <span className="inline-block bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                🩸 Save Lives Today
              </span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Connecting <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">LIVES</span> Through Blood Donation
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Our innovative blood donation platform empowers communities to save lives by simplifying the process of donating and receiving blood. Join us in making a difference—one drop at a time.
            </p>
            
            <div className="flex flex-row gap-2 mb-8 justify-start">
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                <span>Become a Donor</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 010-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                Learn More
              </button>
            </div>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-8 text-gray-600">
              <div className="flex items-center justify-center lg:justify-start">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">10,000+</div>
                  <div className="text-sm">Donations</div>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-start">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">5,000+</div>
                  <div className="text-sm">Lives Saved</div>
                </div>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="lg:w-1/2 flex justify-start">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-200 to-rose-200 rounded-3xl transform rotate-6 opacity-30"></div>
              <img
                src="https://cdn1.vectorstock.com/i/1000x1000/71/00/blood-donation-campaign-vector-7477100.jpg"
                alt="Blood donation illustration"
                className="relative w-96 h-96 object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-400 rounded-full animate-ping"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-rose-400 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-rose-50/50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-red-500 text-white px-6 py-2 rounded-full mb-4">
              Our Services
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Revolutionizing Blood Donation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our digital platform connects donors with patients in need through innovative technology and streamlined processes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🤖",
                title: "AI Chatbot Assistance",
                description: "Get immediate answers to all your blood donation questions through our intelligent ML-powered chatbot.",
                gradient: "from-red-500 to-rose-500"
              },
              {
                icon: "📍",
                title: "Nearest Hospital Finder",
                description: "Locate the closest blood donation centers based on your current location with our smart mapping.",
                gradient: "from-rose-500 to-red-400"
              },
              {
                icon: "📊",
                title: "Donor Return Prediction",
                description: "Hospitals can forecast donor return likelihood using our XGBoost-based predictive analytics model.",
                gradient: "from-red-400 to-rose-400"
              },
              {
                icon: "🏥",
                title: "Hospital Donor Management",
                description: "Secure portal for hospitals to log in, add new donor information, and manage existing donor records.",
                gradient: "from-red-500 to-rose-500"
              },
              {
                icon: "📈",
                title: "Blood Stock Forecasting",
                description: "Advanced analytics to help donation centers predict and manage their blood supply levels efficiently.",
                gradient: "from-rose-500 to-red-500"
              },
              {
                icon: "📱",
                title: "Donor Engagement Analytics",
                description: "Track donor recency, frequency, and engagement time to optimize blood donation campaigns.",
                gradient: "from-red-500 to-rose-400"
              }
            ].map((service, index) => (
              <div key={index} className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{service.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
               66                <button className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center group-hover:translate-x-2">
                  Learn More
                  <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 010-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-red-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">How It Works</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              We make the process of blood donation smoother and smarter — for both donors and hospitals.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                For Hospitals
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                For Donors
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                step: "01",
                title: "Join the Network",
                description: "Hospitals easily connect with our platform to manage and access their own donor lists through our secure portal.",
                color: "bg-red-500"
              },
              {
                step: "02",
                title: "Smart Donor Management",
                description: "Add new donors through a seamless interface. Send out reminders, alerts, and manage your donation drives effortlessly.",
                color: "bg-rose-500"
              },
              {
                step: "03",
                title: "AI-Driven Insights",
                description: "Use our AI tools to predict donation likelihood, optimize your outreach, and ensure timely responses to blood needs.",
                color: "bg-red-400"
              },
              {
                step: "04",
                title: "24/7 Support",
                description: "Need help? Hospitals can contact our team anytime to resolve issues, get clarification, or suggest improvements.",
                color: "bg-rose-600"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start">
                  <div className={`${item.color} text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mr-6 flex-shrink-0`}>
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-red-500 to-rose-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Get In Touch</h2>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Ready to make a difference? Contact us to learn more about our platform or to get started with your blood donation journey.
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="bg-white/95 backdrop-blur-lg p-8 rounded-2xl shadow-2xl">
              <form>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-300"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-300"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message</label>
                  <textarea
                    id="message"
                    placeholder="Tell us how we can help you..."
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none resize-none transition-all duration-300"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884zM18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;