const Joi = require('joi');

// Schema for validating Book creation
const bookCreationSchema = Joi.object({
    title: Joi.string().min(1).max(100).required().messages({
        "string.empty": "Judul tidak boleh kosong",
        "string.min": "Judul harus memiliki minimal 1 karakter",
        "string.max": "Judul harus memiliki maksimal 100 karakter",
        "any.required": "Judul harus diisi"
    }),

    author: Joi.string().min(1).max(50).required().messages({
        "string.empty": "Author tidak boleh kosong",
        "string.min": "Author harus memiliki minimal 1 karakter",
        "string.max": "Author harus memiliki maksimal 50 karakter",
        "any.required": "Author harus diisi"
    }),

    quantity: Joi.number().integer().min(0).required().messages({
        "number.base": "Kuantitas harus berupa angka",
        "number.integer": "Kuantitas harus berupa bilangan bulat",
        "number.min": "Kuantitas harus minimal 0",
        "any.required": "Kuantitas harus diisi"
    })
})

// Schema for validating Book updates
const bookUpdateSchema = Joi.object({
    title: Joi.string().min(1).max(100).optional().messages({
        "string.empty": "Judul tidak boleh kosong",
        "string.min": "Judul harus memiliki minimal 1 karakter",
        "string.max": "Judul harus memiliki maksimal 100 karakter"
    }),

    author: Joi.string().min(1).max(50).optional().messages({
        "string.empty": "Author tidak boleh kosong",
        "string.min": "Author harus memiliki minimal 1 karakter",
        "string.max": "Author harus memiliki maksimal 50 karakter"
    }),

    quantity: Joi.number().integer().min(0).optional().messages({
        "number.base": "Kuantitas harus berupa angka",
        "number.integer": "Kuantitas harus berupa bilangan bulat",
        "number.min": "Kuantitas harus minimal 0"
    })
})

module.exports = {
    bookCreationSchema,
    bookUpdateSchema
}