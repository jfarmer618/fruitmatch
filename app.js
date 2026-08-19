// ==========================================
// Card Matching Game
// 16 Cards / 8 Pairs
// ==========================================

// ------------------------------------------
// 1. Card Images
// ------------------------------------------

const images = [
    "apple.png",
    "banana.png",
    "cherry.png",
    "orange.png",
    "strawberry.png",
    "watermelon.png",
    "kiwi.png",
    "lemon.png"
];

// ------------------------------------------
// 2. Create pairs
// ------------------------------------------

// Make two copies of every image

const cards = [
    ...images,
    ...images
];

// ------------------------------------------
// 3. Get HTML elements
// ------------------------------------------

const board = document.getElementById("board");
const movesDisplay = document.getElementById("moves");
const pairsDisplay = document.getElementById("pairs");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart");

// ------------------------------------------
// 4. Game variables
// ------------------------------------------

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedPairs = 0;

// ------------------------------------------
// 5. Shuffle cards
// ------------------------------------------

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex =
            Math.floor(Math.random() * (i + 1));
        [
            array[i],
            array[randomIndex]
        ] = [
            array[randomIndex],
            array[i]
        ];
    }
    return array;
}

// ------------------------------------------
// 6. Create the game board
// ------------------------------------------

function createBoard() {
    // Clear the board
    board.innerHTML = "";

    // Reset game
    moves = 0;
    matchedPairs = 0;
    firstCard = null;
    secondCard = null;
    lockBoard = false;

    // Update screen
    movesDisplay.textContent = moves;
    pairsDisplay.textContent = matchedPairs;
    message.textContent = "";

    // Shuffle cards
    const shuffledCards = shuffle([...cards]);

    // Create each card
    shuffledCards.forEach((imageName, index) => {
        const card = document.createElement("div");
        card.classList.add("card");

        // Store the image name on the card
        card.dataset.image = imageName;

        // Create card HTML
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <img
                        src="images/card-front.png"
                        alt="Matching card"
                    >
                </div>
                <div class="card-back">
                    <img
                        src="images/${imageName}"
                        alt="Matching card"
                    >
                </div>
            </div>
        `;

        // Add click event
        card.addEventListener("click", function () {
            flipCard(card);
        });

        // Add card to board
        board.appendChild(card);
    });
}


// ------------------------------------------
// 7. Flip a card
// ------------------------------------------

function flipCard(card) {
    // Don't allow clicks while cards
    // are waiting to be flipped back

    if (lockBoard) {
        return;
    }

    // Don't allow clicking the same card twice
    if (card === firstCard) {
        return;
    }

    // Don't allow clicking matched cards
    if (card.classList.contains("matched")) {
        return;
    }

    // Flip the card
    card.classList.add("flipped");

    // First card?
    if (firstCard === null) {
        firstCard = card;
        return;
    }

    // Otherwise this is the second card
    secondCard = card;

    // Count the move
    moves++;
    movesDisplay.textContent = moves;

    // Check the two cards
    checkForMatch();
}

// ------------------------------------------
// 8. Check for a match
// ------------------------------------------

function checkForMatch() {
    const firstImage =
        firstCard.dataset.image;

    const secondImage =
        secondCard.dataset.image;

    // Are the images the same?
    if (firstImage === secondImage) {
        cardsMatch();
    } else {
        cardsDoNotMatch();
    }
}

// ------------------------------------------
// 9. Matching cards
// ------------------------------------------

function cardsMatch() {
    // Mark both cards as matched
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    // Increase matched pair count
    matchedPairs++;
    pairsDisplay.textContent = matchedPairs;

    // Reset for next turn
    resetTurn();

    // Check for game completion
    if (matchedPairs === 8) {
        message.textContent =
            `You won in ${moves} moves!`;
    }
}

// ------------------------------------------
// 10. Cards don't match
// ------------------------------------------

function cardsDoNotMatch() {
    // Temporarily lock the board
    lockBoard = true;

    // Wait one second
    setTimeout(() => {

        // Flip cards back
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");

        // Allow another turn
        resetTurn();
    }, 1000);
}

// ------------------------------------------
// 11. Reset turn
// ------------------------------------------
function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

// ------------------------------------------
// 12. Restart button
// ------------------------------------------
restartButton.addEventListener(
    "click",
    createBoard
);

// ------------------------------------------
// 13. Start the game
// ------------------------------------------
createBoard();