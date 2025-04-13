import { Request, Response } from "express";
import { UtilisateurManager } from "../../managers/UtilisateurManager";

export class UtilisateurController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await UtilisateurManager.findByEmail(email);

      if (!user) {
        return res.status(401).json({ message: "Email incorrect" });
      }

      if (user.mot_de_passe !== password) {
        return res.status(401).json({ message: "Mot de passe incorrect" });
      }

      return res.status(200).json({ role: user.role });
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const users = await UtilisateurManager.findAll();
      return res.status(200).json(users);
    } catch (error) {
      console.error("Erreur getAll utilisateurs :", error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  }

  static async create(req: Request, res: Response) {
    const { email, mot_de_passe, role } = req.body;
    try {
      const user = await UtilisateurManager.create(email, mot_de_passe, role);
      return res.status(201).json({
        message: "Utilisateur créé avec succès",
        data: user,
      });
    } catch (error) {
      console.error("Erreur create utilisateur :", error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  }

  static async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "ID invalide" });

    try {
      const updated = await UtilisateurManager.update(id, req.body);
      if (updated) {
        return res.status(200).json({
          message: "Utilisateur mis à jour avec succès",
          data: updated,
        });
      } else {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
    } catch (error) {
      console.error("Erreur update utilisateur :", error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  }

  static async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "ID invalide" });

    try {
      const deleted = await UtilisateurManager.delete(id);
      if (deleted) {
        return res.status(200).json({ message: "Utilisateur supprimé avec succès" });
      } else {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
    } catch (error) {
      console.error("Erreur delete utilisateur :", error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  }
}
