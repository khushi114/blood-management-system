import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'], trim: true },
  date: { type: Date, required: [true, 'Date is required'] },
  location: { type: String, required: [true, 'Location is required'], trim: true },
  description: { type: String, required: [true, 'Description is required'], trim: true },
  status: { 
    type: String, 
    enum: ['upcoming', 'running'], 
    default: 'upcoming',
    required: true
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Campaign', campaignSchema);