import { Request, Response } from 'express';
import { ControleManager } from '../../managers/ControleManager';

export class ControleController {
    static async getAll(req: Request, res: Response) {
        try {
            const controles = await ControleManager.findAll();
            res.json(controles);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des contrôles" });
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const newControle = await ControleManager.create(req.body);
            res.status(201).json({ message: "Contrôle ajouté avec succès", data: newControle });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la création du contrôle" });
        }
    }

    static async findById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const controle = await ControleManager.findById(id);
            controle ? res.json(controle) : res.status(404).json({ message: "Contrôle non trouvé" });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération du contrôle" });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const updatedControle = await ControleManager.update(id, req.body);
            updatedControle ? res.json({ message: "Contrôle modifié", data: updatedControle }) : res.status(404).json({ message: "Contrôle non trouvé" });
        } catch (error) {
            res.status(500).json({ message: "Erreur mise à jour" });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const deleted = await ControleManager.delete(id);
            deleted ? res.json({ message: "Contrôle supprimé" }) : res.status(404).json({ message: "Contrôle non trouvé" });
        } catch (error) {
            res.status(500).json({ message: "Erreur suppression" });
        }
    }

    // ✅ Nouvelle méthode pour récupérer les contrôles par EPI
    static async getByEpiId(req: Request, res: Response) {
        try {
            const epiId = parseInt(req.params.epiId);
            const controles = await ControleManager.findByEpiId(epiId);
            res.json(controles);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des contrôles de l'EPI" });
        }
    }
}
