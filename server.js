const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // 🔒 Load the secret environment variables

const apiRoutes = require('./routes/api');

const app = express();
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
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
// 🔌 REAL-TIME WEBSOCKETS (LIVE TRAFFIC)
let activeUsers = 0;

io.on('connection', (socket) => {
    // 1. A new user opened the website!
    activeUsers++;
    
    // Broadcast the new total to EVERYONE currently on the website
    io.emit('visitorCountUpdate', activeUsers);

    // 2. The user closed the tab or lost internet
    socket.on('disconnect', () => {
        activeUsers--;
        io.emit('visitorCountUpdate', activeUsers);
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} with WebSockets enabled`);
});
