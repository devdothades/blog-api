import pg from "pg";
import dotenv from "dotenv";
dotenv.configDotenv();

const { Pool } = pg;

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

const createTable = async () => {
    const query =
        "CREATE TABLE BlogArticle (id  SERIAL PRIMARY KEY ,title VARCHAR(255) NOT NULL,introduction TEXT NOT NULL,body TEXT NOT NULL,images TEXT,links TEXT,conclusion TEXT,author_bio TEXT,comments TEXT,tags VARCHAR(255));";
    console.log("created succesfully");
    try {
        await pool.connect();
        // await pool.query(`DROP DATABASE IF EXISTS ${process.env.DB_DATABASE}`);
        await pool.query(query);
        await pool.end();
    } catch (error) {
        console.error(error);
    }
};

export default pool;
