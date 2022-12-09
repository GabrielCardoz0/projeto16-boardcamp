import dotenv from "dotenv";

const connection = new Pool({
    connectionString:process.env.DATABASE_URL,
});