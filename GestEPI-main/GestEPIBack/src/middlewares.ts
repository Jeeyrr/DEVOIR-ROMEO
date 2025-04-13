//********** Imports **********//
import { NextFunction, Request, Response } from "express";
import ErrorResponse from "./pages/interfaces/ErrorResponse";

//********** Middlewares **********//

// 404 Not Found handler
export const notFound = (
  request: Request,
  response: Response,
  nextFunction: NextFunction
) => {
  response.status(404);
  const error = new Error(`Not found - ${request.originalUrl}`);
  nextFunction(error);
};

// Global error handler
export const errorHandler = (
  error: Error,
  request: Request,
  response: Response<ErrorResponse>,
  nextFunction: NextFunction
) => {
  const statusCode = response.statusCode !== 200 ? response.statusCode : 500;
  response
    .status(statusCode)
    .json({ message: error.message, stack: error.stack });
};

// Middleware de rôle personnalisé
export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.headers['role'] as string;
    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({ message: "Accès refusé : rôle insuffisant" });
    }
    next();
  };
};

// Middleware spécifique pour administrateur uniquement
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const role = req.headers['role'] as string;
  if (role !== "admin") {
    return res.status(403).json({ message: "Accès réservé à l'administrateur" });
  }
  next();
};
