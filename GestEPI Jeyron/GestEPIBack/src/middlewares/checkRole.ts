import { Request, Response, NextFunction } from "express";

export const checkRole = (rolesAutorises: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const utilisateur = req.body.utilisateur;

    if (!utilisateur || !rolesAutorises.includes(utilisateur.role)) {
      return res.status(403).json({ message: "Accès refusé. Rôle insuffisant." });
    }

    next();
  };
};
