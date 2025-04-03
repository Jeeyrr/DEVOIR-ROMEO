import express from "express";
import db from "../models/bdd";
import { checkRole } from "../middlewares/checkRole"; // 👈 on importe le middleware

const router = express.Router();

// ✅ Voir tous les contrôles — Cordiste, Gestionnaire, Admin
router.get("/", checkRole(["cordiste", "gestionnaire", "admin"]), async (_, res) => {
  try {
    const [results] = await db.query("SELECT * FROM controles");
    res.json(results);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// ➕ Ajouter un contrôle — Gestionnaire, Admin uniquement
router.post("/", checkRole(["gestionnaire", "admin"]), async (req, res) => {
  const { date, conformite, commentaire, idEpi } = req.body;
  const query = "INSERT INTO controles (date, conformite, commentaire, idEpi) VALUES (?, ?, ?, ?)";

  try {
    const [results] = await db.query(query, [date, conformite, commentaire, idEpi]);
    res.status(201).json({ id: (results as any).insertId });
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

export default router;
