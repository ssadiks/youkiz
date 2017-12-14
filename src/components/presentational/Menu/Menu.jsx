import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import LanguageContainer from '../../container/LanguageContainer/LanguageContainer';

const Menu = props => (
  <div className="menu">
    <div className="menu__desktop">
      <span className="logo">Logo</span>
      <nav className="menu__desktop__nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/videos">Videos</Link></li>
          <li><Link to="/bo">Back office</Link></li>
          <li><Link to="/topics">not found</Link></li>
        </ul>
      </nav>
      <LanguageContainer />
    </div>

    <div className="menu__mobile">
      <AppBar
        iconElementLeft={!props.menuClosed && <IconButton><NavigationClose /></IconButton>}
        onLeftIconButtonClick={() => props.toggleMenu(props.menuClosed)}
      />
      <LanguageContainer />
      <div className={classnames({
        menu__nav: true,
        'menu__nav--closed': props.menuClosed,
      })}
      >
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/videos">Videos</Link></li>
          <li><Link to="/bo">Back office</Link></li>
          <li><Link to="/topics">not found</Link></li>
        </ul>
      </div>
    </div>
  </div>
);

Menu.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  menuClosed: PropTypes.bool.isRequired,
};

export default Menu;
