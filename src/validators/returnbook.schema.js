const Joi = require('joi');

// Schema for validating return book request creation
const returnBookCreationSchema = Joi.object({
    borrowBook_id: Joi.number().integer().required().messages({
        "number.base": "Id Peminjaman Buku harus berupa angka",
        "any.required": "Id Peminjaman Buku harus diisi"
    }),

    return_date: Joi.date().required().messages({
        "date.base": "Tanggal Pengembalian harus berupa tanggal yang valid",
        "any.required": "Tanggal Pengembalian harus diisi"
    }),

    status: Joi.string().valid('On Time', 'Late').required().messages({
        "string.base": "Status harus berupa string",
        "any.only": "Status harus 'On Time' atau 'Late'",
        "any.required": "Status harus diisi"
    })
})

const returnBookUpdateSchema = Joi.object({
    borrowBook_id: Joi.number().integer().required().messages({
        "number.base": "Id Peminjaman Buku harus berupa angka",
        "any.required": "Id Peminjaman Buku harus diisi"
    }),

    return_date: Joi.date().required().messages({
        "date.base": "Tanggal Pengembalian harus berupa tanggal yang valid",
        "any.required": "Tanggal Pengembalian harus diisi"
    }),

    status: Joi.string().valid('On Time', 'Late').required().messages({
        "string.base": "Status harus berupa string",
        "any.only": "Status harus 'On Time' atau 'Late'",
        "any.required": "Status harus diisi"
    })
})

module.exports = {
    returnBookCreationSchema,
    returnBookUpdateSchema
}