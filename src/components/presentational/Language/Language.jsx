import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { LOCALES } from '../../../constants';

const Language = props => (
  <SelectField
    value={props.locale}
    onChange={props.onChangeLocale}
    floatingLabelText="Country"
    className="country"
  >
    {
      LOCALES.map(locale => (
        <MenuItem
          key={locale}
          value={locale}
          primaryText={locale}
        />
      ))
    }

  </SelectField>
);

Language.PropTypes = {
  onChangeLocale: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired
};

export default Language;
