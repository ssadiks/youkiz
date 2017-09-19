import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
// import FilterVideos from '../FilterVideo/FilterVideos';
// import ListOfDancers from '../ListOfDancers/ListOfDancers';

class DancersList extends Component {
  componentWillMount() {
    this.props.fetchDancersAction();
  }

  render() {
    const { dancersList } = this.props;

    return (
      <div className="o-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Sex</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              dancersList &&
              dancersList.map(dancer => (
                <TableRow key={dancer._id}>
                  <TableRowColumn>{dancer._id}</TableRowColumn>
                  <TableRowColumn>{dancer.name}</TableRowColumn>
                  <TableRowColumn>{dancer.sex}</TableRowColumn>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    );
  }
}

DancersList.propTypes = {
  dancersList: PropTypes.array,
  fetchDancersAction: PropTypes.func.isRequired
};

export default DancersList;
