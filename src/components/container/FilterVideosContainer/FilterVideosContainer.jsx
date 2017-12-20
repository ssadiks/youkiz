import { connect } from 'react-redux';
import FilterVideos from '../../presentational/FilterVideos/FilterVideos';
import { fetchDancersAction } from '../../../redux/actions/index';
import { resetVideosListAction } from '../../../redux/actions/videosActions/videosActions';

const mapStateToProps = state => ({
  dancersList: state.dancersReducer.dancersList,
  isPending: state.dancersReducer.isPending,
  error: state.dancersReducer.error,
});

const FilterVideosContainer = connect(null, null)(FilterVideos);

export default FilterVideosContainer;
