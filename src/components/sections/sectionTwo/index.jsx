import React from 'react';
import styled from 'styled-components';
import { Banner } from '../../../assets';

const SectionTwo = () => {
  return (
    <Container>
      <Header>
        <HeaderText>WHO WE ARE</HeaderText>
        <Title>We Have 25 Years Of Experience In This Field</Title>
        <Description>
          With a rich legacy spanning 25 years, our commitment to excellence in
          car servicing is unwavering. Our seasoned team brings a wealth of
          experience to ensure your vehicle receives top-notch care. Trust in
          our expertise to keep your car running smoothly and safely.
        </Description>
        <ReadMoreButton>Read More</ReadMoreButton>
      </Header>
      <ImageContainer>
        <Image src={Banner} alt="Car service" />
      </ImageContainer>
    </Container>
  );
};

export default SectionTwo;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 4rem;
  background-color: #f5f5f5;
  font-family: 'Roboto', sans-serif; /* Apply font family globally here */

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 2rem;
  }
`;

const Header = styled.div`
  flex-basis: 45%;

  @media (max-width: 768px) {
    flex-basis: auto;
    margin-bottom: 2rem;
  }
`;

const HeaderText = styled.h3`
  color: #e10019;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  font-family: 'Roboto', sans-serif; /* Apply font family */
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 2rem;
  font-family: 'Roboto', sans-serif; /* Apply font family */

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
color:#6B7280;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-family: 'Roboto', sans-serif; /* Apply font family */
`;

const ReadMoreButton = styled.button`
  background-color: #e10019;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: 'Roboto', sans-serif; /* Apply font family */
  border-radius: 5px; /* Add border radius to make the corners rounded */

  &:hover {
    background-color: #b10014;
  }
`;


const ImageContainer = styled.div`
  flex-basis: 50%;

  @media (max-width: 768px) {
    flex-basis: auto;
    width: 100%;
  }
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
`;
