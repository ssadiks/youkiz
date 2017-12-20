import React from 'react';
import { connect } from 'react-redux';
import {
  fetchVideosAction,
  updateVideosLoaded,
  updateVideosParams
} from '../../../redux/actions/index';

function LazyLoadingHOC(WrappedComponent) {
  class LazyLoadingComponent extends React.Component {
    componentDidMount() {
      window.addEventListener('scroll', this.onScroll, false);
      if (!this.props.lazyLoadingDisabled) {
        this.props.fetchVideosAction(this.props.params);
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
        !this.props.lazyLoadingDisabled && !this.props.isPending) {
        const nextPage = this.props.params.page + 1;
        const params = {
          ...this.props.params,
          page: nextPage
        };
        this.props.updateVideosParams(params);

        this.props.fetchVideosAction(this.props.params).then((res) => {
          // update store if all videos are loaded
          if ((res.data).length < this.props.params.limit) {
            this.props.toggleLazyLoading();
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
    lazyLoadingDisabled: state.lazyLoadingReducer.lazyLoadingDisabled,
    params: state.lazyLoadingReducer.params
  });

  return connect(mapStateToProps,
    { fetchVideosAction, updateVideosLoaded, updateVideosParams })(LazyLoadingComponent);
}

export default LazyLoadingHOC;
