import React from 'react';
import renderer from 'react-test-renderer';
import ListOfVideos from './ListOfVideos';

jest.mock('material-ui/IconMenu', () => 'IconMenu');
jest.mock('material-ui/MenuItem', () => 'MenuItem');
jest.mock('material-ui/IconButton', () => 'IconButton');

jest.mock('material-ui');

describe('ListOfVideos render', () => {
  const videosList = [{ _id: 1, title: 'video 1' }, { _id: 2, title: 'video 2' }];

  it('if user is authentificated', () => {
    const tree = renderer.create(
      <ListOfVideos
        videosList={videosList}
        userConnected
        editVideo={() => {}}
        handleDeleteVideo={() => {}}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('if user is not authentificated', () => {
    const tree = renderer.create(
      <ListOfVideos
        videosList={videosList}
        userConnected={false}
        editVideo={() => {}}
        handleDeleteVideo={() => {}}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
