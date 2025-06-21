import Donor from '../models/donor.js';

export const getDonors = async (req, res) => {
  try {
    const donors = await Donor.find().sort({ createdAt: -1 });
    res.status(200).json(donors);
  } catch (error) {
    console.error('Error fetching donors:', error);
    res.status(500).json({ message: 'Failed to fetch donors', error: error.message });
  }
};

export const addDonor = async (req, res) => {
  try {
    console.log('Received donor data:', req.body);
    const { name, bloodType, lastDonation, firstDonation, numberOfDonations } = req.body;

    if (!name || !bloodType || !lastDonation || !firstDonation || !numberOfDonations) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newDonor = new Donor({
      name,
      bloodType,
      lastDonation: new Date(lastDonation),
      firstDonation: new Date(firstDonation),
      numberOfDonations: parseInt(numberOfDonations),
    });

    await newDonor.save();
    console.log('Donor saved:', newDonor);
    res.status(201).json({ message: 'Donor added successfully', donor: newDonor });
  } catch (error) {
    console.error('Error adding donor:', error);
    res.status(400).json({ message: 'Failed to add donor', error: error.message });
  }
};