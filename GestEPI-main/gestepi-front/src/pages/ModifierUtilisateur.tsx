import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  MenuItem,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ModifierUtilisateur = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");

  useEffect(() => {
    axios
      .get(`http://localhost:5500/api/utilisateurs/${id}`)
      .then((res) => {
        const utilisateur = res.data;
        setEmail(utilisateur.email);
        setRole(utilisateur.role);
      })
      .catch((err) => console.error("Erreur chargement utilisateur", err));
  }, [id]);

  const handleUpdate = () => {
    const dataToUpdate: any = {
      email,
      role,
    };
  
    if (password.trim() !== "") {
      dataToUpdate.mot_de_passe = password;
    }
  
    axios
      .put(`http://localhost:5500/api/utilisateurs/${id}`, dataToUpdate)
      .then(() => navigate("/utilisateurs"))
      .catch((err) => console.error("Erreur modification utilisateur", err));
  };
  

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Modifier l’utilisateur
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Mot de passe (laisser vide pour ne pas changer)"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          select
          label="Rôle"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <MenuItem value="admin">Administrateur</MenuItem>
          <MenuItem value="gestionnaire">Gestionnaire</MenuItem>
          <MenuItem value="cordiste">Cordiste</MenuItem>
        </TextField>
        <Box textAlign="center" mt={2}>
          <Button variant="contained" onClick={handleUpdate}>
            Enregistrer les modifications
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ModifierUtilisateur;
