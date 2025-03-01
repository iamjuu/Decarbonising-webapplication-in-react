import React, { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { Dodge } from '../../../assets';

const sectionData = [
  {
    id: 1,
    headerText: "WHO WE ARE",
    title: "We Have 5 Years Of Experience In This Field",
    description:
      "With a rich legacy spanning 5 years, our commitment to excellence in car servicing is unwavering. Our seasoned team brings a wealth of experience to ensure your vehicle receives top-notch care. Trust in our expertise to keep your car running smoothly and safely.",
    buttonText: "Read More",
    image: Dodge,
    altText: "Car service",
  },
  // Add more objects here for additional sections if needed
];

const Index = () => {
  const counters = useRef([]);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: 'ease-in-out',
      once: true, // Animation only once on scroll
    });

    const options = {
      threshold: 1, // 100% visibility to trigger animation
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          const index = counters.current.findIndex(counter => counter === entry.target);
          if (index !== -1) {
            counters.current[index].start();
            setAnimated(true); // Set animated to true so it won't count again
          }
        }
      });
    }, options);

    counters.current.forEach(counter => {
      if (counter) {
        observer.observe(counter);
      }
    });

    return () => {
      counters.current.forEach(counter => {
        if (counter) {
          counter.removeEventListener('mouseover', () => {
            counter.classList.remove('animated'); // Remove animation class on hover
          });
        }
      });
    };
  }, [animated]);

  return (
    <div>
      <section className="py-16  font-Nos2font bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center" ref={el => counters.current.push(el)} data-aos="fade-up" data-aos-delay="100">
              <div className="text-4xl font-bold text-red-600 mb-2">
                <CountUp start={1} end={5000} suffix="+" />
              </div>
              <div className="text-gray-300">Cars Serviced</div>
            </div>
            <div className="text-center" ref={el => counters.current.push(el)} data-aos="fade-up" data-aos-delay="200">
              <div className="text-4xl font-bold text-red-600 mb-2">
                <CountUp start={1} end={98} suffix="%" />
              </div>
              <div className="text-gray-300">Satisfied Clients</div>
            </div>
            <div className="text-center" ref={el => counters.current.push(el)} data-aos="fade-up" data-aos-delay="300">
              <div className="text-4xl font-bold text-red-600 mb-2">
                <CountUp start={1} end={15} suffix="+" />
              </div>
              <div className="text-gray-300">Years Experience</div>
            </div>
            <div className="text-center" ref={el => counters.current.push(el)} data-aos="fade-up" data-aos-delay="400">
              <div className="text-4xl font-bold text-red-600 mb-2">
                <CountUp start={1} end={24} suffix="/7" />
              </div>
              <div className="text-gray-300">Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
