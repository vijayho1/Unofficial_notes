// routes/auth.js
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// First, try just exporting the router without User model
console.log('[auth.js] Loading...');

try {
  const User = require('../models/User');
  console.log('[auth.js] User model loaded');
} catch (err) {
  console.error('[auth.js] Failed to load User model:', err.message);
}

const User = require('../models/User');
const sendOtpEmail = require('../utils/sendOtp');

const OTP_EXPIRE_MINUTES = parseInt(process.env.OTP_EXPIRE_MINUTES || '10', 10);

// helper: generate numeric OTP of given length
function generateOtp(length = 6) {
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10).toString();
  }
  return otp;
}

// POST /api/auth/send-otp
router.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ ok: false, message: 'Email required' });

    // domain check
    if (!/^[a-zA-Z0-9._%+-]+@kletech\.ac\.in$/.test(email)) {
      return res.status(400).json({ ok: false, message: 'Only @kletech.ac.in allowed' });
    }

    const otp = generateOtp(6);
    const otpExpiresAt = new Date(Date.now() + OTP_EXPIRE_MINUTES * 60 * 1000);

    // upsert user doc with OTP and expiry
    const user = await User.findOneAndUpdate(
      { email },
      { email, otp, otpExpiresAt, isVerified: false },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // send email (await but don't block too long)
    await sendOtpEmail(email, otp);

    return res.json({ ok: true, message: 'OTP sent' });
  } catch (err) {
    console.error('send-otp error', err.message);
    console.error(err.stack);
    return res.status(500).json({ ok: false, message: 'Server error: ' + err.message });
  }
});

// POST /api/auth/verify-otp
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ ok: false, message: 'Email and OTP required' });

    const user = await User.findOne({ email });
    if (!user || !user.otp) {
      return res.status(400).json({ ok: false, message: 'No OTP requested for this email' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ ok: false, message: 'Invalid OTP' });
    }

    if (user.otpExpiresAt < new Date()) {
      return res.status(400).json({ ok: false, message: 'OTP expired' });
    }

    // mark verified and clear OTP
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    // create JWT token (useful for frontend to access protected routes)
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return res.json({ ok: true, message: 'OTP verified', token });
  } catch (err) {
    console.error('verify-otp error', err);
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
});

// POST /api/auth/set-password
router.post('/set-password', async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) return res.status(400).json({ ok: false, message: 'Token and password required' });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.userId);
    if (!user) return res.status(400).json({ ok: false, message: 'Invalid token' });

    const hash = await bcrypt.hash(password, 10);
    user.passwordHash = hash;
    await user.save();

    return res.json({ ok: true, message: 'Password set' });
  } catch (err) {
    console.error('set-password error', err);
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
});

console.log('[auth.js] Router configured, exporting...');
module.exports = router;
console.log('[auth.js] Exported');
