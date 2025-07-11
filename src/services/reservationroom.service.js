const db = require('../models');
const ReservationRoom = db.ReservationRoom; // Mengakses model User

exports.createReservationRoom = async (reservationRoomData) => {
    if (!reservationRoomData.user_id || !reservationRoomData.reservation_date || !reservationRoomData.room_number || !reservationRoomData.reservation_end_date) {
        throw new Error("Id Pengguna, Tanggal Reservasi, Nomor Kamar, Tanggal Reservasi Berakhir tidak boleh kosong.");
    }
    
    const newReservasiRoom = await ReservationRoom.create(reservationRoomData);
    return newReservasiRoom;
};

exports.getAllReservasiRoom = async () => {
    const reservasiRoom = await ReservationRoom.findAll();
    return reservasiRoom;
}

// TODO: Fix
exports.updateReservationRoom = async (reservationRoomId, reservationRoomDataToUpdate) => {
    if (!reservationRoomDataToUpdate.user_id && !reservationRoomDataToUpdate.reservation_date && !reservationRoomDataToUpdate.room_number && !reservationRoomDataToUpdate.reservation_end_date) {
        throw new Error("Tidak ada data yang diberikan untuk diperbarui.");
    }

    const reservationRoom = await ReservationRoom.findByPk(reservationRoomId);
    if (!reservationRoom) {
        return null; // Buku tidak ditemukan
    }

    await reservationRoom.save();
    return reservationRoom;
}

exports.deleteReservationRoom = async (reservationRoomId) => {
    const reservationRoom = await ReservationRoom.findByPk(reservationRoomId);
    if (!reservationRoom) {
        return null; // Pengguna tidak ditemukan
    }
    
    await reservationRoom.destroy();
    return true; // Pengguna berhasil dihapus
}