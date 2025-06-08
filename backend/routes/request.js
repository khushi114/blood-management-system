// backend/routes/request.js
import express from 'express';
import { createRequest, getAllRequests, deleteRequest } from '../controllers/requestController.js';

const router = express.Router();

router.post('/', createRequest);
router.get('/', getAllRequests);
router.delete('/:id', deleteRequest);

export default router;
