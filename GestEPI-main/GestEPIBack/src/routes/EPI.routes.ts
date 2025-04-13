import { Router } from "express";
import { EPIController } from "../pages/controllers/EPIController";
import { authorizeRoles } from "../middlewares";

const router = Router();

router.get("/", authorizeRoles("gestionnaire", "cordiste"), EPIController.getAll);
router.post("/", authorizeRoles("gestionnaire"), EPIController.create);
router.get("/:id", authorizeRoles("gestionnaire", "cordiste"), EPIController.findById);
router.put("/:id", authorizeRoles("gestionnaire"), EPIController.update);
router.delete("/:id", authorizeRoles("gestionnaire"), EPIController.delete);

export default router;
