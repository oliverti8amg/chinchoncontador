// Función para generar el teclado en pantalla
function generateKeyboard() {
    const keyboardContainer = document.getElementById('keyboardTest');
    const keys = [
        'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
        'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
        'Z', 'X', 'C', 'V', 'B', 'N', 'M',
        'Enter', 'Space', 'Backspace', 'Tab'
    ];
    
    keyboardContainer.innerHTML = keys.map(key => `
        <div class="key" data-key="${key}">${key}</div>
    `).join('');
    
    keyboardContainer.addEventListener('mousedown', (event) => {
        if (event.target.classList.contains('key')) {
            event.target.classList.add('pressed');
        }
    });

    document.addEventListener('keyup', (event) => {
        const keyElement = document.querySelector(`.key[data-key="${event.key.toUpperCase()}"]`);
        if (keyElement) {
            keyElement.classList.remove('pressed');
        }
    });

    document.addEventListener('keydown', (event) => {
        const keyElement = document.querySelector(`.key[data-key="${event.key.toUpperCase()}"]`);
        if (keyElement) {
            keyElement.classList.add('pressed');
        }
    });
}

// Función para iniciar la prueba de ratón
function startMouseTest() {
    const testResults = document.getElementById('testResults');
    testResults.innerHTML = `
        <h2>Prueba de Ratón</h2>
        <p>Haz clic en cualquier lugar de la pantalla.</p>
        <div id="mouseTest">
            <p>Botones del ratón presionados: <span id="mouseButtons">-</span></p>
            <p>Contador de clics: <span id="clickCounter">0</span></p>
            <p>Clicks por segundo: <span id="clickRate">0</span></p>
        </div>
    `;
    testResults.style.display = 'block';

    let clickCounter = 0;
    let startTime = Date.now();

    const buttons = { 0: 'Izquierdo', 1: 'Central', 2: 'Derecho' };

    document.addEventListener('mousedown', (event) => {
        clickCounter++;
        document.getElementById('mouseButtons').textContent = buttons[event.button] || 'Desconocido';
        document.getElementById('clickCounter').textContent = clickCounter;
    });

    setInterval(() => {
        const elapsedTime = (Date.now() - startTime) / 1000;
        const clickRate = (clickCounter / elapsedTime).toFixed(2);
        document.getElementById('clickRate').textContent = clickRate;
    }, 1000);
}

// Función para iniciar la prueba de teclado
function startKeyboardTest() {
    const testResults = document.getElementById('testResults');
    testResults.innerHTML = `
        <h2>Prueba de Teclado</h2>
        <p>Presiona cualquier tecla en el teclado.</p>
        <div id="keyboardTest"></div>
    `;
    testResults.style.display = 'block';
    generateKeyboard();
}

// Función para iniciar el juego
function startGame() {
    const numPlayers = document.getElementById('numPlayers').value;
    if (numPlayers < 1) {
        alert('El número de jugadores debe ser al menos 1');
        return;
    }

    const playersContainer = document.getElementById('playersContainer');
    playersContainer.innerHTML = '';

    for (let i = 0; i < numPlayers; i++) {
        const playerDiv = document.createElement('div');
        playerDiv.classList.add('playerName');
        playerDiv.innerHTML = `
            <label for="player${i}">Nombre del Jugador ${i + 1}:</label>
            <input type="text" id="player${i}" class="playerInput">
        `;
        playersContainer.appendChild(playerDiv);
    }

    document.getElementById('scoreContainer').style.display = 'block';
}

// Función para agregar una ronda
function addRound() {
    const playerInputs = document.querySelectorAll('.playerInput');
    const playerNames = Array.from(playerInputs).map(input => input.value);
    
    if (playerNames.some(name => name.trim() === '')) {
        alert('Por favor, ingrese nombres para todos los jugadores');
        return;
    }

    const scoreTables = document.getElementById('scoreTables');
    const roundNumber = scoreTables.children.length + 1;

    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Ronda ${roundNumber}</th>
                ${playerNames.map(name => `<th>${name}</th>`).join('')}
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Puntuación</td>
                ${playerNames.map(() => `<td><input type="number" min="0"></td>`).join('')}
            </tr>
        </tbody>
    `;

    scoreTables.appendChild(table);
}

// Función para calcular las sumas de las puntuaciones
function calculateSums() {
    const playerInputs = document.querySelectorAll('.playerInput');
    const playerNames = Array.from(playerInputs).map(input => input.value);

    const totalsContainer = document.getElementById('totalsContainer');
    totalsContainer.innerHTML = '';

    const totals = playerNames.map(() => 0);

    const tables = document.querySelectorAll('#scoreTables table');
    tables.forEach(table => {
        const row = table.querySelector('tbody tr');
        const inputs = row.querySelectorAll('td input');
        inputs.forEach((input, index) => {
            const value = parseInt(input.value);
            if (!isNaN(value)) {
                totals[index] += value;
            }
        });
    });

    playerNames.forEach((name, index) => {
        const totalRow = document.createElement('div');
        totalRow.classList.add('totalRow');
        totalRow.innerHTML = `<strong>${name}:</strong> ${totals[index]}`;
        totalsContainer.appendChild(totalRow);
    });
}

// Función para reiniciar el juego
function resetGame() {
    document.getElementById('playersContainer').innerHTML = '';
    document.getElementById('scoreTables').innerHTML = '';
    document.getElementById('totalsContainer').innerHTML = '';
    document.getElementById('scoreContainer').style.display = 'none';
    document.getElementById('numPlayers').value = '';
}

// Función para eliminar la última ronda
function removeLastRound() {
    const scoreTables = document.getElementById('scoreTables');
    if (scoreTables.children.length > 0) {
        scoreTables.removeChild(scoreTables.lastChild);
    }
}

// Función para alternar entre modo oscuro y claro
function toggleDarkMode() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    const toggleSwitch = document.getElementById('darkModeToggle');
    toggleSwitch.checked = isDarkMode;
}

// Función para mostrar las opciones de prueba
function showTestOptions() {
    document.getElementById('testOptions').style.display = 'block';
}

// Agregar un event listener para el cambio del modo oscuro
document.getElementById('darkModeToggle').addEventListener('change', toggleDarkMode);
