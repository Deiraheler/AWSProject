const express = require('express');
const path = require('path');
const cors = require('cors');
const history = require('connect-history-api-fallback');
const AWS = require('aws-sdk');

const app = express();

app.use(cors({
    origin: 'http://localhost:8080'  // Allow only your Vue.js application's origin; adjust as needed for production
}));

// Configure AWS S3
const s3 = new AWS.S3({
    accessKeyId: 'AKIA2UC3AYLKVJJRFZOK', // Replace with your actual access key ID
    secretAccessKey: 'bqjLzDjaitOisr7137Jc2LmgKa+0pQT5lpFj80Ee', // Replace with your actual secret access key
    region: 'eu-west-1'
});

// Handle SPA routing by redirecting all queries to index.html
app.use(history({
    verbose: true  // This enables logging for the middleware
}));

// Point to the correct directory for static files
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to get a signed URL for uploading an image
app.get('/generate-signed-url', (req, res) => {
    const { filename, contentType } = req.query;
    const bucketName = 'blog-images-keyboard-warriors';
    const key = `uploads/${filename}`;

    const params = {
        Bucket: bucketName,
        Key: key,
        Expires: 60 * 5, // URL expiration time in seconds
        ContentType: contentType,
        ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', params, (err, url) => {
        if (err) {
            console.error('Error generating signed URL', err);
            return res.status(500).json({ error: "Error generating signed URL" });
        }
        res.json({ url });
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
