import React, { useState } from "react";
import {
  Box,
  Typography,
  Toolbar,
  TextField,
  Button,
  MenuItem,
  Stack,
} from "@mui/material";
import Sidebar from "../components/Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AjoutControle = () => {
  const { epiId } = useParams();
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("conforme");
  const [remarques, setRemarques] = useState(""); // 🆕 remarque
  const navigate = useNavigate();
  const gestionnaire = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:5500/api/controles",
        {
          date,
          status,
          remarques, // 🆕 on envoie la remarque
          gestionnaire,
          epiId: Number(epiId),
        },
        {
          headers: { role },
        }
      );
      navigate(`/controle/${epiId}`);
    } catch (err) {
      console.error("Erreur ajout contrôle", err);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h5" mb={2}>
          Ajouter un contrôle à l’EPI #{epiId}
        </Typography>
        <Stack spacing={2} maxWidth={400}>
          <TextField
            label="Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
          />
          <TextField
            select
            label="État"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
          >
            <MenuItem value="conforme">Conforme</MenuItem>
            <MenuItem value="non conforme">Non Conforme</MenuItem>
          </TextField>
          <TextField
            label="Remarques"
            value={remarques}
            onChange={(e) => setRemarques(e.target.value)}
            fullWidth
            multiline
            rows={3}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Ajouter
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default AjoutControle;
