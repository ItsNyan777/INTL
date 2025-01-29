const bulb = document.getElementById('bulb');
const counter = document.getElementById('counter');
const startButton = document.getElementById('startButton');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');

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

    // Generar un tiempo aleatorio entre 1 y maxNumber segundos
    const randomTime = Math.floor(Math.random() * maxNumber * 1000) + 1000;

    // Mostrar números aleatorios en el contador
    countdownInterval = setInterval(() => {
        const randomNumber = Math.floor(Math.random() * (maxNumber + 1)); // Número aleatorio entre 0 y 15
        counter.textContent = randomNumber;

        if (randomNumber === 0) {
            clearInterval(countdownInterval);
            bulb.style.backgroundColor = '#4CAF50'; // Cambiar a verde
            document.addEventListener('keydown', handleKeyPress); // Escuchar teclas
        }
    }, 1000); // Cambiar el número cada segundo
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
    clearInterval(countdownInterval); // Detener el contador
}
