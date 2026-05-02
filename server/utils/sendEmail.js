const nodemailer = require('nodemailer');

/**
 * Send email notification
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} htmlContent - HTML email content
 * @returns {Promise<void>}
 */
const sendEmail = async (to, subject, htmlContent) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,           // ✅ Changed from 465 to 587
      secure: false,       // ✅ Changed from true to false (587 uses TLS not SSL)
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false  // ✅ Added this (fixes Render SSL issues)
      }
    });

    const mailOptions = {
      from: `"Solutechh Website" <${process.env.EMAIL_USER}>`,  // ✅ Nicer sender name
      to: to,
      subject: subject,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(`Error sending email: ${error.message}`);
    throw new Error(`Email sending failed: ${error.message}`);
  }
};

/**
 * Generate contact notification email template
 * @param {Object} contactData - Contact request data
 * @returns {string} - HTML email template
 */
const generateContactNotificationEmail = (contactData) => {
  const inquiryLabel =
    contactData.inquiryType === 'career'
      ? 'Career Opportunity'
      : 'Customer Inquiry';

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1DB9AE; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; }
          .field { margin: 15px 0; }
          .label { font-weight: bold; color: #1DB9AE; }
          .value { margin-top: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New ${inquiryLabel}</h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Type:</div>
              <div class="value">${inquiryLabel}</div>
            </div>
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${contactData.name}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${contactData.email}">${contactData.email}</a></div>
            </div>
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value">${contactData.phone}</div>
            </div>
            ${contactData.applyingFor ? `
            <div class="field">
              <div class="label">Applying For:</div>
              <div class="value">${contactData.applyingFor}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Message:</div>
              <div class="value">${contactData.reason}</div>
            </div>
            <div class="field" style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
              <p style="color: #999; font-size: 12px;">
                This email was generated automatically. Please log in to your admin dashboard to respond.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};

module.exports = {
  sendEmail,
  generateContactNotificationEmail,
};