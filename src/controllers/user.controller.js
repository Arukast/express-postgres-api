const userService = require('../services/user.service');

exports.create = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await userService.createUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        if (error.message.includes('sudah terdaftar')) {
            return res.status(409).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
}

exports.findAll = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.update = async (req, res) => {
    try {
        const userId = req.params.id;
        const userDataToUpdate = req.body;
        const updatedUser = await userService.updateUser(userId, userDataToUpdate);
        if (!updatedUser) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan untuk diperbarui' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.delete = async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await userService.deleteUser(userId);
        if (!result) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan untuk dihapus' });
        }
        res.status(200).json({ message: 'Pengguna berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}