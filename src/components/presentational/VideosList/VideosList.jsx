import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FilterVideos from '../FilterVideo/FilterVideos';
import ListOfVideos from '../ListOfVideos/ListOfVideos';

class VideosList extends Component {
  componentWillMount() {
    this.props.fetchVideosAction();
  }

  componentWillReceiveProps(nextProps) {
    // console.log('rp', this.props.videosList);
    if (nextProps.videosList !== this.props.videosList) {
      // this.props.fetchVideosAction();
    }
  }

  render() {
    const { videosList, dancersList } = this.props;

    return (
      <div className="o-container">
        {
          <FilterVideos
            onSubmit={params => this.props.fetchVideosAction(params)}
            fetchDancersAction={this.props.fetchDancersAction}
            dancersList={dancersList}
          />
        }
        <h2>List of videos</h2>
        {
          videosList &&
          <ListOfVideos videosList={videosList} />
        }
      </div>
    );
  }
}

VideosList.propTypes = {
  videosList: PropTypes.array,
  dancersList: PropTypes.array,
  fetchVideosAction: PropTypes.func.isRequired,
  fetchDancersAction: PropTypes.func.isRequired
};

export default VideosList;
