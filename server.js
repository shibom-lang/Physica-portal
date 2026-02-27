const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // 🔴 1. Add this at the very top

const apiRoutes = require('./routes/api');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// 🔴 2. Add this line so the website can load the uploaded photos!
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Connect to MongoDB
// Connect to MongoDB Atlas (Cloud)
const DB_URI = "mongodb+srv://shibomdas80_db_user:c4qP14vWWBCVfchy@cluster0.swcunv4.mongodb.net/physicaDB?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ Connected to MongoDB Atlas (Cloud)!");
}).catch(err => {
    console.error("❌ Database Connection Error:", err);
});

app.use('/api', apiRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
