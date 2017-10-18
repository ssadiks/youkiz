import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import DancersNewForm from '../DancersNewForm/DancersNewForm';
import DancersEditForm from '../DancersEditForm/DancersEditForm';
import ListOfDancers from '../ListOfDancers/ListOfDancers';
import VideosListContainer from '../../container/VideosListContainer';
import VideosNewForm from '../VideosNewForm/VideosNewForm';

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
      createVideoFormDisplayed: false
    };
  }

  componentWillMount() {
    this.props.fetchDancersAction();
  }

  /* handleActive(tab) {
    console.log('actiiiive tab' + tab);
  } */

  handleDancersEdit = (selectedDancer) => {
    if (selectedDancer === this.state.selectedDancer) {
      this.setState({
        selectedDancer: null
      });
      this.props.resetDancerAction();
    } else {
      this.setState({
        selectedDancer
      });
      this.props.fetchDancerAction(selectedDancer);
    }
  }

  resetDancerDetails = () => {
    this.setState({
      selectedDancer: null
    });
    this.props.resetDancerAction();
  }

  /* OnClick on button to Display VideosNewForm or VideosListContainer */
  handleDisplayVideos = () => {
    const { createVideoFormDisplayed } = this.state;
    this.setState({
      createVideoFormDisplayed: !createVideoFormDisplayed
    });
  }

  render() {
    const { dancersList, deleteDancerAction, videosList } = this.props;
    const { selectedDancer, createVideoFormDisplayed } = this.state;

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
                dancersList && createVideoFormDisplayed && <VideosNewForm dancersList={dancersList} handleDisplayVideos={this.handleDisplayVideos} />
              }

              <RaisedButton
                className="BackOffice__newVideo"
                type="submit"
                label={createVideoFormDisplayed ? 'Back' : 'Add Video'}
                primary
                onClick={this.handleDisplayVideos}
              />
              {
                videosList && !createVideoFormDisplayed && <VideosListContainer userConnected />
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
              <p>
                List de videos avec un btn validé ou supprimer
                peut etre modifier
              </p>
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
};

export default BackOffice;
