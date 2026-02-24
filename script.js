// Fonction pour ouvrir/fermer les cartes
function toggleCard(element) {
    element.classList.toggle('active');
}

// Module Simulateur de Probabilités
function simulateNextWord() {
    const predictions = [
        { word: "Souris", prob: "85%" }, 
        { word: "Croquette", prob: "12%" }, 
        { word: "Soupe", prob: "3%" }
    ];
    
    const container = document.getElementById('prediction-result');
    container.innerHTML = ""; // Reset
    
    predictions.forEach((item, index) => {
        setTimeout(() => {
            const span = document.createElement('span');
            span.className = 'word-chip';
            span.innerHTML = `${item.word} (${item.prob})`;
            container.appendChild(span);
        }, index * 400);
    });
}
