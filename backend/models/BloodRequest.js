// backend/models/Request.js
import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  bloodGroup: { type: String, required: true },
  quantity: { type: Number, required: true },
  hospital: { type: String, required: true },
  contact: { type: String, required: true },
  reason: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // link to user who made the request
}, {
  timestamps: true
});

const Request = mongoose.model('BloodRequest', requestSchema);

export default Request;
