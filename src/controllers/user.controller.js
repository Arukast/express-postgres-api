const userService = require('../services/user.service');
const AppError = require('../utils/AppError');

exports.create = async (req, res, next) => {
    try {
        const userData = req.body;
        const newUser = await userService.createUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        if (error.message.includes('sudah terdaftar')) {
            return next(new AppError('Email sudah terdaftar', 409));
        }
        next(error);
    }
}

exports.findAll = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const userDataToUpdate = req.body;
        const updatedUser = await userService.updateUser(userId, userDataToUpdate);
        if (!updatedUser) {
            return next(new AppError('Pengguna tidak ditemukan untuk diperbarui', 404));
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
}

exports.delete = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const result = await userService.deleteUser(userId);
        if (!result) {
            return next(new AppError('Pengguna tidak ditemukan untuk dihapus', 404));
        }
        res.status(200).json({ message: 'Pengguna berhasil dihapus' });
    } catch (error) {
        next(error);
    }
}