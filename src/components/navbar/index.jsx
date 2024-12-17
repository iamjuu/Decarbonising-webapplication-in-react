import React, { useState } from 'react';
import styled from 'styled-components';
import { RiMenuFold2Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <HeaderContainer>
      <Logo>Carserving</Logo>
      <Navigation className={menuOpen ? 'open' : ''}>
        <NavLink>HOME</NavLink>
        <NavLink>ABOUT</NavLink>
        <NavLink>SERVICE</NavLink>
        <NavLink>PRICE</NavLink>
        <NavLink>CLIENT</NavLink>
      </Navigation>
      <ContactButton>Book Now</ContactButton>
      <MenuToggle onClick={toggleMenu}>
        {menuOpen ? <IoMdClose/> : <RiMenuFold2Fill />        }
      </MenuToggle>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: #333;
  color: #fff;
  font-family: 'Roboto', sans-serif;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
  }
`;


const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Navigation = styled.nav`
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

const NavLink = styled.a`
  text-decoration: none;
  color: #fff;
  font-size: 0.9rem;
  transition: color 0.3s;

  &:hover {
    color: #ff0000;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ContactButton = styled.button`
  background-color: #ff0000;
  color: #fff;
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

const MenuToggle = styled.button`
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

export default Header;
