import express from "express";
import db from "../models/bdd";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, mot_de_passe } = req.body;

  if (!email || !mot_de_passe) {
    return res.status(400).send("Email et mot de passe sont requis");
  }

  try {
    const [results] = await db.query("SELECT * FROM utilisateurs WHERE email = ?", [email]);

    const utilisateurs = results as any[];

    if (utilisateurs.length === 0) {
      return res.status(404).send("Utilisateur non trouvé");
    }

    const utilisateur = utilisateurs[0];

    const isMatch = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);

    if (!isMatch) {
      return res.status(401).send("Mot de passe incorrect");
    }

    return res.status(200).json({
      message: "Connexion réussie",
      utilisateur: {
        id: utilisateur.id,
        email: utilisateur.email,
        role: utilisateur.role,
      },
    });
  } catch (err: any) {
    return res.status(500).send("Erreur de serveur");
  }
});

export default router;
