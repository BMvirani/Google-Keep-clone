const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const noteRoutes = require('./routes/note')
const notePositionRoutes = require('./routes/notePosition')
dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());
app.use(cors()); 

// Import routes
const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

// Use the note routes
app.use('/api/notes', noteRoutes);
app.use('/api/notePosition', notePositionRoutes);



const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
