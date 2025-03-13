import React, { lazy } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import "animate.css"; // Import Animate.css
import { Activity, Wrench, ThermometerSun } from "lucide-react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import SectionMain from "./sections/sectionMain";
import SectionTwo from "./sections/sectionTwo";
const SectionFour = lazy(() => import("./sections/sectionFour"));
import SectionSeven from "./sections/sectionSeven";
import SectionEight from "./sections/sectionEight";
import SectionNine from "./sections/sectionNine";
// import SectionTen from './sections/sectionTen'

import { Service2, Service1, Service3 } from "../assets";

const App = () => {
  // Initialize AOS
  React.useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: false, // Allow animations to trigger on both scroll down and up
      mirror: true, // Enable animations to reset when scrolling back up
    });
  }, []);

  const services = [
    {
      title: "Engine Decarbonizationss",
      description:
        "Remove carbon deposits from your engine, improving performance and reducing emissions",
      image: Service1,
      details: [
        "Ultrasonic carbon cleaning technology",
        "Restores up to 15% engine efficiency",
        "Reduces fuel consumption by up to 10%",
        "Improves engine response and acceleration",
        "Eliminates black smoke issues",
      ],
      icon: Activity,
    },
    {
      title: "DPF Cleaning",
      description:
        "Professional cleaning of Diesel Particulate Filters to restore optimal function",
      image: Service3,
      details: [
        "Advanced pressure cleaning system",
        "Regeneration cycle monitoring",
        "Reduces back pressure by up to 98%",
        "Extends DPF life by up to 50%",
        "Includes comprehensive filter inspection",
      ],
      icon: Wrench,
    },
    {
      title: "Emissions Testing",
      description:
        "Comprehensive emissions testing and optimization for all vehicle types",
      image: Service2,
      details: [
        "5-gas analyzer testing",
        "Real-time emissions monitoring",
        "NOx, CO, HC, CO2 measurement",
        "Lambda sensor verification",
        "Digital diagnostic reporting",
      ],
      icon: ThermometerSun,
    },
  ];

  return (
    <div className="min-h-screen  font-Nos2font relative animate__animated animate__fadeIn">
      {/* Main content wrapper */}
      <div className="relative z-10 animate__animated animate__fadeIn">
        {/* Header */}
        <header
          className="fixed w-full bg-black/80 backdrop-blur-sm z-50"
          data-aos="fade-down"
        >
          <Navbar />
        </header>
        <main className="text-white  bg-black animate__animated animate__fadeIn">
          <SectionMain data-aos="fade-in" />

          <section id="services" className="py-20 bg-black" data-aos="fade-up">
            <div className="container mx-auto px-4">
              <h1
                className="text-[24px] font-[200] mb-2 text-center"
                data-aos="fade-down"
              >
                Our Services
              </h1>
              <p
                className="text-center text-[14px] leading-[1.5] text-gray-300 mb-2 max-w-3xl mx-auto"
                data-aos="fade-up"
              >
                Using cutting-edge technology and certified processes, we
                deliver professional decarbonization services that extend
                vehicle life, improve performance, and reduce environmental
                impact.
              </p>
              {/* ****************add hover card****************  */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
  <div
    key={index}
    className="bg-black/90 p-6 rounded-lg transform hover:scale-105 transition-all duration-500 ease-in-out hover:shadow-lg hover:shadow-red-600/20"
    data-aos="zoom-in"
  >
    <div className="relative overflow-hidden group transition-all duration-500 ease-in-out">
      <img
        src={service.image}
        alt={service.title}
        className="w-full h-48 opacity-40 group-hover:opacity-70 object-cover rounded-lg mb-4 transition-all duration-500 ease-in-out transform group-hover:scale-110"
        data-aos="flip-right"
      />
      <service.icon className="absolute top-4 right-4 w-8 h-8 text-red-600 transition-all duration-500 ease-in-out group-hover:scale-125 group-hover:text-red-500" />
      
      {/* Hover overlay with smooth transition */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"></div>
    </div>
    
    <div className="transition-all duration-500 ease-in-out transform group-hover:translate-y-[-15px]">
      <h3 
        className="text-[16px] font-[400] transition-all duration-300 ease-in-out hover:text-red-500" 
        data-aos="fade-up"
      >
        {service.title}
      </h3>
      
      <p
        className="text-gray-300 text-[13px] leading-[1.5] mb-4 transition-all duration-300 ease-in-out"
        data-aos="fade-up"
      >
        {service.description}
      </p>
      
      <div
        className="bg-zinc-900/50 p-4 rounded-lg transition-all duration-300 ease-in-out hover:bg-zinc-800/50"
        data-aos="fade-up"
      >
        <h1 className="font-[400] text-[16px] text-red-600 transition-all duration-300 ease-in-out">
          Technical Specifications:
        </h1>
        
        <ul className="transition-all duration-300 ease-in-out">
          {service.details.map((detail, idx) => (
            <li
              key={idx}
              className="flex items-start text-[12px] font-[300] leading-[1.5] text-gray-300 transition-all duration-300 ease-in-out hover:text-white"
              data-aos="fade-down"
            >
              <span className="text-red-600 mr-2 transition-all duration-300 ease-in-out">•</span>
              {detail}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
))}
              </div>
            </div>
          </section>

          {/* Other sections */}
          <SectionNine />
          <SectionTwo data-aos="fade-up" />

          <SectionSeven data-aos="fade-up" />
          <SectionFour data-aos="fade-down" />

          <Footer data-aos="fade-down" />
        </main>
      </div>
    </div>
  );
};

export default App;
