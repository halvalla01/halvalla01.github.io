const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// POST endpoint to handle form submission
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Configure your email transport
    let transporter = nodemailer.createTransport({
        service: 'gmail', // or your email provider
        auth: {
            user: 'your.email@gmail.com', // replace with your email
            pass: 'yourpassword' // replace with your email password or app password
        }
    });

    // Email options
    let mailOptions = {
        from: email,
        to: 'your.email@gmail.com', // replace with your email
        subject: `Contact Form Submission from ${name}`,
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send email.', error });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});