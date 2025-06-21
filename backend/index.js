import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js'; // ✅ Include .js
import inventoryRoutes from './routes/inventory.js';
import requestRoutes from './routes/request.js';
import donorRoutes from './routes/donorRoutes.js'; 
import campaignRoutes from './routes/campaignRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// app.use(cors());
app.use(cors({
  origin: ['http://localhost:5173'], // frontend address
  credentials: true
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api', authRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/donors', donorRoutes); 
app.use('/api/campaigns', campaignRoutes);
// Default route
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
