
import express from 'express';
import { getInventory, addInventory, updateInventory } from '../controllers/inventoryController.js';
import authenticate from '../utils/authenticate.js';

const router = express.Router();

// Get all inventory
router.get('/', authenticate, getInventory);

// Add new inventory
router.post('/', authenticate, addInventory);

// Update existing inventory by ID (if needed later)
router.put('/:id', authenticate, updateInventory);

export default router;
