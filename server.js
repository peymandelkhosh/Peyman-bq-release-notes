const express = require('express');
const Parser = require('rss-parser');
const path = require('path');

const app = express();
const parser = new Parser();
const PORT = 5050;

// Serve static files
app.use('/static', express.static(path.join(__dirname, 'static')));

// Serve main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

// API Endpoint to fetch notes
app.get('/api/notes', async (req, res) => {
    try {
        const feed = await parser.parseURL('https://docs.cloud.google.com/feeds/bigquery-release-notes.xml');
        
        const entries = feed.items.map(entry => {
            return {
                title: entry.title || 'No Title',
                link: entry.link || '#',
                published: entry.isoDate || entry.pubDate || 'Unknown Date',
                content: entry.content || entry.contentSnippet || ''
            };
        });

        res.json(entries);
    } catch (error) {
        console.error('Error fetching RSS:', error);
        res.status(500).json({ error: 'Failed to fetch release notes' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}/`);
});
