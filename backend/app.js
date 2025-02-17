const express = require('express');
const cors = require('cors');
const passport = require('./controllers/authController');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');

require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Passport authentication middleware
app.use(passport.initialize());

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Database connection & server start
sequelize.sync({ alter: true }) // Ensures schema updates without data loss
  .then(() => {
    console.log('✅ Database Synced');
    app.listen(process.env.PORT || 5000, () => 
      console.log(`🚀 Server running on http://localhost:${process.env.PORT || 5000}`)
    );
  })
  .catch(err => {
    console.error("❌ Database connection error:", err);
  });
