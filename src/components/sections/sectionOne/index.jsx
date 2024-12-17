import React from 'react';
import { Header } from '../../../assets'; // Ensure correct path and file type
import {Container,ContentWrapper} from './style'
const Index = () => {
  return (
    <Container bg={Header}>
      <ContentWrapper>
        <h1>
          We Are <br /> Qualified & <br /> Professional
        </h1>
      </ContentWrapper>
    </Container>
  );
};

export default Index;
