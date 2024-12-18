import React, { useState } from 'react';
import { RiMenuFold2Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { ContactButton, HeaderContainer, Logo, MenuToggle, NavLink, Navigation } from './style';
import { Logoo } from '../../assets';
import Btn  from '../Button'
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <HeaderContainer>
      <Logo>
        <img style={{ width: '70px' }} src={Logoo} alt="" />
      </Logo>
      <Navigation className={menuOpen ? 'open' : ''}>
        <NavLink>HOME</NavLink>
        <NavLink>ABOUT</NavLink>
        <NavLink>SERVICE</NavLink>
        <NavLink>CONTECT</NavLink>
      </Navigation>
<Btn value="Register" to="/register" />

      <MenuToggle onClick={toggleMenu}>
        {menuOpen ?' ✔️ ': '❌'}
      </MenuToggle>
    </HeaderContainer>
  );
};

export default Header;
