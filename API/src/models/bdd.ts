import mariadb from "mariadb";


export const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "",
    port: 3307,
    database: "creationapi",
    connectionLimit: 5,
});