const categories = ["Fruit", "Dieren", "Landen", "Kleuren", "Sporten", "Films"];
const fruits = ["appel", "banaan", "kers", "sinaasappel", "druif", "perzik", "kiwi", "ananas", "peer", "citroen", "mango", "watermeloen", "abrikoos", "framboos", "meloen"];
const animals = ["aap", "tijger", "olifant", "giraffe", "pinguin", "leeuw", "beer", "kangoeroe", "krokodil", "nijlpaard", "zebra", "schildpad", "leeuwerik", "walrus", "goudvis"];
const countries = ["nederland", "duitsland", "frankrijk", "spanje", "italie", "ierland", "belgie", "portugal", "oostenrijk", "zwitserland", "canada", "japan", "australie", "india", "brazilie"];
const colors = ["rood", "oranje", "geel", "groen", "blauw", "paars", "roze", "bruin", "zwart", "wit", "grijs", "turquoise", "indigo", "violet", "magenta"];
const sports = ["voetbal", "tennis", "basketbal", "golf", "hockey", "volleybal", "zwemmen", "hardlopen", "turnen", "wielrennen", "surfen", "boksen", "rugby", "bowlen", "schaatsen"];
const movies = ["titanic", "minions", "lionking", "zootropolis", "frozen", "startrek", "barbie", "starwars", "godzilla", "inception", "avatar", "spiderman", "gladiator", "aladdin", "ironman"];

function getRandomWord(category) {
    let wordList = [];
    switch (category.toLowerCase()) {
        case "fruit":
            wordList = fruits;
            break;
        case "dieren":
            wordList = animals;
            break;
        case "landen":
            wordList = countries;
            break;
        case "kleuren":
            wordList = colors;
            break;
        case "sporten":
            wordList = sports;
            break;
        case "films":
            wordList = movies;
            break;
        default:
            return "onbekend";
    }
    let word = "";
    while (word.length < 6 || word.length > 10) {
        word = wordList[Math.floor(Math.random() * wordList.length)];
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
}

let category = categories[Math.floor(Math.random() * categories.length)];
let chosenWord = getRandomWord(category);

const categoryDisplay = document.getElementById("category-display");
categoryDisplay.textContent = "Categorie: " + category;

let remainingGuesses = 5;
let score = 0;
let gameEnded = false;

const guessRowsContainer = document.getElementById("guess-rows");
const resultDisplay = document.getElementById("result-display");
const scoreDisplay = document.getElementById("score-display");
const newGameButton = document.getElementById("new-game-button");

function setupGuessRow() {
    const guessRow = document.createElement("div");
    guessRow.classList.add("guess-row");

    for (let i = 0; i < chosenWord.length; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.maxLength = 1;
        input.classList.add("letter-input");
        input.dataset.index = i;
        input.addEventListener("input", handleInput);
        input.addEventListener("keydown", handleKeyDown);

        guessRow.appendChild(input);
    }

    guessRowsContainer.appendChild(guessRow);
    guessRow.querySelector("input").focus();
}

function handleInput(event) {
    const input = event.target;
    const index = parseInt(input.dataset.index);
    if (input.value.length === 1) {
        if (index < chosenWord.length - 1) {
            guessRowsContainer.querySelectorAll(".guess-row").forEach(row => {
                row.children[index + 1].focus();
            });
        }
    }
}

function handleKeyDown(event) {
    const input = event.target;
    const index = parseInt(input.dataset.index);
    if (event.key === "Backspace" && input.value.length === 0 && index > 0) {
        guessRowsContainer.querySelectorAll(".guess-row").forEach(row => {
            row.children[index - 1].focus();
        });
    }
}

function getCurrentGuess() {
    let guess = "";
    const currentRow = guessRowsContainer.lastChild;
    const inputs = currentRow.getElementsByTagName("input");
    for (let input of inputs) {
        guess += input.value;
    }
    return guess.toLowerCase();
}

function checkGuess() {
    if (gameEnded) return;

    const guess = getCurrentGuess();
    if (guess.length !== chosenWord.length || !/^[a-z]+$/.test(guess)) {
        resultDisplay.textContent = "Ongeldige gok. Voer een geldig woord met " + chosenWord.length + " letters in.";
        return;
    }

    let correctGuess = true;
    let wordCopy = chosenWord.toLowerCase().split("");

    const currentRow = guessRowsContainer.lastChild;
    const inputs = currentRow.getElementsByTagName("input");

    for (let i = 0; i < chosenWord.length; i++) {
        inputs[i].classList.remove("correct", "misplaced", "wrong");

        if (guess[i] === wordCopy[i]) {
            inputs[i].classList.add("correct");
            wordCopy[i] = null; // Mark as used
            score += 200; // Increment score for correct letter
        } else if (wordCopy.includes(guess[i])) {
            inputs[i].classList.add("misplaced");
            wordCopy[wordCopy.indexOf(guess[i])] = null; // Mark as used
            correctGuess = false;
        } else {
            inputs[i].classList.add("wrong");
            correctGuess = false;
        }
    }

    if (correctGuess) {
        resultDisplay.innerHTML = "Gefeliciteerd! Je hebt het woord geraden!";
        gameEnded = true;
        newGameButton.style.display = "inline";
    } else if (remainingGuesses === 0) {
        resultDisplay.innerHTML = "Sorry, je hebt geen pogingen meer over. Het woord was: " + chosenWord;
        gameEnded = true;
        newGameButton.style.display = "inline";
    } else {
        remainingGuesses--;
        setupGuessRow();
    }
    scoreDisplay.textContent = "Score: " + score;
}

document.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});

function newGame() {
    category = categories[Math.floor(Math.random() * categories.length)];
    chosenWord = getRandomWord(category);
    categoryDisplay.textContent = "Categorie: " + category;
    remainingGuesses = 
 5;
        scoreDisplay.textContent = "Score: " + score;
        resultDisplay.textContent = "";
        guessRowsContainer.innerHTML = "";
        gameEnded = false;
        newGameButton.style.display = "none";
        setupGuessRow();
        }
        
        setupGuessRow();
