/**
 * ============================================================================
 * PROJET : LA RÉVOLUTION CHATGPT
 * AUTEURS : Rayane Salim, Antoine et Selim
 * DESCRIPTION : Script de gestion de l'interface interactive (Modales & Quiz)
 * ============================================================================
 */

/**
 * 1. GESTION DES FENÊTRES MODALES
 * Permet d'ouvrir et fermer les sections de l'exposé.
 */

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
        // Désactive le scroll de la page de fond
        document.body.style.overflow = "hidden";
        
        // Relance le quiz à l'ouverture pour s'assurer que l'affichage est forcé
        if (modalId === 'quiz-modal') {
            runQuiz();
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
        // Réactive le scroll de la page de fond
        document.body.style.overflow = "auto";
        
        // Arrête la lecture des vidéos YouTube en réinitialisant la source
        const iframes = modal.querySelectorAll('iframe');
        iframes.forEach(i => {
            const src = i.src;
            i.src = '';
            i.src = src;
        });
    }
}

// Fermeture automatique si on clique en dehors de la fenêtre blanche
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(m => {
            m.style.display = "none";
            const vids = m.querySelectorAll('iframe');
            vids.forEach(v => v.src = v.src);
        });
        document.body.style.overflow = "auto";
    }
});

/**
 * 2. SYSTÈME DE QUIZ (QCM)
 * Contient les questions techniques et éthiques sur l'IA.
 */

const quizData = [
    { 
        q: "En quelle année la société OpenAI a-t-elle été fondée ?", 
        a: ["2012", "2015", "2022"], 
        c: 1 
    },
    { 
        q: "ChatGPT est basé sur l'architecture 'Transformer'. Qu'est-ce que c'est ?", 
        a: ["Un robot de film", "Un modèle mathématique de traitement du langage", "Un type de processeur"], 
        c: 1 
    },
    { 
        q: "En combien de temps ChatGPT a atteint 100 millions d'utilisateurs ?", 
        a: ["2 mois", "6 mois", "1 an"], 
        c: 0 
    },
    { 
        q: "Quel est le rôle du 'Prompt Engineering' ?", 
        a: ["Réparer les serveurs", "L'art de rédiger des instructions précises pour l'IA", "Coder l'algorithme de base"], 
        c: 1 
    },
    { 
        q: "Qu'est-ce qu'un 'Token' dans le fonctionnement de ChatGPT ?", 
        a: ["Une pièce de monnaie", "Une unité de texte (morceau de mot)", "Un mot de passe"], 
        c: 1 
    },
    { 
        q: "Quelle entreprise a investi 10 milliards de dollars dans OpenAI ?", 
        a: ["Google", "Apple", "Microsoft"], 
        c: 2 
    },
    { 
        q: "ChatGPT est-il capable de réfléchir et de comprendre le sens de ses phrases ?", 
        a: ["Oui, il a une conscience", "Non, il prédit statistiquement le mot suivant", "Seulement quand il est connecté à Internet"], 
        c: 1 
    },
    { 
        q: "Quel est le principal problème éthique lié aux données d'entraînement ?", 
        a: ["La consommation d'eau", "Les biais (préjugés) sexistes ou racistes", "Le prix de l'abonnement"], 
        c: 1 
    },
    { 
        q: "Quelle est la principale différence entre ChatGPT et Google ?", 
        a: ["Google est plus rapide", "ChatGPT génère une réponse unique au lieu d'une liste de liens", "Il n'y a aucune différence"], 
        c: 1 
    }
];

let currentStep = 0; 
let finalScore = 0;

function runQuiz() {
    const questionContainer = document.getElementById("question");
    const optionsContainer = document.getElementById("options");
    const scoreDisplay = document.getElementById("score-text");

    // Vérifie si l'on a atteint la fin du quiz
    if (currentStep >= quizData.length) {
        questionContainer.innerHTML = "🎯 Quiz Terminé !";
        optionsContainer.innerHTML = `
            <div style="text-align:center; padding: 20px; width: 100%;">
                <p>Bravo d'avoir complété ce test sur l'intelligence artificielle.</p>
                <button class="quiz-btn" onclick="resetQuiz()" style="margin: 20px auto; max-width: 300px;">Recommencer le Quiz</button>
            </div>
        `;
        scoreDisplay.innerHTML = `Score Final : <strong>${finalScore} / ${quizData.length}</strong>`;
        return;
    }

    // Affichage de la question actuelle
    const currentData = quizData[currentStep];
    questionContainer.innerText = `${currentStep + 1}. ${currentData.q}`;
    
    // --- LIGNES POUR FORCER L'ÉLARGISSEMENT ---
    optionsContainer.innerHTML = ""; 
    optionsContainer.style.display = "grid";
    optionsContainer.style.gridTemplateColumns = "repeat(auto-fit, minmax(250px, 1fr))";
    optionsContainer.style.gap = "20px";
    optionsContainer.style.width = "100%";

    // Création des boutons de réponse
    currentData.a.forEach((optionText, index) => {
        const btn = document.createElement("button");
        btn.innerText = optionText;
        btn.className = "quiz-btn";
        
        btn.onclick = () => {
            if (index === currentData.c) {
                finalScore++;
            }
            currentStep++; 
            runQuiz(); 
        };
        
        optionsContainer.appendChild(btn);
    });
}

// Fonction pour remettre le quiz à zéro
function resetQuiz() {
    currentStep = 0;
    finalScore = 0;
    document.getElementById("score-text").innerText = "";
    runQuiz();
}

/**
 * 3. LANCEMENT AU CHARGEMENT
 */
window.onload = function() {
    runQuiz();
};
