const Joi = require('joi');

// schema for validating reservation room creation
const reservationRoomCreationSchema = Joi.object({
    user_id: Joi.number().integer().required().messages({
        "number.base": "Id User harus berupa angka",
        "any.required": "Id User harus diisi"
    }),

    room_number: Joi.number().integer().required().messages({
        "number.base": "Nomor Kamar harus berupa angka",
        "any.required": "Nomor Kamar harus diisi"
    }),

    reservation_date: Joi.date().required().messages({
        "date.base": "Tanggal Reservasi harus berupa tanggal yang valid",
        "any.required": "Tanggal Reservasi harus diisi"
    }),

    reservation_end_date: Joi.date().greater(Joi.ref('reservation_date')).required().messages({
        "date.base": "Tanggal Reservasi Berakhir harus berupa tanggal yang valid",
        "date.greater": "Tanggal Reservasi Berakhir harus lebih besar dari Tanggal Reservasi",
        "any.required": "Tanggal Reservasi Berakhir harus diisi"
    })
})

// schema for validating reservation room updates
const reservationRoomUpdateSchema = Joi.object({
    user_id: Joi.number().integer().optional().messages({
        "number.base": "Id User harus berupa angka"
    }),

    room_number: Joi.number().integer().optional().messages({
        "number.base": "Nomor Kamar harus berupa angka"
    }),

    reservation_date: Joi.date().optional().messages({
        "date.base": "Tanggal Reservasi harus berupa tanggal yang valid"
    }),

    reservation_end_date: Joi.date().greater(Joi.ref('reservation_date')).optional().messages({
        "date.base": "Tanggal Reservasi Berakhir harus berupa tanggal yang valid",
        "date.greater": "Tanggal Reservasi Berakhir harus lebih besar dari Tanggal Reservasi"
    })
})

module.exports = {
    reservationRoomCreationSchema,
    reservationRoomUpdateSchema
}