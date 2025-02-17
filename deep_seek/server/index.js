import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import session from "express-session";
import authRoutes from "./routes/authRoutes.js";
import { isAuthenticated } from "./middleware/authMiddleware.js";

const app = express();
app.use(express.json());
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow Svelte frontend to connect
    methods: ["GET", "POST"],
  },
});
// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://dhairya:dhairya3391@mern.4atin.mongodb.net/?retryWrites=true&w=majority&appName=MERN",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
// Session middleware
app.use(
  session({
    secret: "e4f8c973-8d36-4bba-bd24-72a63ab8ecfd", // Replace with this strong secret key
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

app.use("/auth", authRoutes);
app.use(cors());

app.get("/protected", isAuthenticated, (req, res) => {
  res.json({ message: "This is a protected route" });
});

// Basic route
app.get("/", (req, res) => {
  res.send("Chat App Backend");
});

// Socket.IO connection
// server/index.js

const onlineUsers = new Set();

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Authenticate the user
  socket.on("authenticate", (userId) => {
    if (userId) {
      socket.userId = userId;
      onlineUsers.add(userId);
      io.emit("userStatus", { userId, status: "online" });
      console.log(`User ${userId} authenticated`);
    }
  });

  // Handle disconnection

  // Handle incoming messages
  socket.on("sendMessage", (message) => {
    if (!socket.userId) {
      return console.log("Unauthorized message attempt");
    }

    // Broadcast the message to all connected clients
    io.emit("receiveMessage", { userId: socket.userId, message });
  });

  // Handle typing indicators
  socket.on("typing", () => {
    if (!socket.userId) {
      return console.log("Unauthorized typing attempt");
    }

    // Broadcast typing status to all clients except the sender
    socket.broadcast.emit("userTyping", { userId: socket.userId });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    if (socket.userId) {
      onlineUsers.delete(socket.userId);
      io.emit("userStatus", { userId: socket.userId, status: "offline" });
    }
    console.log("A user disconnected:", socket.id);
  });
});

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
