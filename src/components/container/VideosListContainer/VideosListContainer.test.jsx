import React from 'react';
import { shallow, configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-16';
import VideosListContainer from './VideosListContainer';

configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const INITIAL_STATE = {
  videosReducer: {
    videosList: [],
    isPending: false,
    error: null
  },
  dancersReducer: {
    dancersList: [],
  }
};

describe('VideosListContainer', () => {
  it('renders with default props', () => {
    const store = mockStore(INITIAL_STATE);
    const wrapper = shallow(
      <VideosListContainer store={store} />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
