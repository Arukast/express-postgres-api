const { User } = require("../models");
const bcrypt = require('bcrypt');

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

exports.updateUser = async (userId, userDataToUpdate) => {
    if (!userDataToUpdate.email && !userDataToUpdate.name && !userDataToUpdate.password) {
        throw new Error("Tidak ada data yang diberikan untuk diperbarui.");
    }

    if (userDataToUpdate.email) {
        userDataToUpdate.email = userDataToUpdate.email.toLowerCase();
    }

    if (userDataToUpdate.password) {
        userDataToUpdate.password = await bcrypt.hash(userDataToUpdate.password, 10);
    }

    const [num] = await User.update(
        userDataToUpdate, {
        where: { id: userId }
    });
    
    if (num === 1) {
        const updatedUser = await User.findByPk(userId);
        return updatedUser; // Mengembalikan pengguna yang diperbarui 
    } else {
        throw new Error(`Tidak dapat memperbarui pengguna dengan id=${userId}. Mungkin pengguna tidak ditemukan atau data yang diberikan tidak berubah.`);
    }
}

exports.deleteUser = async (userId) => {
    const user = await user.findByPk(userId);
    if (!user) {
        return null; // Pengguna tidak ditemukan
    }
    
    await user.destroy();
    return true; // Pengguna berhasil dihapus
}