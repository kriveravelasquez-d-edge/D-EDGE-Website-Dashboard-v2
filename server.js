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
  console.log(`[Daily Digest 48h] Dispatched to: ${pmEmail || 'kriveravelasquez@d-edge.com'} | Upcoming milestones: ${milestones?.length || 0}`);
  res.json({
    success: true,
    dispatchedAt: new Date().toISOString(),
    recipient: pmEmail || 'kriveravelasquez@d-edge.com',
    milestonesCount: milestones?.length || 0,
    message: 'Automated 48h PM daily digest dispatched successfully.'
  });
});

// PM Google Workspace Authentication & Verification (@d-edge.com only)
app.post('/api/auth/google-connect', async (req, res) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
  if (!token) {
    return res.status(401).json({ success: false, message: 'Google Workspace access token is required.' });
  }

  let verifiedEmail = '';
  let verifiedName = '';

  try {
    const peopleRes = await fetch('https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (peopleRes.ok) {
      const people = await peopleRes.json();
      const primaryEmail = (people.emailAddresses || []).find(e => e.metadata?.primary) || (people.emailAddresses || [])[0];
      const primaryName = (people.names || []).find(n => n.metadata?.primary) || (people.names || [])[0];
      verifiedEmail = primaryEmail?.value || '';
      verifiedName = primaryName?.displayName || '';
    }
  } catch (err) {
    console.warn('[Google People API fallback]', err?.message || err);
  }

  if (!verifiedEmail) {
    try {
      const userinfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (userinfoRes.ok) {
        const info = await userinfoRes.json();
        if (info.email && info.email_verified !== false) {
          verifiedEmail = info.email;
          verifiedName = verifiedName || info.name || '';
        }
      }
    } catch (err) {
      console.warn('[Google UserInfo API error]', err?.message || err);
    }
  }

  if (!verifiedEmail) {
    return res.status(401).json({ success: false, message: 'Unable to verify Google Workspace account token.' });
  }

  const cleanEmail = verifiedEmail.trim().toLowerCase();
  if (!/^[a-z0-9._%+-]+@d-edge\.com$/.test(cleanEmail)) {
    console.warn(`[Google Workspace Auth Rejected] Non-d-edge domain: ${cleanEmail}`);
    return res.status(403).json({
      success: false,
      message: 'Access restricted: Only @d-edge.com Google Workspace accounts can access PM privileges.'
    });
  }

  const displayName = (verifiedName || '').trim() || cleanEmail.split('@')[0];
  console.log(`[Google Workspace Auth Verified] ${cleanEmail} (${displayName})`);
  res.json({
    success: true,
    email: cleanEmail,
    name: displayName,
    role: 'pm',
    message: 'Google Workspace account authorized for PM access.'
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
