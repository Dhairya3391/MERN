<script>
  import { onMount } from "svelte";
  import { socketStore, authenticateSocket } from "../stores/socket.js";
  import { session } from "../stores/authStore.js"; // Assume you have a session store for the logged-in user

  let messages = [];
  let newMessage = "";
  let isTyping = false;
  let onlineUsers = [];

  let socket;
  socketStore.subscribe((s) => (socket = s));

  onMount(() => {
    // Authenticate the socket with the logged-in user
    if ($session.userId) {
      authenticateSocket($session.userId);
    }

    // Listen for incoming messages
    socket.on("receiveMessage", (data) => {
      messages = [...messages, data];
    });

    // Listen for typing indicators
    socket.on("userTyping", (data) => {
      console.log(`User ${data.userId} is typing...`);
      // You can display a typing indicator in the UI
    });

    socket.on("userStatus", (data) => {
      if (data.status === "online") {
        onlineUsers = [...onlineUsers, data.userId];
      } else {
        onlineUsers = onlineUsers.filter((id) => id !== data.userId);
      }
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("userTyping");
    };
  });

  function sendMessage() {
    if (newMessage.trim()) {
      socket.emit("sendMessage", newMessage);
      newMessage = "";
    }
  }

  function handleTyping() {
    if (!isTyping) {
      isTyping = true;
      socket.emit("typing");
      setTimeout(() => (isTyping = false), 1000); // Reset typing status after 1 second
    }
  }
</script>

<main>
  <div>
    <h2>Online Users</h2>
    <ul>
      {#each onlineUsers as userId}
        <li>{userId}</li>
      {/each}
    </ul>
  </div>
  <div>
    {#each messages as message}
      <p><strong>{message.userId}:</strong> {message.message}</p>
    {/each}
  </div>
  <input type="text" bind:value={newMessage} on:input={handleTyping} />
  <button on:click={sendMessage}>Send</button>
</main>

\\
