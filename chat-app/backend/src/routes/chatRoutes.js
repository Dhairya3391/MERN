const router = require('express').Router();
const chatController = require('../controllers/chatController');

// Start a direct chat
router.post('/start-chat', chatController.startDirectChat);

// Create a new room
router.post('/create-room', chatController.createRoom);

// Join a room
router.post('/join-room', chatController.joinRoom);

// Get chat history
router.get('/history/:chatId', chatController.getChatHistory);

// Add message to chat
router.post('/message/:chatId', chatController.addMessage);

// Get user's active chats
router.get('/user-chats/:userId', chatController.getUserChats);

module.exports = router;