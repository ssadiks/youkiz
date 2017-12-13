import React from 'react';
import { shallow, configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-16';
import FilterVideosContainer from './FilterVideosContainer';
import dancersReducer from '../../../redux/reducers/dancersReducer';

configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('FilterVideosContainer', () => {
  it('renders with default props', () => {
    const store = mockStore({ dancersReducer });
    const wrapper = shallow(
      <FilterVideosContainer store={store} />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
