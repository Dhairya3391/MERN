const { Chat } = require('../models/Chat');
const { v4: uuidv4 } = require('uuid');

const chatController = {
    // Start a direct chat between two users
    startDirectChat: async (req, res) => {
        try {
            const { userId1, userId2 } = req.body;

            // Check if chat already exists
            const existingChat = await Chat.findOne({
                roomId: null,
                participants: { $all: [userId1, userId2] }
            });

            if (existingChat) {
                return res.json({ chatId: existingChat._id });
            }

            // Create new chat
            const newChat = new Chat({
                participants: [userId1, userId2],
                messages: []
            });

            await newChat.save();
            res.status(201).json({ chatId: newChat._id });

        } catch (err) {
            res.status(500).json({ message: 'Error creating chat', error: err.message });
        }
    },

    // Create a new group chat room
    createRoom: async (req, res) => {
        try {
            const { creatorId } = req.body;
            const roomId = uuidv4().substring(0, 8); // Create shorter room code

            const newRoom = new Chat({
                roomId,
                participants: [creatorId],
                messages: []
            });

            await newRoom.save();
            res.status(201).json({ roomId });

        } catch (err) {
            res.status(500).json({ message: 'Error creating room', error: err.message });
        }
    },

    // Join an existing chat room
    joinRoom: async (req, res) => {
        try {
            const { userId, roomId } = req.body;

            const room = await Chat.findOne({ roomId });
            if (!room) {
                return res.status(404).json({ message: 'Room not found' });
            }

            if (!room.participants.includes(userId)) {
                room.participants.push(userId);
                await room.save();
            }

            res.json({ success: true, chatId: room._id });

        } catch (err) {
            res.status(500).json({ message: 'Error joining room', error: err.message });
        }
    },

    // Get chat history
    getChatHistory: async (req, res) => {
        try {
            const { chatId } = req.params;
            const chat = await Chat.findById(chatId);
            
            if (!chat) {
                return res.status(404).json({ message: 'Chat not found' });
            }

            res.json({ messages: chat.messages });

        } catch (err) {
            res.status(500).json({ message: 'Error fetching chat history', error: err.message });
        }
    },

    // Add a new message to chat
    addMessage: async (req, res) => {
        try {
            const { chatId } = req.params;
            const { senderId, text } = req.body;

            const chat = await Chat.findById(chatId);
            if (!chat) {
                return res.status(404).json({ message: 'Chat not found' });
            }

            chat.messages.push({
                sender: senderId,
                text,
                timestamp: new Date(),
                readBy: [senderId]
            });

            await chat.save();
            res.status(201).json({ success: true });

        } catch (err) {
            res.status(500).json({ message: 'Error sending message', error: err.message });
        }
    },

    // Get user's active chats
    getUserChats: async (req, res) => {
        try {
            const { userId } = req.params;
            const chats = await Chat.find({
                participants: userId
            });

            res.json({ chats });

        } catch (err) {
            res.status(500).json({ message: 'Error fetching user chats', error: err.message });
        }
    }
};

module.exports = chatController;