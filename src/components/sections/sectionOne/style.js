import styled from "styled-components";
export const Container = styled.div`
  background-image: url(${(props) => props.bg}); 
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh; 
  display: flex;
  justify-content: center;
  align-items: center;
  filter: brightness(0.8); 
  transition: filter 0.3s ease-in-out; 

  &:hover {
    filter: brightness(0.5); 
  }

  @media (max-width: 768px) {
    height: 70vh; 
  }

  @media (max-width: 480px) {
    height: 50vh; 
  }
`;

export const ContentWrapper = styled.div`
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
  }

  @media (max-width: 768px) {
    padding: 50px; 
  }

  @media (max-width: 480px) {
    padding: 20px;
    text-align: center; 
  }
`;
