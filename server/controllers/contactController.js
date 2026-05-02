const ContactRequest = require('../models/ContactRequest');
const { sendSuccess, sendError } = require('../utils/apiResponse');
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

        const {
            inquiryType = 'customer',
            name,
            email,
            phone,
            reason,
            applyingFor,
        } = req.body;

        // Create new contact request
        const contactRequest = new ContactRequest({
            inquiryType,
            name,
            email,
            phone,
            applyingFor,
            reason,
        });

        await contactRequest.save();

        sendSuccess(res, 201, 'Contact request submitted successfully', {
            id: contactRequest._id,
            message: 'Your request has been saved successfully. We will get back to you soon.',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    submitContact,
};
