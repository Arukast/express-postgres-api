// const express = require('express');
// const db = require('./models'); // Impor dari folder models
// const app = express();
// const port = process.env.PORT || 3000

// // Uji koneksi database
// async function testDbConnection() {
//     try {
//         await db.sequelize.authenticate();
//         console.log('Koneksi ke database berhasil terkoneksi.');
//     } catch (error) {
//         console.error('Tidak dapat terhubung ke database:', error);
//     }
// }
// testDbConnection();
// app.listen(port, () => {
//     console.log(`Server berjalan di http://localhost:${port}`);
// });

require('dotenv').config();
const express = require('express');
const db = require('./models');
const userRoutes = require('./src/routes/user.routes');
const bookRoutes = require('./src/routes/book.routes');
const borrowRoutes = require('./src/routes/borrowbook.routes');
const returnBookRoutes = require('./src/routes/returnbook.routes');
const reservationRoomRoutes = require('./src/routes/reservationroom.routes');
const authRoutes = require('./src/routes/auth.routes');

const app = express();
// Middleware untuk mem-parsing request body JSON
app.use(express.json());
// Middleware untuk mem-parsing request body URL-encoded
app.use(express.urlencoded({ extended: true }));
// Route sederhana untuk pengujian awal
app.get('/', (req, res) => {
    res.json({ message: 'Selamat datang di API aplikasi.' });
});
// Mendaftarkan user routes dengan prefiks /api/users
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/borrow-books', borrowRoutes);
app.use('/api/return-books', returnBookRoutes);
app.use('/api/reservation-room', reservationRoomRoutes);
app.use('/api/auth', authRoutes);
// Sinkronisasi database (opsional, lebih baik menggunakan migrasi di produksi)
// db.sequelize.sync();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}.`);
});