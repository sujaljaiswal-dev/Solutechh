const mongoose = require('mongoose');

/**
 * Contact Request Schema for form submissions
 */
const contactRequestSchema = new mongoose.Schema(
    {
        inquiryType: {
            type: String,
            enum: ['customer', 'career'],
            default: 'customer',
        },
        name: {
            type: String,
            required: [true, 'Please provide your name'],
            trim: true,
            maxlength: [100, 'Name cannot exceed 100 characters'],
        },
        email: {
            type: String,
            required: [true, 'Please provide your email'],
            lowercase: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email',
            ],
        },
        phone: {
            type: String,
            required: [true, 'Please provide a phone number'],
            match: [/^[\d\s\-\+\(\)]+$/, 'Please provide a valid phone number'],
        },
        applyingFor: {
            type: String,
            trim: true,
            maxlength: [100, 'Position cannot exceed 100 characters'],
        },
        reason: {
            type: String,
            required: [true, 'Please provide a reason for contact'],
            maxlength: [2000, 'Reason cannot exceed 2000 characters'],
        },
        status: {
            type: String,
            enum: ['new', 'read', 'responded'],
            default: 'new',
        },
        notes: {
            type: String,
            maxlength: [1000, 'Notes cannot exceed 1000 characters'],
        },
        respondedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('ContactRequest', contactRequestSchema);
