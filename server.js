const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // 🔒 Load the secret environment variables

const apiRoutes = require('./routes/api');

const app = express();
// Use the PORT from .env, or fallback to 5001 if not found
const PORT = process.env.PORT || 5001; 

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Now using process.env.MONGODB_URI instead of the hardcoded string
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ Connected to MongoDB Atlas (Cloud) securely!");
}).catch(err => {
    console.error("❌ Database Connection Error:", err);
});

app.use('/api', apiRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));