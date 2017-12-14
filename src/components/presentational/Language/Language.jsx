import React from 'react';
import PropTypes from 'prop-types';
import ReactFlagsSelect from 'react-flags-select';

const Language = ({ localesList, locale, onChangeLocale }) => (
  <div className="language">
    <ReactFlagsSelect
      countries={localesList}
      defaultCountry={locale.toUpperCase()}
      onSelect={onChangeLocale}
      showSelectedLabel={false}
      showOptionLabel={false}
      selectedSize={20}
    />
  </div>
);

Language.propTypes = {
  onChangeLocale: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
  localesList: PropTypes.array.isRequired
};

export default Language;
