import express from 'express';
import * as VideoController from './../controllers/video.controller';

const router = express.Router();


// middleware to use for all requests
router.use(VideoController.middleware);

// Get message on Root Api
router.route('/').get(VideoController.rootApi);

router.route('/videos').get(VideoController.getVideos);
router.route('/videos').post(VideoController.createVideo);
router.route('/videos/:video_id').get(VideoController.getVideo);
router.route('/videos/:video_id').put(VideoController.updateVideo);
router.route('/videos/:video_id').delete(VideoController.deleteVideo);

export default router;
