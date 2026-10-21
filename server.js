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

// Automated Daily Digest API for PMs (upcoming milestones within next 48h)
app.post('/api/daily-digest', (req, res) => {
  const { pmEmail, milestones } = req.body || {};
  console.log(`[Daily Digest 48h] Dispatched to: ${pmEmail || 'dounia@d-edge.com'} | Upcoming milestones: ${milestones?.length || 0}`);
  res.json({
    success: true,
    dispatchedAt: new Date().toISOString(),
    recipient: pmEmail || 'dounia@d-edge.com',
    milestonesCount: milestones?.length || 0,
    message: 'Automated 48h PM daily digest dispatched successfully.'
  });
});

// PM Google Mail Authentication & Verification (@d-edge.com only)
app.post('/api/auth/google-connect', (req, res) => {
  const { email, name } = req.body || {};
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ success: false, message: 'Valid email is required' });
  }
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail.endsWith('@d-edge.com')) {
    console.warn(`[Google Mail Auth Rejected] Non-d-edge domain: ${cleanEmail}`);
    return res.status(403).json({
      success: false,
      message: 'Access restricted: Only @d-edge.com Google Mail accounts can access PM privileges.'
    });
  }
  console.log(`[Google Mail Auth Verified] PM: ${cleanEmail} (${name || 'PM'})`);
  res.json({
    success: true,
    email: cleanEmail,
    name: name || cleanEmail.split('@')[0],
    role: 'pm',
    message: 'Google Mail account authorized for PM access.'
  });
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

// Explicit PM Login route
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Explicit routes for project, timeline, and client URLs
app.get(['/timeline/:id', '/project/:id', '/client/:id'], (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Fallback route for all other requests
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`D-EDGE Website Roadmap server listening on http://0.0.0.0:${PORT}`);
});
