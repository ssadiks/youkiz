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
      <span className="menu__desktop__logo">Logo</span>
      <nav className="menu__desktop__nav">
        <ul>
          <li className={classnames({
            menu__desktop__nav__item: true,
            'menu__desktop__nav__item--active': ((props.location.pathname).substr(1) === ''),
          })}
          >
            <Link to="/">Home</Link>
          </li>
          <li className={classnames({
            menu__desktop__nav__item: true,
            'menu__desktop__nav__item--active': ((props.location.pathname).substr(1) === 'videos'),
          })}
          >
            <Link to="/videos">Videos</Link>
          </li>
          <li className={classnames({
            menu__desktop__nav__item: true,
            'menu__desktop__nav__item--active': ((props.location.pathname).substr(1) === 'bo'),
          })}
          >
            <Link to="/bo">Back office</Link>
          </li>
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
      <span className="menu__mobile__logo">Logo</span>
      <nav className={classnames({
        menu__mobile__nav: true,
        'menu__mobile__nav--closed': props.menuClosed,
      })}
      >
        <ul>
          <li className={classnames({
            menu__mobile__nav__item: true,
            'menu__mobile__nav__item--active': ((props.location.pathname).substr(1) === ''),
          })}
          >
            <Link to="/">Home</Link>
          </li>
          <li className={classnames({
            menu__mobile__nav__item: true,
            'menu__mobile__nav__item--active': ((props.location.pathname).substr(1) === 'videos'),
          })}
          >
            <Link to="/videos">Videos</Link>
          </li>
          <li className={classnames({
            menu__mobile__nav__item: true,
            'menu__mobile__nav__item--active': ((props.location.pathname).substr(1) === 'bo'),
          })}
          >
            <Link to="/bo">Back office</Link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
);

Menu.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  menuClosed: PropTypes.bool.isRequired,
};

export default Menu;
