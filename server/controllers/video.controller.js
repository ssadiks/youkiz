//Import Video Model
var Video     = require('../models/video.model');

// middleware to use for all requests
var middleware = function (req, res, next) {
	// do logging
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
var rootApi = function (req, res) {
	res.json({ message: 'Welcome to Youkiz api !' });
}

/**
* Create a video
* @param req (Video Object)
* @param res
* @returns void
*/
var createVideo = function (req, res) {
	
	var video = new Video();		// create a new instance of the Video model
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
var getVideos = function(req, res) {
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
var getVideo = function (req, res) {
	console.log('req', req);
	Video.findById(req.params.video_id, function(err, video) {
		if (err)
			res.send(err);
		res.json(video);
	});
}

/**
* Update Video
* @param req (Video object)
* @param res
* @returns void
*/
var updateVideo = function (req, res) {
	Video.findById(req.params.video_id, function(err, video) {

		if (err)
			res.send(err);

		video.videoId = req.body.videoId;
		video.type = req.body.type;
		video.song = req.body.song;
		video.comments = req.body.comments;
		video.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Video updated!' });
		});

	});
}


/**
* Delete Video
* @param req
* @param res
* @returns void
*/
var deleteVideo = function (req, res) {
	Video.remove({
		_id: req.params.video_id
	}, function(err, video) {
		if (err)
			res.send(err);

		res.json({ message: 'Successfully deleted' });
	});
}
  

/**
* Create Comment
* @param req (Array of Comment Object or Comment Object)
* @param res
* @returns void
*/
var createComment = function (req, res) {
  Video.findById(req.params.video_id, function(err, video) {
	function insertComment(element) {
		if(element.name === undefined)
			return res.json({message: "Error : Waiting for a Comment Object"});
		
		video.comments.push(element);
	}
	if(video) {
		console.log(req.body)
		// Check if Video is an array of object are just an object
		if(Array.isArray(req.body)) {
			(req.body).forEach(insertComment);
		} else {
			if(req.body.name === undefined)
				return res.json({message: "Error : Waiting for a Comment Object"});
			
			video.comments.push(req.body);
		}				
		video.save(function(err) {
		  if (err)
        res.send(err);
		res.json(video);
	  });
	} else {
	  res.json({ message: 'Video doesn\'t exists' });
	}
	  });	
}
    
/**
* Get Comment
* @param req
* @param res
* @returns Comment
*/
var getComment = function (req, res) {
	Video.findOne({'comments._id' : req.params.comment_id}, {'comments.$': 1}, function(err, video) {
  if(video) {
	if (err)
	  res.send(err);
	res.json(video.comments);
  } else {
	res.json({ message: 'Comment doesn\'t exists' });
  }
	});
}
  
/**
* Delete Comment
* @param req
* @param res
* @returns void
*/ 
var deleteComment = function (req, res) {
  Video.update(
	{"_id" : req.params.video_id},
	{ $pull : {"comments" : {"_id" : req.params.comment_id } } },
	function(err, val) {
		if (err)
			res.send(err);
		  res.json({ message: 'Comment deleted' });
	}
  )
}
  
/**
* Update Comment
* @param req (Object Comment)
* @param res
* @returns void
*/
var updateComment = function (req, res) {
	// If name is undefined
	if(req.body.name === undefined)
		return res.json({ message: 'Error : Waiting for a Comment Object' });
		
	Video.update(
	  {"_id": req.params.video_id, "comments._id" : req.params.comment_id},
	  { $set : {
		"comments.$.name" : req.body.name,
		"comments.$.message" : req.body.message,
		"comments.$.date_com" : req.body.date_com,
	  }},
	  function(err, val) {
		if (err)
			res.send(err);
		  res.json({ message: 'Comment updated' });
	  }
	)
}

module.exports = {
	rootApi,
	middleware,
	getVideos,
	getVideo,
	createVideo,
	updateVideo,
	deleteVideo,
	createComment,
	getComment,
	updateComment,
	deleteComment
};