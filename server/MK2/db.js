const sql = require('mssql');
require('dotenv').config();

const config = {
    server: process.env.MK2_DB_SERVER,
    user: process.env.MK2_DB_USER,
    password: process.env.MK2_DB_PASSWORD,
    database: process.env.MK2_DB_DATABASE,
    port: Number.parseInt(process.env.MK2_DB_PORT, 10),
    options: { encrypt: false, trustServerCertificate: true }
};

const poolPromise = new sql.ConnectionPool(config)
.connect()
.then(pool => {
    console.log('Connected to MSSQL');
    return pool;
})
.catch(err => console.log('Database Connection Failed! Bad Config:', err));

module.exports={
    sql,poolPromise
};