import { useEffect, useState } from "react";
import { EPI as EpiType } from "gestepiinterfacesjeyron";

const Epi = () => {
  const [epis, setEpis] = useState<EpiType[]>([]);
  const [marque, setMarque] = useState("");
  const [modele, setModele] = useState("");
  const [numeroSerie, setNumeroSerie] = useState("");
  const [identifiantPerso, setIdentifiantPerso] = useState("");
  const [taille, setTaille] = useState("");
  const [couleur, setCouleur] = useState("");

  const [idEnEdition, setIdEnEdition] = useState<number | null>(null);
  const [marqueModif, setMarqueModif] = useState("");
  const [modeleModif, setModeleModif] = useState("");
  const [numeroSerieModif, setNumeroSerieModif] = useState("");
  const [identifiantPersoModif, setIdentifiantPersoModif] = useState("");
  const [tailleModif, setTailleModif] = useState("");
  const [couleurModif, setCouleurModif] = useState("");

  const API_URL = "http://localhost:5500/epis";

  useEffect(() => {
    fetchEpis();
  }, []);

  const fetchEpis = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setEpis(data));
  };

  const ajouterEpi = (e: React.FormEvent) => {
    e.preventDefault();
    const newEpi = {
      marque,
      modele,
      numeroSerie,
      identifiantPerso,
      taille,
      couleur,
    };

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEpi),
    }).then(() => {
      fetchEpis();
      setMarque("");
      setModele("");
      setNumeroSerie("");
      setIdentifiantPerso("");
      setTaille("");
      setCouleur("");
    });
  };

  const supprimerEpi = (id: number) => {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    }).then(fetchEpis);
  };

  const lancerEdition = (epi: EpiType) => {
    setIdEnEdition(epi.id);
    setMarqueModif(epi.marque ?? "");
    setModeleModif(epi.modele ?? "");
    setNumeroSerieModif(epi.numeroSerie ?? "");
    setIdentifiantPersoModif(epi.identifiantPerso ?? "");
    setTailleModif(epi.taille ?? "");
    setCouleurModif(epi.couleur ?? "");
  };

  const validerEdition = () => {
    fetch(`${API_URL}/${idEnEdition}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        marque: marqueModif,
        modele: modeleModif,
        numeroSerie: numeroSerieModif,
        identifiantPerso: identifiantPersoModif,
        taille: tailleModif,
        couleur: couleurModif,
      }),
    }).then(() => {
      fetchEpis();
      setIdEnEdition(null);
    });
  };

  return (
    <div>
      <h1>Liste des EPI</h1>
      <table>
        <thead>
          <tr>
            <th>Marque</th>
            <th>Modèle</th>
            <th>Numéro de série</th>
            <th>Identifiant Perso</th>
            <th>Taille</th>
            <th>Couleur</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {epis.map((epi) =>
            idEnEdition === epi.id ? (
              <tr key={epi.id}>
                <td><input value={marqueModif} onChange={(e) => setMarqueModif(e.target.value)} /></td>
                <td><input value={modeleModif} onChange={(e) => setModeleModif(e.target.value)} /></td>
                <td><input value={numeroSerieModif} onChange={(e) => setNumeroSerieModif(e.target.value)} /></td>
                <td><input value={identifiantPersoModif} onChange={(e) => setIdentifiantPersoModif(e.target.value)} /></td>
                <td><input value={tailleModif} onChange={(e) => setTailleModif(e.target.value)} /></td>
                <td><input value={couleurModif} onChange={(e) => setCouleurModif(e.target.value)} /></td>
                <td><button onClick={validerEdition}>Enregistrer</button></td>
              </tr>
            ) : (
              <tr key={epi.id}>
                <td>{epi.marque}</td>
                <td>{epi.modele}</td>
                <td>{epi.numeroSerie}</td>
                <td>{epi.identifiantPerso}</td>
                <td>{epi.taille}</td>
                <td>{epi.couleur}</td>
                <td>
                  <button onClick={() => lancerEdition(epi)}>Modifier</button>
                  <button onClick={() => supprimerEpi(epi.id)}>Supprimer</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <h2>Ajouter un nouvel EPI</h2>
      <form onSubmit={ajouterEpi}>
        <input placeholder="Marque" value={marque} onChange={(e) => setMarque(e.target.value)} required />
        <input placeholder="Modèle" value={modele} onChange={(e) => setModele(e.target.value)} required />
        <input placeholder="Numéro de série" value={numeroSerie} onChange={(e) => setNumeroSerie(e.target.value)} required />
        <input placeholder="Identifiant perso" value={identifiantPerso} onChange={(e) => setIdentifiantPerso(e.target.value)} required />
        <input placeholder="Taille" value={taille} onChange={(e) => setTaille(e.target.value)} required />
        <input placeholder="Couleur" value={couleur} onChange={(e) => setCouleur(e.target.value)} required />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default Epi;
