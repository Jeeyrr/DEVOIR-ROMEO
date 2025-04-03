import express from "express";
import db from "../models/bdd";
import { checkRole } from "../middlewares/checkRole";

const router = express.Router();

// ✅ Lecture (consultation) — Cordiste, Gestionnaire, Admin
router.get("/", checkRole(["cordiste", "gestionnaire", "admin"]), async (_req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM epis");
    res.json(results);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// ➕ Ajouter un EPI — Gestionnaire uniquement
router.post("/", checkRole(["gestionnaire"]), async (req, res) => {
  const { marque, modele, numeroSerie, identifiantPerso, taille, couleur } = req.body;
  const query = `
    INSERT INTO epis (marque, modele, numeroSerie, identifiantPerso, taille, couleur)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  try {
    const [results] = await db.query(query, [marque, modele, numeroSerie, identifiantPerso, taille, couleur]);
    res.status(201).json({ id: (results as any).insertId });
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// ✏️ Modifier un EPI — Gestionnaire uniquement
router.put("/:id", checkRole(["gestionnaire"]), async (req, res) => {
  const { id } = req.params;
  const { marque, modele, numeroSerie, identifiantPerso, taille, couleur } = req.body;
  const query = `
    UPDATE epis SET marque = ?, modele = ?, numeroSerie = ?, identifiantPerso = ?, taille = ?, couleur = ?
    WHERE id = ?
  `;
  try {
    await db.query(query, [marque, modele, numeroSerie, identifiantPerso, taille, couleur, id]);
    res.sendStatus(204);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// ❌ Supprimer un EPI — Gestionnaire uniquement
router.delete("/:id", checkRole(["gestionnaire"]), async (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM epis WHERE id = ?";
  try {
    await db.query(query, [id]);
    res.sendStatus(204);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

export default router;
