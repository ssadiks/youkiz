import { connect } from 'react-redux';
import { withRouter } from 'react-router'

import Menu from '../../presentational/Menu/Menu';
import {
  toggleMenu,
} from '../../../redux/actions/index';

const mapStateToProps = state => ({
  menuClosed: state.menuReducer.menuClosed
});

const MenuContainer = withRouter(connect(mapStateToProps, {
  toggleMenu,
})(Menu));

export default MenuContainer;
