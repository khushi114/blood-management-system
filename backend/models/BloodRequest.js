import mongoose from 'mongoose';

const bloodRequestSchema = new mongoose.Schema({
  bloodGroup: { type: String, required: true },
  quantity: { type: Number, required: true },
  hospital: { type: String, required: true },
  contact: { type: String, required: true },
  reason: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, default: 'pending' }
}, { timestamps: true });

export default mongoose.model('BloodRequest', bloodRequestSchema);
