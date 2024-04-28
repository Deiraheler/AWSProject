// Import necessary modules
const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');

// Create an Express app
const app = express();

// Use 'connect-history-api-fallback' middleware which is necessary for SPA applications using HTML5 history mode
app.use(history());

// Path to the static files
const staticFileMiddleware = express.static(path.join(__dirname, 'front/dist'));

// Serve static files from the 'front/dist' directory (where your Vue app will be built)
app.use(staticFileMiddleware);

// Set up a simple route for the homepage (this is actually handled by connect-history-api-fallback)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'front/dist', 'index.html'));
});

// Define the port for the server to listen on
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
