const rateLimit = require('express-rate-limit');
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

const loginLimiter = rateLimit({
    windowsMs: 15 * 60 * 1000, // 15 minutes
    limit: 10,
    message: {
        status: 429,
        error: 'Too many login attempts, please try again later.'
    },
    standardHeaders: 'draft-7',
    legacyHeaders: false
})

router.post('/login', loginLimiter, authController.login);

module.exports = router;