document.addEventListener('DOMContentLoaded', function () {
    // Generate the initial grid
    generateGrid(1, 1);
});

// Function to generate the grid dynamically
function generateGrid(rows, columns) {
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.innerHTML = '';

    // Generate the grid
    for (let i = 0; i < rows * columns; i++) {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        gridItem.addEventListener('click', flipCard);

        const card = document.createElement('div');
        card.className = 'card';
        gridItem.appendChild(card);

        const front = document.createElement('div');
        front.className = 'face front';
        const star = document.createElement('div');
        star.className = 'star';
        front.appendChild(star);
        card.appendChild(front);

        const back = document.createElement('div');
        back.className = 'face back';
        // Add your image path to the 'url()' property
        back.style.backgroundImage = "url('./img/alien1.jpg')";
        card.appendChild(back);

        gameContainer.appendChild(gridItem);
        
    }
}

// Function to flip the card
function flipCard() {
    this.querySelector('.card').classList.toggle('flipped');
}
