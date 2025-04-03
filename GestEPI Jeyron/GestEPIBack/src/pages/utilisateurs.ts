import express, { Request, Response } from "express";
import db from "../models/bdd";
import bcrypt from "bcryptjs";
import { checkRole } from "../middlewares/checkRole";

const router = express.Router();

// ✅ Récupérer tous les utilisateurs — ADMIN uniquement
router.get("/", checkRole(["admin"]), async (_: Request, res: Response) => {
  try {
    const [results] = await db.query("SELECT id, email, role FROM utilisateurs");
    res.json(results);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// ➕ Créer un utilisateur — ADMIN uniquement
router.post("/", checkRole(["admin"]), async (req: Request, res: Response) => {
  const { email, mot_de_passe, role } = req.body;

  try {
    const hash = await bcrypt.hash(mot_de_passe, 10);
    const [results]: any = await db.query(
      "INSERT INTO utilisateurs (email, mot_de_passe, role) VALUES (?, ?, ?)",
      [email, hash, role]
    );

    res.status(201).json({ id: results.insertId });
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// ❌ Supprimer un utilisateur — ADMIN uniquement
router.delete("/:id", checkRole(["admin"]), async (req: Request, res: Response) => {
  try {
    await db.query("DELETE FROM utilisateurs WHERE id = ?", [req.params.id]);
    res.sendStatus(204);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

export default router;
