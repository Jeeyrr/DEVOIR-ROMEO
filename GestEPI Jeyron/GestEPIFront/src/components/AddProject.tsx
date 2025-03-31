import { useState } from "react";
import { TextField, Button } from "@mui/material";

const AddProject = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const handleAdd = () => {
    console.log("Projet ajouté :", name, status);
  };

  return (
    <div>
      <h2>Ajouter un projet</h2>
      <TextField
        label="Nom du projet"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />
      <TextField
        label="Statut"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <br /><br />
      <Button variant="contained" onClick={handleAdd}>
        Ajouter
      </Button>
    </div>
  );
};

export default AddProject;
