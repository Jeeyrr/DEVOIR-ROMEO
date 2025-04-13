import React, { useEffect, useState } from "react";
import {
  Box,
  Toolbar,
  Typography,
} from "@mui/material";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface EPI {
  id: number;
  identifiantPersonnalise: string;
  modele: string;
}

const ListeEPIPourControles = () => {
  const [epis, setEpis] = useState<EPI[]>([]);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    axios
      .get("http://localhost:5500/api/epi", { headers: { role } })
      .then((res) => setEpis(res.data))
      .catch((err) => console.error("Erreur chargement EPI", err));
  }, [role]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "identifiantPersonnalise", headerName: "Identifiant", width: 200 },
    { field: "modele", headerName: "Modèle", width: 200 },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h5" gutterBottom>
          Choisissez un EPI pour afficher ses contrôles
        </Typography>
        <Box sx={{ height: 500 }}>
          <DataGrid
            rows={epis}
            columns={columns}
            getRowId={(row) => row.id}
            onRowClick={(params) => navigate(`/controle/${params.row.id}`)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ListeEPIPourControles;
