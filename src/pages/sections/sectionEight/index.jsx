import { Phone, Mail, MapPin, Activity, Wrench, ThermometerSun, Star, Users, Clock, Shield } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const TestimonialCarousel = () => {
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef(null);

  const testimonials = [
    {
      name: "John Doe",
      text: "Outstanding service! My car's performance improved significantly after the decarbonization treatment. Highly recommended!"
    },
    {
      name: "Sarah Smith",
      text: "Professional team and excellent results. They went above and beyond my expectations!"
    },
    {
      name: "Mike Johnson",
      text: "Great attention to detail. My engine runs smoother than ever after their service."
    },
    {
      name: "Emily Brown",
      text: "Fantastic experience from start to finish. The staff was knowledgeable and friendly."
    },
    {
      name: "David Wilson",
      text: "Impressed with the quality of work. Will definitely be coming back for future services."
    },
    {
      name: "Lisa Anderson",
      text: "The results speak for themselves. My car feels like new again!"
    }
  ];

  useEffect(() => {
    const scroll = scrollRef.current;
    let animationId;

    const animate = () => {
      if (!isHovered && scroll) {
        scroll.scrollLeft += 0.9;
        
        // Reset scroll position when reaching end
        if (scroll.scrollLeft >= (scroll.scrollWidth - scroll.clientWidth) / 2) {
          scroll.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isHovered]);

  return (
    <section className="py-20  opacity-50 bg-black overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-white">What Our Clients Say</h2>
        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Double the testimonials to create seamless loop */}
          {[...testimonials, ...testimonials].map((testimonial, i) => (
            <div 
              key={i} 
              className="flex-shrink-0 w-full md:w-[calc(33.333%-1.5rem)] bg-zinc-900 p-6 rounded-lg"
            >
              <div className="flex items-center mb-4">
                <Users className="w-12 h-12 text-red-600 mr-4" />
                <div>
                  <h4 className="font-bold text-white">{testimonial.name}</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-300">
                {testimonial.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;