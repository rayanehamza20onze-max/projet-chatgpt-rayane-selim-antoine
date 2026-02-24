# Analyseur de réponses IA - Projet Exposé
# Ce script classifie les types de sorties de ChatGPT

def analyser_reponse(prompt, reponse):
    """
    Simule une analyse de fiabilité sur une réponse générée.
    """
    # Mots-clés simulant une base de connaissances réelle
    faits_reels = ["2022", "OpenAI", "Transformer", "LLM"]
    
    print(f"--- Analyse du Prompt : {prompt} ---")
    
    # Logique de classification simplifiée
    if any(mot in reponse for mot in faits_reels):
        return "Résultat : RÉPONSE EXACTE ✅ (Basée sur des données d'entraînement vérifiées)"
    
    elif "Napoléon" in reponse and "iPhone" in reponse:
        return "Résultat : HALLUCINATION ❌ (Incohérence temporelle détectée)"
    
    else:
        return "Résultat : BIAISÉE / INCERTAINE ⚠️ (Nécessite une vérification humaine)"

# Exemple de test pour la démo
if __name__ == "__main__":
    print(analyser_reponse("Qui a créé ChatGPT ?", "C'est OpenAI en utilisant l'architecture Transformer."))
    print(analyser_reponse("Fait historique ?", "Napoléon utilisait son iPhone pour commander ses troupes."))
