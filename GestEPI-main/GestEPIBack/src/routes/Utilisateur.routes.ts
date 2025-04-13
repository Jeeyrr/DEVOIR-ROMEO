import express from "express";
import { UtilisateurController } from "../pages/controllers/UtilisateurController";
import { isAdmin } from "../middlewares";

const router = express.Router();

// 🔐 Connexion (ouverte à tous)
router.post("/login", UtilisateurController.login);

// ✅ Routes protégées : admin uniquement
router.get("/", isAdmin, UtilisateurController.getAll);
router.post("/", isAdmin, UtilisateurController.create);
router.put("/:id", isAdmin, UtilisateurController.update);
router.delete("/:id", isAdmin, UtilisateurController.delete);

export default router;
