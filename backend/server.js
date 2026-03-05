const express    = require('express');
const cors       = require('cors');
const nodemailer = require('nodemailer');
const { Pool }   = require('pg');
require('dotenv').config();

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────────
app.use(cors());
app.use(express.json());

// ── PostgreSQL Bağlantısı ───────────────────────
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Tablo yoksa oluştur
pool.query(`
  CREATE TABLE IF NOT EXISTS messages (
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(100),
    email      VARCHAR(100),
    subject    VARCHAR(200),
    message    TEXT,
    created_at TIMESTAMP DEFAULT NOW()
  )
`).then(() => console.log('✅ Veritabanı hazır'))
  .catch(err => console.error('❌ Veritabanı hatası:', err.message));

// ── Nodemailer (Gmail) ──────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// ── Route: Form Gönder ──────────────────────────
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Basit validasyon
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Ad, e-posta ve mesaj zorunludur.' });
  }

  try {
    // 1. PostgreSQL'e kaydet
    await pool.query(
      'INSERT INTO messages (name, email, subject, message) VALUES ($1, $2, $3, $4)',
      [name, email, subject || '', message]
    );

    // 2. E-posta gönder
    await transporter.sendMail({
      from:    `"${name}" <${process.env.GMAIL_USER}>`,
      to:      process.env.GMAIL_USER,
      subject: subject ? `[Portfolyo] ${subject}` : `[Portfolyo] ${name} mesaj gönderdi`,
      html: `
        <h3>Yeni bir mesaj aldınız</h3>
        <p><strong>İsim:</strong> ${name}</p>
        <p><strong>E-posta:</strong> ${email}</p>
        <p><strong>Konu:</strong> ${subject || '—'}</p>
        <p><strong>Mesaj:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    res.json({ success: true, message: 'Mesajınız alındı!' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sunucu hatası, tekrar deneyin.' });
  }
});

// ── Sunucuyu Başlat ─────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Sunucu çalışıyor: http://localhost:${PORT}`);
});