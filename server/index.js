const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';
const PORT = process.env.PORT || 4000;

const db = new Database('database.db');

// Initialize tables
function initDB() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT
    );

    CREATE TABLE IF NOT EXISTS doctors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      specialty TEXT NOT NULL,
      bio TEXT,
      avatar TEXT
    );

    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      doctor_id INTEGER NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      reason TEXT,
      status TEXT DEFAULT 'scheduled',
      FOREIGN KEY(user_id) REFERENCES users(id),
      FOREIGN KEY(doctor_id) REFERENCES doctors(id)
    );

    CREATE TABLE IF NOT EXISTS records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      date TEXT NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
  `);

  // Seed doctors if empty
  const doctorCount = db.prepare('SELECT COUNT(*) as count FROM doctors').get().count;
  if (doctorCount === 0) {
    const seedDoctors = [
      {
        name: 'Dr. Aisha Khan',
        specialty: 'Cardiology',
        bio: 'Experienced cardiologist with 10+ years treating heart disease.',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
      {
        name: 'Dr. Mark Thompson',
        specialty: 'Dermatology',
        bio: 'Board-certified dermatologist passionate about skin health.',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
      {
        name: 'Dr. Priya Patel',
        specialty: 'Pediatrics',
        bio: 'Compassionate pediatrician dedicated to child wellness.',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      },
      {
        name: 'Dr. Javier Martinez',
        specialty: 'Orthopedics',
        bio: 'Orthopedic surgeon specializing in sports injuries.',
        avatar: 'https://randomuser.me/api/portraits/men/71.jpg',
      }
    ];

    const insert = db.prepare('INSERT INTO doctors (name, specialty, bio, avatar) VALUES (?, ?, ?, ?)');
    const insertMany = db.transaction((docs) => {
      for (const doc of docs) {
        insert.run(doc.name, doc.specialty, doc.bio, doc.avatar);
      }
    });
    insertMany(seedDoctors);
  }
}

initDB();

const app = express();
app.use(cors());
app.use(express.json());

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Missing token' });
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Invalid token format' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid or expired' });
  }
}

// Auth routes
app.post('/api/auth/register', (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (existing) return res.status(400).json({ message: 'Email already registered' });

  const hashed = bcrypt.hashSync(password, 10);
  const stmt = db.prepare('INSERT INTO users (email, password, name) VALUES (?, ?, ?)');
  const info = stmt.run(email, hashed, name || null);
  const user = { id: info.lastInsertRowid, email, name };
  const token = generateToken(user);
  res.json({ token, user });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) return res.status(400).json({ message: 'Invalid credentials' });
  const token = generateToken(user);
  res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

// Doctors
app.get('/api/doctors', (req, res) => {
  const { query } = req.query;
  if (query) {
    const stmt = db.prepare('SELECT * FROM doctors WHERE name LIKE ? OR specialty LIKE ?');
    const doctors = stmt.all(`%${query}%`, `%${query}%`);
    return res.json(doctors);
  }
  const doctors = db.prepare('SELECT * FROM doctors').all();
  res.json(doctors);
});

app.get('/api/doctors/:id', (req, res) => {
  const doctor = db.prepare('SELECT * FROM doctors WHERE id = ?').get(req.params.id);
  if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
  res.json(doctor);
});

// Appointments
app.get('/api/appointments', authMiddleware, (req, res) => {
  const appointments = db.prepare('SELECT * FROM appointments WHERE user_id = ?').all(req.user.id);
  res.json(appointments);
});

app.post('/api/appointments', authMiddleware, (req, res) => {
  const { doctor_id, date, time, reason } = req.body;
  if (!doctor_id || !date || !time) return res.status(400).json({ message: 'Missing required fields' });
  const stmt = db.prepare('INSERT INTO appointments (user_id, doctor_id, date, time, reason) VALUES (?, ?, ?, ?, ?)');
  const info = stmt.run(req.user.id, doctor_id, date, time, reason || null);
  const appointment = db.prepare('SELECT * FROM appointments WHERE id = ?').get(info.lastInsertRowid);
  res.json(appointment);
});

// Medical Records
app.get('/api/records', authMiddleware, (req, res) => {
  const records = db.prepare('SELECT * FROM records WHERE user_id = ?').all(req.user.id);
  res.json(records);
});

app.post('/api/records', authMiddleware, (req, res) => {
  const { title, description, date } = req.body;
  if (!title || !date) return res.status(400).json({ message: 'Title and date required' });
  const stmt = db.prepare('INSERT INTO records (user_id, title, description, date) VALUES (?, ?, ?, ?)');
  const info = stmt.run(req.user.id, title, description || null, date);
  const record = db.prepare('SELECT * FROM records WHERE id = ?').get(info.lastInsertRowid);
  res.json(record);
});

// Telemedicine (returns Jitsi room)
app.get('/api/telemedicine/room', authMiddleware, (req, res) => {
  const room = `HAI-${req.user.id}-${Date.now()}`;
  res.json({ room });
});

app.listen(PORT, () => console.log(`HAI backend listening on port ${PORT}`));