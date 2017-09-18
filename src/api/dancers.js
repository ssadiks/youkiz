import axios from 'axios';

export function fetchDancers(params) {
  return axios.get('http://localhost:3030/api/dancers', params)
    .then(response => response);
}

export function fetchDancer(dancerId) {
  return axios.get(`http://localhost:3030/api/dancer/${dancerId}`)
    .then(response => response);
}
