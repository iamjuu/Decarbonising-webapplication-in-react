import React from 'react';
import { Service1, Service2, Service3 } from '../../../assets';
import {Container,ServiceDescription,ServiceImage,ServiceItem,ServiceTitle,ServicesContainer,TextSection} from './style'
const services = [
  {
    id: 1,
    image: Service1,
    title: 'Aligned Wheel',
    description:
      'Experience smoother rides and extended tire life with our wheel alignment service.',
  },
  {
    id: 2,
    image: Service2,
    title: 'Electrical System',
    description:
      'Elevate car\'s electrical system to peak performance with our specialized expertise.',
  },
  {
    id: 3,
    image: Service3,
    title: 'System Service',
    description:
      'We utilize cutting-edge diagnostics and techniques to ensure optimal condition.',
  },

];

const WhyChooseUs = () => {
  return (
    <Container>
      <TextSection>
        <h5>WHY CHOOSE US</h5>
        <h2>Great Car Service</h2>
        <p>Trust us to keep your automobile running smoothly and reliably.</p>
      </TextSection>

      <ServicesContainer>
        {services.map((service) => (
          <ServiceItem key={service.id}>
            <ServiceImage src={service.image} alt={service.title} />
            <ServiceTitle>{service.title}</ServiceTitle>
            <ServiceDescription>{service.description}</ServiceDescription>
          </ServiceItem>
        ))}
      </ServicesContainer>
    </Container>
  );
};

export default WhyChooseUs;
