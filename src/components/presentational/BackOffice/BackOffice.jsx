import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import DancersNewForm from '../DancersNewForm/DancersNewForm';
import DancersEditForm from '../DancersEditForm/DancersEditForm';
import ListOfDancers from '../ListOfDancers/ListOfDancers';
import VideosListContainer from '../../container/VideosListContainer/VideosListContainer';
import VideosNewForm from '../VideosNewForm/VideosNewForm';
import VideosEditForm from '../VideosEditForm/VideosEditForm';
import TranslationHOC from '../../container/TranslationHOC/TranslationHOC';

class BackOffice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDancer: null,
      blockDisplayed: 'VIDEO_LIST',
      snackMessage: null
    };
  }

  /* Get all dancers */
  componentDidMount() {
    this.props.fetchDancersAction();
  }

  handleRequestClose = () => {
    this.props.updateSnackMessage({
      state: false,
      message: ''
    });
  };

  /* handleActive(tab) {
    console.log('actiiiive tab' + tab);
  } */

  /* OnClick on dancer Chip */
  handleDancersEdit = (selectedDancer) => {
    if (selectedDancer === this.state.selectedDancer) {
      this.resetDancerDetails();
    } else {
      this.setState({
        selectedDancer
      });
      this.props.fetchDancerAction(selectedDancer);
    }
  }

  /* Reset selected dancer */
  resetDancerDetails = () => {
    this.setState({
      selectedDancer: null
    });
    this.props.resetDancerAction();
  }

  /* OnClick on button to Display VideosNewForm or VideosListContainer */
  handleDisplayVideos = () => {
    const { blockDisplayed } = this.state;
    this.setState({
      blockDisplayed: (blockDisplayed === 'VIDEO_LIST') ? 'VIDEO_CREATE' : 'VIDEO_LIST'
    });
  }

  /* OnClick Edit Video Button Choice */
  editVideo = (id) => {
    this.setState({
      blockDisplayed: 'VIDEO_EDIT'
    });
    this.props.fetchVideoAction(id);
  }

  render() {
    const {
      dancersList, deleteDancerAction, videosList, snackMessage,
      modalDialog, openModalDialog, hideModalDialog, t
    } = this.props;

    const { selectedDancer, blockDisplayed } = this.state;
    const actions = [
      <RaisedButton
        label={t('YK.CANCEL')}
        primary
        onClick={modalDialog && modalDialog.onCancel}
      />,
      <RaisedButton
        label="Submit"
        primary
        keyboardFocused
        onClick={modalDialog && modalDialog.onValid}
      />,
    ];

    return (
      <div className="o-container">
        <Tabs>
          <Tab label={t('YK.DANCERS')} >
            <div>
              {
                !selectedDancer ?
                  <DancersNewForm /> :
                  <DancersEditForm
                    selectedDancer={selectedDancer}
                    resetDancerDetails={this.resetDancerDetails}
                  />
              }
              {
                dancersList &&
                <ListOfDancers
                  dancersList={dancersList}
                  deleteDancerAction={deleteDancerAction}
                  handleDancersEdit={this.handleDancersEdit}
                  resetDancerDetails={this.resetDancerDetails}
                  openModalDialog={openModalDialog}
                  hideModalDialog={hideModalDialog}
                />
              }
            </div>
          </Tab>
          <Tab label={t('YK.VIDEOS')} >
            <div>
              {
                dancersList && (blockDisplayed === 'VIDEO_CREATE') &&
                <VideosNewForm
                  dancersList={dancersList}
                  handleDisplayVideos={this.handleDisplayVideos}
                />
              }
              {
                (blockDisplayed === 'VIDEO_EDIT') && <VideosEditForm dancersList={dancersList} />
              }
              <RaisedButton
                className="BackOffice__newVideo"
                type="submit"
                label={(blockDisplayed === 'VIDEO_LIST') ? 'Add Video' : 'Back'}
                primary
                onClick={this.handleDisplayVideos}
              />
              {
                videosList && (blockDisplayed === 'VIDEO_LIST') &&
                <VideosListContainer.component
                  editVideo={this.editVideo}
                  userConnected
                />
              }
            </div>
          </Tab>
        </Tabs>
        <Snackbar
          open={
            !!(snackMessage && snackMessage.state)
          }
          message={snackMessage && snackMessage.message}
          autoHideDuration={2000}
          onRequestClose={this.handleRequestClose}
        />
        <Dialog
          title={modalDialog && modalDialog.title}
          actions={actions}
          modal={false}
          open={!!(modalDialog && modalDialog.state)}
          onRequestClose={this.handleClose}
        >
          {
            modalDialog && modalDialog.message
          }
        </Dialog>
      </div>
    );
  }
}

BackOffice.defaultProps = {
  dancersList: [],
  videosList: [],
  createDancerSuccess: false,
  deleteDancerSuccess: false,
  deleteVideoSuccess: false,
  createVideoSuccess: false,
  updateVideoSuccess: false,
  snackMessage: null,
  modalDialog: null
};

BackOffice.propTypes = {
  dancersList: PropTypes.array,
  videosList: PropTypes.array,
  fetchDancersAction: PropTypes.func.isRequired,
  fetchDancerAction: PropTypes.func.isRequired,
  deleteDancerAction: PropTypes.func.isRequired,
  resetDancerAction: PropTypes.func.isRequired,
  fetchVideoAction: PropTypes.func.isRequired,
  updateSnackMessage: PropTypes.func.isRequired,
  openModalDialog: PropTypes.func.isRequired,
  hideModalDialog: PropTypes.func.isRequired,
  snackMessage: PropTypes.object,
  modalDialog: PropTypes.object,
  t: PropTypes.func.isRequired,
};

export default TranslationHOC(BackOffice);
