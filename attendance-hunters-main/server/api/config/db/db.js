    require('dotenv').config(); 

    const { Pool } = require('pg');

    const pool = new Pool({
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        password: process.env.PG_PASSWORD,
        port: process.env.PG_PORT,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        logging: false,
        
    });

    // Example: Connecting and querying
    async function connectAndQuery() {
        try {
            const client = await pool.connect();
            console.log('Connected to PostgreSQL!');

            // Example query
            const res = await client.query('SELECT NOW()');
            console.log('Current time from DB:', res.rows[0].now);

            client.release(); // Release the client back to the pool
        } catch (err) {
            console.error('Error connecting or querying:', err);
        } finally {
            // Optional: Close the pool when the application exits
            // pool.end();
        }
    }

    connectAndQuery();
module.exports = connectAndQuery;