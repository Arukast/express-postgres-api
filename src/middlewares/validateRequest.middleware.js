const Joi = require('joi');

const validateRequest = (schema, property = 'body') => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[property], {
            abortEarly: false, // Laporkan semua kesalahan, bukan hanya yang pertama
            stripUnknown: true // Menghapus properti yang tidak ada di schema
        });
        if (error) {
            const errorDetails = error.details.map(detail => detail.message);
            // Nanti kita akan refactor ini untuk menggunakan error handler terpusat
            return res.status(400).json({error: errorDetails});
        }
        // Ganti data asli dengan data yang sudah divalidasi (termasuk koersi tipe & nilai default)
        req[property] = value;
        next();
    };
};

module.exports = validateRequest;