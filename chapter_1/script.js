document.addEventListener('DOMContentLoaded', function () {
    // Generate the initial grid
    generateGrid(5, 4);
});
// Keep track of the flipped cards
let flippedCards = [];
let score = 0;
function generateGrid(rows, columns) {
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.innerHTML = '';
    flippedCards = []; 
    score = 0;

    // Set the grid styles dynamically
    gameContainer.style.display = 'grid';
    gameContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    gameContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    gameContainer.style.gridGap = '10px';

    // Generate the grid
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const gridItem = document.createElement('div');
            gridItem.className = 'grid-item';
            gridItem.addEventListener('click', flipCard);

            const card = document.createElement('div');
            card.className = 'card';
            gridItem.appendChild(card);

            const front = document.createElement('div');
            front.className = 'face front';
            const star = document.createElement('img');
            star.src = './img/19173807891555590645-512-removebg-preview.png';
            star.className = 'star';
            front.appendChild(star);
            card.appendChild(front);

            const back = document.createElement('div');
            back.className = 'face back';
            // Add a random image from the 'img' folder
            const randomImagePath = getRandomImagePath();
            back.style.backgroundImage = `url('${randomImagePath}')`;
            card.appendChild(back);

            gameContainer.appendChild(gridItem);
        }
    }
}


// Function to flip the card
function flipCard() {
    const card = this.querySelector('.card');

    // Check if there are already two flipped cards
    if (flippedCards.length < 2) {
        // Toggle the 'flipped' class
        card.classList.toggle('flipped');

        // Add the flipped card to the list
        flippedCards.push(card);

        // Check for a match when two cards are flipped
        if (flippedCards.length === 2) {
            const [card1, card2] = flippedCards;

            // Check if the cards match
            if (cardsMatch(card1, card2)) {
                // Remove click event listeners from matched cards
                card1.parentElement.removeEventListener('click', flipCard);
                card2.parentElement.removeEventListener('click', flipCard);

                // Clear the flipped cards array
                flippedCards = [];

                // Update the score
                score += 5;
                updateScore();
            } else {
                // If cards don't match, turn them back after a short delay
                setTimeout(() => {
                    card1.classList.remove('flipped');
                    card2.classList.remove('flipped');
                    flippedCards = [];
                }, 1000);
            }
        }
    }
}

// Shuffle function to randomly reorder array elements
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to get a random image path from the 'img' folder
function getRandomImagePath() {
    const imageFolder = './img/';
    const uniqueImagePairs = ['alien1.jpg', 'alien2.jpg', 'alien3.jpg', 'alien4.jpg', 'alien5.jpg', 'alien6.avif', 'alien7.avif', 'alien8.avif'];

    // Duplicate each image to create pairs
    const imageFiles = uniqueImagePairs.reduce((acc, img) => acc.concat(img, img), []);

    // Shuffle the array to randomize the order
    const shuffledImages = shuffleArray(imageFiles);

    // Pop the next image from the shuffled array
    const selectedImage = shuffledImages.pop();

    // Return the selected image path
    return imageFolder + selectedImage;
}
// Function to check if two cards match
function cardsMatch(card1, card2) {
    // Add your matching logic here
    // For now, let's assume cards match if their background images are the same
    const backgroundImage1 = card1.querySelector('.face.back').style.backgroundImage;
    const backgroundImage2 = card2.querySelector('.face.back').style.backgroundImage;

    return backgroundImage1 === backgroundImage2;
}

// Function to update the score in the HTML
function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Score: ${score}`;
}
