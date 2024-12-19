import styled from "styled-components";

// Container with background image, height adjustments, and hover effect
export const Container = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: left;
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
  padding: 20px;
  text-align: start;

  h1 {
    font-family: sans-serif;
    font-size: 2rem;
    display: flex;
    flex-wrap: wrap; // Ensures proper wrapping of words
    gap: 15px; // Adds space between each word

    span {
      display: inline-block;
      transition: transform 0.3s ease, color 0.3s ease;
    }

    span:hover {
      transform: scale(1.2) translatey(-10px); // Scales and moves the word to the right
      color: #ff6347; 
    }

    @media (max-width: 768px) {
      font-size: 2rem;
    }

    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }

  @media (max-width: 768px) {
    padding: 10px;
  }

  @media (max-width: 480px) {
    padding: 20px;
    text-align: left;
  }
`;

