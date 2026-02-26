const App = {
    toggle(el) { el.classList.toggle('active'); },

    // Simulation du lien entre les langages (Pipeline de données)
    async runFullPipeline() {
        const console = document.getElementById('console-output');
        console.innerHTML = "> Initialisation du pipeline de données...<br>";
        
        await this.delay(700);
        console.innerHTML += "> SQL: Connexion ia_governance... Traçabilité UUID OK.<br>";
        
        await this.delay(700);
        console.innerHTML += "> PYTHON: Exécution du Multi-Head Attention... d_model=512.<br>";
        
        await this.delay(700);
        console.innerHTML += "> JS: Normalisation Softmax terminée. Token prédit : <span style='color:white'>'Intelligence'</span>";
    },

    delay(ms) { return new Promise(res => setTimeout(res, ms)); }
};

const Quiz = {
    step: 0,
    questions: [
        { q: "Quelle matrice représente l'interrogation du contexte ?", a: ["Query (Q)", "Key (K)", "Value (V)"], r: 0 },
        { q: "Le schéma SQL ia_governance sert à :", a: ["Le design", "L'audit éthique", "Le matériel"], r: 1 }
    ],
    start() { this.render(); },
    render() {
        const q = this.questions[this.step];
        document.getElementById('q-text').innerText = q.q;
        const box = document.getElementById('q-options'); box.innerHTML = "";
        q.a.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.style = "display:block; width:100%; margin:8px 0; background:rgba(0,242,255,0.1); color:white; border:1px solid #00f2ff;";
            btn.innerText = opt;
            btn.onclick = () => {
                if(i === q.r) alert("Calcul correct.");
                this.step++;
                if(this.step < this.questions.length) this.render();
                else document.getElementById('quiz-ui').innerHTML = "<h3>STATUT : EXPERT CERTIFIÉ (20/20)</h3>";
            };
            box.appendChild(btn);
        });
        document.getElementById('q-start').style.display = "none";
    }
};
