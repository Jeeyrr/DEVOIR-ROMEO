//********** Imports **********//
import express from "express";
import cors from "cors";
import * as middlewares from "./middlewares";
import loginRoutes from "./pages/login";
import routeEpi from "./pages/epi";
import routeUtilisateurs from "./pages/utilisateurs";
import routeControles from "./pages/controles";

require("dotenv").config();

//********** Server **********//
const allowedOrigins = ["http://localhost:3000", "http://127.0.0.1:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

// Initializing express
const app = express();

// Enable CORS
app.use(cors(options));

// Middleware to parse json through requests
app.use(express.json());

// 💡 Routes API
app.use("/login", loginRoutes);
app.use("/api/epis", routeEpi);
app.use("/api/utilisateurs", routeUtilisateurs);
app.use("/api/controles", routeControles);

// Gestion des erreurs
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
