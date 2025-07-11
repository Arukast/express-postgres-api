const express = require('express');
const db = require('./models'); // Impor dari folder models
const app = express();
const port = process.env.PORT || 3000

// Uji koneksi database
async function testDbConnection() {
    try {
        await db.sequelize.authenticate();
        console.log('Koneksi ke database berhasil terkoneksi.');
    } catch (error) {
        console.error('Tidak dapat terhubung ke database:', error);
    }
}
testDbConnection();
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});