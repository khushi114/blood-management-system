import Request from '../models/BloodRequest.js';
import User from '../models/User.js'; // Needed to find donors & requester
import sendEmail from '../utils/sendEmail.js';

// 1. Create a blood request
export const createRequest = async (req, res) => {
  try {
    const { bloodGroup, quantity, hospital, contact, reason, userId } = req.body;

    const newRequest = new Request({
      bloodGroup,
      quantity,
      hospital,
      contact,
      reason,
      user: userId,
      status: 'pending',
    });

    await newRequest.save();
    res.status(201).json({ message: 'Blood request created', request: newRequest });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create request', error: error.message });
  }
};

// 2. Get all blood requests
export const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate('user', 'name email');
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch requests', error: error.message });
  }
};

// 3. Delete a blood request
export const deleteRequest = async (req, res) => {
  try {
    await Request.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Request deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete request', error: error.message });
  }
};

// 4. Accept request → notify donors and user
export const acceptRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await Request.findById(requestId).populate('user', 'email name');
    if (!request) return res.status(404).json({ message: 'Request not found' });

    // Update status to 'accepted'
    request.status = 'accepted';
    await request.save();

    // 4a. Notify matching donors
    const matchingDonors = await User.find({ bloodGroup: request.bloodGroup });

    const donorEmails = matchingDonors.map(d => d.email);
    const donorSubject = 'Urgent Blood Donation Needed';
    const donorText = `Urgent! Blood group ${request.bloodGroup} is needed at ${request.hospital}. Please donate if you can.`;

    for (const email of donorEmails) {
      await sendEmail(email, donorSubject, donorText);
    }

    // 4b. Notify requester that blood is available
    const userSubject = 'Blood Group Available';
    const userText = `Hi ${request.user.name}, your requested blood group (${request.bloodGroup}) is now available at ${request.hospital}. Please proceed to the hospital.`;

    await sendEmail(request.user.email, userSubject, userText);

    res.status(200).json({ message: 'Request accepted, emails sent' });

  } catch (error) {
    console.error('acceptRequest error:', error);
    res.status(500).json({ message: 'Failed to accept request', error: error.message });
  }
};

// 5. Reject a request
export const rejectRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await Request.findById(requestId).populate('user', 'email name');
    if (!request) return res.status(404).json({ message: 'Request not found' });

    request.status = 'rejected';
    await request.save();

    const subject = 'Blood Request Rejected';
    const text = `Hi ${request.user.name}, your blood request for ${request.bloodGroup} has been rejected. Please contact support for details.`;

    await sendEmail(request.user.email, subject, text);

    res.status(200).json({ message: 'Request rejected and user notified' });

  } catch (error) {
    console.error('rejectRequest error:', error);
    res.status(500).json({ message: 'Failed to reject request', error: error.message });
  }
};

export const notifyUser = async (req, res) => {
  try {
    const { email, bloodGroup, hospital } = req.body;

    const subject = 'Blood Group Available';
    const text = `Your requested blood group (${bloodGroup}) is now available at ${hospital}. Please proceed to the hospital.`;

    await sendEmail(email, subject, text);

    res.status(200).json({ message: 'User notified successfully' });
  } catch (error) {
    console.error('notifyUser error:', error);
    res.status(500).json({ message: 'Failed to notify user', error: error.message });
  }
};