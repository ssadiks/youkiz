import React from 'react';
import renderer from 'react-test-renderer';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import HeaderContainer from './HeaderContainer';

describe('HeaderContainer render', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Router>
        <HeaderContainer />
      </Router>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
