const mysql = require('mysql');

const pool  = mysql.createPool({
    connectionLimit : 1000,
    host            : "localhost",
    user            : "forge",
    password        : "DX21M0KxKtADdUEYq9ca",
    database: "barefoot_db",
});

export default pool;