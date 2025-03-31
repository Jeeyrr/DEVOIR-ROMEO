import { Projet as ProjetType } from "gestepiinterfacesjeyron";

interface ProjetRowProps {
    projet: ProjetType;
    onDelete: (id: number) => void;
    onEdit?: () => void;
}

const ProjetRow = ({ projet, onDelete, onEdit }: ProjetRowProps) => {
    return (
        <tr>
            <td>{projet.id}</td>
            <td>{projet.nom}</td>
            <td>{projet.statut}</td>
            <td>
                <button onClick={() => onDelete(projet.id)}>Supprimer</button>
                <button onClick={onEdit}>Modifier</button>
            </td>

        </tr>
    );
};

export default ProjetRow;
