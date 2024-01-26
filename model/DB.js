const mysql = require('mysql');

const DBconfigs = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: '',
    port: +process.env.DB_PORT,
    database: process.env.DB_NAME,

}


const con = mysql.createConnection(DBconfigs)


const connecting = () => {
    con.connect(err => {
        if (err) {
            console.log(err);
            process.exit(1);
        } else {
            console.log('Connected to the database => ' + DBconfigs.database);
        }
    });
    let query = `CREATE TABLE IF NOT EXISTS user (
        Id       INT AUTO_INCREMENT PRIMARY KEY,
        Username VARCHAR(100) NOT NULL,
        Email    VARCHAR(100) NOT NULL unique,
        Password VARCHAR(255) NOT NULL,
        Refresh_token VARCHAR(255)
        );`

    con.query(query, (err, res) => {
        if (err) {
            console.log(err);
        }
    })
   
}

module.exports = {
    con, connecting
}