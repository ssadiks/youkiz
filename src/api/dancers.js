import axios from 'axios';

export function fetchDancers(params) {
  return axios.get('http://localhost:3030/api/dancers', params)
    .then(response => response);
}

export function fetchDancer(dancerId) {
  return axios.get(`http://localhost:3030/api/dancers/${dancerId}`)
    .then(response => response);
}

export function createDancer(dancer) {
  return axios.post('http://localhost:3030/api/dancers', dancer)
    .then(response => response);
}

export function deleteDancer(dancerId) {
  return axios.delete(`http://localhost:3030/api/dancers/${dancerId}`)
    .then(response => response);
}

export function updateDancer(dancerId, params) {
  return axios.put(`http://localhost:3030/api/dancers/${dancerId}`, params)
    .then(response => response);
}
