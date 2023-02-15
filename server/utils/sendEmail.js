import nodemailer from "nodemailer";

const sendEmail = async (email, subject, text, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      auth: {
        user: "apikey",
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_EMAIL,
      to: email,
      subject,
      text,
      html,
    });
  } catch (err) {
    console.log(err);
  }
};

export default sendEmail;
