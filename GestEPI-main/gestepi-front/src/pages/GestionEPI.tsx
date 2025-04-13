import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Typography,
  Toolbar,
  IconButton,
  Tooltip,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

interface EPI {
  id: number;
  marque: string;
  modele: string;
  numeroSerie: string;
  identifiantPersonnalise: string;
  taille?: string;
  couleur?: string;
  dateAchat: string;
  dateFabrication: string;
  dateMiseEnService: string;
  periodiciteControle: number;
}

const GestionEPI = () => {
  const [epis, setEpis] = useState<EPI[]>([]);
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    chargerEPI();
  }, []);

  const chargerEPI = () => {
    axios
      .get("http://localhost:5500/api/epi", {
        headers: { role },
      })
      .then((res) => {
        const formattedData = res.data.map((epi: EPI) => ({
          ...epi,
          dateAchat: epi.dateAchat?.split("T")[0],
          dateFabrication: epi.dateFabrication?.split("T")[0],
          dateMiseEnService: epi.dateMiseEnService?.split("T")[0],
        }));
        setEpis(formattedData);
      })
      .catch((err) => console.error("Erreur chargement EPI", err));
  };

  const supprimerEPI = (id: number) => {
    if (!window.confirm("Confirmer la suppression de cet EPI ?")) return;

    axios
      .delete(`http://localhost:5500/api/epi/${id}`, {
        headers: { role },
      })
      .then(() => {
        chargerEPI();
      })
      .catch((err) => console.error("Erreur suppression EPI", err));
  };

  const colonnes: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "identifiantPersonnalise", headerName: "ID interne", width: 130 },
    { field: "marque", headerName: "Marque", width: 130 },
    { field: "modele", headerName: "Modèle", width: 130 },
    { field: "taille", headerName: "Taille", width: 90 },
    { field: "couleur", headerName: "Couleur", width: 90 },
    { field: "dateAchat", headerName: "Date d'achat", width: 120 },
    { field: "dateFabrication", headerName: "Date de fab.", width: 120 },
    { field: "dateMiseEnService", headerName: "Date mise en service", width: 160 },
    { field: "periodiciteControle", headerName: "Périodicité (jours)", width: 140 },
    ...(role === "gestionnaire"
      ? [
          {
            field: "actions",
            headerName: "Actions",
            width: 100,
            sortable: false,
            filterable: false,
            renderCell: (params:any) => (
              <Stack direction="row" spacing={1}>
                <Tooltip title="Modifier">
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => navigate(`/modif-epi/${params.row.id}`)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Supprimer">
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => supprimerEPI(params.row.id)}
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
          Liste des EPI
        </Typography>

        {role === "gestionnaire" && (
          <Button
            variant="contained"
            color="primary"
            sx={{ mb: 2 }}
            onClick={() => navigate("/ajout-epi")}
          >
            ➕ Ajouter un EPI
          </Button>
        )}

        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={epis ?? []}
            columns={colonnes}
            getRowId={(row) => row.id}
            pageSizeOptions={[5, 10, 25, 100]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10, page: 0 },
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default GestionEPI;
