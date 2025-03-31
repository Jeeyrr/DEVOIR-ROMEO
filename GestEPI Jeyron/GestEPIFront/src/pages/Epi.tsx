import { useState } from "react";
import { EPI as EpiType } from "gestepiinterfacesjeyron";

const epiMock: EpiType[] = [
    {
        id: 1,
        marque: "Casque",
        modele: "ProSecure 3000",
        numeroSerie: "ABC123",
        identifiantPerso: "12345",
        taille: "M",
        couleur: "Jaune",
    },
    {
        id: 2,
        marque: "Gants",
        modele: "GripX",
        numeroSerie: "XYZ456",
        identifiantPerso: "67890",
        taille: "L",
        couleur: "Noir",
    },
];

const Epi = () => {
    const [epis, setEpis] = useState<EpiType[]>(epiMock);
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

    const supprimerEpi = (id: number) => {
        const newList = epis.filter((epi) => epi.id !== id);
        setEpis(newList);
    };
    const lancerEdition = (epi: EpiType) => {
        setIdEnEdition(epi.id);
        setMarqueModif(epi.marque);
        setModeleModif(epi.modele);
        setNumeroSerieModif(epi.numeroSerie);
        setIdentifiantPersoModif(epi.identifiantPerso);
        setTailleModif(epi.taille ?? "");
        setCouleurModif(epi.couleur ?? "");

    };
    const validerEdition = () => {
        const episModifies = epis.map((epi) =>
            epi.id === idEnEdition
                ? {
                    ...epi,
                    marque: marqueModif,
                    modele: modeleModif,
                    numeroSerie: numeroSerieModif,
                    identifiantPerso: identifiantPersoModif,
                    taille: tailleModif,
                    couleur: couleurModif,
                }
                : epi
        );

        setEpis(episModifies);
        setIdEnEdition(null);
        setMarqueModif("");
        setModeleModif("");
        setNumeroSerieModif("");
        setIdentifiantPersoModif("");
        setTailleModif("");
        setCouleurModif("");
    };

    return (
        <div>
            <h1>Liste des EPI</h1>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
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
                                <td>{epi.id}</td>
                                <td>
                                    <input
                                        value={marqueModif}
                                        onChange={(e) => setMarqueModif(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        value={modeleModif}
                                        onChange={(e) => setModeleModif(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        value={numeroSerieModif}
                                        onChange={(e) => setNumeroSerieModif(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        value={identifiantPersoModif}
                                        onChange={(e) => setIdentifiantPersoModif(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        value={tailleModif}
                                        onChange={(e) => setTailleModif(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        value={couleurModif}
                                        onChange={(e) => setCouleurModif(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <button onClick={validerEdition}>Enregistrer</button>
                                </td>
                            </tr>
                        ) : (
                            <tr key={epi.id}>
                                <td>{epi.id}</td>
                                <td>{epi.marque}</td>
                                <td>{epi.modele}</td>
                                <td>{epi.numeroSerie}</td>
                                <td>{epi.identifiantPerso}</td>
                                <td>{epi.taille}</td>
                                <td>{epi.couleur}</td>
                                <td>
                                    <button onClick={() => supprimerEpi(epi.id)}>Supprimer</button>
                                    <button onClick={() => lancerEdition(epi)}>Modifier</button>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>

            </table>

            <h2>Ajouter un nouvel EPI</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const newEpi: EpiType = {
                        id: epis.length + 1,
                        marque,
                        modele,
                        numeroSerie,
                        identifiantPerso,
                        taille,
                        couleur,
                    };
                    setEpis([...epis, newEpi]);
                    setMarque("");
                    setModele("");
                    setNumeroSerie("");
                    setIdentifiantPerso("");
                    setTaille("");
                    setCouleur("");
                }}
            >
                <div>
                    <label>Marque :</label>
                    <input value={marque} onChange={(e) => setMarque(e.target.value)} required />
                </div>
                <div>
                    <label>Modèle :</label>
                    <input value={modele} onChange={(e) => setModele(e.target.value)} required />
                </div>
                <div>
                    <label>Numéro de série :</label>
                    <input value={numeroSerie} onChange={(e) => setNumeroSerie(e.target.value)} required />
                </div>
                <div>
                    <label>Identifiant perso :</label>
                    <input
                        value={identifiantPerso}
                        onChange={(e) => setIdentifiantPerso(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Taille :</label>
                    <input value={taille} onChange={(e) => setTaille(e.target.value)} required />
                </div>
                <div>
                    <label>Couleur :</label>
                    <input value={couleur} onChange={(e) => setCouleur(e.target.value)} required />
                </div>
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default Epi;
