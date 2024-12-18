import styled from "styled-components";
export  const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 4rem;
  /* background-color: #f5f5f5; */
  font-family: 'Roboto', sans-serif; /* Apply font family globally here */

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 2rem;
  }
`;

export  const Header = styled.div`
  flex-basis: 45%;

  @media (max-width: 768px) {
    flex-basis: auto;
    margin-bottom: 2rem;
  }
`;

export  const HeaderText = styled.h3`
  color: #e10019;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  font-family: 'Roboto', sans-serif; /* Apply font family */
`;

export  const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 2rem;
  font-family: 'Roboto', sans-serif; /* Apply font family */

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export  const Description = styled.p`
color:#6B7280;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-family: 'Roboto', sans-serif; /* Apply font family */
`;

export  const ReadMoreButton = styled.button`
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


export  const ImageContainer = styled.div`
  flex-basis: 50%;

  @media (max-width: 768px) {
    flex-basis: auto;
    width: 100%;
  }
`;

export  const Image = styled.img`
  max-width: 100%;
  height: auto;
`;
