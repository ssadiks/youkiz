import React from 'react';
import { shallow, configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-16';
import LanguageContainer from './LanguageContainer';

configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const INITIAL_STATE = {
  translationReducer: {
    locale: 'es'
  }
};

describe('LanguageContainer', () => {
  it('renders with default props', () => {
    const store = mockStore(INITIAL_STATE);
    const wrapper = shallow(
      <LanguageContainer
        store={store}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
