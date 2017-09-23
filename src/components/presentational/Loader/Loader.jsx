import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const Loader = () => {
  const style = {
    refresh: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }
  };

  return (
    <div className="Loader">
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
