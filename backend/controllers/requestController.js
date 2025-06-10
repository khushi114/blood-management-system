// backend/controllers/requestController.js
import Request from '../models/BloodRequest.js';
import User from '../models/User.js';
import nodemailer from 'nodemailer';

// Create a new blood request
export const createRequest = async (req, res) => {
  try {
    const newRequest = new Request(req.body);
    await newRequest.save();

    // Send notifications after request creation
    await sendNotifications(newRequest);

    res.status(201).json({ message: 'Request created successfully', request: newRequest });
  } catch (error) {
    res.status(500).json({ message: 'Error creating request', error: error.message });
  }
};

// Get all blood requests (admin)
export const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching requests', error: error.message });
  }
};

// Delete a request by ID
export const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    await Request.findByIdAndDelete(id);
    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting request', error: error.message });
  }
};

// Send email notifications to donors/admin when a new blood request is created
export const sendNotifications = async (request) => {
  try {
    // Find all users with role 'donor' or 'admin' - modify according to your user model
    const usersToNotify = await User.find({ role: { $in: ['donor', 'admin'] } });

    if (usersToNotify.length === 0) return;

    // Setup nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Compose emails
    const emailPromises = usersToNotify.map(user => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'New Blood Request Notification',
        text: `
Hello ${user.name},

A new blood request has been created.

Details:
- Blood Group: ${request.bloodGroup}
- Quantity: ${request.quantity}
- Needed By: ${request.neededBy}
- Location: ${request.location}

Please respond if you can help.

Thank you,
Blood Management Team
        `,
      };

      return transporter.sendMail(mailOptions);
    });

    await Promise.all(emailPromises);
    console.log('Notification emails sent successfully.');
  } catch (error) {
    console.error('Failed to send notification emails:', error);
  }
};
