import styled from "styled-components"


export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  /* background-color: #333; */
  color: #fff;
  font-family: 'Roboto', sans-serif;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
  }
`;


export const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const Navigation = styled.nav`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    display: none;
    width: 100%;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
  }

  &.open {
    display: flex;
  }
`;

export const NavLink = styled.a`
  text-decoration: none;
  color: black;
  font-size: 0.9rem;
  transition: color 0.3s;

  &:hover {
    color: #ff0000;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

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

export const MenuToggle = styled.button`
  background-color: transparent;
  color: #fff;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;

  @media (min-width: 769px) {
    display: none;
  }
`;
