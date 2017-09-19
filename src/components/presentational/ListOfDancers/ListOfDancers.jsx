import React from 'react';
import PropTypes from 'prop-types';

const ListOfDancers = props => (
  <div className="ListOfVideos">
    <h2>{`${props.dancersList.length} result(s)`}</h2>
    <div className="videosList">
      {
        props.dancersList.map((dancer) => {
          return (
            <div className="videosList__item" key={dancer._id}>
              <span>{dancer.name}</span>
              <span>{dancer.sex}</span>
            </div>
          );
        })
      }
    </div>
  </div>
);

ListOfDancers.propTypes = {
  dancersList: PropTypes.array.isRequired
};

export default ListOfDancers;
