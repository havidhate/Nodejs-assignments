require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

// Create transporter object
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // App password
  },
});

// /sendemail route
app.get("/sendemail", async (req, res) => {
  try {
    const info = await transporter.sendMail({
      from: `"Masai NEM Student" <${process.env.EMAIL_USER}>`,
      to: `${process.env.EMAIL_USER}, venugopal.burli@masaischool.com`,
      subject: "Testing Mail from NEM Student",
      text: "This is a testing Mail sent by NEM student, no need to reply.",
    });

    res.status(200).send("Email sent successfully! ✔️");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send email ❌");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
