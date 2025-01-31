const bulb = document.getElementById('bulb');
const counter = document.getElementById('counter');
const startButton = document.getElementById('startButton');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const audioInicio = document.getElementById('audioInicio');
const audioGanaJugador1 = document.getElementById('audioGanaJugador1');
const audioGanaJugador2 = document.getElementById('audioGanaJugador2');
const audioPull = document.getElementById('audioPull');

let gameStarted = false;
let maxNumber = 15; // Valor máximo del contador
let countdownInterval;

// Minimizar header al desplazar
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('minimizado');
    } else {
        header.classList.remove('minimizado');
    }
});

startButton.addEventListener('click', startGame);

function startGame() {
    if (gameStarted) return; // Evitar múltiples inicios
    gameStarted = true;

    // Reiniciar el estado del juego
    bulb.style.backgroundColor = '#ff4444';
    counter.textContent = '0';
    player1.classList.remove('winner');
    player2.classList.remove('winner');

    // Reproducir el audio de inicio
    audioInicio.play();

    // Mostrar números aleatorios en el contador
    countdownInterval = setInterval(() => {
        const randomNumber = Math.floor(Math.random() * (maxNumber + 1)); // Número aleatorio entre 0 y 15
        counter.textContent = randomNumber;

        if (randomNumber === 0) {
            endCountdown();
        }
    }, 1000); // Cambiar el número cada segundo

    // Si el audio de inicio termina y el contador no es 0, forzar el contador a 0
    audioInicio.addEventListener('ended', () => {
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
        audioPull.play(); // Reproducir el audio "Pull"
        player1.classList.add('winner');
        audioGanaJugador1.play(); // Reproducir audio de victoria del Jugador 1
        endGame();
    } else if (event.key === 'p' || event.key === 'P') {
        audioPull.play(); // Reproducir el audio "Pull"
        player2.classList.add('winner');
        audioGanaJugador2.play(); // Reproducir audio de victoria del Jugador 2
        endGame();
    }
}

function endGame() {
    document.removeEventListener('keydown', handleKeyPress); // Dejar de escuchar teclas
    gameStarted = false;
    audioInicio.pause(); // Detener el audio de inicio
    audioInicio.currentTime = 0; // Reiniciar el audio de inicio
}
