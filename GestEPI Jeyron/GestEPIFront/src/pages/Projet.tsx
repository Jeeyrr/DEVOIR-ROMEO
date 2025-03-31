import { Projet as ProjetType } from "gestepiinterfacesjeyron";
import { useState } from "react";
import ProjetRow from "../components/ProjetRow";
import "./Projet.css";


const projetsMock: ProjetType[] = [
  { id: 1, nom: "Site Vitrine", statut: "En cours" },
  { id: 2, nom: "Appli Mobile", statut: "Terminé" },
  { id: 3, nom: "Gestion RH", statut: "En attente" },
];

const Projet = () => {
  const [projets, setProjets] = useState<ProjetType[]>(projetsMock);
  const [nom, setNom] = useState("");
  const [statut, setStatut] = useState("");

  const [idEnEdition, setIdEnEdition] = useState<number | null>(null);
  const [nomModif, setNomModif] = useState("");
  const [statutModif, setStatutModif] = useState("");

  const supprimerProjet = (id: number) => {
    const projetsFiltres = projets.filter((projet) => projet.id !== id);
    setProjets(projetsFiltres);
  };

  const lancerEdition = (projet: ProjetType) => {
    setIdEnEdition(projet.id);
    setNomModif(projet.nom);
    setStatutModif(projet.statut);
  };

  const validerEdition = () => {
    const projetsModifies = projets.map((projet) =>
      projet.id === idEnEdition
        ? { ...projet, nom: nomModif, statut: statutModif }
        : projet
    );

    setProjets(projetsModifies);
    setIdEnEdition(null);
    setNomModif("");
    setStatutModif("");
  };

  return (
    <div>
      <h1>Liste des Projets EPI</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projets.map((projet) =>
            idEnEdition === projet.id ? (
              <tr key={projet.id}>
                <td>{projet.id}</td>
                <td>
                  <input
                    type="text"
                    value={nomModif}
                    onChange={(e) => setNomModif(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={statutModif}
                    onChange={(e) => setStatutModif(e.target.value)}
                  />
                </td>
                <td>
                  <button onClick={validerEdition}>Enregistrer</button>
                </td>
              </tr>
            ) : (
              <ProjetRow
                key={projet.id}
                projet={projet}
                onDelete={supprimerProjet}
                onEdit={() => lancerEdition(projet)}
              />
            )
          )}
        </tbody>
      </table>

      <h2>Ajouter un nouveau projet</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const newProjet = {
            id: projets.length + 1,
            nom,
            statut,
          };

          setProjets([...projets, newProjet]);
          setNom("");
          setStatut("");
        }}
      >
        <div>
          <label>Nom :</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Statut :</label>
          <input
            type="text"
            value={statut}
            onChange={(e) => setStatut(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default Projet;
