import mongoose from 'mongoose';

const donorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  bloodType: {
    type: String,
    required: [true, 'Blood type is required'],
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
  },
  lastDonation: {
    type: Date,
    required: [true, 'Last donation date is required'],
  },
  firstDonation: {
    type: Date,
    required: [true, 'First donation date is required'],
  },
  numberOfDonations: {
    type: Number,
    required: [true, 'Number of donations is required'],
    min: [1, 'Number of donations must be at least 1'],
  },
}, {
  timestamps: true,
});

export default mongoose.model('Donor', donorSchema);