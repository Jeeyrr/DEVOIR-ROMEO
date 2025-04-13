import { ControleModel } from "../models/ControleModel";
import { pool } from "../models/bdd";

export class ControleManager {
    static async create(controle: Omit<ControleModel, 'id'>): Promise<ControleModel> {
        const conn = await pool.getConnection();
        try {
            const result = await conn.query(
                `INSERT INTO controle (date, gestionnaire, epiId, status, remarques)
                VALUES (?, ?, ?, ?, ?)`,
                [controle.date, controle.gestionnaire, controle.epiId,
                controle.status, controle.remarques]
            );
            return new ControleModel({ ...controle, id: result.insertId });
        } finally {
            conn.release();
        }
    }

    static async findAll(): Promise<ControleModel[]> {
        const conn = await pool.getConnection();
        try {
            const results = await conn.query('SELECT * FROM controle');
            return results.map((row: Record<string, any>) => new ControleModel(row));
        } finally {
            conn.release();
        }
    }

    static async findById(id: number): Promise<ControleModel | null> {
        const conn = await pool.getConnection();
        try {
            const result = await conn.query('SELECT * FROM controle WHERE id = ?', [id]);
            return result.length ? new ControleModel(result[0]) : null;
        } finally {
            conn.release();
        }
    }

    static async findByEpiId(epiId: number): Promise<ControleModel[]> {
        const conn = await pool.getConnection();
        try {
            const result = await conn.query('SELECT * FROM controle WHERE epiId = ?', [epiId]);
            return result.map((row: Record<string, any>) => new ControleModel(row));
        } finally {
            conn.release();
        }
    }

    static async update(id: number, controle: Partial<ControleModel>): Promise<ControleModel | null> {
        const conn = await pool.getConnection();
        try {
            const updateFields = Object.entries(controle)
                .filter(([key]) => key !== 'id')
                .map(([key]) => `${key} = ?`)
                .join(', ');

            const values = Object.entries(controle)
                .filter(([key]) => key !== 'id')
                .map(([_, value]) => value);

            await conn.query(
                `UPDATE controle SET ${updateFields} WHERE id = ?`,
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
                'DELETE FROM controle WHERE id = ?',
                [id]
            );
            return result.affectedRows > 0;
        } finally {
            conn.release();
        }
    }
}
