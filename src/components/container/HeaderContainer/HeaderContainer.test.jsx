import React from 'react';
import { shallow, configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import HeaderContainer from './HeaderContainer';

configure({ adapter: new Adapter() });

describe('HeaderContainer', () => {
  it('renders with default props', () => {
    const wrapper = shallow(
      <Router>
        <HeaderContainer />
      </Router>
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
