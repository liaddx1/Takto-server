const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001; // Choose any available port number

app.use(bodyParser.json());
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

let messages = [];

app.get('/', (req, res) => {
    req && res.status(200).json("Healthy!");
});

app.post('/api/messages', (req, res) => {
    const { sender, content } = req.body;

    // Create a new message object
    const newMessage = {
        id: messages.length + 1, // Assign a unique ID to the message
        sender,
        content,
        timestamp: new Date().getTime(), // Get the current timestamp
    };

    // Add the message to the array
    messages.push(newMessage);

    res.status(201).json(newMessage); // Respond with the new message
});

// GET endpoint for retrieving chat history
app.get('/api/messages', (req, res) => {
    res.json(messages);
});