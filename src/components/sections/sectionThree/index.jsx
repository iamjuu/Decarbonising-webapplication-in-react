import React from 'react';
import styled from 'styled-components';
import { Service1, Service2, Service3, Service4 } from '../../../assets';

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
  {
    id: 4,
    image: Service4,
    title: 'Engine Diagnostics',
    description:
      'Unlock the secrets of your car\'s performance with state-of-the-art diagnostic services.',
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

const Container = styled.div`
  font-family: 'Roboto', sans-serif;
  padding: 4rem;
  background-color: #f5f5f5;
`;

const TextSection = styled.div`
  line-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 2rem;

  h5 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const ServicesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 2rem;
`;

const ServiceItem = styled.div`
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const ServiceImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: contain;
  margin-bottom: 1.5rem;
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ServiceDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
`;
