import React from "react";
import { Banner } from "../../../assets";
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

// Data array for dynamic rendering
const sectionData = [
  {
    id: 1,
    headerText: "WHO WE ARE",
    title: "We Have 25 Years Of Experience In This Field",
    description:
      "With a rich legacy spanning 25 years, our commitment to excellence in car servicing is unwavering. Our seasoned team brings a wealth of experience to ensure your vehicle receives top-notch care. Trust in our expertise to keep your car running smoothly and safely.",
    buttonText: "Read More",
    image: Banner,
    altText: "Car service",
  },
  // Add more objects here for additional sections if needed
];

const SectionTwo = () => {
  return (
    <>
      {sectionData.map((section) => (
        <Container key={section.id}>
          <Header>
            <HeaderText>{section.headerText}</HeaderText>
            <Title>{section.title}</Title>
            <Description>{section.description}</Description>
            <ReadMoreButton>{section.buttonText}</ReadMoreButton>
          </Header>
          <ImageContainer>
            <Image src={section.image} alt={section.altText} />
          </ImageContainer>
        </Container>
      ))}
    </>
  );
};

export default SectionTwo;
