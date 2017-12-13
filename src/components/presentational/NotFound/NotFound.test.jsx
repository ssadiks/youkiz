import React from 'react';
import renderer from 'react-test-renderer';
import NotFound from './NotFound';

describe('NotFound render', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <NotFound />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
