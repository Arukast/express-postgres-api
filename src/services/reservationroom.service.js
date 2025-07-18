const { ReservationRoom } = require("../../models");

exports.createReservationRoom = async (reservationRoomData) => {
    const newReservasiRoom = await ReservationRoom.create(reservationRoomData);
    return newReservasiRoom;
};

exports.getAllReservationRoom = async () => {
    const reservasiRoom = await ReservationRoom.findAll();
    return reservasiRoom;
}

exports.updateReservationRoom = async (reservationRoomId, reservationRoomDataToUpdate) => {
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