# Analyseur de réponses IA - Projet Exposé
# Ce script classifie les types de sorties de ChatGPT

import numpy as np

class TransformerAttention:
    """Implémentation du mécanisme de Self-Attention (Standard Master)."""
    def __init__(self, d_model=512):
        self.d_model = d_model
        # Matrices de projection Query, Key, Value
        self.W_q = np.random.randn(d_model, d_model)
        self.W_k = np.random.randn(d_model, d_model)
        self.W_v = np.random.randn(d_model, d_model)

    def calculate_attention(self, x):
        """Calcul : Softmax(QK^T / sqrt(d_k)) * V"""
        Q = np.dot(x, self.W_q)
        K = np.dot(x, self.W_k)
        V = np.dot(x, self.W_v)
        
        # Produit scalaire de Query et Key (Attention Scores)
        scores = np.dot(Q, K.T) / np.sqrt(self.d_model)
        
        # Activation Softmax pour normaliser les poids
        weights = np.exp(scores) / np.sum(np.exp(scores), axis=-1)
        
        # Application sur Value
        return np.dot(weights, V), weights

# Simulation pour l'oral
engine = TransformerAttention(d_model=128)
sample_input = np.random.rand(1, 128)
output, attention_weights = engine.calculate_attention(sample_input)
print(f"Poids d'attention calculés (Matrice de densité) : \n{attention_weights}")
