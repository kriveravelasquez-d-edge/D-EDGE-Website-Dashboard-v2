import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Handle Netlify function mock so client alerts succeed gracefully
app.post('/.netlify/functions/send-email', (req, res) => {
  const { to, subject, message } = req.body || {};
  console.log(`[Alert Notification] Dispatched to: ${to} | Subject: ${subject}`);
  res.json({ success: true, message: 'Email notification alert dispatched successfully.' });
});

// Serve static assets from project directory
app.use(express.static(__dirname));

// Main route serves dashboard
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/dashboard-client.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Fallback route for all other requests
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`D-EDGE Website Roadmap server listening on http://0.0.0.0:${PORT}`);
});
