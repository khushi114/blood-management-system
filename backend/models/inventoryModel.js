import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  bloodGroup: { type: String, required: true },
  quantity: { type: Number, required: true },
  expiryDate: { type: Date }
});

export default mongoose.model('Inventory', inventorySchema);
