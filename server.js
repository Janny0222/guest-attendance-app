const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const GuestList = require('./models/guestListModel');
const guestListRoute = require('./routes/guestListRoute');
const guestListMongoRoute = require('./routes/guestListMongoRoute');
const http = require('http');
const socket = require("socket.io");
const { Server } = require("socket.io");
const fs = require('fs');
const { socketManager } = require('./sockets/socketManager');
const connectToDatabase = require('./config/mongoDb');

dotenv.config();
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST;

const app = express();
const server = http.createServer({
    key: fs.readFileSync('./certs/key.pem'),
    cert: fs.readFileSync('./certs/cert.pem'),
},app)
const io = new Server(server, {
    cors: {
        origin: ["https://greenstone-30th.vercel.app", "https://10.20.20.149:3000"],
        methods: ["GET", "POST"],
    }
})

connectToDatabase();
// Test database connection
sequelize.authenticate().then(() => {
    GuestList.sync();
    console.log('Database connected...');
}).catch(err => {
    console.log('Error: ' + err);
});

app.use(express.json());
app.use(cors());
// Routes
app.use('/api/guests', guestListRoute);
app.use('/api/v1/guests', guestListMongoRoute);

io.on("connection", (socket) => {
  console.log("✅ New client connected:", socket.id);

  socket.on("qrScanned", (data) => {
    console.log("QR scanned:", data);
    // broadcast update sa lahat ng clients
    io.emit("updateGuestList", data);
  });

  socket.on("disconnect", () => {
    console.log("🔌 Client disconnected:", socket.id);
  });
});

app.set("socketio", io);


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});