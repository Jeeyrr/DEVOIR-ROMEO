import { EPIModel } from "../models/EPIModel";
import { pool } from "../models/bdd";

export class EPIManager {
    static async create(epi: Omit<EPIModel, 'id'>): Promise<EPIModel> {
        const conn = await pool.getConnection();
        try {
            const result = await conn.query(
                `INSERT INTO epi (marque, modele, numeroSerie, identifiantPersonnalise,
                    taille, couleur, dateAchat, dateFabrication, dateMiseEnService, periodiciteControle)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [epi.marque, epi.modele, epi.numeroSerie, epi.identifiantPersonnalise,
                epi.taille, epi.couleur, epi.dateAchat, epi.dateFabrication,
                epi.dateMiseEnService, epi.periodiciteControle]
            );
            return new EPIModel({ ...epi, id: Number(result.insertId) }); 
        } finally {
            conn.release();
        }
    }

    static async findAll(): Promise<EPIModel[]> {
        const conn = await pool.getConnection();
        try {
            const results = await conn.query('SELECT * FROM epi');
            return results.map((row: any) => new EPIModel(row));
        } finally {
            conn.release();
        }
    }

    static async findById(id: number): Promise<EPIModel | null> {
        const conn = await pool.getConnection();
        try {
            const result = await conn.query('SELECT * FROM epi WHERE id = ?', [id]);
            return result.length ? new EPIModel(result[0]) : null;
        } finally {
            conn.release();
        }
    }

    static async update(id: number, epi: Partial<EPIModel>): Promise<EPIModel | null> {
        const conn = await pool.getConnection();
        try {
            const updateFields = Object.entries(epi)
                .filter(([key]) => key !== 'id')
                .map(([key]) => `${key} = ?`)
                .join(', ');

            const values = Object.entries(epi)
                .filter(([key]) => key !== 'id')
                .map(([_, value]) => value);

            await conn.query(
                `UPDATE epi SET ${updateFields} WHERE id = ?`,
                [...values, id]
            );

            return this.findById(id);
        } finally {
            conn.release();
        }
    }

    static async delete(id: number): Promise<boolean> {
        const conn = await pool.getConnection();
        try {
            const result = await conn.query(
                'DELETE FROM epi WHERE id = ?',
                [id]
            );
            return result.affectedRows > 0;
        } finally {
            conn.release();
        }
    }
}