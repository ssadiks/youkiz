import React from 'react';
import { Link } from 'react-router-dom';
import LanguageContainer from '../LanguageContainer/LanguageContainer';

const HeaderContainer = () => (
  <div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/videos">Videos</Link></li>
      <li><Link to="/bo">Back office</Link></li>
      <li><Link to="/topics">not found</Link></li>
    </ul>
    <LanguageContainer />
  </div>
);

export default HeaderContainer;
