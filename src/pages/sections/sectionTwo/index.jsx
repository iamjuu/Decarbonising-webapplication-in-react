import React from 'react';
import { Banner } from '../../../assets';
import {Container,Description,Header,HeaderText,Image,ImageContainer,ReadMoreButton,Title} from './style'
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
