
var startbutton = document.querySelector("#startbutton");
var timer = document.querySelector("#timer");
var guess = document.querySelector("#guess");
var timerInterval;
var selectedWord;
var wordPool = ["candy", "pride", "react", "paper", "digit", "repay", "strike"];

function getRandomWord(wordList) {
  var rnum = Math.floor(Math.random() * wordList.length);
  return wordList[rnum];
}

startbutton.addEventListener("click", function () {
  // console.log("Start button is pressed");
  var timeLeft = 60;
  clearInterval(timerInterval);
  timer.textContent = timeLeft;
  timerInterval = setInterval(function () {
    timeLeft--;
    timer.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      // define a text which shows you lost for 1 second
      // and then becomes invisible;
    }
  }, 1000);
  selectedWord = getRandomWord(wordPool);
  guess.textContent = selectedWord;

});

// Task : When I click start button a random word should be displayed
// From a pool of my question words.
// Define an array of question words and then select a random element
// from that and display that word/element from array in guess 






// result = getRandomWord(words);

// console.log(result);