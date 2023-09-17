import express from 'express';
import transactionRoutes from './routers/transaction_video.routers'
import createVideoRoutes from './routers/create_video.routers';

const router = express.Router();

router.use('/transaction', transactionRoutes)
router.use('/create', createVideoRoutes)

export default router