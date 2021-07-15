//import mysql
const mysql = require('mysql2/promise');
//setup .env
require('dotenv').config();

async function setupConnection()
{
    // create the connection to database
    const connection = await mysql.createConnection(process.env.JAWSDB_URL);
    return connection;
}


module.exports.setup = setupConnection;