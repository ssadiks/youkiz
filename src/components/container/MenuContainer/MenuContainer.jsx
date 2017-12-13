import { connect } from 'react-redux';
import Menu from '../../presentational/Menu/Menu';
import {
  toggleMenu,
} from '../../../redux/actions/index';

const mapStateToProps = state => ({
  menuClosed: state.menuReducer.menuClosed,
});

const MenuContainer = connect(mapStateToProps, {
  toggleMenu,
})(Menu);

export default MenuContainer;
