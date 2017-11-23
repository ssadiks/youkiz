import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { setLocaleAction } from '../../redux/actions';
import { LOCALES } from '../../constants';

class LanguageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: props.locale
    };
  }

  onChangeLocale = (event, index, value) => {
    this.setState({ locale: value });
    this.props.setLocaleAction(value);
  }

  render() {
    return (
      <SelectField
        value={this.state.locale}
        onChange={this.onChangeLocale}
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
  }
}

LanguageContainer.defaultProps = {
};

LanguageContainer.PropTypes = {
  setLocaleAction: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  locale: state.translationReducer.locale
});

export default connect(mapStateToProps, { setLocaleAction })(LanguageContainer);
