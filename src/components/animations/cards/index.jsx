import { AnimatedTestimonials } from "../../../ui/animatedCard";
import {Pic1,Pic3,Pic2,Caroseal1,Caroseal2,caroseal3} from '../../../assets'
export function AnimatedTestimonialsDemo({Image}) {
  const testimonials = [
    {
      quote:
        "Engine decarbonization involves removing carbon deposits from engine components, such as fuel injectors, intake valves, and combustion chambers. This process improves engine performance, reduces emissions, and prevents engine damage.",
      name: "Muhammed ajmal",
      designation: "Engine Decarbonization",
      src:Caroseal1
    },
    {
      quote:
        "Fuel system cleaning removes carbon deposits and contaminants from fuel tanks, fuel lines, and fuel injectors. This process ensures proper fuel flow, reduces emissions, and prevents engine problems.",
      name: "juu",
      designation: "Fuel System Cleaning",
      src:Caroseal2

    },
    {
      quote:
        " Catalytic converter cleaning removes carbon deposits and contaminants from catalytic converters, ensuring proper emissions control and reducing the risk of converter failure.",
      name: "athlete",
      designation: "Catalytic Converter Cleaning",
      src:caroseal3
    },
    {
      quote:
        "Engine oil system cleaning removes carbon deposits and contaminants from engine oil systems, ensuring proper lubrication and reducing wear on engine components.",
      name: "James Kim",
      designation: "Engine Oil System Cleaning",
      src:Caroseal1
    },

  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}



