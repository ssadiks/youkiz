import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader/Loader';
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

  handleDeleteVideo = (videoId) => {
    this.props.openModalDialog({
      title: 'Delete Video',
      message: 'Are you sure',
      onValid: () => {
        this.props.deleteVideoAction(videoId);
      },
      onCancel: () => this.props.hideModalDialog()
    });
  }

  render() {
    const { videosList, dancersList, deleteVideoAction, editVideo,
      userConnected } = this.props;

    return (
      <div className="o-container">
        {
          <FilterVideos
            onSubmit={params => this.props.fetchVideosAction(params)}
            fetchDancersAction={this.props.fetchDancersAction}
            dancersList={dancersList}
          />
        }
        {
          this.props.isPending ?
            <Loader /> :
            <ListOfVideos
              videosList={videosList}
              deleteVideoAction={deleteVideoAction}
              editVideo={editVideo}
              userConnected={userConnected}
              handleDeleteVideo={this.handleDeleteVideo}
            />
        }
      </div>
    );
  }
}

VideosList.defaultProps = {
  videosList: [],
  dancersList: [],
  userConnected: false
};

VideosList.propTypes = {
  videosList: PropTypes.array,
  dancersList: PropTypes.array,
  fetchVideosAction: PropTypes.func.isRequired,
  fetchDancersAction: PropTypes.func.isRequired,
  deleteVideoAction: PropTypes.func.isRequired,
  openModalDialog: PropTypes.func.isRequired,
  hideModalDialog: PropTypes.func.isRequired,
  editVideo: PropTypes.func.isRequired,
  isPending: PropTypes.bool.isRequired,
  userConnected: PropTypes.bool,
};

export default VideosList;
