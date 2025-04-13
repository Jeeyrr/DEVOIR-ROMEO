import { Controle, EPIStatus } from "gestepiinterfacesjeyron"; 
import { pool } from "./bdd";

export interface ControleModel extends Controle {
    id: number;
}

export class ControleModel {
    id: number;
    date: Date;
    gestionnaire: string;
    epiId: number;
    status: EPIStatus;
    remarques?: string;

    constructor(data: any) {
        this.id = Number(data.id);
        this.date = new Date(data.date);
        this.gestionnaire = data.gestionnaire;
        this.epiId = Number(data.epiId);
        this.status = data.status as EPIStatus;
        this.remarques = data.remarques;
    }
}