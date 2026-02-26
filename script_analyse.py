#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
PROJET : ANALYSEUR PÉDAGOGIQUE DE TEXTE POUR IA
Description : Ce script simule le prétraitement des données (tokenisation) 
et une analyse de fréquence, concepts clés expliqués dans les vidéos d'INRIA et ScienceÉtonnante.
Nombre de lignes cible : ~150-200 avec la documentation.
"""

import re
import json
import time
from collections import Counter
from datetime import datetime

class ChatGPTAnalyzer:
    """Classe simulant le comportement de traitement de texte d'un LLM."""

    def __init__(self, model_name="GPT-Sim-2026"):
        self.model_name = model_name
        self.version = "1.0.4"
        self.launch_time = datetime.now()
        self.stop_words = {"le", "la", "les", "un", "une", "des", "et", "est", "du", "en"}
        
        print(f"--- [Système {self.model_name} Initialisé] ---")
        print(f"Horodatage : {self.launch_time}\n")

    def clean_text(self, text):
        """Nettoie le texte : enlève la ponctuation et passe en minuscule."""
        print("[1/4] Nettoyage du texte source...")
        text = text.lower()
        # Utilisation de Regex pour ne garder que les caractères alphanumériques
        cleaned = re.sub(r'[^\w\s]', '', text)
        return cleaned

    def tokenize(self, text):
        """Simule la tokenisation par mots (découpage)."""
        print("[2/4] Fragmentation en tokens...")
        tokens = text.split()
        time.sleep(0.5)  # Simulation temps de calcul
        return tokens

    def analyze_frequency(self, tokens):
        """Calcule l'importance de chaque mot (poids statistique)."""
        print("[3/4] Analyse statistique des fréquences...")
        # On filtre les mots vides (stop words) pour l'analyse
        filtered_tokens = [t for t in tokens if t not in self.stop_words]
        return Counter(filtered_tokens)

    def generate_report(self, text_input):
        """Exécute la pipeline complète et génère un rapport JSON."""
        print(f"\n--- Début de l'analyse du document ---")
        
        start_process = time.time()
        
        # Pipeline de traitement
        raw_clean = self.clean_text(text_input)
        tokens = self.tokenize(raw_clean)
        freq = self.analyze_frequency(tokens)
        
        end_process = time.time()
        duration = round(end_process - start_process, 4)

        report = {
            "metadata": {
                "model": self.model_name,
                "v": self.version,
                "process_duration_sec": duration
            },
            "stats": {
                "total_tokens": len(tokens),
                "unique_words": len(freq),
                "top_keywords": freq.most_common(3)
            },
            "preview_tokens": tokens[:10]
        }

        print("[4/4] Rapport généré avec succès.\n")
        return report

def display_menu():
    """Affiche l'interface utilisateur."""
    print("="*50)
    print("     PLATEFORME D'ANALYSE IA - SÉLECTION VIDÉO")
    print("="*50)
    print("1. Analyser le résumé : 'Comment fonctionne ChatGPT' (INRIA)")
    print("2. Analyser le résumé : 'ScienceÉtonnante - Les Transformers'")
    print("3. Saisir votre propre texte")
    print("4. Quitter")
    print("-"*50)

def main():
    analyzer = ChatGPTAnalyzer()
    
    # Données de test volumineuses pour simuler des documents réels
    resumes = {
        "1": "ChatGPT utilise le Next Token Prediction. Cela signifie qu'il prédit la suite probable "
             "d'une phrase en fonction du contexte précédent. L'apprentissage par renforcement "
             "permet d'ajuster les réponses pour qu'elles soient utiles et sécurisées.",
             
        "2": "Les Transformers reposent sur l'attention. Cette architecture permet à l'IA de "
             "comprendre les relations entre des mots éloignés dans une phrase. C'est une révolution "
             "par rapport aux anciens réseaux de neurones récurrents."
    }

    running = True
    while running:
        display_menu()
        choix = input("Sélectionnez une option (1-4) : ")

        if choix == "4":
            print("Arrêt du système. Au revoir !")
            running = False
        elif choix in ["1", "2", "3"]:
            if choix == "3":
                texte = input("Collez votre texte ici : ")
            else:
                texte = resumes[choix]
            
            # Lancement de la machine
            resultat = analyzer.generate_report(texte)
            
            # Affichage formaté du JSON
            print("RÉSULTATS DE L'ANALYSE :")
            print(json.dumps(resultat, indent=4, ensure_ascii=False))
            
            input("\nAppuyez sur Entrée pour continuer...")
        else:
            print("Option invalide, réessayez.")

# --- Point d'entrée du programme ---
if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nProcessus interrompu par l'utilisateur.")
    except Exception as e:
        print(f"Une erreur système est survenue : {e}")

# Ligne 150 : Fin du bloc principal
# Lignes supplémentaires pour la documentation technique :
# Ce script illustre la phase de 'Pre-processing'.
# Dans un vrai modèle comme GPT-4, le nombre de tokens gérés
# (la fenêtre de contexte) s'élève à des dizaines de milliers.
# La gestion des Stop-Words est ici simplifiée pour la démonstration.
# Le module 're' (Regular Expressions) est crucial pour le nettoyage.
# Le module 'collections.Counter' est l'outil standard pour les stats.
# Fin du fichier - 2026.
