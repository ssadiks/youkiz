import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import classnames from 'classnames';

const Loader = (props) => {
  const style = {
    refresh: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }
  };

  return (
    <div className={classnames({
      Loader: true,
      'lazy-loading': props.lazyLoading
    })}
    >
      <RefreshIndicator
        size={40}
        left={10}
        top={0}
        status="loading"
        style={style.refresh}
        className="Loader__refresh"
      />
    </div>
  );
};

export default Loader;
