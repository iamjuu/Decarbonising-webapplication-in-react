import React, { useRef } from 'react';
import { Phone, Mail, MapPin, Activity, Wrench, ThermometerSun } from 'lucide-react';
import videoFile from "./../assets/video/videoplayback.mp4";
import { useNavigate } from 'react-router-dom';

const App = () => {
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/register");
  };
  
  const handleBillNow = () => {
    navigate("/billsearch");
  };

  const services = [
    {
      title: "Engine Decarbonization",
      description: "Remove carbon deposits from your engine, improving performance and reducing emissions",
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500&h=400&fit=crop",
      details: [
        "Ultrasonic carbon cleaning technology",
        "Restores up to 15% engine efficiency",
        "Reduces fuel consumption by up to 10%",
        "Improves engine response and acceleration",
        "Eliminates black smoke issues"
      ],
      icon: Activity
    },
    {
      title: "DPF Cleaning",
      description: "Professional cleaning of Diesel Particulate Filters to restore optimal function",
      image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500&h=400&fit=crop",
      details: [
        "Advanced pressure cleaning system",
        "Regeneration cycle monitoring",
        "Reduces back pressure by up to 98%",
        "Extends DPF life by up to 50%",
        "Includes comprehensive filter inspection"
      ],
      icon: Wrench
    },
    {
      title: "Emissions Testing",
      description: "Comprehensive emissions testing and optimization for all vehicle types",
      image: "https://images.unsplash.com/photo-1600320402673-acf93e26e49f?w=500&h=400&fit=crop",
      details: [
        "5-gas analyzer testing",
        "Real-time emissions monitoring",
        "NOx, CO, HC, CO2 measurement",
        "Lambda sensor verification",
        "Digital diagnostic reporting"
      ],
      icon: ThermometerSun
    }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={videoFile} type="video/mp4" />
      </video>

      {/* Main content wrapper */}
      <div className="relative z-10">
        {/* Header */}
        <header className="fixed w-full bg-black/80 backdrop-blur-sm z-50">
          <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-red-600">NSO2</div>
            <div className="hidden md:flex space-x-6 text-white">
              <a href="#services" className="hover:text-red-600 transition-colors">Services</a>
              <a href="#about" className="hover:text-red-600 transition-colors">About</a>
              <a href="#contact" className="hover:text-red-600 transition-colors">Contact</a>
            </div>
            <div className='flex gap-5'>
              <button 
                onClick={handleBookNow}
                className="bg-red-600 px-6 py-2 rounded-full hover:bg-red-700 transition-colors text-white"
              >
                Book Now
              </button>
              <button 
                onClick={handleBillNow}
                className="bg-red-600 px-6 py-2 rounded-full hover:bg-red-700 transition-colors text-white"
              >
                Search Your previous visit
              </button>
            </div>
          </nav>
        </header>

        {/* Rest of the content remains unchanged */}
        {/* Main Content */}
        <main className="text-white">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center bg-black/60">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Drive <span className="text-red-600">Clean</span>,<br />
              Drive <span className="text-red-600">Green</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl">
              Leading the revolution in vehicle decarbonization. We help reduce your carbon footprint while maintaining peak performance.
            </p>
            <button 
              onClick={handleBookNow}
              className="bg-red-600 px-8 py-3 rounded-full text-lg hover:bg-red-700 transition-colors"
            >
              Schedule Service
            </button>
          </div>
        </section>
      
        {/* Services Section */}
        <section id="services" className="py-20 bg-black/80">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-4 text-center">Our Services</h2>
            <p className="text-center text-gray-300 mb-12 max-w-3xl mx-auto">
              Using cutting-edge technology and certified processes, we deliver professional decarbonization services that extend vehicle life, improve performance, and reduce environmental impact.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-black/90 p-6 rounded-lg transform hover:scale-105 transition-transform duration-300">
                  <div className="relative">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <service.icon className="absolute top-4 right-4 w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-300 mb-4">{service.description}</p>
                  <div className="bg-zinc-900/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-red-600">Technical Specifications:</h4>
                    <ul className="space-y-2">
                      {service.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-300">
                          <span className="text-red-600 mr-2">•</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      
        {/* Benefits Section */}
        <section className="py-20 bg-black/80">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">Why Decarbonization Matters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-black/60 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-red-600">Performance Benefits</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    Up to 15% increase in engine power output
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    10-15% improvement in fuel efficiency
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    Reduced engine knocking and smoother operation
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    Extended engine component lifespan
                  </li>
                </ul>
              </div>
              <div className="bg-black/60 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-red-600">Environmental Impact</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    Up to 70% reduction in harmful emissions
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    Decreased carbon footprint
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    Improved air quality contribution
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    Meets latest emission standards
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      
        {/* About Section */}
        <section id="about" className="py-20 bg-black/80">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">Why Choose NSO2?</h2>
                <p className="text-lg text-gray-300 mb-4">
                  With years of experience in vehicle decarbonization, we're committed to reducing emissions while improving your vehicle's performance.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    Certified technicians with extensive training
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    State-of-the-art equipment and facilities
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    Eco-friendly solutions and processes
                  </li>
                </ul>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&h=400&fit=crop" 
                  alt="Our Workshop"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>
      
        {/* Enhanced Footer */}
        <footer className="bg-black/90 py-12">
          <div className="container mx-auto px-4">
            {/* Main Footer Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              {/* Company Info */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-red-600">NSO2</h3>
                <p className="text-gray-300">
                  Leading the way in vehicle decarbonization technology and services.
                </p>
                <div className="flex space-x-4">
                  <a 
                    href="https://facebook.com" 
                    className="text-gray-300 hover:text-red-600 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.77,7.46H14.5V5.9a.9.9,0,0,1,.93-.88h3.24V.27L14.5,0C10.45,0,9.26,3.11,9.26,5.1V7.46H6v5.11h3.26V24h5.24V12.57h4.2l.55-5.11Z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://twitter.com" 
                    className="text-gray-300 hover:text-red-600 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.32,6.44a.5.5,0,0,0-.2-.87l-.79-.19A.5.5,0,0,1,22,4.67L21.75,4a.5.5,0,0,0-.75-.23l-.87.56a.5.5,0,0,1-.68-.11L19,3.5a.5.5,0,0,0-.86.05l-.37.91a.5.5,0,0,1-.65.27L16.54,4.4a.5.5,0,0,0-.72.45v1a7.5,7.5,0,0,1-7.5,7.5h0a.5.5,0,0,0-.35.15L4.29,17.88a.5.5,0,0,0,.36.85h.85a7.5,7.5,0,0,0,7.5-7.5V9.85a.5.5,0,0,1,.69-.46l1.87.93a.5.5,0,0,0,.69-.27l.4-.92a.5.5,0,0,1,.75-.23l.84.56a.5.5,0,0,0,.71-.12l.49-.74a.5.5,0,0,1,.73-.12l.76.58a.5.5,0,0,0,.72-.15l1-1.49A.5.5,0,0,1,23.32,6.44Z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://instagram.com" 
                    className="text-gray-300 hover:text-red-600 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  ><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2.16c3.2,0,3.58,0,4.85.07,3.25.15,4.77,1.69,4.92,4.92.06,1.27.07,1.65.07,4.85s0,3.58-.07,4.85c-.15,3.23-1.69,4.77-4.92,4.92-1.27.06-1.65.07-4.85.07s-3.58,0-4.85-.07c-3.25-.15-4.77-1.69-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s0-3.58.07-4.85C2.38,3.92,3.92,2.38,7.15,2.23,8.42,2.18,8.8,2.16,12,2.16ZM12,0C8.74,0,8.33,0,7.05.07c-4.27.2-6.78,2.71-7,7C0,8.33,0,8.74,0,12s0,3.67.07,4.95c.2,4.27,2.71,6.78,7,7C8.33,24,8.74,24,12,24s3.67,0,4.95-.07c4.27-.2,6.78-2.71,7-7C24,15.67,24,15.26,24,12s0-3.67-.07-4.95c-.2-4.27-2.71-6.78-7-7C15.67,0,15.26,0,12,0Zm0,5.84A6.16,6.16,0,1,0,18.16,12,6.16,6.16,0,0,0,12,5.84ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM18.41,4.15a1.44,1.44,0,1,0,1.44,1.44A1.44,1.44,0,0,0,18.41,4.15Z"/>
                </svg>
              </a>
            </div>
          </div>
      
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-gray-300 hover:text-red-600 transition-colors">Services</a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-red-600 transition-colors">About Us</a>
              </li>
              <li>
                <a href="/register" className="text-gray-300 hover:text-red-600 transition-colors">Book Service</a>
              </li>
              <li>
                <a href="#faq" className="text-gray-300 hover:text-red-600 transition-colors">FAQs</a>
              </li>
            </ul>
          </div>
      
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Contact Us</h3>
            <div className="space-y-3">
              <a href="tel:+1234567890" className="flex items-center text-gray-300 hover:text-red-600 transition-colors">
                <Phone className="w-5 h-5 mr-2" />
                <span>+1 234 567 890</span>
              </a>
              <a href="mailto:info@nso2.com" className="flex items-center text-gray-300 hover:text-red-600 transition-colors">
                <Mail className="w-5 h-5 mr-2" />
                <span>info@nso2.com</span>
              </a>
              <div className="flex items-start text-gray-300">
                <MapPin className="w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                <span>123 Green Street, Eco City,<br />State 12345, Country</span>
              </div>
            </div>
          </div>
      
          {/* Working Hours & Connect */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Working Hours</h3>
            <div className="space-y-2 text-gray-300">
              <p>Monday - Friday:</p>
              <p className="font-semibold">8:00 AM - 6:00 PM</p>
              <p>Saturday:</p>
              <p className="font-semibold">9:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
            <div className="pt-4">
              <a 
                href="https://wa.me/1234567890" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-600 px-6 py-2 rounded-full hover:bg-green-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,1.54,5.29L2,22l4.71-1.54A9.89,9.89,0,0,0,12,22,10,10,0,0,0,22,12,10,10,0,0,0,12,2Zm4.79,13.21c-.18.51-1.06,1-1.46,1.06-.4.06-.44.32-2.78-.57s-3.66-3.27-3.77-3.42-.44-.57-.44-.57a2.3,2.3,0,0,1,0-2c.18-.51.41-.51.56-.51h.38c.19,0,.3.09.43.32l.56.85a.19.19,0,0,1,0,.21l-.28.41a.19.19,0,0,0,0,.21,6.07,6.07,0,0,0,1.15,1.4,5.34,5.34,0,0,0,1.67.91.19.19,0,0,0,.21,0l.41-.28a.19.19,0,0,1,.21,0l.85.56C16.91,15.36,17,15.47,17,15.66v.38C17,16.23,16.91,16.46,16.79,16.97Z"/>
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      
        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <p className="text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} NSO2. All rights reserved.
            </p>
            <div className="flex justify-center md:justify-end space-x-4 text-sm text-gray-400">
              <a href="/privacy" className="hover:text-red-600 transition-colors">Privacy Policy</a>
              <span>|</span>
              <a href="/terms" className="hover:text-red-600 transition-colors">Terms of Service</a>
              <span>|</span>
              <a href="/sitemap" className="hover:text-red-600 transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
      </footer>
      </main>
      </div>
    </div>
  );
};

export default App;

