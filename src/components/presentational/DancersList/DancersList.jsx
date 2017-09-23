import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';

// import FilterVideos from '../FilterVideo/FilterVideos';
import ListOfDancers from '../ListOfDancers/ListOfDancers';
import DancersNew from '../DancersNew/DancersNew';
import DancersEdit from '../DancersEdit/DancersEdit';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

class DancersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDancer: null
    };
  }

  componentWillMount() {
    this.props.fetchDancersAction();
  }

  handleActive(tab) {
    console.log('actiiiive tab' + tab);
  }

  handleDancersEdit = (selectedDancer) => {
    this.setState({
      selectedDancer
    })
    this.props.fetchDancerAction(selectedDancer);
    console.log('You clicked the Chip.', selectedDancer);
  }

  render() {
    const { dancersList, deleteDancerAction, fetchDancerAction } = this.props;
    const { selectedDancer } = this.state;

    return (
      <div className="o-container">
        <Tabs>
          <Tab label="Dancers" >
            <div>
              <DancersNew />
              {
                selectedDancer &&
                <DancersEdit
                  selectedDancer={selectedDancer}
                />
              }

              {
                dancersList &&
                <ListOfDancers
                  dancersList={dancersList}
                  deleteDancerAction={deleteDancerAction}
                  handleDancersEdit={this.handleDancersEdit}
                />
              }
            </div>
          </Tab>
          <Tab label="BO" >
            <div>
              <span>bo</span>
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

DancersList.defaultProps = {
  dancersList: []
};

DancersList.propTypes = {
  dancersList: PropTypes.array,
  fetchDancersAction: PropTypes.func.isRequired,
  deleteDancerAction: PropTypes.func.isRequired,
};

export default DancersList;
