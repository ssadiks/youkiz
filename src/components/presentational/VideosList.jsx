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
          <div>
            {
              videosList.map(video => {
                const imageUrl = `https://i.ytimg.com/vi/${video.videoId}/mqdefault.jpg`;

                return (
                <div key={video.videoId}>
                  <Link to={`videos/${video._id}`}>
                    <img className="media-object" src={imageUrl} alt="" />
                    <span>{video.song}</span>
                    <span>{video.type}</span>
                  </Link>
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