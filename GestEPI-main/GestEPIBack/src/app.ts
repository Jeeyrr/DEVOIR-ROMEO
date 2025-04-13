import express from "express";
import cors from "cors";
import * as middlewares from "./middlewares";
import EpiRoutes from "./routes/EPI.routes";
import ControleRoutes from "./routes/Controle.routes";
import UtilisateurRoutes from "./routes/Utilisateur.routes";

require("dotenv").config();

const allowedOrigins = ["http://localhost:3000", "http://127.0.0.1:3000"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();

app.use(cors(options));
app.use(express.json());

// Routes API
app.use("/api/epi", EpiRoutes);
app.use("/api/controles", ControleRoutes);
app.use("/api/utilisateurs", UtilisateurRoutes); // <-- le /s est important

// Gestion des erreurs
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
