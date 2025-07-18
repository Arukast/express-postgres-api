const { ReservationRoom } = require("../models");

exports.createReservationRoom = async (reservationRoomData) => {
    if (!reservationRoomData.user_id || !reservationRoomData.reservation_date || !reservationRoomData.room_number || !reservationRoomData.reservation_end_date) {
        throw new Error("Id Pengguna, Tanggal Reservasi, Nomor Kamar, Tanggal Reservasi Berakhir tidak boleh kosong.");
    }
    
    const newReservasiRoom = await ReservationRoom.create(reservationRoomData);
    return newReservasiRoom;
};

exports.getAllReservationRoom = async () => {
    const reservasiRoom = await ReservationRoom.findAll();
    return reservasiRoom;
}

exports.updateReservationRoom = async (reservationRoomId, reservationRoomDataToUpdate) => {
    if (!reservationRoomDataToUpdate.user_id && !reservationRoomDataToUpdate.reservation_date && !reservationRoomDataToUpdate.room_number && !reservationRoomDataToUpdate.reservation_end_date) {
        throw new Error("Tidak ada data yang diberikan untuk diperbarui.");
    }

    const [num] = await ReservationRoom.update(
        reservationRoomDataToUpdate, {
        where: { id: reservationRoomId }
    });
    
    if (num === 1) {
        const updatedReservationRoom = await ReservationRoom.findByPk(reservationRoomId);
        return updatedReservationRoom; // Mengembalikan pengguna yang diperbarui 
    } else {
        throw new Error(`Tidak dapat memperbarui Reservasi Kamar dengan id=${reservationRoomId}. Mungkin Reservasi Kamar tidak ditemukan atau data yang diberikan tidak berubah.`);
    }
}

exports.deleteReservationRoom = async (reservationRoomId) => {
    const reservationRoom = await reservationRoom.findByPk(reservationRoomId);
    if (!reservationRoom) {
        return null; // Pengguna tidak ditemukan
    }
    
    await reservationRoom.destroy();
    return true; // Pengguna berhasil dihapus
}