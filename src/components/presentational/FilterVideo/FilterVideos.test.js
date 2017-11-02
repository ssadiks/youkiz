import React from 'react';
import renderer from 'react-test-renderer';
import FilterVideos from './FilterVideos';

describe('NotFound render', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <FilterVideos />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
