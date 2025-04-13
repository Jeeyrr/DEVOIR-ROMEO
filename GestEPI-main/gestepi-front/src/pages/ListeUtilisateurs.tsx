import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const ListeUtilisateurs = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const navigate = useNavigate();

  const fetchUtilisateurs = () => {
    axios
      .get("http://localhost:5500/api/utilisateurs")
      .then((res) => {
        setUtilisateurs(res.data);
      })
      .catch((err) => console.error("Erreur chargement utilisateurs", err));
  };

  useEffect(() => {
    fetchUtilisateurs();
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm("Confirmer la suppression de l'utilisateur ?")) {
      axios
        .delete(`http://localhost:5500/api/utilisateurs/${id}`)
        .then(() => {
          fetchUtilisateurs(); // 🔁 Refresh après suppression
        })
        .catch((err) => console.error("Erreur suppression utilisateur", err));
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "role", headerName: "Rôle", width: 130 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Modifier"
          onClick={() =>
            navigate(`/modifier-utilisateur/${params.row.id}`)
          }
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Supprimer"
          onClick={() => handleDelete(params.row.id)}
        />,
      ],
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Typography variant="h5">Liste des utilisateurs</Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/ajout-utilisateur")}
          >
            Ajouter un utilisateur
          </Button>
        </Stack>
        <Paper sx={{ height: 500 }}>
          <Button variant="outlined" onClick={() => navigate(-1)} sx={{ m: 2 }}>
            Retour
          </Button>
          <DataGrid
            rows={utilisateurs}
            columns={columns}
            getRowId={(row) => row.id}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default ListeUtilisateurs;
