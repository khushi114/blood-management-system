// backend/controllers/inventoryController.js
import Inventory from '../models/inventoryModel.js';

// Get all inventory data
export const getInventory = async (req, res) => {
  try {
    const allData = await Inventory.find();
    res.json(allData);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
};

// Add new inventory entry
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

// Update inventory entry by ID
export const updateInventory = async (req, res) => {
  const { id } = req.params;
  const { bloodGroup, quantity, expiryDate } = req.body;

  try {
    const updatedEntry = await Inventory.findByIdAndUpdate(
      id,
      { bloodGroup, quantity, expiryDate },
      { new: true } // return the updated document
    );

    if (!updatedEntry) {
      return res.status(404).json({ message: 'Inventory entry not found' });
    }

    res.json(updatedEntry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update inventory' });
  }
};
