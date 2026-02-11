require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/database');

const checkAdmin = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();

    console.log('Checking for admin user...');
    const admin = await User.findOne({ email: 'admin@example.com' });

    if (admin) {
      console.log('✓ Admin found in database:');
      console.log('  Email:', admin.email);
      console.log('  Role:', admin.role);
      console.log('  Password hash exists:', !!admin.password);
    } else {
      console.log('✗ Admin NOT found. Creating new admin...');
      const newAdmin = new User({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'Admin@123',
        role: 'admin',
      });
      await newAdmin.save();
      console.log('✓ Admin created successfully!');
    }

    process.exit(0);
  } catch (error) {
    console.error('✗ Error:', error.message);
    process.exit(1);
  }
};

checkAdmin();
