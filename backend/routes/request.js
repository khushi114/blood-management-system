// import express from 'express';
// import {
//   createRequest,
//   getAllRequests,
//   deleteRequest,
//   acceptRequest,
//   rejectRequest,
//   notifyUser
// } from '../controllers/requestController.js';

// const router = express.Router();

// router.post('/', createRequest);
// router.get('/', getAllRequests);
// router.delete('/:id', deleteRequest);

// // Admin accepts a request (notify donors + user)
// router.put('/:requestId/accept', acceptRequest);

// // Admin rejects a request (notify user)
// router.put('/:requestId/reject', rejectRequest);

// router.post('/notify-user', notifyUser);

// export default router;


import express from 'express';
import { createRequest, getAllRequests, deleteRequest, acceptRequest, rejectRequest, notifyUser } from '../controllers/requestController.js';

import { authMiddleware as protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createRequest);
router.get('/', getAllRequests);
router.delete('/:id', deleteRequest);
router.put('/:requestId/accept', protect, acceptRequest);
router.put('/:requestId/reject', protect, rejectRequest);

// ✅ Add this route to fix 404 error
router.post('/notify-user', notifyUser);

export default router;
