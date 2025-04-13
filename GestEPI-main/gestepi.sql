-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3307
-- Généré le : dim. 13 avr. 2025 à 23:44
-- Version du serveur : 11.2.2-MariaDB
-- Version de PHP : 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `gestepi`
--

-- --------------------------------------------------------

--
-- Structure de la table `controle`
--

DROP TABLE IF EXISTS `controle`;
CREATE TABLE IF NOT EXISTS `controle` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `gestionnaire` varchar(100) NOT NULL,
  `epiId` int(11) NOT NULL,
  `status` enum('conforme','non_conforme','à_réparer') NOT NULL,
  `remarques` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `epiId` (`epiId`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `controle`
--

INSERT INTO `controle` (`id`, `date`, `gestionnaire`, `epiId`, `status`, `remarques`) VALUES
(1, '2024-04-01', 'gestionnaire@gestepi.com', 1, 'conforme', 'RAS'),
(2, '2024-04-01', 'gestionnaire@gestepi.com', 2, 'à_réparer', 'Usure sur la couture latérale');

-- --------------------------------------------------------

--
-- Structure de la table `epi`
--

DROP TABLE IF EXISTS `epi`;
CREATE TABLE IF NOT EXISTS `epi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `marque` varchar(100) NOT NULL,
  `modele` varchar(100) NOT NULL,
  `numeroSerie` varchar(100) NOT NULL,
  `identifiantPersonnalise` varchar(100) NOT NULL,
  `taille` varchar(50) DEFAULT NULL,
  `couleur` varchar(50) DEFAULT NULL,
  `dateAchat` date NOT NULL,
  `dateFabrication` date NOT NULL,
  `dateMiseEnService` date NOT NULL,
  `periodiciteControle` int(11) NOT NULL,
  `utilisateurId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `numeroSerie` (`numeroSerie`),
  KEY `utilisateurId` (`utilisateurId`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `epi`
--

INSERT INTO `epi` (`id`, `marque`, `modele`, `numeroSerie`, `identifiantPersonnalise`, `taille`, `couleur`, `dateAchat`, `dateFabrication`, `dateMiseEnService`, `periodiciteControle`, `utilisateurId`) VALUES
(1, 'Petzl', 'Falcon', 'SN123456', 'EPI001', 'M', 'Noir', '2024-01-09', '2023-11-30', '2024-01-14', 180, 3),
(2, 'Skylotec', 'IGNITE', 'SN654321', 'EPI002', 'L', 'bleu', '2004-09-01', '2004-09-01', '2004-09-01', 180, 3),
(3, 'Singing Rock', 'Expert 3D', 'SN789123', 'EPI003', 'XL', 'Jaune', '2024-02-01', '2024-01-01', '2024-02-10', 180, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `role` enum('admin','gestionnaire','cordiste') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `email`, `mot_de_passe`, `role`) VALUES
(1, 'admin@gestepi.com', 'admin123', 'admin'),
(2, 'gestionnaire@gestepi.com', 'gestion123', 'gestionnaire'),
(3, 'cordiste@gestepi.com', 'cordiste123', 'cordiste');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
