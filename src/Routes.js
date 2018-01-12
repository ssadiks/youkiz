import React from 'react';
import HomePage from './components/container/HomePage/HomePage';
import VideosListContainer from './components/container/VideosListContainer/VideosListContainer';
import BackOfficeContainer from './components/container/BackOfficeContainer/BackOfficeContainer';

export default [
  {
    ...HomePage,
    path: '/',
    exact: true
  },
  {
    ...VideosListContainer,
    path: '/videos'
  },
  {
    ...BackOfficeContainer,
    path: '/bo'
  }
];
