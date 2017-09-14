import Video from '../models/video.model';

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
  };

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
 * Get all videos
 * @param req
 * @param res
 * @returns void
 */
export const getVideos = (req, res) => {
  // Search term in videoId with insensitive case
  const videoId = req.query['videoId'];
  if (videoId !== undefined) {
    Video.aggregate([
      { $match: { videoId: { $regex: videoId, $options: 'i' } } }
    ], (err, videos) => {
      if (err) {
        return res.send(err);
      }
      res.json(videos);
    });
  } else {
    Video.find((err, videos) => {
      if (err) {
        return res.send(err);
      }
      res.json(videos);
    });
  }
};

export const getVideoss = (req, res) => {
  console.log('req.body', req.body);
  /* if (!req.body.filters) {
      console.log('null');
  } */

  const filters = {
    type: req.body.filters.type,
    'dancers.dancer': req.body.filters.dancers
  };

  const limit = req.body.limit;

  if (req.body.filters.dancers && req.body.filters.dancers.length === 0) {
    delete filters['dancers.dancer'];
  }

  if (req.body.filters.type === '') {
    delete filters.type;
  }

  Video.find(filters, (err, videos) => {
    if (err) {
      return res.send(err);
    }

    if (videos.length === 0) {
      return res.send([]);
    }
    res.json(videos);
  }).limit(limit);
};

/* export function getAssignment(params = {}) {
    const { limit = 10, page, status = STATUS_TABS.BOOKING_REQUEST[0], sort, order } = params;
    return request('get', API_GARAGE('/garage/v1/assignments'), {
        params: {
            limit,
            page,
            status,
            sort,
            order
        }
    })
        .then((res) => {
            const assignments = res.assignments.map(assignment => ({
                ...assignment,
                appointmentDate: formatDate(assignment.appointmentDate),
                createdDate: formatDate(assignment.createdDate),
                estimatedEndDate: formatDate(assignment.estimatedEndDate),
                lastModifiedDate: formatDate(assignment.lastModifiedDate),
                workDoneDate: formatDate(assignment.workDoneDate)
            }));
            return {
                ...res,
                assignments
            };
        });
} */

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

    if (err) {
      res.send({
        code: 'YK_ERR_01',
        message: 'Error: video not found'
      });
    }

    const { videoId, type, song } = req.body;
    video.videoId = videoId;
    video.type = type;
    video.song = song;
    video.save((err) => {
      if (err) {
        return res.send({
          code: 'YK_ERR_02',
          message: 'Error: update has failed'
        });
      }
      res.json({
        video
      });
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
    res.json({message: 'Successfully deleted'});
  });
};
