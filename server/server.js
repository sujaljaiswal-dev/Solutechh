require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');

// Connect to database
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/admin');

// Import middleware
const errorHandler = require('./middleware/errorHandler');

// Initialize Express app
const app = express();

app.set('trust proxy', 1);

// Connect to MongoDB
connectDB();

// Security Middleware
app.use(helmet());
app.use(mongoSanitize());

// CORS Configuration
app.use(
    cors({
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        credentials: true,
    })
);

// Body Parser Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Request logging (optional - for development)
if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.path}`);
        next();
    });
}

// Routes
/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
    res.json({ success: true, message: 'Server is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

/**
 * 404 Not Found
 */
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});

// Global Error Handler (must be last)
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`
    ╔════════════════════════════════════════╗
    ║   Solutechh API Server Started        ║
    ║   Environment: ${process.env.NODE_ENV || 'development'}         ║
    ║   Port: ${PORT}                            ║
    ╚════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    server.close(() => process.exit(1));
});

module.exports = app;
