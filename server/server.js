const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const dotenv = require('dotenv');
// const authRouter = require('./routes/auth');

// configure dotenv
dotenv.config();

// Initialize app
const app = express();

// Initialize database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DATABASE CONNECTED'))
  .catch(error => console.log('DATABASE CONNECTION ERROR', error));

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(cors());

// Routes
/* 
Here, fs.readdirSync('./routes') returns 
[
  'auth.js',
  'category.js',
  'cloudinary.js',
  'product.js',
  'sub.js',
  'user.js'
]
*/
fs.readdirSync('./routes').map(r => app.use('/api', require('./routes/' + r)));

// Listen the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on the port ${PORT}`);
});
