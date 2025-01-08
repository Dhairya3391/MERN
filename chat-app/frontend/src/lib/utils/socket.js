import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000';

class SocketService {
    constructor() {
        this.socket = null;
    }

    connect() {
        if (!this.socket) {
            this.socket = io(SOCKET_URL);
            
            this.socket.on('connect', () => {
                console.log('Connected to socket server');
            });

            this.socket.on('disconnect', () => {
                console.log('Disconnected from socket server');
            });
        }
        return this.socket;
    }

    joinRoom(roomId, userId) {
        this.socket.emit('join_room', { roomId, userId });
    }

    sendMessage(chatId, senderId, text) {
        this.socket.emit('send_message', { chatId, senderId, text });
    }

    onMessage(callback) {
        this.socket.on('message', callback);
    }

    onUserJoined(callback) {
        this.socket.on('user_joined', callback);
    }

    onTyping(callback) {
        this.socket.on('typing', callback);
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }
}

export const socketService = new SocketService();