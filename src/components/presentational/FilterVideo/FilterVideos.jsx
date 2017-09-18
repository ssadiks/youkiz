import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { DANCES_STYLE } from '../../../constants';
import { changePropretiesOfObjectInArray, getArrayOfValue } from '../../../helpers';

class FilterVideos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeDance: '',
      dancersTab: []
    };
  }

  componentWillMount() {
    this.props.fetchDancersAction();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dancersList !== this.props.dancersList) {
      if (nextProps.dancersList.length > 0) {
        const dancersList = changePropretiesOfObjectInArray(nextProps.dancersList, ['_id', 'name'], ['value', 'label']);
        this.setState({
          dancersList
        });
      }
    }
  }

  onSubmitSearch = (e) => {
    e.preventDefault();

    const params = {
      filters: {
        dancers: [],
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

    if (dancersTab.length === 0 && typeDance === '') {
      this.props.onSubmit();
    } else {
      this.props.onSubmit(params);
    }
  }

  // handleChangeTypeDance = typeDance => this.setState({ typeDance });
  handleChangeTypeDance = typeDance => {
    console.log('typeDance', typeDance);
    this.setState({ typeDance });
  }
  handleChangeDancers = (dancers) => {
    const dancersTab = getArrayOfValue(dancers, 'label');
    this.setState({ dancers, dancersTab });
  };

  render() {
    const DANCES_STYLE_SELECT = changePropretiesOfObjectInArray(DANCES_STYLE, ['id', 'name'], ['value', 'label']);

    return (
      <div className="filterVideos">
        <h2>Filter</h2>
        <form className="filterVideos__form" onSubmit={this.onSubmitSearch}>
          <Select
            name="form-field-name"
            options={DANCES_STYLE_SELECT}
            onChange={this.handleChangeTypeDance}
            value={this.state.typeDance}
            simpleValue
            placeholder="Select a dance style"
            className="filterVideos__select filterVideos__select--typeDance"
          />
          {
            this.state.dancersList &&
            <Select
              name="form-field-name"
              options={this.state.dancersList}
              onChange={this.handleChangeDancers}
              value={this.state.dancers}
              multi
              autosize
              placeholder="Select dancers"
              className="filterVideos__select filterVideos__select--dancers"
            />
          }
          <button type="submit">Filter</button>
        </form>
      </div>
    );
  }
}

FilterVideos.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  fetchDancersAction: PropTypes.func.isRequired,
  dancersList: PropTypes.array.isRequired
};

export default FilterVideos;
