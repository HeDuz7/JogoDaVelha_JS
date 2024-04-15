document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const status = document.querySelector('.status');
    const resetButton = document.querySelector('.reset');
    const scoreX = document.getElementById('scoreX');
    const scoreO = document.getElementById('scoreO');

    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let score = { X: 0, O: 0 };

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const showAlert = (winner) => {
        const alertDiv = document.createElement('div');
        alertDiv.classList.add('alert', 'alert-success', 'alert-dismissible', 'fade', 'show');
        alertDiv.innerHTML = `
            <strong>${winner}</strong> venceu!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        document.body.appendChild(alertDiv);
    };

    const handleCellClick = (clickedCellEvent) => {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

        if (gameState[clickedCellIndex] !== '' || !gameActive) return;

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;

        if (checkWin()) {
            showAlert(currentPlayer);
            gameActive = false;
            score[currentPlayer]++;
            updateScore();
            return;
        }

        checkDraw();

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.innerHTML = `${currentPlayer} | Turno`;
    };

    const checkWin = () => {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;

            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return true;
            }
        }
        return false;
    };

    const checkDraw = () => {
        let isDraw = !gameState.includes('');
        if (isDraw) {
            gameActive = false;
            status.innerHTML = 'Empate!';
        }
    };

    const handleReset = () => {
        currentPlayer = 'X';
        gameActive = true;
        gameState = ['', '', '', '', '', '', '', '', ''];
        status.innerHTML = `${currentPlayer} | Turno`;
        cells.forEach(cell => cell.innerHTML = '');
    };

    const updateScore = () => {
        scoreX.innerText = score.X;
        scoreO.innerText = score.O;
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', handleReset);
});
