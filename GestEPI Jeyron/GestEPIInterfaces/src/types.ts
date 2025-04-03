export enum UserType {
    ADMIN = 1,
    MANAGER = 2,
    USER = 3,
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    type: UserType;
    phone?: string;
    mail?: string;
}

export interface EPIType {
    id: string;
}
  export interface EPI {
    id: number;
    marque: string;
    modele: string;
    numeroSerie: string;
    identifiantPerso: string;
    taille?: string;
    couleur?: string;
  }
  