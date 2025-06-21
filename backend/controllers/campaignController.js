import Campaign from '../models/campaign.js';

export const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ date: 1 });
    res.status(200).json(campaigns);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ message: 'Failed to fetch campaigns', error: error.message });
  }
};

export const addCampaign = async (req, res) => {
  try {
    const { title, date, location, description, status } = req.body;
    const campaign = new Campaign({
      title,
      date,
      location,
      description,
      status,
      createdBy: req.user.id
    });
    await campaign.save();
    res.status(201).json(campaign);
  } catch (error) {
    console.error('Error adding campaign:', error);
    res.status(400).json({ message: 'Failed to add campaign', error: error.message });
  }
};