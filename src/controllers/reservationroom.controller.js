const reservationRoomService = require('../services/reservationroom.service');

exports.create = async (req, res) => {
    try {
        const reservationRoomData = req.body;
        const newReservationRoom = await reservationRoomService.createReservationRoom(reservationRoomData);
        res.status(201).json(newReservationRoom);
    } catch (error) {
        if (error.message.includes('sudah terdata')) {
            return res.status(409).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
}

exports.findAll = async (req, res) => {
    try {
        const reservationRoom = await reservationRoomService.getAllReservasiRoom();
        res.status(200).json(reservationRoom);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.update = async (req, res) => {
    try {
        const reservationRoomId = req.params.id;
        const reservationRoomDataToUpdate = req.body;
        const updatedReservationRoom = await reservationRoomService.updateReservationRoom(reservationRoomId, reservationRoomDataToUpdate);
        if (!updatedReservationRoom) {
            return res.status(404).json({ message: 'Reservasi Kamar tidak ditemukan untuk diperbarui' });
        }
        res.status(200).json(updatedReservationRoom);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.delete = async (req, res) => {
    try {
        const reservationRoomId = req.params.id;
        const result = await reservationRoomService.deleteReservationRoom(reservationRoomId);
        if (!result) {
            return res.status(404).json({ message: 'Reservasi Kamar tidak ditemukan untuk dihapus' });
        }
        res.status(200).json({ message: 'Reservasi Kamar berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}