const bcrypt = require('bcrypt');
const db = require('../models');
const User = db.User; // Mengakses model User

exports.createUser = async (userData) => {
    if (!userData.email || !userData.name || !userData.password) {
        throw new Error("Email, Nama, Password tidak boleh kosong.");
    }
    // Di sini bisa ditambahkan logika bisnis, seperti hashing password
    userData.password = await bcrypt.hash(userData.password, 10);
    // atau validasi duplikasi email sebelum menyimpan.
    const lowerCaseEmail = userData.email.toLowerCase();
    const existingUser = await User.findOne({ 
        where: { email: lowerCaseEmail } 
    });

    if (existingUser) {
        throw new Error('Email ini sudah terdaftar.');
    }
    
    const newUser = await User.create(userData);
    return newUser;
};

exports.getAllUsers = async () => {
    const users = await User.findAll();
    return users;
}

// TODO: Fix
exports.updateUser = async (userId, userDataToUpdate) => {
    if (!userDataToUpdate.email && !userDataToUpdate.name && !userDataToUpdate.password) {
        throw new Error("Tidak ada data yang diberikan untuk diperbarui.");
    }

    const user = await User.findByPk(userId);
    if (!user) {
        return null; // Pengguna tidak ditemukan
    }

    if (userDataToUpdate.email) {
        user.email = userDataToUpdate.email.toLowerCase();
    }
    if (userDataToUpdate.name) {
        user.name = userDataToUpdate.name;
    }
    if (userDataToUpdate.password) {
        user.password = await bcrypt.hash(userDataToUpdate.password, 10);
    }

    await user.save();
    return user;
}

exports.deleteUser = async (userId) => {
    const user = await User.findByPk(userId);
    if (!user) {
        return null; // Pengguna tidak ditemukan
    }
    
    await user.destroy();
    return true; // Pengguna berhasil dihapus
}