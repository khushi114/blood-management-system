import express from 'express';
import { getInventory, updateInventory } from '../controllers/inventoryController.js';
import authenticate from '../utils/authenticate.js';

const router = express.Router();
router.get('/', authenticate, getInventory);
router.post('/', authenticate, updateInventory);

export default router;
