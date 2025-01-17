import { AnimatedTestimonials } from "../../../ui/animatedCard";
import {Pic1,Pic3,Pic2,Caroseal1,Caroseal2,caroseal3} from '../../../assets'
export function AnimatedTestimonialsDemo({Image}) {
  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Muhammed ajmal",
      designation: "Software developer",
      src:Caroseal1
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "juu",
      designation: "photoGrapher",
      src:Caroseal2

    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "athlete",
      designation: "Operations Director at CloudScale",
      src:caroseal3
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src:Caroseal1
    },

  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}



