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
                {
                  props.userConnected &&
                  <IconMenu
                    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                    anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                    className="ListOfVideos__item__more"
                  >
                    <MenuItem primaryText="Edit" onClick={() => props.editVideo(video._id)} />
                    <MenuItem primaryText="Delete" onClick={() => props.handleDeleteVideo(video._id)} />
                    <MenuItem primaryText="Infos" />
                  </IconMenu>
                }
              </div>
            </div>
          );
        })
      }
    </div>
  </div>
);

ListOfVideos.defaultProps = {
  userConnected: false
};

ListOfVideos.propTypes = {
  videosList: PropTypes.array.isRequired,
  userConnected: PropTypes.bool
};

export default ListOfVideos;
