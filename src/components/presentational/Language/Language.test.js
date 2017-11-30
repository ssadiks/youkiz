import React from 'react';
import renderer from 'react-test-renderer';
import Language from './Language';

jest.mock('material-ui/SelectField', () => 'SelectField');
jest.mock('material-ui/MenuItem', () => 'MenuItem');

describe('Language render', () => {
  it('renders correctly', () => {
    const locale = 'es';
    const tree = renderer.create(
      <Language
        onChangeLocale={() => {}}
        locale={locale}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
