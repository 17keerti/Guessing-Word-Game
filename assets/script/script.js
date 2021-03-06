var startbutton = document.querySelector("#startbutton");
var timer = document.querySelector("#timer");
var guess = document.querySelector("#guess");
var timerInterval;
var selectedWord = "";
var wordPool = ["candy", "pride", "react", "paper", "digit", "repay", "strike"];
var match = false;
var questionCompleted = false;
var totalWin = localStorage.getItem("totalWin");
var totalLoose = localStorage.getItem("totalLoose");
var matchingInputChar = "";

if (totalWin == null) {
  totalWin = 0;
}
wincount.textContent = totalWin;

if (totalLoose == null) {
  totalLoose = 0;
}
loosecount.textContent = totalLoose;

function getRandomWord(wordList) {
  var rnum = Math.floor(Math.random() * wordList.length);
  return wordList[rnum];
}

localStorage.setItem("totalWin", totalWin);

startbutton.addEventListener("click", function () {
  matchingInputChar = "";
  var timeLeft = 30;
  clearInterval(timerInterval);
  timer.textContent = timeLeft;
  timerInterval = setInterval(function () {
    timeLeft--;
    timer.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      totalLoose++;
      loosecount.textContent = totalLoose;
      questionCompleted = true;
      localStorage.setItem("totalLoose", totalLoose);
    }
  }, 1000);
  selectedWord = getRandomWord(wordPool);
  guess.textContent = displayQuestion();
});

document.body.addEventListener("keyup", function (event) {
  if (
    isCharPresent(selectedWord, event.key) &&
    !isCharPresent(matchingInputChar, event.key)
  ) {
    matchingInputChar = matchingInputChar + event.key;
  }
  guess.textContent = displayQuestion();

  if (match == true) {
    questionCompleted = true;
    totalWin++;
    wincount.textContent = totalWin;
    clearInterval(timerInterval);
    localStorage.setItem("totalWin", totalWin);
  }
});

function displayQuestion() {
  var final = "";
  match = true;
  for (var i = 0; i < selectedWord.length; i++) {
    var a = selectedWord[i];
    if (!isCharPresent(matchingInputChar, a)) {
      match = false;
      final = final + " " + "_";
    } else {
      final = final + " " + a;
    }
  }
  return final;
}

function isCharPresent(str, char) {
  for (var i = 0; i < str.length; i++) {
    if (char === str[i]) {
      return true;
    }
  }
  return false;
}
