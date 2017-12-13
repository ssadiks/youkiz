import React from 'react';
import renderer from 'react-test-renderer';
import Loader from './Loader';

jest.mock('material-ui/RefreshIndicator', () => 'RefreshIndicator');

describe('Loader render', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Loader />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
