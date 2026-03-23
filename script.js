/**
 * GESTION DES MODALES
 * Permet d'ouvrir et fermer les fenêtres avec animations
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Empêche le scroll en arrière-plan
        
        // Si c'est le quiz, on le réinitialise à l'ouverture
        if (modalId === 'quiz-modal') {
            resetQuiz();
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
        
        // Arrêter les vidéos YouTube si une modale se ferme
        const iframes = modal.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            const src = iframe.src;
            iframe.src = src; 
        });
    }
}

// Fermeture en cliquant à l'extérieur de la fenêtre blanche
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        const activeModals = document.querySelectorAll('.modal[style*="display: block"]');
        activeModals.forEach(m => closeModal(m.id));
    }
};

/**
 * SYSTÈME DE QUIZ AVANCÉ
 */
const quizData = [
    { 
        q: "En quelle année OpenAI a-t-elle été fondée ?", 
        a: ["2010", "2015", "2018", "2022"], 
        c: 1 
    },
    { 
        q: "Combien de temps a-t-il fallu à ChatGPT pour atteindre 100 millions d'utilisateurs ?", 
        a: ["2 jours", "2 mois", "9 mois", "2 ans"], 
        c: 1 
    },
    { 
        q: "Quelle architecture mathématique utilise ChatGPT ?", 
        a: ["CNN", "RNN", "Transformer", "Blockchain"], 
        c: 2 
    },
    { 
        q: "Que signifie le 'P' dans GPT ?", 
        a: ["Private", "Pre-trained", "Powerful", "Program"], 
        c: 1 
    },
    { 
        q: "ChatGPT est-il un moteur de recherche ?", 
        a: ["Oui, comme Google", "Non, c'est un modèle de langage"], 
        c: 1 
    }
];

let currentQuestion = 0;
let score = 0;

function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById("score-text").innerText = "";
    runQuiz();
}

function runQuiz() {
    const questionEl = document.getElementById("question");
    const optionsEl = document.getElementById("options");
    const scoreEl = document.getElementById("score-text");

    // Nettoyage de la zone
    optionsEl.innerHTML = "";

    if (currentQuestion >= quizData.length) {
        displayResults();
        return;
    }

    const data = quizData[currentQuestion];
    questionEl.innerHTML = `<strong>Question ${currentQuestion + 1}/${quizData.length} :</strong><br>${data.q}`;

    data.a.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.className = "quiz-btn animated-btn";
        button.onclick = () => checkAnswer(index, button);
        optionsEl.appendChild(button);
    });
}

function checkAnswer(selectedIndex, clickedButton) {
    const correctIndex = quizData[currentQuestion].c;
    const allButtons = document.querySelectorAll(".quiz-btn");

    // Désactiver les boutons pour éviter le double clic
    allButtons.forEach(btn => btn.disabled = true);

    if (selectedIndex === correctIndex) {
        score++;
        clickedButton.style.background = "#28a745"; // Vert
        clickedButton.style.borderColor = "#28a745";
    } else {
        clickedButton.style.background = "#dc3545"; // Rouge
        clickedButton.style.borderColor = "#dc3545";
        allButtons[correctIndex].style.background = "#28a745"; // Montrer la bonne réponse
    }

    // Passer à la suite après un court délai
    setTimeout(() => {
        currentQuestion++;
        runQuiz();
    }, 1200);
}

function displayResults() {
    const questionEl = document.getElementById("question");
    const optionsEl = document.getElementById("options");
    const scoreEl = document.getElementById("score-text");

    questionEl.innerText = "Analyse terminée !";
    
    let appreciation = "";
    if (score === quizData.length) appreciation = "🏆 Expert en IA !";
    else if (score >= quizData.length / 2) appreciation = "👍 Pas mal du tout !";
    else appreciation = "🧐 Relis bien l'exposé...";

    scoreEl.innerHTML = `
        <div class="result-box">
            <span class="final-score">${score} / ${quizData.length}</span><br>
            <p>${appreciation}</p>
            <button class="quiz-btn" onclick="resetQuiz()" style="margin-top:20px; background:var(--primary)">Recommencer</button>
        </div>
    `;
}
