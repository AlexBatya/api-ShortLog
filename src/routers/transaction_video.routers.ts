import express from 'express';
const router = express.Router(); 

import transactionControllers from '../controllers/transaction_video.controllers';

router.use(async (req: any, res: any, next: any) => {
    next();
})

router
    .route('/videos')
    .get(transactionControllers.chackVideos)
    .post(transactionControllers.addVideo)
    .delete(transactionControllers.deleteVideo)

export default router