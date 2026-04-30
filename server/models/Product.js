const mongoose = require('mongoose');

/**
 * Product Schema for healthcare equipment/services
 */
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a product name'],
            trim: true,
            maxlength: [200, 'Product name cannot exceed 200 characters'],
        },
        description: {
            type: String,
            required: [true, 'Please provide a description'],
            maxlength: [5000, 'Description cannot exceed 5000 characters'],
        },
        category: {
            type: String,
            required: [true, 'Please provide a category'],
            enum: ['CSSD', 'Modular OT', 'Skill Labs', 'Pneumatic System', 'Other'],
        },
        image: {
            url: {
                type: String,
                required: [true, 'Please provide an image URL'],
            },
            publicId: {
                type: String,
                required: [true, 'Please provide a Cloudinary public ID'],
            },
        },
        specifications: [
            {
                key: {
                    type: String,
                    required: true,
                },
                value: {
                    type: String,
                    required: true,
                },
            },
        ],
        isActive: {
            type: Boolean,
            default: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

/**
 * Index for search functionality
 */
productSchema.index({ name: 'text', description: 'text', category: 1 });

module.exports = mongoose.model('Product', productSchema);
