// Import necessary modules
const express = require('express');
const path = require('path');

// Create an Express app
const app = express();

// Serve static files from the 'public' directory (where your Vue app will be built)
app.use(express.static(path.join(__dirname, 'public')));

// Set up a simple route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define the port for the server to listen on
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
