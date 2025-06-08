import BloodRequest from '../models/BloodRequest.js';

export const createRequest = async (req, res) => {
  try {
    const newRequest = new BloodRequest(req.body);
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err) {
    console.error("Error in createRequest:", err);
    res.status(500).json({ message: err.message || 'Failed to save request' });
  }
};
