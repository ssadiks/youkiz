import axios from 'axios';

export function fetchVideos(params) {
  // const { limit = 10, filters = { dancers: [], type: "" } } = params;
  return axios.post('http://localhost:3030/api/videos', params)
    .then(response => response);

  /* return new Promise((resolve) => {
    window.setTimeout(
      () => {
        // We fulfill the promise !
        resolve(data);
      }, Math.random() * 1000);
  }); */
}

export function fetchVideo(videoId) {
  return axios.get(`http://localhost:3030/api/videos/${videoId}`)
    .then(response => response);
}

export function deleteVideo(videoId) {
  return axios.delete(`http://localhost:3030/api/videos/${videoId}`)
    .then(response => response);
}

export function createVideo(video) {
  return axios.post('http://localhost:3030/api/videos/create', video)
    .then(response => response);
}

export function updateVideo(videoId, params) {
  return axios.put(`http://localhost:3030/api/videos/${videoId}`, params)
    .then(response => response);
}
