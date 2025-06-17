import mysql from 'mysql2';
import dotenv from 'dotenv';


dotenv.config();

const dbConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
};

const databaseName = process.env.MYSQL_DATABASE;

const connection = mysql.createConnection(dbConfig);

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL server!');
});

connection.query(`CREATE DATABASE IF NOT EXISTS ${databaseName} `, (err, result) => {
    if (err) throw err;
    console.log(`Database ${databaseName} created`);
});

connection.query(`USE ${databaseName}`, (err, result) => {
    if (err) throw err;
    console.log(`Using database ${databaseName}`);
});

const notesTable = `
CREATE TABLE IF NOT EXISTS community_member_notes (
    id integer PRIMARY KEY AUTO_INCREMENT,
    given_name VARCHAR(50) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    notes VARCHAR(1000) NULL,
    email VARCHAR(254) NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
)`;

connection.query(notesTable, (err, result) => {
    if (err) throw err;
    console.log('Community Member Notes table created');
});

connection.end();
console.log('MySQL connection closed');
