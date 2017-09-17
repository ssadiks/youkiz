import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { DANCES_STYLE, DANCERS } from '../../../constants';
import { changePropretiesOfObjectInArray } from '../../../helpers';

class FilterVideos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeDance: null
    };
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

    if (this.state.typeDance) {
      params.filters.type = DANCES_STYLE[this.state.typeDance];
    }

    if (this.state.dancers) {
      params.filters.dancers = this.state.dancers;
    }

    this.props.onSubmit(params);
  }

  handleChangeTypeDance = typeDance => this.setState({ typeDance });
  handleChangeDancers = dancers => this.setState({ dancers });

  render() {
    const DANCES_STYLE_SELECT = changePropretiesOfObjectInArray(DANCES_STYLE, ['id', 'name'], ['value', 'label']);
    const DANCERS_SELECT = changePropretiesOfObjectInArray(DANCERS, ['id', 'dancer'], ['value', 'label']);

    return (
      <div className="filterVideos">
        <h2>Filter</h2>
        <form className="filterVideos__form" onSubmit={this.onSubmitSearch}>
          <Select
            name="form-field-name"
            options={DANCES_STYLE_SELECT}
            onChange={this.handleChangeTypeDance}
            clearable={false}
            value={this.state.typeDance}
            simpleValue
            placeholder="Select a dance style"
            className="filterVideos__select filterVideos__select--typeDance"
          />
          <Select
            name="form-field-name"
            options={DANCERS_SELECT}
            onChange={this.handleChangeDancers}
            value={this.state.dancers}
            multi
            autosize
            placeholder="Select dancers"
            className="filterVideos__select filterVideos__select--dancers"
          />
          <button type="submit">Filter</button>
        </form>
      </div>
    );
  }
}

FilterVideos.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default FilterVideos;
