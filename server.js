const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');

const app = express();

// Handle SPA routing by redirecting all queries to index.html
app.use(history({
    verbose: true  // This enables logging for the middleware
}));

// Point to the correct directory for static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
