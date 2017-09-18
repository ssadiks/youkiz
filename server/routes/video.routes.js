import express from 'express';
import * as VideoController from './../controllers/video.controller';

const router = express.Router();


// middleware to use for all requests
router.use(VideoController.middleware);

// Get message on Root Api
router.route('/').get(VideoController.rootApi);

router.route('/videos').post(VideoController.getVideos);
router.route('/videos/create').post(VideoController.createVideo);
router.route('/videos/:video_id').get(VideoController.getVideo);
router.route('/videos/:video_id').put(VideoController.updateVideo);
router.route('/videos/:video_id').delete(VideoController.deleteVideo);

router.route('/dancers').post(VideoController.createDancer);
router.route('/dancers').get(VideoController.getDancers);
router.route('/dancers/:dancer_id').get(VideoController.getDancer);
router.route('/dancers/:dancer_id').put(VideoController.updateDancer);
router.route('/dancers/:dancer_id').delete(VideoController.deleteDancer);

export default router;
