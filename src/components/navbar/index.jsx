import React, { useState } from 'react';
import { CgMenuRightAlt } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons"; // Import specific icon
import { HeaderContainer, Logo, MenuToggle, NavLink, Navigation } from './style';
import { Logoo } from '../../assets';
import Btn from '../Button';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <HeaderContainer>
      <Logo>
        <img style={{ width: '70px' }} src={Logoo} alt="Logo" />
      </Logo>
      <Navigation className={menuOpen ? 'open' : ''}>
        <NavLink>HOME</NavLink>
        <NavLink>ABOUT</NavLink>
        <NavLink>SERVICE</NavLink>
        <NavLink>CONTACT</NavLink>
      </Navigation>
      <Btn value="Register" to="/register" />
      <MenuToggle onClick={toggleMenu}>
        {menuOpen ? <IoMdClose /> : <FontAwesomeIcon icon={faBars} />}
      </MenuToggle>
    </HeaderContainer>
  );
};

export default Header;
