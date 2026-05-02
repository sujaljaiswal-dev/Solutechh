require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/db');

/**
 * Seed database with initial admin user and sample data
 */
const seedDatabase = async () => {
    try {
        // Connect to database
        await connectDB();

        console.log('🌱 Seeding database...');

        // Clear existing users
        await User.deleteMany({});
        console.log('✓ Cleared existing users');

        // Create admin user
        const adminUser = await User.create({
            name: 'Admin',
            email: 'rameshmaurya@gmail.com',
            password: 'Solutechh@1234',
            role: 'admin',
            isVerified: true,
        });

        console.log('✓ Admin user created');
        console.log('  Email: rameshmaurya@gmail.com');
        console.log('  Password: Solutechh@1234');

        // Create test user
        const testUser = await User.create({
            name: 'Test User',
            email: 'user@example.com',
            password: 'User@123456',
            role: 'user',
            isVerified: true,
        });

        console.log('✓ Test user created');
        console.log('  Email: user@example.com');
        console.log('  Password: User@123456');

        console.log('\n✅ Database seeded successfully!');
        console.log('\n📝 Next steps:');
        console.log('   1. Update .env with your MongoDB URI');
        console.log('   2. Configure Cloudinary credentials in .env');
        console.log('   3. Set up email configuration in .env');
        console.log('   4. Run: npm run dev');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error.message);
        process.exit(1);
    }
};

// Run seed
seedDatabase();
