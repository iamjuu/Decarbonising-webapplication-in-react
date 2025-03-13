import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logoo } from '../../assets';

const Index = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleBookNow = () => {
    navigate("/nos2/register");
  };

  const handleBillNow = () => {
    navigate("/nos2/billsearch");
  };

  return (
    <nav className="container mx-auto p-2 flex justify-between font-Nos2font items-center">
      {/* Logo */}
      <div className="text-2xl font-serif text-red-600">
        <img className='w-16' src={Logoo} alt="" />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 text-white">
        <a href="/" className="hover:text-red-600 text-[14px] transition-colors">Home</a>
        <a href="#services" className="hover:text-red-600 text-[14px] transition-colors">Services</a>
        <a href="#about" className="hover:text-red-600 text-[14px] transition-colors">About</a>
        <a href="#footer" className="hover:text-red-600 text-[14px] transition-colors">Contact</a>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white text-2xl focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        &#9776;
      </button>

      {/* Buttons */}
      <div className="hidden md:flex gap-5">
        <button
          onClick={handleBookNow}
          className="border border-red-700 px-3 py-2 text-gray-200 rounded-[50px] hover:bg-red-700 text-[12px] transition-colors"
        >
          Book Now
        </button>
        <button
          onClick={handleBillNow}
          className="border text-[12px] text-gray-200 px-3 border-red-700 rounded-[50px] transition-colors hover:bg-red-600 hover:text-white hover:border hover:border-red-600"
        >
          Previous Visit
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/80 text-white space-y-4 p-4 absolute w-full top-full left-0 z-40">
          <a href="#home" className="block hover:text-red-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Home</a>
          <a href="#services" className="block hover:text-red-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Services</a>
          <a href="#about" className="block hover:text-red-600 transition-colors" onClick={() => setIsMenuOpen(false)}>About</a>
          <a href="#footer" className="block hover:text-red-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</a>

          <div className="space-y-2">
            <button
              onClick={handleBookNow}
              className="block w-full border border-red-700 px-5 py-2 rounded-full hover:bg-red-700 text-sm transition-colors text-white"
            >
              Book Now
            </button>
            <button
              onClick={handleBillNow}
              className="block w-full border-red-700 px-5 py-2 rounded-full transition-colors text-white hover:bg-transparent hover:border hover:border-red-600"
            >
              Previous Visit
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Index;

