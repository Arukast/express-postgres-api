const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../../models');

exports.loginUser = async (email, password) => {
    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    if (!user) { throw new Error('Pengguna tidak ditemukan.'); }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) { throw new Error('Kata sandi salah.'); }

    const payload = { userId: user.id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Test
    return { user, token };
}