const Joi = require('joi');

// Schmema for validating user login
const userLoginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Email tidak valid",
        "string.empty": "Email tidak boleh kosong",
        "any.required": "Email harus diisi"
    }),

    password: Joi.string().required().messages({
        "string.empty": "Kata sandi tidak boleh kosong",
        "any.required": "Kata sandi harus diisi"
    })
})

module.exports = {
    userLoginSchema
}