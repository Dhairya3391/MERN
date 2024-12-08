document.getElementById('greetButton').addEventListener('click', async () => {
    try {
        const response = await fetch('/jokes'); // Send GET request
        const message = await response.text(); // Parse the response as text

        // Update the page dynamically
        document.getElementById('content').innerHTML = `<p>${message}</p>`;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('content').innerHTML = `<p>Something went wrong. Please try again.</p>`;
    }
});
