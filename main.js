'use strict';

// DONNEES
const PLAYER_WIDTH = 10;
const PLAYER_HEIGHT = 100;

let canvas;
let context;

// Objet contenant les informations de la balle
let ball = {
    pos: {
        x: 0,
        y: 0
    },
    speed: {
        x: 2,
        y: 2
    }
};

let player1 = {
    pos: {
        x: 0,
        y: 0
    }
};

let player2 = {
    pos: {
        x: 0,
        y: 0
    }
};

// FONCTIONS
function drawField()
{
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawBall(x, y)
{
    context.beginPath();
    context.fillStyle = 'white';
    context.arc(x, y, 10, 0, Math.PI * 2, true);
    context.fill();
}

function drawLine()
{
    context.beginPath();
    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width / 2, canvas.height);
    context.strokeStyle = 'white';
    context.stroke();
}

function drawPlayer(x, y)
{
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x, y + PLAYER_HEIGHT);
    context.strokeStyle = 'white';
    context.stroke();
}

function refreshGame()
{
    // On supprime tout le canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // On augmente la position de la balle sur les 2 axes
    ball.pos.x += ball.speed.x;
    ball.pos.y += ball.speed.y;
    
    // Vérifier si la balle a atteint le bord du canvas (droit ou gauche => sur l'axe x)
    // Si oui changer de sens
    if (ball.pos.x >= canvas.width || ball.pos.x <= 0) {
        // Inversion de la vitesse de l'axe x
        ball.speed.x *= -1;
    }
    
    if (ball.pos.y >= canvas.height || ball.pos.y <= 0) {
        // Inversion de la vitesse de l'axe y
        ball.speed.y *= -1;
    }
    
    // Dessin de la zone de jeu
    drawField();
    
    // Dessin du joueur 1 et 2
    drawPlayer(player1.pos.x, player1.pos.y);
    drawPlayer(player2.pos.x, player2.pos.y);
    // Dessin de la balle avec la nouvelle position
    drawBall(ball.pos.x, ball.pos.y);
    
    // Dessin de la ligne médiane
    drawLine();
    
    // TODO : Dessin des joueurs 
    // une barre de 50px juste après le bord gauche du canvas 
    // et une autre barre de 50px juste avant le bord droit du canvas)
    
    // On rappelle la fonction
    requestAnimationFrame(refreshGame);
}

function onMovePlayer(event)
{
    // Récupérer la position de la souris
    const boundings = canvas.getBoundingClientRect();
    
    const mouseLocation = {
        x: event.clientX - boundings.left,
        y: event.clientY - boundings.top
    };
    
    // On synchronise la position de la souris avec la position du joueur
    player1.pos.y = mouseLocation.y - PLAYER_HEIGHT / 2;
}

// CODE PRINCIPAL
document.addEventListener('DOMContentLoaded', function () {
    // Récupération des éléments et mise en place des événements
    canvas = document.querySelector('#canvas');
    context = canvas.getContext('2d');
    
    // pour déplacer les joueurs
    canvas.addEventListener('mousemove', onMovePlayer);
    
    // Dessin de la zone de jeu
    drawField();
    
    // On définit la position initiale de la balle
    ball.pos.x = canvas.width / 2;
    ball.pos.y = canvas.height / 2;
    
    // On définit la position initiale des joueurs
    player1.pos.x = PLAYER_WIDTH;
    player1.pos.y = canvas.height / 2 - (PLAYER_HEIGHT / 2);
    
    player2.pos.x = canvas.width - PLAYER_WIDTH;
    player2.pos.y = canvas.height / 2 - (PLAYER_HEIGHT / 2);
    
    // Dessin du joueur
    drawPlayer(player1.pos.x, player1.pos.y);
    drawPlayer(player2.pos.x, player2.pos.y);
    
    // Dessin de la balle
    drawBall(ball.pos.x, ball.pos.y);
    
    // Dessin de la ligne médiane
    drawLine();
    
    // Lancement de l'animation
    requestAnimationFrame(refreshGame);
});