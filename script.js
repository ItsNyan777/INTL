const bulb = document.getElementById('bulb');
const counter = document.getElementById('counter');
const startButton = document.getElementById('startButton');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const audio = document.getElementById('audio');

let gameStarted = false;
let maxNumber = 15; // Valor máximo del contador
let countdownInterval;

startButton.addEventListener('click', startGame);

function startGame() {
    if (gameStarted) return; // Evitar múltiples inicios
    gameStarted = true;

    // Reiniciar el estado del juego
    bulb.style.backgroundColor = '#ff4444';
    counter.textContent = '0';
    player1.classList.remove('winner');
    player2.classList.remove('winner');

    // Reproducir el audio
    audio.play();

    // Mostrar números aleatorios en el contador
    countdownInterval = setInterval(() => {
        const randomNumber = Math.floor(Math.random() * (maxNumber + 1)); // Número aleatorio entre 0 y 15
        counter.textContent = randomNumber;

        if (randomNumber === 0) {
            endCountdown();
        }
    }, 1000); // Cambiar el número cada segundo

    // Si el audio termina y el contador no es 0, forzar el contador a 0
    audio.addEventListener('ended', () => {
        if (counter.textContent !== '0') {
            counter.textContent = '0';
            endCountdown();
        }
    });
}

function endCountdown() {
    clearInterval(countdownInterval); // Detener el contador
    bulb.style.backgroundColor = '#4CAF50'; // Cambiar a verde
    document.addEventListener('keydown', handleKeyPress); // Escuchar teclas
}

function handleKeyPress(event) {
    if (event.key === 'q' || event.key === 'Q') {
        player1.classList.add('winner');
        endGame();
    } else if (event.key === 'p' || event.key === 'P') {
        player2.classList.add('winner');
        endGame();
    }
}

function endGame() {
    document.removeEventListener('keydown', handleKeyPress); // Dejar de escuchar teclas
    gameStarted = false;
    audio.pause(); // Detener el audio
    audio.currentTime = 0; // Reiniciar el audio
}
