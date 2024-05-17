// src/components/OverlayNav.js
import React, { useState } from 'react';
import './OverlayNav.css'; // Import the CSS file

const OverlayNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openNav = () => {
    setIsOpen(true);
  };

  const closeNav = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div id="myNav" className={`overlay ${isOpen ? 'open' : ''}`}>
        <a href="#" className="closebtn" onClick={closeNav}>&times;</a>
        <div className="overlay-content">
          <a href="#">Home</a>
          <a href="#">Upload Results</a>
          <a href="#">View Courses</a>
          <a href="#">Contact</a>
        </div>
      </div>

      <span style={{ fontSize: '30px', cursor: 'pointer' }} onClick={openNav}>&#9776; open</span>
    </div>
  );
};

export default OverlayNav;
