import React from 'react';
import PropTypes from 'prop-types';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const ListOfVideos = props => (
  <div className="ListOfVideos">
    <h2>{`${props.videosList.length} result(s)`}</h2>
    <div className="ListOfVideos__list">
      {
        props.videosList.map((video) => {
          const imageUrl = `https://i.ytimg.com/vi/${video.videoId}/mqdefault.jpg`;

          return (
            <div className="ListOfVideos__item" key={video.videoId}>
              <a
                className="ListOfVideos__item__link"
                href={`//www.youtube.com/watch?v=${video.videoId}`}
                target="_blank"
              >
                <img className="media-object" src={imageUrl} alt="" />
              </a>
              <div className="ListOfVideos__item__description">
                <span>{video.song}</span>
                <span>{video.type}</span>
                <IconMenu
                  iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                  anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                  className="ListOfVideos__item__more"
                >
                  <MenuItem primaryText="Edit" />
                  <MenuItem primaryText="Delete" onClick={() => props.deleteVideoAction(video._id)} />
                  <MenuItem primaryText="Infos" />
                </IconMenu>
              </div>
            </div>
          );
        })
      }
    </div>
  </div>
);

ListOfVideos.propTypes = {
  videosList: PropTypes.array.isRequired
};

export default ListOfVideos;
