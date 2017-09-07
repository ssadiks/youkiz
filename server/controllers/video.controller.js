import Video  from '../models/video.model';

// middleware to use for all requests
export const middleware = (req, res, next) => {
	console.log('Something is happening.');
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	//res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
	//res.header("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept");
	//res.header("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	//res.header("Pragma", "no-cache"); // HTTP 1.0.
	//res.addDateHeader("Expires", 0); // Proxies.
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
    }
	let video = new Video(paramVideo);		// create a new instance of the Video model

	video.save((err, video) => {
	  if (err) {
	      return res.status(500).send(err);
      }
	  res.json(video);
	});
}

/**
* Get all videos
* @param req
* @param res
* @returns void
*/
export const getVideos = (req, res) => {
  // Search term in videoId with insensitive case
  const videoId = req.query['videoId'];
  if(videoId !== undefined) {
    Video.aggregate([
      { $match: { videoId: {$regex: videoId, $options : 'i'} } }
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
}

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
                code: "YK_ERR_01",
                message: "this video doesn't exists"
            });
		}
		res.json(video);
	});
}

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
                code: "YK_ERR_01",
                message: "Error: video not found"
            });
		}

        const { videoId, type, song } = req.body;
        video.videoId = videoId;
        video.type = type;
        video.song = song;
        video.save((err) => {
            if (err) {
                return res.send({
                    code: "YK_ERR_02",
                    message: "Error: update has failed"
                });
			}
            res.json({
                video
            });
        });

    });
}

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
                code: "YK_ERR_02",
                message: "Error: Delete has failed"
            });
		}
        res.json({ message: 'Successfully deleted' });
	});
}
