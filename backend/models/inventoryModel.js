import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  bloodGroup: { type: String, enum: ['A+','A-','B+','B-','AB+','AB-','O+','O-'], required: true },
  quantity: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model('Inventory', inventorySchema);
