import { pool } from "../models/bdd";

export class UtilisateurManager {
  static async findByEmail(email: string) {
    const conn = await pool.getConnection();
    try {
      const rows = await conn.query("SELECT * FROM utilisateur WHERE email = ?", [email]);
      if (Array.isArray(rows) && rows.length > 0) {
        return rows[0];
      }
      return null;
    } finally {
      conn.release();
    }
  }

  static async findAll() {
    const conn = await pool.getConnection();
    try {
      const rows = await conn.query("SELECT * FROM utilisateur");
      return rows.map((u: any) => ({
        ...u,
        id: Number(u.id),
      }));
    } finally {
      conn.release();
    }
  }

  static async create(email: string, mot_de_passe: string, role: string) {
    const conn = await pool.getConnection();
    try {
      const result = await conn.query(
        "INSERT INTO utilisateur (email, mot_de_passe, role) VALUES (?, ?, ?)",
        [email, mot_de_passe, role]
      );

      return {
        id: Number(result.insertId),
        email,
        role,
      };
    } finally {
      conn.release();
    }
  }

  static async update(id: number, data: any) {
    const conn = await pool.getConnection();
    try {
      const fields: string[] = [];
      const values: any[] = [];

      if (data.email) {
        fields.push("email = ?");
        values.push(data.email);
      }

      if (data.mot_de_passe) {
        fields.push("mot_de_passe = ?");
        values.push(data.mot_de_passe);
      }

      if (data.role) {
        fields.push("role = ?");
        values.push(data.role);
      }

      if (fields.length === 0) return null;

      values.push(id);
      const query = `UPDATE utilisateur SET ${fields.join(", ")} WHERE id = ?`;
      const result = await conn.query(query, values);
      return result.affectedRows > 0 ? { id, ...data } : null;
    } finally {
      conn.release();
    }
  }

  static async delete(id: number) {
    const conn = await pool.getConnection();
    try {
      const result = await conn.query("DELETE FROM utilisateur WHERE id = ?", [id]);
      return result.affectedRows > 0;
    } finally {
      conn.release();
    }
  }

  static async findById(id: number) {
    const conn = await pool.getConnection();
    try {
      const rows = await conn.query("SELECT * FROM utilisateur WHERE id = ?", [id]);
      return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    } finally {
      conn.release();
    }
  }
}
