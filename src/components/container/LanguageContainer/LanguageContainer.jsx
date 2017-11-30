import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setLocaleAction } from '../../../redux/actions/index';
import Language from '../../presentational/Language/Language';

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
    return <Language locale={this.state.locale} onChangeLocale={this.onChangeLocale} />;
  }
}

LanguageContainer.PropTypes = {
  setLocaleAction: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  locale: state.translationReducer.locale
});

export default connect(mapStateToProps, { setLocaleAction })(LanguageContainer);
