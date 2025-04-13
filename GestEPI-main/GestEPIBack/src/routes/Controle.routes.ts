import { Router } from "express";
import { ControleController } from "../pages/controllers/ControleController";
import { authorizeRoles } from "../middlewares";

const router = Router();

router.get("/", authorizeRoles("gestionnaire", "cordiste"), ControleController.getAll);
router.post("/", authorizeRoles("gestionnaire"), ControleController.create);

// Ajout pour récupération des contrôles par ID EPI
router.get("/epi/:epiId", authorizeRoles("gestionnaire", "cordiste"), ControleController.getByEpiId);

export default router;
