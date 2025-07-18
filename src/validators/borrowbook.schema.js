const Joi = require('joi');

// Schema for validating borrow book request creation
const borrowBookCreationSchema = Joi.object({
    book_id: Joi.number().integer().required().messages({
        "number.base": "Id Buku harus berupa angka",
        "any.required": "Id Buku harus diisi"
    }),

    user_id: Joi.number().integer().required().messages({
        "number.base": "Id User harus berupa angka",
        "any.required": "Id User harus diisi"
    }),

    borrow_date: Joi.date().required().messages({
        "date.base": "Tanggal Pinjam harus berupa tanggal yang valid",
        "any.required": "Tanggal Pinjam harus diisi"
    }),

    due_date: Joi.date().greater(Joi.ref('borrow_date')).required().messages({
        "date.base": "Tanggal Batas Pinjam harus berupa tanggal yang valid",
        "date.greater": "Tanggal Batas Pinjam harus lebih besar dari Tanggal Pinjam",
        "any.required": "Tanggal Batas Pinjam harus diisi"
    })
})

// Schema for validating borrow book request updates
const borrowBookUpdateSchema = Joi.object({
    book_id: Joi.number().integer().optional().messages({
        "number.base": "Id Buku harus berupa angka"
    }),

    user_id: Joi.number().integer().optional().messages({
        "number.base": "Id User harus berupa angka"
    }),

    borrow_date: Joi.date().optional().messages({
        "date.base": "Tanggal Pinjam harus berupa tanggal yang valid"
    }),

    due_date: Joi.date().greater(Joi.ref('borrow_date')).optional().messages({
        "date.base": "Tanggal Batas Pinjam harus berupa tanggal yang valid",
        "date.greater": "Tanggal Batas Pinjam harus lebih besar dari Tanggal Pinjam"
    })
})

module.exports = {
    borrowBookCreationSchema,
    borrowBookUpdateSchema
}