import axios from 'axios';

export function fetchVideos() {
  return axios.get('http://localhost:3030/api/videos')
    .then(response => {
      return response;
    });
}

export function fetchVideo(videoId) {
  return axios.get(`http://localhost:3030/api/videos/${videoId}`)
    .then(response => {
      return response;
    });
}
