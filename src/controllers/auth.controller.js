const authService = require('../services/auth.service');
const AppError = require('../utils/AppError');

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await authService.loginUser(email, password);
        // if (!user) {
        //     return next(new AppError('Email atau kata sandi salah', 401));
        // }
        res.status(200).json({ message: 'Login berhasil', user });
    } catch (error) {
        if (error.message === 'Pengguna tidak ditemukan.') {
            return res.status(404).json({ message: error.message });
        }
        next(error);
    }
}