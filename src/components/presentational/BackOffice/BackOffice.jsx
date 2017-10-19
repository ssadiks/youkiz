import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import DancersNewForm from '../DancersNewForm/DancersNewForm';
import DancersEditForm from '../DancersEditForm/DancersEditForm';
import ListOfDancers from '../ListOfDancers/ListOfDancers';
import VideosListContainer from '../../container/VideosListContainer';
import VideosNewForm from '../VideosNewForm/VideosNewForm';
import VideosEditForm from '../VideosEditForm/VideosEditForm';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

class BackOffice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDancer: null,
      blockDisplayed: 'VIDEO_LIST'
    };
  }

  /* Get all dancers */
  componentWillMount() {
    this.props.fetchDancersAction();
  }

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
    const { dancersList, deleteDancerAction, videosList } = this.props;
    const { selectedDancer, blockDisplayed } = this.state;

    return (
      <div className="o-container">
        <Tabs>
          <Tab label="Dancers" >
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
                />
              }
            </div>
          </Tab>
          <Tab label="Videos" >
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
                <VideosListContainer
                  editVideo={this.editVideo}
                  userConnected
                />
              }
            </div>
          </Tab>
          <Tab
            label="Manage requests"
            data-route="/home"
            onActive={this.handleActive}
          >
            <div>
              <h2 style={styles.headline}>3 videos non validées</h2>
              <p>video x v o</p>
              <p>video x v o</p>
              <p>video x v o</p>
              <p>video x v o</p>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

BackOffice.defaultProps = {
  dancersList: [],
  videosList: []
};

BackOffice.propTypes = {
  dancersList: PropTypes.array,
  videosList: PropTypes.array,
  fetchDancersAction: PropTypes.func.isRequired,
  fetchDancerAction: PropTypes.func.isRequired,
  deleteDancerAction: PropTypes.func.isRequired,
  resetDancerAction: PropTypes.func.isRequired,
  fetchVideoAction: PropTypes.func.isRequired,
};

export default BackOffice;
