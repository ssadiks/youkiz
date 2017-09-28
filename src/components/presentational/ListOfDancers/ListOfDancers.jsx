import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Chip from 'material-ui/Chip';

class ListOfDancers extends Component {
  constructor(props) {
    super(props);
    this.styles = {
      chip: {
        margin: 4,
      }
    };
  }

  handleRequestDelete = (key) => {
    this.props.deleteDancerAction(key);
    this.props.resetDancerDetails();
  };

  render() {
    const { dancersList, handleDancersEdit } = this.props;

    return (
      <div className="ListOfDancers">
        {
          dancersList && <h2>{`${dancersList.length} result(s)`}</h2>
        }
        <div className="ListOfDancers__list">
          {
            dancersList.map((dancer) => {
              const dancerItemClass = classnames({
                ListOfDancers__list__item: true,
                'ListOfDancers__list__item--male': dancer.gender === 'Male',
                'ListOfDancers__list__item--female': dancer.gender === 'Female',
              });
              return (
                <Chip
                  key={dancer._id}
                  onClick={() => handleDancersEdit(dancer._id)}
                  onRequestDelete={() => this.handleRequestDelete(dancer._id)}
                  style={this.styles.chip}
                  className={dancerItemClass}
                >
                  {dancer.name}
                </Chip>
              );
            })
          }
        </div>
      </div>
    );
  }
}

ListOfDancers.propTypes = {
  dancersList: PropTypes.array.isRequired,
  deleteDancerAction: PropTypes.func.isRequired,
  handleDancersEdit: PropTypes.func.isRequired,
  resetDancerDetails: PropTypes.func.isRequired,
};

export default ListOfDancers;
