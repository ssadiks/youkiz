import React from 'react';
import { Link } from 'react-router-dom';

const HeaderContainer = () => (
  <div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/videos">Videos</Link></li>
      <li><Link to="/topics">not found</Link></li>
    </ul>
  </div>
);

export default HeaderContainer;
