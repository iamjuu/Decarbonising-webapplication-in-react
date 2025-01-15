import React, { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';

const Index = () => {
  const counters = useRef([]);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
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

    // Clean up the event listeners on unmount
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
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center" ref={el => counters.current.push(el)}>
              <div className="text-4xl font-bold text-red-600 mb-2">
                <CountUp start={1} end={5000} suffix="+" />
              </div>
              <div className="text-gray-300">Cars Serviced</div>
            </div>
            <div className="text-center" ref={el => counters.current.push(el)}>
              <div className="text-4xl font-bold text-red-600 mb-2">
                <CountUp start={1} end={98} suffix="%" />
              </div>
              <div className="text-gray-300">Satisfied Clients</div>
            </div>
            <div className="text-center" ref={el => counters.current.push(el)}>
              <div className="text-4xl font-bold text-red-600 mb-2">
                <CountUp start={1} end={15} suffix="+" />
              </div>
              <div className="text-gray-300">Years Experience</div>
            </div>
            <div className="text-center" ref={el => counters.current.push(el)}>
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
