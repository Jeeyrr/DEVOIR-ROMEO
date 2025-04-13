import React, { useState } from "react";
import {
  Container,
  TextField,
  Typography,
  MenuItem,
  Paper,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const roles = ["admin", "gestionnaire", "cordiste"];

const AjoutUtilisateur = () => {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [role, setRole] = useState("cordiste");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");
    try {
      await axios.post("http://localhost:5500/api/utilisateurs", {
        email,
        mot_de_passe: motDePasse,
        role,
      });

      // ✅ Redirige après ajout
      navigate("/utilisateurs");
    } catch (err: any) {
      console.error("Erreur lors de l'ajout :", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Une erreur est survenue.");
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Ajouter un utilisateur
        </Typography>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Mot de passe"
          type="password"
          fullWidth
          margin="normal"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
        />
        <TextField
          select
          label="Rôle"
          fullWidth
          margin="normal"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          {roles.map((r) => (
            <MenuItem key={r} value={r}>
              {r}
            </MenuItem>
          ))}
        </TextField>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        <Box mt={3} textAlign="center">
          <Button variant="contained" onClick={handleSubmit}>
            Ajouter
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
            sx={{ ml: 2 }}
          >
            Retour
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AjoutUtilisateur;
