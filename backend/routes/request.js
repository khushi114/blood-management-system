import express from 'express';
import { createRequest, getAllRequests, deleteRequest, sendNotifications } from '../controllers/requestController.js';

const router = express.Router();

router.post('/', createRequest);
router.get('/', getAllRequests);
router.delete('/:id', deleteRequest);

// If you want an endpoint to manually send notifications (optional)
router.post('/notify', async (req, res) => {
  try {
    await sendNotifications(req.body); // expects request data in body
    res.status(200).json({ message: 'Notifications sent' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send notifications' });
  }
});

export default router;
