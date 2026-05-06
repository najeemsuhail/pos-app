import React from 'react';
import { APP_NAME } from '../config/appInfo';
import logo from '../assets/servestack-logo.png';
import '../styles/BrandLogo.css';

const BrandLogo = ({ className = '', size = 'medium', subtitle = '' }) => (
  <div className={`brand-logo brand-logo-${size} ${className}`.trim()}>
    <img className="brand-logo-mark" src={logo} alt="" aria-hidden="true" />
    <div className="brand-logo-copy">
      <span className="brand-logo-name">{APP_NAME}</span>
      {subtitle && <span className="brand-logo-subtitle">{subtitle}</span>}
    </div>
  </div>
);

export default BrandLogo;
