import React, { useEffect } from "react";
import {
  Container,
  Description,
  Header,
  HeaderText,
  Image,
  ImageContainer,
  ReadMoreButton,
  Title,
} from "./style";
import { Dodge } from '../../../assets';

const sectionData = [
  {
    id: 1,
    headerText: "WHO WE ARE",
    title: "We Have  More Then 5 Years Of Experience In This Field",
    description:
      "Nos2  is team of The Vehicle Decarbonisation Center is a team of experts dedicated to helping individuals, fleets, and communities reduce their carbon footprint from transportation. Our mission is to provide innovative solutions and services that support a sustainable and environmentally friendly transportation sector. - Expert consulting services for vehicle emissions reduction and decarbonization strategy development- Innovative solutions for electric vehicle adoption, alternative fuel infrastructure development, and vehicle efficiency optimization",
    buttonText: "Read More",
    image: Dodge,
    altText: "Car service",
  },
  // Add more objects here for additional sections if needed
];

const SectionTwo = () => {

  useEffect(() => {
    import('aos').then(AOS => {
      AOS.init({
          duration: 1000, // Animation duration in milliseconds
          once: false, // Allow animations to trigger on both scroll down and up
          mirror: true, // Enable animations to reset when scrolling back up
        });
    });
  }, []);

  return (
    <>
      {sectionData.map((section) => (
        <Container key={section.id} data-aos="fade-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <ImageContainer data-aos="fade-right">
              <Image src={section.image} alt={section.altText} />
            </ImageContainer>
            <Header data-aos="fade-down">
              <HeaderText>{section.headerText}</HeaderText>
              <Title>{section.title}</Title>
              <Description>{section.description}</Description>
              <ReadMoreButton>{section.buttonText}</ReadMoreButton>
            </Header>
          </div>
        </Container>
      ))}
    </>
  );
};

export default SectionTwo;
