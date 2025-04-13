import { Request, Response } from 'express';
import { EPIManager } from '../../managers/EPIManager';
import { toJson } from '../../functions/functions';

export class EPIController {
    static async getAll(req: Request, res: Response) {
        try {
            const epis = await EPIManager.findAll();
            res.json(epis);
        } catch (error) {
            res.status(500).json({
                message: "Erreur lors de la récupération des EPIs",
                stack: error instanceof Error ? error.stack : undefined
            });
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const newEPI = await EPIManager.create(req.body);
            res.status(201).json({
                message: "EPI ajouté avec succès",
                data: newEPI
            });
        } catch (error) {
            res.status(500).json({
                message: "Erreur lors de la création de l'EPI",
                stack: error instanceof Error ? error.stack : undefined
            });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const updatedEPI = await EPIManager.update(id, req.body);
            if (updatedEPI) {
                res.json({
                    message: "EPI modifié avec succès",
                    data: updatedEPI
                });
            } else {
                res.status(404).json({
                    message: "EPI non trouvé"
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Erreur lors de la mise à jour de l'EPI",
                stack: error instanceof Error ? error.stack : undefined
            });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const deleted = await EPIManager.delete(id);
            if (deleted) {
                res.status(200).json({
                    message: "EPI supprimé avec succès"
                });
            } else {
                res.status(404).json({
                    message: "EPI non trouvé"
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Erreur lors de la suppression de l'EPI",
                stack: error instanceof Error ? error.stack : undefined
            });
        }
    }

    static async findById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const epi = await EPIManager.findById(id);
            if (epi) {
                res.json(epi);
            } else {
                res.status(404).json({
                    message: "EPI non trouvé"
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Erreur lors de la récupération de l'EPI",
                stack: error instanceof Error ? error.stack : undefined
            });
        }
    }
}