
const canvas = document.getElementById('espace-dessin');
const ctx = canvas.getContext('2d');

let points = [];
let ligne = [];
let ligneCourante = [];
let niveauActuel = 0;

const niveaux = [
    {
        points: [
            { x: 400, y: 200 },
            { x: 450, y: 300 },
            { x: 550, y: 300 },
            { x: 475, y: 375 },
            { x: 500, y: 475 },
            { x: 400, y: 400 },
            { x: 300, y: 475 },
            { x: 325, y: 375 },
            { x: 250, y: 300 },
            { x: 350, y: 300 }
        ],
        forme: 'etoile',
        solution: [0,1,2,3,4,5,6,7,8,9,0]
    },
    {
        points: [
            { x: 400, y: 150 },
            { x: 350, y: 200 },
            { x: 300, y: 250 },
            { x: 350, y: 300 },
            { x: 400, y: 350 },
            { x: 450, y: 300 },
            { x: 500, y: 250 },
            { x: 450, y: 200 },
            { x: 400, y: 250 }
        ],
        forme: 'coeur',
        solution: [8,1,2,3,4,5,6,7,8]
    },
    {
        points: [
            { x: 300, y: 100 },
            { x: 400, y: 100 },
            { x: 500, y: 100 },
            { x: 300, y: 200 },
            { x: 400, y: 200 },
            { x: 500, y: 200 },
            { x: 300, y: 300 },
            { x: 400, y: 300 },
            { x: 500, y: 300 },
            { x: 300, y: 400 },
            { x: 400, y: 400 },
            { x: 500, y: 400 }
        ],
        forme: 'cerf_volant',
        solution: [4,3,1,4,1,5,4,10,3,4,5,10]
    }
];

//Affiche le bloc pour entrer le nom de utilisateur
function entrerNom() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('formule').style.display = 'block';
    console.log("entrerNom called");
}

function lancerJeu() {
    console.log("lancerJeu called");
    document.getElementById('menu').style.display = 'none';
    document.getElementById('formule').style.display = 'none';
    document.getElementById('boite-jeu').style.display = 'block';

    chargerNiveau(0);
}

function afficheInstruction() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('instructions').style.display = 'block';
}

function cacherInstruction() {
    document.getElementById('instructions').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
}

function chargerNiveau(niveau) {
    niveauActuel = niveau;
    const donneeNiveau = niveaux[niveau];
    points = donneeNiveau.points;
    ligne = [];
    ligneCourante = [];
    dessinerNiveau();
}

function recommencerNiveau() {
    ligne = [];
    ligneCourante = [];
    dessinerNiveau();
}

function niveauSuivant() {
    document.getElementById('niveau-suivant').style.display = 'none';
    if (niveauActuel < niveaux.length - 1) {
        chargerNiveau(niveauActuel + 1);
    } else {
        document.getElementById('boite-jeu').style.display = 'none';
        document.getElementById('felicitaion').style.display = 'block';
    }
}

function allerAccueil() {
    document.getElementById('boite-jeu').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
}

function dessinerNiveau() {
    ctx.clearRect(0, 0, canvas.width, canvas.height = 600);
    dessinerPoint();
    dessinerLigne();
}

function dessinerPoint() {
    points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'yellow';
        ctx.fill();
    });
}

function dessinerLigne() {
    ligne.forEach(line => {
        ctx.beginPath();
        ctx.moveTo(line[0].x, line[0].y);
        ctx.lineTo(line[1].x, line[1].y);
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 3;
        ctx.stroke();
    });
}

function validerNiveau() {
    const donneeNiveau = niveaux[niveauActuel];
    if (ligne.length === donneeNiveau.solution.length - 1) {
        const ordreCorrect = donneeNiveau.solution.every((pointIndex, index) => {
            if (index === 0) return true;
            const pointPred = donneeNiveau.solution[index - 1];
            return (ligne[index - 1][0].x === points[pointPred].x && ligne[index - 1][0].y === points[pointPred].y) &&
                (ligne[index - 1][1].x === points[pointIndex].x && ligne[index - 1][1].y === points[pointIndex].y);
        });

        if (ordreCorrect) {
            ctx.strokeStyle = 'green';
            ligne.forEach(line => {
                ctx.beginPath();
                ctx.moveTo(line[0].x, line[0].y);
                ctx.lineTo(line[1].x, line[1].y);
                ctx.stroke();
            });
            document.getElementById('niveau-suivant').style.display = 'block';
        }
    }
}


canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    points.forEach(point => {
        if (Math.abs(point.x - x) < 10 && Math.abs(point.y - y) < 10) {
            if (ligneCourante.length === 0) {
                ligneCourante.push(point);
            } else if (ligneCourante.length === 1) {
                ligneCourante.push(point);
                ligne.push([...ligneCourante]);
                ligneCourante = [];
                dessinerNiveau();
                validerNiveau();
            }
        }
    });
});
