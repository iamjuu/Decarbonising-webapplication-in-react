import styled from "styled-components";



export const ContactButton = styled.button`
  background-color: #ff0000;
  color: #fff;
  border-radius:2px;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #cc0000;
  }

  @media (max-width: 768px) {
    margin-top: 1rem;
    font-size: 1rem;
  }
`;