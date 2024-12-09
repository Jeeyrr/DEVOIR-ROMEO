CREATE DATABASE IF NOT EXISTS gestion_avions;

USE gestion_avions;

CREATE TABLE avions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    etat ENUM('en_service', 'en_maintenance', 'hors_service') NOT NULL,
    date_derniere_maintenance DATE
);

CREATE TABLE techniciens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    competences TEXT,
    disponibilite BOOLEAN DEFAULT TRUE
);

CREATE TABLE maintenances (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_avion INT NOT NULL,
    id_technicien INT NOT NULL,
    date_maintenance DATETIME NOT NULL,
    description TEXT,
    statut ENUM('planifiee', 'en_cours', 'terminee') NOT NULL,
    FOREIGN KEY (id_avion) REFERENCES avions(id),
    FOREIGN KEY (id_technicien) REFERENCES techniciens(id)
);
