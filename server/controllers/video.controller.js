import Video from '../models/video.model';
import Dancer from '../models/dancer.model';

// middleware to use for all requests
export const middleware = (req, res, next) => {
  console.log('Something is happening.');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  // res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // res.header('Access-Control-Allow-Headers', 'Authorization, Access-Control-Allow-Origin,
  // Origin, X-Requested-With, Content-Type, Accept');
  // res.header('Cache-Control', 'no-cache, no-store, must-revalidate'); // HTTP 1.1.
  // res.header('Pragma', 'no-cache'); // HTTP 1.0.
  // res.addDateHeader('Expires', 0); // Proxies.
  next();
}

// test route to make sure everything is working (accessed at GET http://localhost:3030/api)
export const rootApi = (req, res) => {
  res.json({ message: 'Welcome to Youkiz api !' });
}

/**
 * Create a video
 * @param req (Video Object)
 * @param res
 * @returns void
 */
export const createVideo = (req, res) => {

  const paramVideo = {
    videoId: req.body.videoId,
    type: req.body.type,
    song: req.body.song,
    dancers: req.body.dancers,
    online: true
  };

  console.log('paramVideo', paramVideo);

  const video = new Video(paramVideo);

  video.save((err, video) => {
    if (err && err.code === 11000) {
      return res.send({
        code: 'YK_ERR_03',
        message: 'This video already exists'
      });
    }
    res.json(video);
  });
};

/**
 * Get offline videos
 * @param req
 * @param res
 * @returns void
 */
export const getOfflineVideos = (req, res) => {
  Video.find({ online: false }, (err, videos) => {
    if (err) {
      return res.send(err);
    }

    return res.json(videos);
  }).sort({ name: 1 });
};

/**
 * Get videos by filters
 * @param req
 * @param res
 * @returns void
 */
export const getVideos = (req, res) => {
  // console.log('req.body m', req.body.filters);

  let filters = null;

  if (req.body.filters) {
    filters = {
      $and: [
        { type: req.body.filters.type },
        { online: req.body.filters.online },
        ...req.body.filters.dancers.map(dancer => ({ 'dancers.name': dancer }))
      ]
    };

    if (req.body.filters.dancers && req.body.filters.dancers.length === 0) {
      delete filters['dancers.name'];
    }

    if (req.body.filters.type === '') {
      filters.$and = filters.$and.filter(item => item.type === undefined);
    }
  }

  const limit = req.body.limit ? req.body.limit : '';
  const skipped = (req.body.page - 1) * limit;

  Video.find(filters || { online: true }, (err, videos) => {
    if (err) {
      return res.send(err);
    }

    res.json(videos.map(video => Object.assign(video, { _id: (video._id).toString() })));
  }).skip(skipped).limit(limit);
};

/**
 * Get a video
 * @param req
 * @param res
 * @returns video
 */
export const getVideo = (req, res) => {
  // const { video_id } = req.params;
  // console.log('video_id', video_id);
  Video.findById(req.params.video_id, (err, video) => {
    if (err) {
      return res.send({
        code: 'YK_ERR_01',
        message: 'this video doesn\'t exists'
      });
    }
    res.json(video);
  });
};

/**
 * Update Video
 * @param req (Video object)
 * @param res
 * @returns void
 */
export const updateVideo = (req, res) => {
  const { video_id } = req.params;
  Video.findById(video_id, (err, video) => {

    // console.log('req.body', req.body);

    if (err) {
      res.send({
        code: 'YK_ERR_01',
        message: 'Error: video not found'
      });
    }

    const { videoId, type, song, dancers, online } = req.body;
    Object.assign(video, { videoId, type, song, dancers, online });
    video.save((err) => {
      if (err) {
        return res.send({
          code: 'YK_ERR_02',
          message: 'Error: update has failed'
        });
      }
      res.json(video);
    });

  });
};

/**
 * Delete Video
 * @param req
 * @param res
 * @returns void
 */
export const deleteVideo = (req, res) => {
  Video.remove({
    _id: req.params.video_id
  }, (err) => {
    if (err) {
      return res.send({
        code: 'YK_ERR_02',
        message: 'Error: Delete has failed'
      });
    }
    res.json({ message: 'Successfully deleted', id: req.params.video_id });
  });
};

/**
 * Get all videos
 * @param req
 * @param res
 * @returns void
 */
export const getDancers = (req, res) => {
  Dancer.find({}, (err, dancers) => {
    if (err) {
      return res.send(err);
    }

    return res.json(dancers);
  }).sort({ name: 1 });
};

/**
 * Create a dancer
 * @param req (Dancer Object)
 * @param res
 * @returns void
 */
export const createDancer = (req, res) => {
  const paramDancer = {
    gender: req.body.gender,
    name: req.body.name,
  };

  const dancer = new Dancer(paramDancer);

  dancer.save((err, dancer) => {
    if (err && err.code === 11000) {
      return res.send({
        code: 'YK_ERR_03',
        message: 'This dancer already exists'
      });
    }

    return res.json(dancer);
    // getDancers(req, res);
  });
};

/**
 * Get a dancer
 * @param req
 * @param res
 * @returns dancer
 */
export const getDancer = (req, res) => {
  Dancer.findById(req.params.dancer_id, (err, dancer) => {
    if (err) {
      return res.send({
        code: 'YK_ERR_01',
        message: 'this dancer doesn\'t exists'
      });
    }

    res.json(dancer);
  });
};

/**
 * Update Dancer
 * @param req (Dancer object)
 * @param res
 * @returns void
 */
export const updateDancer = (req, res) => {
  const { dancer_id } = req.params;
  Dancer.findById(dancer_id, (err, dancer) => {

    if (err) {
      res.send({
        code: 'YK_ERR_01',
        message: 'Error: video not found'
      });
    }

    const { gender, name } = req.body;
    Object.assign(dancer, { gender, name });
    dancer.save((err) => {
      if (err) {
        return res.send({
          code: 'YK_ERR_02',
          message: 'Error: update has failed'
        });
      }
      res.json(dancer);
    });

  });
};

/**
 * Delete Dancer
 * @param req
 * @param res
 * @returns void
 */
export const deleteDancer = (req, res) => {
  Dancer.remove({
    _id: req.params.dancer_id
  }, (err) => {
    if (err) {
      return res.send({
        code: 'YK_ERR_02',
        message: 'Error: Delete has failed'
      });
    }

    res.json({ message: 'Successfully deleted', id: req.params.dancer_id });
  });
};
