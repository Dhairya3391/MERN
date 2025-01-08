<script>
    import { onMount } from 'svelte';
    let messages = [];
    let currentMessage = '';
    let selectedUser = '';
    let users = [];
    let currentUser = '';

    onMount(async () => {
        // Fetch users from your backend
        try {
            const response = await fetch('YOUR_API_ENDPOINT/users');
            users = await response.json();
            // Assuming you have the current user stored in localStorage or session
            currentUser = localStorage.getItem('username');
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    });

    async function sendMessage() {
        if (!currentMessage.trim() || !selectedUser) return;

        const newMessage = {
            sender: currentUser,
            receiver: selectedUser,
            content: currentMessage,
            timestamp: new Date().toISOString()
        };

        try {
            // Send message to your backend
            await fetch('YOUR_API_ENDPOINT/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMessage)
            });

            messages = [...messages, newMessage];
            currentMessage = '';
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    async function loadChat(username) {
        selectedUser = username;
        try {
            // Fetch chat history with selected user
            const response = await fetch(`YOUR_API_ENDPOINT/messages/${currentUser}/${selectedUser}`);
            messages = await response.json();
        } catch (error) {
            console.error('Error loading chat:', error);
        }
    }
</script>

<div class="chat-container">
    <div class="users-list">
        <h2>Users</h2>
        {#each users.filter(user => user.username !== currentUser) as user}
            <div
                class="user-item"
                class:selected={selectedUser === user.username}
                on:click={() => loadChat(user.username)}
            >
                {user.username}
            </div>
        {/each}
    </div>

    <div class="chat-area">
        {#if selectedUser}
            <h3>Chat with {selectedUser}</h3>
            <div class="messages">
                {#each messages as message}
                    <div class="message" class:sent={message.sender === currentUser}>
                        <div class="message-content">{message.content}</div>
                        <div class="message-time">
                            {new Date(message.timestamp).toLocaleTimeString()}
                        </div>
                    </div>
                {/each}
            </div>
            <div class="message-input">
                <input
                    type="text"
                    bind:value={currentMessage}
                    on:keypress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type a message..."
                />
                <button on:click={sendMessage}>Send</button>
            </div>
        {:else}
            <p>Select a user to start chatting</p>
        {/if}
    </div>
</div>

<style>
    .chat-container {
        display: flex;
        height: 100vh;
        gap: 1rem;
        padding: 1rem;
    }

    .users-list {
        width: 200px;
        border-right: 1px solid #ccc;
        padding-right: 1rem;
    }

    .user-item {
        padding: 0.5rem;
        cursor: pointer;
    }

    .user-item.selected {
        background-color: #e0e0e0;
    }

    .chat-area {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .messages {
        flex: 1;
        overflow-y: auto;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .message {
        max-width: 70%;
        padding: 0.5rem;
        border-radius: 8px;
        background-color: #f0f0f0;
    }

    .message.sent {
        align-self: flex-end;
        background-color: #007bff;
        color: white;
    }

    .message-input {
        display: flex;
        gap: 0.5rem;
        padding: 1rem;
    }

    .message-input input {
        flex: 1;
        padding: 0.5rem;
    }

    .message-input button {
        padding: 0.5rem 1rem;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
</style></div>