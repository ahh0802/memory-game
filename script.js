const grid = document.getElementById('grid');
const movesDisplay = document.getElementById('moves');

// لیست ایموجی کارت‌ها (۴ جفت)
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

let flippedCards = [];
let matchedPairs = 0;
let moves = 0;

// ساخت کارت‌ها روی صفحه
function createBoard() {
    cardsArray.forEach((item, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.id = index;
        card.addEventListener('click', flipCard);
        
        // استایل‌های پایه برای ظاهر کارت
        card.style.width = '80px';
        card.style.height = '80px';
        card.style.backgroundColor = '#0f3460';
        card.style.borderRadius = '10px';
        card.style.display = 'flex';
        card.style.justifyContent = 'center';
        card.style.alignItems = 'center';
        card.style.fontSize = '35px';
        card.style.cursor = 'pointer';
        card.style.transition = '0.3s';

        grid.appendChild(card);
    });
}

// منطق برگشتن کارت
function flipCard() {
    const selectedCard = this;
    const cardId = selectedCard.dataset.id;

    // اگر کارت قبلاً باز شده یا دو کارت باز است، کاری نکن
    if (flippedCards.length < 2 && !selectedCard.classList.contains('flipped')) {
        selectedCard.classList.add('flipped');
        selectedCard.textContent = cardsArray[cardId].img;
        selectedCard.style.backgroundColor = '#e94560';
        
        flippedCards.push({ id: cardId, name: cardsArray[cardId].name, element: selectedCard });

        if (flippedCards.length === 2) {
            moves++;
            movesDisplay.textContent = moves;
            checkForMatch();
        }
    }
}

// بررسی تطابق دو کارت
function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.name === secondCard.name) {
        // اگر کارت‌ها یکی بودند
        matchedPairs++;
        flippedCards = [];

        if (matchedPairs === cardsArray.length / 2) {
            setTimeout(() => {
                alert(`آفرین! شما بازی را با ${moves} حرکت به اتمام رساندید! 🎉`);
            }, 300);
        }
    } else {
        // اگر کارت‌ها یکی نبودند، بعد از نیم ثانیه برگردند
        setTimeout(() => {
            firstCard.element.classList.remove('flipped');
            firstCard.element.textContent = '';
            firstCard.element.style.backgroundColor = '#0f3460';

            secondCard.element.classList.remove('flipped');
            secondCard.element.textContent = '';
            secondCard.element.style.backgroundColor = '#0f3460';

            flippedCards = [];
        }, 600);
    }
}

createBoard();
