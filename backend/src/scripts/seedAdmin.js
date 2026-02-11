require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/database');

const seedAdmin = async () => {
  try {
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('✓ Admin already exists!');
      process.exit(0);
    }

    // Create default admin
    const admin = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'Admin@123', // Change this after first login
      role: 'admin',
    });

    await admin.save();
    console.log('✓ Admin account created successfully!');
    console.log('Email: admin@example.com');
    console.log('Password: Admin@123');
    console.log('\n⚠️  Please change the password after your first login!');

    process.exit(0);
  } catch (error) {
    console.error('✗ Error creating admin:', error.message);
    process.exit(1);
  }
};

seedAdmin();
