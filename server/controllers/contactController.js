const ContactRequest = require('../models/ContactRequest');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { sendEmail, generateContactNotificationEmail } = require('../utils/sendEmail');
const { validationResult } = require('express-validator');

/**
 * @desc Submit a contact form
 * @route POST /api/contact
 * @access Public
 */
const submitContact = async (req, res, next) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendError(res, 400, errors.array()[0].msg);
        }

        const { name, email, phone, reason } = req.body;

        // Create new contact request
        const contactRequest = new ContactRequest({
            name,
            email,
            phone,
            reason,
        });

        await contactRequest.save();

        // Send email notification to admin
        try {
            const emailTemplate = generateContactNotificationEmail({
                name,
                email,
                phone,
                reason,
            });

            await sendEmail(
                process.env.ADMIN_EMAIL,
                `New Contact Request from ${name}`,
                emailTemplate
            );
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // Don't fail the contact submission if email fails
        }

        sendSuccess(res, 201, 'Contact request submitted successfully', {
            id: contactRequest._id,
            message: 'We have received your message and will get back to you soon.',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    submitContact,
};
