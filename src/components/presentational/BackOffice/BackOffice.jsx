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
      addVideo: false
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

  onClickAddVideo = () => {
    this.setState({
      addVideo: true
    });
  }

  render() {
    const { dancersList, deleteDancerAction, videosList } = this.props;
    const { selectedDancer } = this.state;

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
                dancersList && <VideosNewForm dancersList={dancersList} />
              }
              <RaisedButton
                className="BackOffice__newVideo"
                type="submit"
                label="Add"
                primary
                onClick={this.onClickAddVideo}
              />
              {
                videosList && <VideosListContainer userConnected />
              }
            </div>
          </Tab>
          <Tab
            label="Manage requests"
            data-route="/home"
            onActive={this.handleActive}
          >
            <div>
              <h2 style={styles.headline}>Tab Three</h2>
              <p>
                This is a third example tab.
              </p>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

BackOffice.defaultProps = {
  dancersList: []
};

BackOffice.propTypes = {
  dancersList: PropTypes.array,
  fetchDancersAction: PropTypes.func.isRequired,
  fetchDancerAction: PropTypes.func.isRequired,
  deleteDancerAction: PropTypes.func.isRequired,
  resetDancerAction: PropTypes.func.isRequired,
};

export default BackOffice;
