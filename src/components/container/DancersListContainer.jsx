import { connect } from 'react-redux';
import DancersList from '../presentational/DancersList/DancersList';
import { fetchDancersAction, deleteDancerAction, fetchDancerAction } from '../../redux/actions';

const mapStateToProps = state => ({
  dancersList: state.dancersReducer.dancersList,
  isPending: state.videosReducer.isPending,
  error: state.videosReducer.error,
});

const DancersListContainer = connect(mapStateToProps, {
  fetchDancersAction,
  deleteDancerAction,
  fetchDancerAction
})(DancersList);

export default DancersListContainer;