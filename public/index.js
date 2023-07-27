var wordArea;

var wordBank = [
    "hack()",
    "serverInfo.leak()",
    "getCreditCardInfo().money.removeAll()",
    "spliceDataCenter()",
    "nodeBreak.JSON().export()",
    "killServerProcess()",
    "govHack().whiteHouse",
    "addFunds(self, 10000)",
    "hideCrime()",
    "DDOS_All(true)",
    "trackAddress(1715, \"buisiness\")"
];

var words = [];
var newWordTime = 50;

var letters = [];

function wordScroll() {

    if (newWordTime <= 0) {
        addWord();
        newWordTime = Math.floor(Math.random() * 500 + 50);
    }

    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        word.style.left = (parseFloat(word.style.left) + 1) + "px";
        if (parseFloat(word.style.left) >= wordArea.offsetWidth) {
            words.splice(i, 1);
            wordArea.removeChild(word);
        }
    }
    for (let i = 0; i < letters.length; i++) {
        let letter = letters[i];
        letter.style.left = parseFloat(parseFloat(letter.style.left) + parseFloat(letter.dataset.velX)) + "px";
        letter.style.top = parseFloat(parseFloat(letter.style.top) + parseFloat(letter.dataset.velY)) + "px";
        letter.dataset.velY = parseFloat(letter.dataset.velY) + 0.1;
        if (parseFloat(letter.style.top) > wordArea.offsetHeight + 40) {
            letters.splice(i, 1);
            wordArea.removeChild(letter);
        }
    }

    newWordTime--;
    requestAnimationFrame(wordScroll);
}

function addWord() {
    let newWord = document.createElement("div");
    newWord.style.position = "absolute";
    newWord.style.left = "-400px";
    newWord.style.top = (Math.random() * (wordArea.offsetHeight - 50)) + "px";
    newWord.textContent = wordBank[Math.floor(Math.random() * wordBank.length)];
    newWord.style.cursor = "pointer";
    newWord.className = "scrolling-word";

    newWord.addEventListener("mousedown", e => {
        breakWord(newWord);
    });

    words.push(newWord);
    wordArea.appendChild(newWord);
}

function breakWord(wordElement) {
    for (let i = 0; i < words.length; i++) {
        if (words[i] === wordElement) {
            words.splice(i, 1);
        }
    }

    for (let i = 0; i < wordElement.textContent.length; i++) {
        let newLetter = document.createElement("div");
        newLetter.style.position = "absolute";
        newLetter.style.left = (parseFloat(wordElement.style.left) + (i * (wordElement.offsetWidth / wordElement.textContent.length))) + "px";
        newLetter.style.top = wordElement.style.top;
        newLetter.dataset.velX = Math.random() * 4 - 1;
        newLetter.dataset.velY = Math.random() * 8 - 4;
        newLetter.textContent = wordElement.textContent.charAt(i);
        newLetter.className = "scrolling-word";

        letters.push(newLetter);

        wordArea.appendChild(newLetter);
    }

    wordArea.removeChild(wordElement);
}

window.addEventListener("load", function() {
    wordArea = document.querySelector(".word-scroll");
    wordScroll();
});