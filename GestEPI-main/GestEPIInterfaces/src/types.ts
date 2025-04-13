export enum EPIStatus {
    OPERATIONNEL = 'Opérationnel',
    A_REPARER = 'A réparer',
    MIS_AU_REBUT = 'Mis au rebut'
}

export interface EPI {
    id?: number;
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
}

export interface Controle {
    id?: number;
    date: Date;
    gestionnaire: string;
    epiId: number;
    status: EPIStatus;
    remarques?: string;
}