import React from 'react';
import './Button.css';

const Button = ({ children, onClick, disabled, className }) => (
  <button className={`button ${className}`} onClick={onClick} disabled={disabled}>
    {children}
  </button>
);

export default Button;