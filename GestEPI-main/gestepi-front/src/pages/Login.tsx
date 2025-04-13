import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5500/api/utilisateurs/login", {
        email,
        password,
      });

      const { role } = res.data;
      localStorage.setItem("role", role);
      localStorage.setItem("email", email);
      navigate("/gestion-epi");
    } catch (err) {
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Connexion
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
          label="Mot de passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}
        <Box textAlign="center" mt={2}>
          <Button variant="contained" onClick={handleLogin}>
            Se connecter
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
