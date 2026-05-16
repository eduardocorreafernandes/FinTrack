import dotenv from 'dotenv';
import pkg from 'pg';
dotenv.config();
const { Pool } = pkg;
const dbUser = process.env.DB_USER || 'postgres';
const dbHost = process.env.DB_HOST || 'localhost';
const dbName = process.env.DB_NAME || 'postgres';
const dbPass = process.env.DB_PASS;
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432;

if (!dbPass) {
	console.warn('Warning: DB_PASS is not set. Database connection may fail if your DB requires a password.');
}

export const pool = new Pool({
	user: dbUser,
	host: dbHost,
	database: dbName,
	password: dbPass != null ? String(dbPass) : '',
	port: dbPort,
});