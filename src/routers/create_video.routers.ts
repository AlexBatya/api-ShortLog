import express from 'express';
const router = express.Router();

import createVideoControllers from '../controllers/create_video.controllers';

// router.use(async (req: any, res: any, next: any) => {
//     next()
// })

router
    .route('/videos')
    .post(createVideoControllers.createAllVideos)
    
export default router