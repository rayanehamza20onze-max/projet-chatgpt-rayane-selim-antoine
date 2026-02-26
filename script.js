/**
 * PROJET : SIMULATEUR D'INTERFACE CHATBOT IA
 * Fichier : app.js
 * Description : Gère l'interaction utilisateur, la file d'attente des messages
 * et simule le streaming de tokens (comme ChatGPT).
 */

"use strict";

// --- Configuration et Constantes ---
const CONFIG = {
    botName: "Gemini-Sim-2026",
    typingSpeed: 30, // ms entre chaque caractère
    contextWindow: 10, // nombre max de messages en mémoire
    initialMessage: "Bonjour ! Je suis l'assistant pédagogique. Posez-moi une question sur les réseaux de neurones ou les Transformers."
};

// --- État de l'Application ---
let chatHistory = [];
let isTyping = false;

/**
 * Initialisation au chargement du DOM
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log(`[${CONFIG.botName}] Système prêt.`);
    initChat();
});

function initChat() {
    const chatContainer = document.getElementById('chat-container');
    const inputField = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    // Message de bienvenue
    addMessageToUI("bot", CONFIG.initialMessage);

    // Écouteur de clic sur le bouton
    sendBtn.addEventListener('click', () => handleUserInput());

    // Écouteur de touche "Entrée"
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !isTyping) {
            handleUserInput();
        }
    });
}

/**
 * Gère la récupération du texte et la logique de réponse
 */
async function handleUserInput() {
    const inputField = document.getElementById('user-input');
    const text = inputField.value.trim();

    if (text === "" || isTyping) return;

    // 1. Afficher le message utilisateur
    addMessageToUI("user", text);
    inputField.value = "";
    
    // 2. Simuler un délai de "réflexion" (Processing)
    isTyping = true;
    toggleLoading(true);

    try {
        const response = await simulateAIResponse(text);
        toggleLoading(false);
        
        // 3. Afficher la réponse avec effet de streaming
        await addStreamingMessage("bot", response);
    } catch (error) {
        console.error("Erreur de simulation:", error);
        addMessageToUI("bot", "Désolé, une erreur technique est survenue.");
    } finally {
        isTyping = false;
    }
}

/**
 * Simule un moteur de réponse basé sur des mots-clés
 * (En lien avec les vidéos de ScienceÉtonnante et INRIA)
 */
function simulateAIResponse(input) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const lowInput = input.toLowerCase();
            let response = "C'est une question intéressante. D'après les cours d'INRIA, cela touche au fonctionnement des modèles de langage.";

            if (lowInput.includes("token")) {
                response = "Un token est l'unité de base traitée par l'IA. Ce n'est pas forcément un mot entier, mais souvent un morceau de mot (ex: 'ment' ou 'tion').";
            } else if (lowInput.includes("transformer") || lowInput.includes("attention")) {
                response = "L'architecture Transformer utilise le mécanisme d'attention pour comprendre les relations entre les mots, même éloignés dans une phrase.";
            } else if (lowInput.includes("hallucination")) {
                response = "Une hallucination survient quand l'IA prédit des tokens probables statistiquement mais faux factuellement. Elle ne 'sait' pas, elle calcule.";
            } else if (lowInput.includes("apprendre") || lowInput.includes("formation")) {
                response = "L'IA apprend par ajustement de poids synaptiques sur des milliards de textes via une phase de pré-entraînement massive.";
            }

            resolve(response);
        }, 1200); // Délai de réflexion artificiel
    });
}

/**
 * Ajoute instantanément un message (pour l'utilisateur)
 */
function addMessageToUI(sender, text) {
    const chatDisplay = document.getElementById('chat-display');
    const msgDiv = document.createElement('div');
    
    msgDiv.className = `message ${sender}-message`;
    msgDiv.innerHTML = `<strong>${sender === 'user' ? 'Vous' : 'IA'} :</strong> <p>${text}</p>`;
    
    chatDisplay.appendChild(msgDiv);
    scrollToBottom();
}

/**
 * Simule l'écriture progressive (Streaming)
 */
async function addStreamingMessage(sender, text) {
    const chatDisplay = document.getElementById('chat-display');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}-message`;
    msgDiv.innerHTML = `<strong>IA :</strong> <p id="current-typing"></p>`;
    chatDisplay.appendChild(msgDiv);

    const target = document.getElementById('current-typing');
    
    for (let i = 0; i < text.length; i++) {
        target.textContent += text.charAt(i);
        scrollToBottom();
        await new Promise(r => setTimeout(r, CONFIG.typingSpeed));
    }
    
    target.id = ""; // On retire l'ID pour le prochain message
}

/**
 * Utilitaires d'interface
 */
function toggleLoading(show) {
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = show ? 'block' : 'none';
}

function scrollToBottom() {
    const chatDisplay = document.getElementById('chat-display');
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

// --- Logique de Debug ---
console.log("Scripts de simulation chargés à 100%.");
