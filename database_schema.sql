-- Schéma de la base de données pour l'Exposé "La Révolution ChatGPT"
-- Objectif : Tracer les sources citées (INSEE, Radio France, etc.)

CREATE DATABASE IF NOT EXISTS ExposeIA;
USE ExposeIA;

-- Table des sources documentaires
CREATE TABLE Sources (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom_media VARCHAR(100) NOT NULL,
    type_support ENUM('Article', 'Rapport', 'Podcast', 'Vidéo'),
    date_publication DATE,
    url_source TEXT,
    note_fiabilite INT CHECK (note_fiabilite BETWEEN 1 AND 5)
);

-- Insertion des sources utilisées pour la présentation
INSERT INTO Sources (nom_media, type_support, date_publication, url_source, note_fiabilite)
VALUES 
('Radio France', 'Podcast', '2023-11-15', 'https://www.radiofrance.fr/ia-revolution', 5),
('Le Monde', 'Article', '2024-01-10', 'https://www.lemonde.fr/technologies', 5),
('INSEE', 'Rapport', '2023-06-20', 'https://www.insee.fr/stats/ia-emploi', 4);

-- Requête pour afficher les sources les plus fiables à l'écran lors de l'oral
-- SELECT * FROM Sources WHERE note_fiabilite >= 4;
