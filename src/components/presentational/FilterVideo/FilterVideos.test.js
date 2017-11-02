import React from 'react';
import renderer from 'react-test-renderer';
import FilterVideos from './FilterVideos';

jest.mock('material-ui/Checkbox', () => 'Checkbox');
jest.mock('material-ui/RaisedButton', () => 'RaisedButton');

describe('NotFound render', () => {
  it('renders correctly', () => {
    const dancersList = [{ id: 1, name: 'dancer 1' }, { id: 1, name: 'dancer 2' }];
    const tree = renderer.create(
      <FilterVideos
        onSubmit={() => {}}
        fetchDancersAction={() => {}}
        dancersList={dancersList}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
