import React, { useEffect, lazy, Suspense } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import SectionOne from './sectionOne';
import SectionTwo from './sectionTwo';
import SectionThree from './sectionThree';
const SectionFour = lazy(() => import('./sectionFour'));
import SectionFive from './sectionFive'
const Index = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with a duration of 1000ms
  }, []);

  return (
    <>
    <Navbar/>
      <div data-aos="fade-up">
        <SectionOne />
      </div>
      <div data-aos="fade-down">
        <SectionTwo />
      </div>
      <div data-aos="fade-up">
        <SectionThree />
      </div>
      <div data-aos="fade-up">
        <SectionFive />
      </div>
      <Suspense fallback={<div>Loading Section Four...</div>}>
        <div data-aos="fade-down">
          <SectionFour />
        </div>
      </Suspense>
      <Footer/>
    </>
  );
};

export default Index;
