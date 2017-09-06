import Video  from '../models/video.model';

// middleware to use for all requests
const middleware = (req, res, next) => {
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

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
const rootApi = (req, res) => {
	res.json({ message: 'Welcome to Youkiz api !' });
}

/**
* Create a video
* @param req (Video Object)
* @param res
* @returns void
*/
const createVideo = function (req, res) {
	
	let video = new Video();		// create a new instance of the Video model
	video.videoId = req.body.videoId;  // set the videos name (comes from the request)
	video.type = req.body.type;
	video.song = req.body.song;

	video.save(function(err, video) {
	  if (err)
      res.status(500).send(err);
	
	  res.json(video);
	});
}

/**
* Get all videos
* @param req
* @param res
* @returns void
*/
const getVideos = function(req, res) {
  // Search term in videoId with insensitive case
  var videoId = req.query['videoId'];
  if(videoId !== undefined) {
    Video.aggregate([
      { $match: { videoId: {$regex: videoId, $options : 'i'} } }
    ], function(err, videos) {
      if (err)
        res.send(err);
  
      res.json(videos);
    });    
  } else {
    Video.find(function(err, videos) {
      if (err)
        res.send(err);
  
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
const getVideo = (req, res) => {
	// const { video_id } = req.params;
	// console.log('video_id', video_id);
	Video.findById(req.params.video_id, (err, video) => {
		if (err) {
            res.send({
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
const updateVideo = (req, res) => {
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
                res.send({
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
const deleteVideo = (req, res) => {
	Video.remove({
		_id: req.params.video_id
	}, (err) => {
		if (err) {
            res.send({
                code: "YK_ERR_02",
                message: "Error: Delete has failed"
            });
		}

		res.json({ message: 'Successfully deleted' });
	});
}

module.exports = {
	rootApi,
	middleware,
	getVideos,
	getVideo,
	createVideo,
	updateVideo,
	deleteVideo
};