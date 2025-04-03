import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",         // modifie si tu as un autre utilisateur
  password: "",         // ou "root" si tu as défini un mot de passe
  database: "gestepi",  // le nom de ta base dans phpMyAdmin
});

export default db;
