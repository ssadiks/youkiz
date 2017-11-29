import React from 'react';
import { connect } from 'react-redux';
import { translate } from '../../../helpers';

function TranslationHOC(WrappedComponent) {
  class TranslationComponent extends React.Component {
    render() {
      return <WrappedComponent {...this.props} t={translate} />;
    }
  }

  const mapStateToProps = state => ({
    locale: state.translationReducer.locale
  });

  return connect(mapStateToProps, null)(TranslationComponent);
}

export default TranslationHOC;
