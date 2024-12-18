import React, { useState } from 'react';
import { RiMenuFold2Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import {ContactButton,HeaderContainer,Logo,MenuToggle,NavLink,Navigation} from './style'
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <HeaderContainer>
      <Logo>Logo</Logo>
      <Navigation className={menuOpen ? 'open' : ''}>
        <NavLink>HOME</NavLink>
        <NavLink>ABOUT</NavLink>
        <NavLink>SERVICE</NavLink>
        <NavLink>CONTECT</NavLink>
      </Navigation>
      <ContactButton>Book Now</ContactButton>
      <MenuToggle onClick={toggleMenu}>
        {menuOpen ? <IoMdClose/> : <RiMenuFold2Fill />        }
      </MenuToggle>
    </HeaderContainer>
  );
};

export default Header;
