// src/stores/socket.js
import { io } from "socket.io-client";
import { writable } from "svelte/store";

const socket = io("http://localhost:5000");
export const socketStore = writable(socket);

export function authenticateSocket(userId) {
  socket.emit("authenticate", userId);
}
