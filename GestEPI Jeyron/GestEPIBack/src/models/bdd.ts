import mariadb from "mariadb";

export const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "root", // modifie si besoin
  database: "gestepi",
  connectionLimit: 5,
  dateStrings: true,
});

export default pool;
