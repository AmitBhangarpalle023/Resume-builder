const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // or 'STARTTLS'
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

app.post('/send-cv', (req, res) => {
  const cvHtml = req.body.cvHtml;
  const email = req.body.email;

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Generated CV',
    html: cvHtml
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
    res.send('Email sent successfully!');
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});