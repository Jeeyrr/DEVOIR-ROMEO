// src/components/BoutonRetour.tsx
import React from "react";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const BoutonRetour = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="outlined"
      onClick={() => navigate(-1)}
      startIcon={<ArrowBackIcon />}
      sx={{ mb: 2 }}
    >
      Retour
    </Button>
  );
};

export default BoutonRetour;
