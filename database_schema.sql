-- Architecture relationnelle pour la traçabilité éthique des modèles
CREATE SCHEMA IF NOT EXISTS ia_governance;

-- Table des Checkpoints (Versionnage du modèle)
CREATE TABLE ia_governance.model_checkpoints (
    checkpoint_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    architecture VARCHAR(50) NOT NULL, -- ex: 'Transformer', 'MoE'
    parameters_count BIGINT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table d'Audit Éthique (Dataset Compliance)
CREATE TABLE ia_governance.dataset_audit (
    audit_id SERIAL PRIMARY KEY,
    fk_model_id UUID REFERENCES ia_governance.model_checkpoints(checkpoint_id),
    source_corpus VARCHAR(255),
    bias_index DECIMAL(4, 3), -- Mesure statistique du biais
    carbon_footprint_kg DECIMAL(10, 2)
);

-- Insertion de données de test pour l'oral
INSERT INTO ia_governance.model_checkpoints (architecture, parameters_count)
VALUES ('Transformer-Large', 175000000000);

-- Vue d'analyse pour le jury
CREATE VIEW ia_governance.global_health_score AS
SELECT architecture, AVG(bias_index) as reliability
FROM ia_governance.model_checkpoints c
JOIN ia_governance.dataset_audit a ON c.checkpoint_id = a.fk_model_id
GROUP BY architecture;
