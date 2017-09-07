import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom'

class VideosList extends Component {

  componentWillMount() {
    this.props.fetchVideosAction();
  }

  componentWillReceiveProps(nextProps) {
    // console.log('rp', this.props.videosList);
    if(nextProps.videosList !== this.props.videosList) {
      // this.props.fetchVideosAction();
    }
  }

  render() {
    const { videosList } = this.props;

    return (
      <div>
        <h1>List of videos</h1>
        {
          videosList &&
          <div className="videosList">
            {
              videosList.map(video => {
                const imageUrl = `https://i.ytimg.com/vi/${video.videoId}/mqdefault.jpg`;

                return (
                <div className="videosList__item" key={video.videoId}>
                  <a href={`//www.youtube.com/watch?v=${video.videoId}`} target="_blank">
                    <img className="media-object" src={imageUrl} alt="" />
                    <span>{video.song}</span>
                    <span>{video.type}</span>
                  </a>
                </div>
                )
              })
            }
          </div>
        }

      </div>
    );
  }
}

export default VideosList;