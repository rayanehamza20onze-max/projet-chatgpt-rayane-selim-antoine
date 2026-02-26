-- =============================================================
-- PROJET : BASE DE DONNÉES DE GESTION IA (LOGS & RLHF)
-- DESCRIPTION : Architecture pour stocker les échanges et les notes 
--               attribuées par les utilisateurs aux réponses.
-- =============================================================

-- 1. Création de la table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    subscription_plan VARCHAR(20) DEFAULT 'free' -- 'free', 'pro', 'enterprise'
);

-- 2. Création de la table des conversations (Sessions)
CREATE TABLE IF NOT EXISTS conversations (
    conv_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    title VARCHAR(255),
    model_version VARCHAR(50) DEFAULT 'gpt-sim-2026',
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Table des messages (Mémoire de contexte)
-- Cette table permet à l'IA de "se souvenir" des échanges précédents
CREATE TABLE IF NOT EXISTS messages (
    message_id SERIAL PRIMARY KEY,
    conv_id INT REFERENCES conversations(conv_id) ON DELETE CASCADE,
    role VARCHAR(10) CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    token_count INT, -- Utile pour calculer le coût et la fenêtre de contexte
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Table RLHF (Feedback utilisateur)
-- Crucial pour améliorer l'IA comme expliqué dans les ressources pédagogiques
CREATE TABLE IF NOT EXISTS feedback (
    feedback_id SERIAL PRIMARY KEY,
    message_id INT REFERENCES messages(message_id) ON DELETE CASCADE,
    rating INT CHECK (rating BETWEEN 1 AND 5), -- Note de 1 à 5 étoiles
    comment TEXT,
    is_hallucination BOOLEAN DEFAULT FALSE, -- Signalement de fausse information
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================
-- INSERTION DE DONNÉES DE TEST (SIMULATION)
-- =============================================================

-- Ajout d'un utilisateur
INSERT INTO users (username, email, subscription_plan) 
VALUES ('etudiant_ia', 'contact@ecole.fr', 'pro');

-- Création d'une session de chat sur les Transformers
INSERT INTO conversations (user_id, title) 
VALUES (1, 'Comprendre le mécanisme d''attention');

-- Historique d'un échange
INSERT INTO messages (conv_id, role, content, token_count) VALUES 
(1, 'user', 'C''est quoi un Transformer ?', 6),
(1, 'assistant', 'C''est une architecture de réseau de neurones basée sur l''attention...', 120);

-- Feedback de l'utilisateur (RLHF)
INSERT INTO feedback (message_id, rating, comment) 
VALUES (2, 5, 'Réponse très claire, fidèle à la vidéo de ScienceÉtonnante.');

-- =============================================================
-- REQUÊTES D'ANALYSE (STATISTIQUES)
-- =============================================================

-- Calculer la note moyenne par version de modèle
SELECT 
    c.model_version, 
    AVG(f.rating) as note_moyenne,
    COUNT(f.feedback_id) as nombre_de_votes
FROM conversations c
JOIN messages m ON c.conv_id = m.conv_id
JOIN feedback f ON m.message_id = f.message_id
GROUP BY c.model_version;

-- Identifier les messages signalés comme "hallucinations"
SELECT m.content, f.comment 
FROM messages m
JOIN feedback f ON m.message_id = f.message_id
WHERE f.is_hallucination = TRUE;
