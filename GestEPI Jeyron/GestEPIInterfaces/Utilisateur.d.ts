export type Role = "cordiste" | "gestionnaire" | "admin";

export interface Utilisateur {
  id: number;
  email: string;
  mot_de_passe: string;
  role: Role;
}
