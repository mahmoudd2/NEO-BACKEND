const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_SECURE).toLowerCase() === 'true', // true for 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// quick self-test on boot (won't crash app)
transporter.verify().then(
  () => console.log('📧 Mailer ready'),
  (err) => console.warn('📧 Mailer not ready:', err.message)
);

async function sendMail({ to, subject, text, html, from }) {
  return transporter.sendMail({
    from: from || process.env.EMAIL_FROM,
    to,
    subject,
    text,
    html
  });
}

module.exports = { sendMail };
