const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// models/Chat.js
const chatSchema = new mongoose.Schema({
    roomId: {
        type: String,
        sparse: true  // Allow null for direct chats
    },
    participants: [{
        type: String,  // User IDs
        required: true
    }],
    messages: [{
        sender: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        },
        readBy: [{
            type: String  // User IDs
        }]
    }]
}, {
    timestamps: true
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = { Chat };