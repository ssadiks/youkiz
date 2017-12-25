import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { RaisedButton, Checkbox } from 'material-ui';
import TranslationHOC from '../../container/TranslationHOC/TranslationHOC';
import { DANCES_STYLE, VIDEOS_LIMIT } from '../../../constants';
import { changePropretiesOfObjectInArray, getArrayOfValue } from '../../../helpers';

class FilterVideos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        type: '',
        dancersTab: [],
        dancers: [],
        online: true
      },
      limit: VIDEOS_LIMIT,
      page: 1
    };
  }

  /* Get all Dancers for hydrate Select */
  componentWillMount() {
    this.props.fetchDancersAction();
  }

  onSubmitSearch = (e) => {
    e.preventDefault();

    this.props.toggleLazyLoading();
    this.props.resetVideosListAction();

    this.props.updateVideosParams(this.state);

    this.props.onSubmit(this.state);
  }

  /* Reset Filter and Results */
  resetFilter = () => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: '',
        dancersTab: [],
        dancers: [],
        online: true
      },
      limit: VIDEOS_LIMIT,
      page: 1
    }, () => {
      // Clean VideosList
      this.props.resetVideosListAction();
      // Reset Videos Params
      this.props.resetVideosParamsAction();
      // Fetch VideosList with Reseted params
      this.props.onSubmit(this.state);
    });
  };

  /* OnChange Select typer update state */
  handleChangetype = (type) => {
    this.setState({
      filters: {
        ...this.state.filters,
        type
      }
    });
  };

  /* OnChange Select Dancers, update state */
  handleChangeDancers = (dancers) => {
    const dancersTab = getArrayOfValue(dancers, 'label');
    this.setState({
      filters: {
        ...this.state.filters,
        dancers,
        dancersTab
      }
    });
  };

  /* OnCheck Online, update online state */
  handleCheckOnline = () => {
    this.setState({
      filters: {
        ...this.state.filters,
        online: !this.state.filters.online
      }
    });
  }

  render() {
    const DANCES_STYLE_SELECT = changePropretiesOfObjectInArray(DANCES_STYLE, ['id', 'name'], ['value', 'label']);
    const dancersListSelect = changePropretiesOfObjectInArray(this.props.dancersList, ['_id', 'name'], ['value', 'label']);

    const { t } = this.props;
    const { filters } = this.state;

    return (
      <div className="FilterVideos">
        <h2>{t('YK.FILTER')}</h2>
        <form className="FilterVideos__form" onSubmit={this.onSubmitSearch}>
          <Select
            name="form-field-name"
            options={DANCES_STYLE_SELECT}
            onChange={this.handleChangetype}
            value={filters.type}
            simpleValue
            placeholder="Select a dance style"
            className="FilterVideos__select FilterVideos__select--type"
          />
          {
            dancersListSelect &&
            <Select
              name="form-field-name"
              options={dancersListSelect}
              onChange={this.handleChangeDancers}
              value={filters.dancers}
              multi
              autosize
              placeholder="Select dancers"
              className="FilterVideos__select FilterVideos__select--dancers"
            />
          }
          <Checkbox
            label="Online"
            onCheck={this.handleCheckOnline}
            checked={filters.online}
          />
          <div className="FilterVideos__buttons">
            <RaisedButton
              onClick={() => this.resetFilter()}
              label="Reset"
              secondary
              disabled={!filters.type && filters.dancersTab.length === 0}
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
