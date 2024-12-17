import styled from "styled-components";
export const Container = styled.div`
  background-image: url(${(props) => props.bg}); /* Use background-image for images */
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh; /* Ensure it fills the viewport */
  display: flex;
  justify-content: center;
  align-items: center;
  filter: brightness(0.8); /* Example: Darkens the background on hover */
  transition: filter 0.3s ease-in-out; /* Smooth transition for the filter effect */

  &:hover {
    filter: brightness(0.5); /* Darkens the background more on hover */
  }

  @media (max-width: 768px) {
    height: 70vh; /* Adjust height for smaller devices */
  }

  @media (max-width: 480px) {
    height: 50vh; /* Further adjust height for very small devices */
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1300px;
  color: white;
  padding: 100px; /* Adds spacing within the wrapper */
  text-align: start; /* Aligns text to the left */

  h1 {
    font-family: sans-serif; /* Corrected the font-family */
    font-size: 4rem; /* Large heading size */

    @media (max-width: 768px) {
      font-size: 2.5rem; /* Reduce font size for tablets */
    }

    @media (max-width: 480px) {
      font-size: 1.8rem; /* Further reduce font size for mobile */
    }
  }

  @media (max-width: 768px) {
    padding: 50px; /* Reduce padding for smaller devices */
  }

  @media (max-width: 480px) {
    padding: 20px; /* Further reduce padding for very small devices */
    text-align: center; /* Center text for narrow screens */
  }
`;
