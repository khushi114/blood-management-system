// controllers/inventoryController.js
import Inventory from '../models/inventoryModel.js';

export const getInventory = async (req, res) => {
  try {
    const allData = await Inventory.find();
    res.json(allData);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
};

export const addInventory = async (req, res) => {
  const { bloodGroup, quantity, expiryDate } = req.body;
  try {
    const newEntry = new Inventory({ bloodGroup, quantity, expiryDate });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add inventory' });
  }
};
