import React from 'react';
import { connect } from 'react-redux';
import {
  fetchVideosAction,
  updateVideosLoaded
} from '../../../redux/actions/index';
import { paramsVideos } from '../../../constants';

function LazyLoadingHOC(WrappedComponent) {
  class LazyLoadingComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = ({
        params: paramsVideos
      });
    }
    componentDidMount() {
      window.addEventListener('scroll', this.onScroll, false);
      if (!this.props.allVideosLoaded) {
        this.props.fetchVideosAction(this.state.params);
      }
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll, false);
    }

    /**
     * if scroll is at the bottom and there are others videos to upload and isPending is false
     * call next page
     */
    onScroll = () => {
      if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
        !this.props.allVideosLoaded > 0 && !this.props.isPending) {
        const nextPage = this.state.params.page + 1;
        this.setState({
          params: {
            ...this.state.params,
            page: nextPage
          }
        });

        this.props.fetchVideosAction(this.state.params).then((res) => {
          // update store if all videos are loaded
          if ((res.data).length < this.state.params.limit) {
            this.props.updateVideosLoaded();
          }
        });
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    isPending: state.videosReducer.isPending,
    allVideosLoaded: state.lazyLoadingReducer.allVideosLoaded
  });

  return connect(mapStateToProps, { fetchVideosAction, updateVideosLoaded })(LazyLoadingComponent);
}

export default LazyLoadingHOC;
