// config/db.js
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

// Connect to MySQL server
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1);
    }

    console.log('Connected to MySQL server.');

    // Create the database if it doesn't exist
    connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`, (err) => {
        if (err) {
            console.error('Error creating database:', err);
            process.exit(1);
        }
        console.log(`Database ${process.env.DB_NAME} ready or already exists.`);

        // Use the created database
        connection.query(`USE ${process.env.DB_NAME}`, (err) => {
            if (err) {
                console.error('Error selecting database:', err);
                process.exit(1);
            }

            // Create the schools table if it doesn't exist
            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS schools (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    address VARCHAR(255) NOT NULL,
                    latitude FLOAT NOT NULL,
                    longitude FLOAT NOT NULL
                );
            `;

            connection.query(createTableQuery, (err) => {
                if (err) {
                    console.error('Error creating table:', err);
                    process.exit(1);
                }
                console.log('Table `schools` is ready or already exists.');
            });
        });
    });
});

module.exports = connection;
