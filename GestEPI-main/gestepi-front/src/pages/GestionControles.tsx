import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Toolbar,
  IconButton,
  Tooltip,
  Stack,
} from "@mui/material";
import Sidebar from "../components/Sidebar";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

interface Controle {
  id: number;
  date: string;
  gestionnaire: string;
  epiId: number;
  status: "conforme" | "à_réparer" | "hors_service";
}

const GestionControles = () => {
  const [controles, setControles] = useState<Controle[]>([]);
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5500/api/controles", { headers: { role } })
      .then((res) => {
        const formatted = res.data.map((c: Controle) => ({
          ...c,
          date: c.date?.split("T")[0],
        }));
        setControles(formatted);
      })
      .catch((err) => console.error("Erreur chargement contrôles", err));
  }, []);

  const supprimerControle = (id: number) => {
    if (!window.confirm("Supprimer ce contrôle ?")) return;

    axios
      .delete(`http://localhost:5500/api/controles/${id}`, { headers: { role } })
      .then(() => setControles(controles.filter((c) => c.id !== id)))
      .catch((err) => console.error("Erreur suppression", err));
  };

  const colonnes: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "epiId", headerName: "ID EPI", width: 100 },
    { field: "gestionnaire", headerName: "Gestionnaire", width: 200 },
    { field: "date", headerName: "Date", width: 120 },
    {
      field: "status",
      headerName: "État",
      width: 150,
      valueFormatter: (params: any) => {
        switch (params.value) {
          case "conforme":
            return "✅ Conforme";
          case "à_réparer":
            return "🛠️ À réparer";
          case "hors_service":
            return "❌ Hors service";
          default:
            return params.value;
        }
      },
    },
    ...(role === "gestionnaire"
      ? [
          {
            field: "actions",
            headerName: "Actions",
            width: 120,
            renderCell: (params:any) => (
              <Stack direction="row" spacing={1}>
                <Tooltip title="Modifier">
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() =>
                      navigate(`/modif-controle/${params.row.id}`)
                    }
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Supprimer">
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => supprimerControle(params.row.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            ),
          },
        ]
      : []),
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h5" gutterBottom>
          Liste des contrôles
        </Typography>
        <Box sx={{ height: 500 }}>
          <DataGrid
            rows={controles}
            columns={colonnes}
            getRowId={(row) => row.id}
            pageSizeOptions={[5, 10, 25, 100]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default GestionControles;
