import axios from 'axios';

export function fetchVideos(params) {
    // const { limit = 10, filters = { dancers: [], type: "" } } = params;
  return axios.post('http://localhost:3030/api/videoss', params)
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
