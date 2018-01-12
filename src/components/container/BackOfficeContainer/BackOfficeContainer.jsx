import { connect } from 'react-redux';
import BackOffice from '../../presentational/BackOffice/BackOffice';
import {
  fetchDancersAction,
  deleteDancerAction,
  fetchDancerAction,
  resetDancerAction,
  fetchVideosAction,
  fetchVideoAction,
  updateSnackMessage,
  openModalDialog,
  hideModalDialog
} from '../../../redux/actions/index';

const mapStateToProps = state => ({
  dancersList: state.dancersReducer.dancersList,
  isPending: state.dancersReducer.isPending,
  error: state.dancersReducer.error,
  createDancerSuccess: state.dancersReducer.createDancerSuccess,
  deleteDancerSuccess: state.dancersReducer.deleteDancerSuccess,
  videosList: state.videosReducer.videosList,
  snackMessage: state.snackMessageReducer.snackMessage,
  modalDialog: state.modalDialogReducer.modalDialog
});

const BackOfficeContainer = connect(mapStateToProps, {
  fetchDancersAction,
  deleteDancerAction,
  fetchDancerAction,
  resetDancerAction,
  fetchVideosAction,
  fetchVideoAction,
  updateSnackMessage,
  openModalDialog,
  hideModalDialog
})(BackOffice);

const loadData = (store) => {
  return store.dispatch(fetchDancersAction());
}

export default {
  loadData,
  component: BackOfficeContainer
};
