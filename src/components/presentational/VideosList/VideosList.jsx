import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FilterVideos from './FilterVideos';

class VideosList extends Component {
  componentWillMount() {
    // this.props.fetchVideosAction();
  }

  componentWillReceiveProps(nextProps) {
    // console.log('rp', this.props.videosList);
    if (nextProps.videosList !== this.props.videosList) {
      // this.props.fetchVideosAction();
    }
  }

  render() {
    const { videosList } = this.props;

    return (
      <div className="o-container">
        {
          <FilterVideos onSubmit={params => this.props.fetchVideosAction(params)} />
        }
        <h1>List of videos</h1>
        {
          videosList &&
          <div className="videosList">
            {
              videosList.map((video) => {
                const imageUrl = `https://i.ytimg.com/vi/${video.videoId}/mqdefault.jpg`;

                return (
                  <div className="videosList__item" key={video.videoId}>
                    <a
                      className="videosList__item__link"
                      href={`//www.youtube.com/watch?v=${video.videoId}`}
                      target="_blank"
                    >
                      <img className="media-object" src={imageUrl} alt="" />
                    </a>
                    <div className="videosList__item__description">
                      <span>{video.song}</span>
                      <span>{video.type}</span>
                    </div>
                  </div>
                );
              })
            }
          </div>
        }

      </div>
    );
  }
}

VideosList.propTypes = {
  videosList: PropTypes.array.isRequired,
  fetchVideosAction: PropTypes.func.isRequired
};

export default VideosList;
