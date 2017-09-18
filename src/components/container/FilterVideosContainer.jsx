import { connect } from 'react-redux';
import FilterVideos from '../presentational/FilterVideo/FilterVideos';
import { fetchDancersAction } from '../../redux/actions';

const mapStateToProps = state => ({
  dancersList: state.dancersReducer.dancersList,
  isPending: state.dancersReducer.isPending,
  error: state.dancersReducer.error,
});

const FilterVideosContainer = connect(mapStateToProps, {
  fetchDancersAction
})(FilterVideos);

export default FilterVideosContainer;
