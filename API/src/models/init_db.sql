CREATE DATABASE IF NOT EXISTS creationapi;
USE creationapi;

CREATE TABLE avions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    immatriculation VARCHAR(20) NOT NULL,
    marque VARCHAR(50) NOT NULL,
    modele VARCHAR(50) NOT NULL,
    UNIQUE KEY (immatriculation)
);

CREATE TABLE techniciens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    prenom VARCHAR(50) NOT NULL,
    nom VARCHAR(50) NOT NULL,
    age INT NOT NULL
);

CREATE TABLE entretiens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    immatriculation VARCHAR(20) NOT NULL,
    idTechnicien INT NOT NULL,  
    dateEntretien DATE NOT NULL,
    FOREIGN KEY (immatriculation) REFERENCES avions(immatriculation),
    FOREIGN KEY (idTechnicien) REFERENCES techniciens(id)
);

INSERT INTO avions (immatriculation, marque, modele) VALUES
('AA111AA', 'Boeing', '737'),
('HH222HH', 'Airbus', 'A320'),
('PP333PP', 'Phoenix', '260');

INSERT INTO techniciens (prenom, nom, age) VALUES
('Jeyron', 'JJ', 20),
('Dylan', 'DO', 21),
('Reda', 'RA', 24);

INSERT INTO entretiens (immatriculation, idTechnicien, dateEntretien) VALUES
('AA111AA', 1, '2024-12-10'),
('HH222HH', 2, '2024-12-15'),
('PP333PP', 3, '2024-12-12');