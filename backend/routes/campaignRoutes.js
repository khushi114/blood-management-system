import express from 'express';
import { getCampaigns, addCampaign } from '../controllers/campaignController.js';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getCampaigns);
router.post('/', authMiddleware, isAdmin, addCampaign);

export default router;