import React from 'react';
import PropTypes from 'prop-types';

const ListOfVideos = (props) => (
  <div className="videosList">
    {
      props.videosList.map((video) => {
        const imageUrl = `https://i.ytimg.com/vi/${video.videoId}/mqdefault.jpg`;

        return (
          <div className="videosList__item" key={video.videoId}>
            <a
              className="videosList__item__link"
              href={`//www.youtube.com/watch?v=${video.videoId}`}
              target="_blank"
            >
              <img className="media-object" src={imageUrl} alt="" />
            </a>
            <div className="videosList__item__description">
              <span>{video.song}</span>
              <span>{video.type}</span>
            </div>
          </div>
        );
      })
    }
  </div>
);

ListOfVideos.propTypes = {
  videosList: PropTypes.array.isRequired
};

export default ListOfVideos;
