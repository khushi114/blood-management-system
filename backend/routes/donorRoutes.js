import express from 'express';
import { getDonors, addDonor } from '../controllers/donorController.js';

const router = express.Router();

router.get('/', getDonors);
router.post('/', addDonor);

export default router;