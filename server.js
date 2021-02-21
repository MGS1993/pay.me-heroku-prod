const express = require('express');
const cors = require('cors');
require('dotenv').config();
const apiRoutes = require('./routes/api');
const path = require('path');

const app = express();
app.use(express.json());
app.use('/api', apiRoutes)
app.use(cors());

const mongoose = require('mongoose');
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology:true})
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

/// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', () => (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
const port = process.env.PORT || 5000

app.listen(port, console.log(`running on port ${port} `));