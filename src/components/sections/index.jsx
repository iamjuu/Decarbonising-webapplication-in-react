import React, { useEffect, lazy, Suspense } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SectionOne from './sectionOne';
import SectionTwo from './sectionTwo';
import SectionThree from './sectionThree';

const SectionFour = lazy(() => import('./sectionFour'));

const Index = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with a duration of 1000ms
  }, []);

  return (
    <>
      <div data-aos="fade-up">
        <SectionOne />
      </div>
      <div data-aos="fade-down">
        <SectionTwo />
      </div>
      <div data-aos="fade-up">
        <SectionThree />
      </div>
      <Suspense fallback={<div>Loading Section Four...</div>}>
        <div data-aos="fade-down">
          <SectionFour />
        </div>
      </Suspense>
    </>
  );
};

export default Index;
