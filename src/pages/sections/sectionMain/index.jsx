import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import videoFile from "../../../assets/video/videoplayback.mp4";

const Index = () => { // Changed component name to uppercase
  const videoRef = useRef(null);
  const navigate = useNavigate(); // Ensure useNavigate is defined
  const [isHeadlightOn, setIsHeadlightOn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsHeadlightOn((prev) => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleBookNow = () => {
    navigate("nos2/register");
  };

  const handleBillNow = () => {
    navigate("/billsearch");
  };

  return (
    <section className="min-h-screen relative flex items-center">
      <div className="absolute inset-0 h-full overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={videoFile} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-5xl md:text-5xl font-bold mb-6">
              Drive <span className="text-red-600">Clean</span><br />
          <span className='text-red-600'>Drive</span>     <span className="">Green</span>
            </h1>
            <p className="text-[20px] text-gray-500 mb-8 max-w-2xl">
              Leading the revolution in vehicle decarbonization. We help reduce your carbon footprint while maintaining peak performance.
            </p>
            <button
              onClick={handleBookNow}
              className=" border border-red-600 px-8 py-3 rounded-full text-[14px] hover:bg-red-700 transition-colors"
            >
              Schedule Service
            </button>
          </div>
          <div className="relative"></div>
        </div>
      </div>
    </section>
  );
};

export default Index;
