const Joi = require('joi');

// Schema for validating user registration
const userRegistrationSchema = Joi.object({
    name: Joi.string().min(2).max(30).required().messages({
        "string.empty": "Nama tidak boleh kosong",
        "string.min": "Nama harus memiliki minimal 2 karakter",
        "string.max": "Nama harus memiliki maksimal 30 karakter",
        "any.required": "Nama harus diisi"
    }),

    email: Joi.string().email().required().messages({
        "string.email": "Email tidak valid",
        "string.empty": "Email tidak boleh kosong",
        "any.required": "Email harus diisi"
    }),

    password: Joi.string().min(6).max(50).required().messages({
        "string.empty": "Kata sandi tidak boleh kosong",
        "string.min": "Kata sandi harus memiliki minimal 6 karakter",
        "string.max": "Kata sandi harus memiliki maksimal 50 karakter",
        "any.required": "Kata sandi harus diisi"
    }),

    role: Joi.string().valid('user', 'admin').default('user').messages({
        "any.only": "Peran harus 'user' atau 'admin'",
        "any.required": "Peran harus diisi"
    })
})

// Schmema for Updating user information
const userUpdateSchema = Joi.object({
    name: Joi.string().min(2).max(30).optional().messages({
        "string.empty": "Nama tidak boleh kosong",
        "string.min": "Nama harus memiliki minimal 2 karakter",
        "string.max": "Nama harus memiliki maksimal 30 karakter"
    }),

    email: Joi.string().email().optional().messages({
        "string.email": "Email tidak valid",
        "string.empty": "Email tidak boleh kosong"
    }),

    password: Joi.string().min(6).max(50).optional().messages({
        "string.empty": "Kata sandi tidak boleh kosong",
        "string.min": "Kata sandi harus memiliki minimal 6 karakter",
        "string.max": "Kata sandi harus memiliki maksimal 50 karakter"
    }),

    role: Joi.string().valid('user', 'admin').optional().default('user').messages({
        "any.only": "Peran harus 'user' atau 'admin'"
    })
});

module.exports = {
    userRegistrationSchema,
    userUpdateSchema
}