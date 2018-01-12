import React from 'react';
import Welcome from '../../presentational/Welcome/Welcome';
import HeaderContainer from '../../container/HeaderContainer/HeaderContainer';

const HomePage = () => (
  <div className="homepage">
    <Welcome />
  </div>
);

export default {
  component: HomePage
};
