const grid = document.getElementById('grid');
const movesDisplay = document.getElementById('moves');
const bestScoreDisplay = document.getElementById('best-score');
const restartBtn = document.getElementById('restart-btn');

let moves = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchesCount = 0;

// خواندن بهترین رکورد از localStorage در شروع بازی
let bestScore = localStorage.getItem('memoryBestScore') || '-';
bestScoreDisplay.textContent = bestScore;

// لیست کارت‌ها (۴ جفت)
const cardsArray = [
    { name: 'apple', img: '🍎' },
    { name: 'apple', img: '🍎' },
    { name: 'banana', img: '🍌' },
    { name: 'banana', img: '🍌' },
    { name: 'cherry', img: '🍒' },
    { name: 'cherry', img: '🍒' },
    { name: 'grape', img: '🍇' },
    { name: 'grape', img: '🍇' },
];

// به هم ریختن تصادفی کارت‌ها در شروع بازی
cardsArray.sort(() => 0.5 - Math.random());

// ساخت صفحه بازی
function createBoard() {
    if (!grid) {
        console.error("عنصر grid در صفحه پیدا نشد!");
        return;
    }
    grid.innerHTML = '';
    cardsArray.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = item.name;

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.textContent = '❓';

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardBack.textContent = item.img;

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    moves++;
    movesDisplay.textContent = moves;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    if (isMatch) {
        disableCards();
        matchesCount++;
        // بررسی پایان بازی (۴ جفت)
        if (matchesCount === 4) {
            setTimeout(() => {
                alert(`آفرین! بازی تمام شد با ${moves} حرکت 🎉`);
                checkAndSaveBestScore();
            }, 300);
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// بررسی و ذخیره بهترین رکورد
function checkAndSaveBestScore() {
    if (bestScore === '-' || moves < parseInt(bestScore)) {
        bestScore = moves;
        localStorage.setItem('memoryBestScore', bestScore);
        bestScoreDisplay.textContent = bestScore;
    }
}

// دکمه شروع مجدد
restartBtn.addEventListener('click', () => {
    moves = 0;
    matchesCount = 0;
    movesDisplay.textContent = moves;
    cardsArray.sort(() => 0.5 - Math.random());
    createBoard();
});

// راه‌اندازی اولیه بازی
createBoard();
