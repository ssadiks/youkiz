import React, { Component } from 'react';

class VideoDetails extends Component {

  componentWillMount() {
    const videoId = this.props.match.params.videoId;
    this.props.fetchVideoAction(videoId);
  }

  render() {
    const { videoDetails } = this.props;
    const url = `https://www.youtube.com/embed/${videoDetails.videoId}`;
    return (
      <div>
        <h1>Details videos</h1>
        <iframe className="embed-responsive-item" src={url}></iframe>
        <span>{ videoDetails.song }</span>
        <span>{ videoDetails.type }</span>
      </div>
    );
  }
}

export default VideoDetails;