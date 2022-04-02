
var startbutton = document.querySelector("#startbutton");
var timer = document.querySelector("#timer");
var guess = document.querySelector("#guess");
var timerInterval;
var selectedWord = '';
var wordPool = ["candy", "pride", "react", "paper", "digit", "repay", "strike"];
var match = false;
var questionCompleted = false;
var totalWin = localStorage.getItem("totalWin");
var totalLoose = localStorage.getItem("totalLoose");

if(totalWin == null){
  totalWin = 0 ;
}
wincount.textContent = totalWin;

if(totalLoose == null){
  totalLoose = 0 ;
}
loosecount.textContent = totalLoose;

function getRandomWord(wordList) {
  var rnum = Math.floor(Math.random() * wordList.length);
  return wordList[rnum];
}

localStorage.setItem("totalWin", totalWin);

startbutton.addEventListener("click", function () {
  var timeLeft = 10;
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


var combinedKeypress = '';
document.body.addEventListener('keyup', function (event) {
  if (isCharPresent(selectedWord, event.key)
    && !isCharPresent(combinedKeypress, event.key)) {
    combinedKeypress = combinedKeypress + event.key;
  }
  guess.textContent = displayQuestion();

  if (match == true && questionCompleted == false) {
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
    if (!isCharPresent(combinedKeypress, a)) {
      match = false;
      final = final + " " + '_';
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



// Notes: 
// 1. Add a footer notification for wrong key pressed event which 
// disappers after some time.
// 2. Define a text which shows you lost for 1 second
// and then becomes invisible;