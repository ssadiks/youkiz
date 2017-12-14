import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { RaisedButton, Checkbox } from 'material-ui';
import TranslationHOC from '../../container/TranslationHOC/TranslationHOC';
import { DANCES_STYLE } from '../../../constants';
import { changePropretiesOfObjectInArray, getArrayOfValue } from '../../../helpers';

class FilterVideos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeDance: null,
      dancersTab: [],
      dancers: [],
      online: true
    };
  }

  /* Get all Dancers for hydrate Select */
  componentWillMount() {
    this.props.fetchDancersAction();
  }

  onSubmitSearch = (e) => {
    e.preventDefault();

    const params = {
      filters: {
        dancers: [],
        online: this.state.online,
        type: ''
      },
      limit: 10
    };

    const { typeDance, dancersTab } = this.state;

    if (typeDance) {
      params.filters.type = this.state.typeDance;
    }

    if (dancersTab) {
      params.filters.dancers = this.state.dancersTab;
    }

    this.props.onSubmit(params);
  }

  /* Reset Filter and Results */
  resetFilter = () => {
    this.setState({
      typeDance: null,
      dancersTab: [],
      dancers: [],
      online: true
    });
    this.props.onSubmit();
  };

  /* OnChange Select TypeDancer update state */
  handleChangeTypeDance = (typeDance) => {
    this.setState({ typeDance });
  };

  /* OnChange Select Dancers, update state */
  handleChangeDancers = (dancers) => {
    const dancersTab = getArrayOfValue(dancers, 'label');
    this.setState({ dancers, dancersTab });
  };

  /* OnCheck Online, update online state */
  handleCheckOnline = () => {
    this.setState({ online: !this.state.online });
  }

  render() {
    const DANCES_STYLE_SELECT = changePropretiesOfObjectInArray(DANCES_STYLE, ['id', 'name'], ['value', 'label']);
    const dancersListSelect = changePropretiesOfObjectInArray(this.props.dancersList, ['_id', 'name'], ['value', 'label']);

    const { t } = this.props;

    return (
      <div className="FilterVideos">
        <h2>{t('YK.FILTER')}</h2>
        <form className="FilterVideos__form" onSubmit={this.onSubmitSearch}>
          <Select
            name="form-field-name"
            options={DANCES_STYLE_SELECT}
            onChange={this.handleChangeTypeDance}
            value={this.state.typeDance}
            simpleValue
            placeholder="Select a dance style"
            className="FilterVideos__select FilterVideos__select--typeDance"
          />
          {
            dancersListSelect &&
            <Select
              name="form-field-name"
              options={dancersListSelect}
              onChange={this.handleChangeDancers}
              value={this.state.dancers}
              multi
              autosize
              placeholder="Select dancers"
              className="FilterVideos__select FilterVideos__select--dancers"
            />
          }
          <Checkbox
            label="Online"
            onCheck={this.handleCheckOnline}
            checked={this.state.online}
          />
          <div className="FilterVideos__buttons">
            <RaisedButton
              onClick={() => this.resetFilter()}
              label="Reset"
              secondary
              disabled={!this.state.typeDance && this.state.dancersTab.length === 0}
            />
            <RaisedButton
              className="FilterVideos__buttons__filter"
              type="submit"
              label="Filter"
              primary
            />
          </div>
        </form>
      </div>
    );
  }
}

FilterVideos.defaultProps = {
  dancersList: []
};

FilterVideos.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  fetchDancersAction: PropTypes.func.isRequired,
  dancersList: PropTypes.array,
  t: PropTypes.func.isRequired,
};

export default TranslationHOC(FilterVideos);
