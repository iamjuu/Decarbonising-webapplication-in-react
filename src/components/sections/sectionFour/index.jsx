import React from 'react';
import { customisation } from '../../../assets';
import styled from 'styled-components';

const index = () => {
  return (
    <Container bg={customisation}>
      <ContentWrapper>
        <Main>
          <First>
            <p style={{ color: 'red', fontWeight: 'bold' }}>OUR CUSTOMISATION</p>
            <h1>Car Serving Matched with Great Workmanship</h1>
            <p style={{ color: 'white', fontSize: '1.6rem' }}>
              Our dedicated team of skilled technicians and mechanics takes pride in delivering top-tier servicing for your beloved vehicle.
            </p>
          </First>
          <Second>
            <div>
                <h1>65</h1>
                <p>Total  Car Service</p>
            </div>
            <div>
            <h1>165</h1>
            <p>Total Bike</p>
            </div>
            <div>
            <h1>165</h1>
            <p>Total Bike</p>
            </div>
            <div>
            <h1>165</h1>
            <p>Total Bike</p>
            </div>
          </Second>
        </Main>
      </ContentWrapper>
    </Container>
  );
};

export default index;

const Container = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  filter: brightness(0.3);
  transition: filter 0.3s ease-in-out;

  @media (max-width: 768px) {
    height: 70vh;
  }

  @media (max-width: 480px) {
    height: 60vh;  
  }

  @media (max-width: 320px) {
    height: 50vh; 
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1300px;
  color: white;
  padding: 100px;
  text-align: start;

  h1 {
    font-family: sans-serif;
    font-size: 4rem;

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }

    @media (max-width: 480px) {
      font-size: 1.8rem;
    }

    @media (max-width: 320px) {
      font-size: 1.4rem;  
    }
  }

  @media (max-width: 768px) {
    padding: 50px;
  }

  @media (max-width: 480px) {
    padding: 20px;
    text-align: center;
  }

  @media (max-width: 320px) {
    padding: 10px; 
  }
`;

const Main = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
    flex-direction: column;


`;

const First = styled.div`
  padding: 10px;
  width:100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  display: flex;
  margin-bottom: 20px;

  p {
    font-size: 1.2rem;

    @media (max-width: 768px) {
      font-size: 1rem;
    }

    @media (max-width: 480px) {
      font-size: 0.9rem;
    }

    @media (max-width: 320px) {
      font-size: 0.8rem; 
    }
  }

  h1 {
    font-size: 3rem;

    @media (max-width: 768px) {
      font-size: 2rem;
    }

    @media (max-width: 480px) {
      font-size: 1.5rem;
    }

    @media (max-width: 320px) {
      font-size: 1.2rem; 
    }
  }
`;

const Second = styled.div`
position abasalote
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  display: flex;
  
    width:100%;
  

`;
