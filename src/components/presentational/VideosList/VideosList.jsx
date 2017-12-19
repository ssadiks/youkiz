import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader/Loader';
import FilterVideos from '../FilterVideos/FilterVideos';
import ListOfVideos from '../ListOfVideos/ListOfVideos';
import LazyLoadingHOC from '../../container/LazyLoadingHOC/LazyLoadingHOC';

class VideosList extends Component {
  componentDidMount() {
    /* const params = {
      filters: {
        dancers: [],
        online: true,
        type: ''
      },
      limit: 4,
      page: 1
    };

    this.props.fetchVideosAction(params); */
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
        <ListOfVideos
          videosList={videosList}
          deleteVideoAction={deleteVideoAction}
          editVideo={editVideo}
          userConnected={userConnected}
          handleDeleteVideo={this.handleDeleteVideo}
        />
        {
          this.props.isPending && <Loader lazyLoading />
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

export default LazyLoadingHOC(VideosList);
