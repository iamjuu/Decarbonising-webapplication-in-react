import React,{useEffect} from 'react'
import { Wrench,  Star,  Clock, Shield } from 'lucide-react';
import Aos from 'aos';




const index = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000, // Animation duration in milliseconds
      once: false, // Allow animations to trigger on both scroll down and up
      mirror: true, // Enable animations to reset when scrolling back up
    });
  
  }, []);

  // ***********card section finshed***************
  return (
    <section    className="py-20 bg-zinc-900">
    <div   className="container mx-auto px-4">
      <h2   data-aos='fadein'  className="text-4xl font-bold mb-12 text-center">Our Process</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-600 rounded-full flex items-center justify-center">
            <Clock className="w-8 h-8" />
          </div>
          <h3   data-aos='fade-up'   className="text-xl font-bold mb-2">Book Appointment</h3>
          <p   data-aos='fade-down' className="text-gray-300">Schedule your service online or call us</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-600 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8" />
          </div>
          <h3   data-aos='fade-up' className="text-xl font-bold mb-2">Inspection</h3>
          <p   data-aos='fade-down' className="text-gray-300">Thorough vehicle diagnostic check</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-600 rounded-full flex items-center justify-center">
            <Wrench className="w-8 h-8" />
          </div>
          <h3  data-aos='fade-up' className="text-xl font-bold mb-2">Service</h3>
          <p   data-aos='fade-down' className="text-gray-300">Professional decarbonization service</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-600 rounded-full flex items-center justify-center">
            <Star className="w-8 h-8" />
          </div>
          <h3 data-aos='fade-down' className="text-xl font-bold mb-2">Quality Check</h3>
          <p  data-aos='fade-up' className="text-gray-300">Final inspection and performance test</p>
        </div>
      </div>
    </div>
  </section>
  )
}

export default index
