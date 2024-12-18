import React from 'react';
import { Link } from 'react-router-dom';
import { ContactButton } from './style';

const Btn = ({ value, to }) => {
  return (
    <Link to={to}>
      <ContactButton>{value}</ContactButton>
    </Link>
  );
};

export default Btn;
