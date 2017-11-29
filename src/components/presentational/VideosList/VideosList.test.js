import React from 'react';
import renderer from 'react-test-renderer';
import VideosList from './VideosList';

jest.mock('material-ui/IconMenu', () => 'IconMenu');
jest.mock('material-ui/MenuItem', () => 'MenuItem');
jest.mock('material-ui/IconButton', () => 'IconButton');

jest.mock('material-ui');

describe('VideosList render', () => {
  const videosList = [{ _id: 1, title: 'video 1' }, { _id: 2, title: 'video 2' }];
  const dancersList = [{ _id: 1, name: 'name 1' }, { _id: 2, name: 'name 2' }];

  it('if user is authentificated', () => {
    const tree = renderer.create(
      <VideosList
        videosList={videosList}
        dancersList={dancersList}
        userConnected
        editVideo={() => {}}
        handleDeleteVideo={() => {}}
        fetchVideosAction={() => {}}
        fetchDancersAction={() => {}}
        deleteVideoAction={() => {}}
        openModalDialog={() => {}}
        hideModalDialog={() => {}}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('if user is not authentificated', () => {
    const tree = renderer.create(
      <VideosList
        videosList={videosList}
        dancersList={dancersList}
        userConnected={false}
        editVideo={() => {}}
        handleDeleteVideo={() => {}}
        fetchVideosAction={() => {}}
        fetchDancersAction={() => {}}
        deleteVideoAction={() => {}}
        openModalDialog={() => {}}
        hideModalDialog={() => {}}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
