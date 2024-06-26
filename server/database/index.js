import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.DBPORT,
  database: "yelp",
});
