import { EPI } from "gestepiinterfacesjeyron";
import { pool } from "./bdd";

export interface EPIModel extends EPI { }

export class EPIModel {
    id: number;
    marque: string;
    modele: string;
    numeroSerie: string;
    identifiantPersonnalise: string;
    taille?: string;
    couleur?: string;
    dateAchat: Date;
    dateFabrication: Date;
    dateMiseEnService: Date;
    periodiciteControle: number;

    constructor(data: any) {
        this.id = Number(data.id);
        this.marque = data.marque;
        this.modele = data.modele;
        this.numeroSerie = data.numeroSerie;
        this.identifiantPersonnalise = data.identifiantPersonnalise;
        this.taille = data.taille;
        this.couleur = data.couleur;
        this.dateAchat = new Date(data.dateAchat);
        this.dateFabrication = new Date(data.dateFabrication);
        this.dateMiseEnService = new Date(data.dateMiseEnService);
        this.periodiciteControle = Number(data.periodiciteControle);
    }
}