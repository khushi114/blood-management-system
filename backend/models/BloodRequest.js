
import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  bloodGroup: { type: String, required: true },
  quantity: { type: Number, required: true },
  hospital: { type: String, required: true },
  contact: { type: String, required: true },
  reason: { type: String, required: true },

  user: { // link to user who made the request
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  }

}, {
  timestamps: true
});

const Request = mongoose.model('BloodRequest', requestSchema);

export default Request;
