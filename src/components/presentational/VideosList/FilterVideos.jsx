import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';
import { DANCE_STYLE, DANCERS } from '../../../constants';
import { getArrayOfValue, filterArrayBy } from '../../../helpers';

class FilterVideos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            typeDance: null
        };
    }


    componentWillReceiveProps(nextProps) {
        // console.log('rp', this.props.videosList);
        if(nextProps.videosList !== this.props.videosList) {
            // this.props.fetchVideosAction();
        }
    }

    onSubmitSearch = (e) => {
        e.preventDefault();

        const params = {
            filters: {
                dancers: [],
                type: ""
            },
            limit: 10
        }

        if (this.state.typeDance) {
            params.filters.type = DANCE_STYLE[this.state.value];
        }

        if (this.state.dancerMale) {
            params.filters.dancers.push(this.state.dancerMale);
        }

        if (this.state.dancerFemale) {
            params.filters.dancers.push(this.state.dancerFemale);
        }

        this.props.onSubmit(params);
    }

    handleChange = (event, index, typeDance) => this.setState({typeDance});

    handleChangeDancersMale = (dancerMale) => this.setState({dancerMale});
    handleChangeDancersFemale = (dancerFemale) => this.setState({dancerFemale});

    render() {
        const dancersFemale = getArrayOfValue(filterArrayBy(DANCERS, 'sex', 'FEMALE'), 'dancer');
        const dancersMale = getArrayOfValue(filterArrayBy(DANCERS, 'sex', 'MALE'), 'dancer');

        return (
            <div className="filterVideos">
                <h1>Filter</h1>
                <form className="filterVideos__form" onSubmit={this.onSubmitSearch}>
                    <SelectField
                        floatingLabelText="Dance Style"
                        value={this.state.typeDance}
                        onChange={this.handleChange}
                    >
                        {
                            DANCE_STYLE.map((DanceStyle, index) => (
                                <MenuItem key={index} value={index} primaryText={DanceStyle} />
                            ))
                        }
                    </SelectField>
                    <AutoComplete
                        floatingLabelText="Male Dancers"
                        filter={AutoComplete.fuzzyFilter}
                        dataSource={dancersMale}
                        maxSearchResults={5}
                        onNewRequest={this.handleChangeDancersMale}
                        openOnFocus
                    />
                    <AutoComplete
                        floatingLabelText="Female Dancers"
                        filter={AutoComplete.fuzzyFilter}
                        dataSource={dancersFemale}
                        maxSearchResults={5}
                        onNewRequest={this.handleChangeDancersFemale}
                        openOnFocus
                    />
                    <button type="submit">Filter</button>
                </form>

            </div>
        );
    }
}

export default FilterVideos;