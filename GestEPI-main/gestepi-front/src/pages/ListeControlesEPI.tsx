import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Toolbar,
  Button,
  Stack,
} from "@mui/material";
import Sidebar from "../components/Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface Controle {
  id: number;
  date: string;
  status: string;
  gestionnaire: string;
  remarques?: string;
}

const ListeControlesEPI = () => {
  const { epiId } = useParams();
  const [controles, setControles] = useState<Controle[]>([]);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    axios
      .get(`http://localhost:5500/api/controles/epi/${epiId}`, {
        headers: { role },
      })
      .then((res) => {
        const formatted = res.data.map((c: Controle) => ({
          ...c,
          date: c.date?.split("T")[0],
        }));
        setControles(formatted);
      })
      .catch((err) => console.error("Erreur chargement contrôles", err));
  }, [epiId, role]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "date", headerName: "Date", width: 130 },
    { field: "status", headerName: "État", width: 160 },
    { field: "gestionnaire", headerName: "Gestionnaire", width: 200 },
    { field: "remarques", headerName: "Remarque", width: 250 },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Typography variant="h5">Contrôles de l’EPI #{epiId}</Typography>
          <Box>
            {/* Bouton retour */}
            <Button
              variant="outlined"
              color="primary"
              sx={{ mr: 2 }}
              onClick={() => navigate("/gestion-epi")}
            >
              Retour aux EPI
            </Button>

            {/* Bouton Ajouter (sauf pour cordiste) */}
            {role !== "cordiste" && (
              <Button
                variant="contained"
                onClick={() => navigate(`/ajout-controle/${epiId}`)}
              >
                Ajouter un contrôle
              </Button>
            )}
          </Box>
        </Stack>

        <Box sx={{ height: 500 }}>
          <DataGrid
            rows={controles}
            columns={columns}
            getRowId={(row) => row.id}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ListeControlesEPI;
