import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

interface Utilisateur {
  id: number;
  email: string;
  role: string;
}

const roles = ["admin", "gestionnaire", "cordiste"];

const GestionUtilisateurs = () => {
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);
  const [email, setEmail] = useState("");
  const [mot_de_passe, setMotDePasse] = useState("");
  const [role, setRole] = useState("cordiste");

  const roleHeader = localStorage.getItem("role");

  const fetchUtilisateurs = () => {
    axios
      .get("http://localhost:5500/api/utilisateurs", {
        headers: { role: roleHeader },
      })
      .then((res) => setUtilisateurs(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (roleHeader === "admin") {
      fetchUtilisateurs();
    }
  }, [roleHeader]);

  const handleAdd = () => {
    axios
      .post(
        "http://localhost:5500/api/utilisateurs",
        { email, mot_de_passe, role },
        { headers: { role: roleHeader } }
      )
      .then(() => {
        fetchUtilisateurs(); // ✅ Rafraîchissement automatique
        setEmail("");
        setMotDePasse("");
        setRole("cordiste");
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:5500/api/utilisateurs/${id}`, {
        headers: { role: roleHeader },
      })
      .then(() => {
        setUtilisateurs(utilisateurs.filter((u) => u.id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Gestion des utilisateurs
      </Typography>

      <Box mb={3}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Mot de passe"
          value={mot_de_passe}
          onChange={(e) => setMotDePasse(e.target.value)}
          sx={{ mr: 2 }}
        />
        <TextField
          select
          label="Rôle"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          sx={{ mr: 2 }}
        >
          {roles.map((r) => (
            <MenuItem key={r} value={r}>
              {r}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" onClick={handleAdd}>
          Ajouter
        </Button>
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Rôle</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {utilisateurs.map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.id}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(u.id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default GestionUtilisateurs;
