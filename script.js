var playerScore = 0;
var compScore = 0;
var ties = 0;
var winsNeeded = 3;

var started = false;
var rolling = false;
var matchOver = false;
var rounds = [];

var moves = ["rock", "paper", "scissors"];

var icons = {
  rock: '<svg viewBox="0 0 100 100" fill="none" stroke="#fff" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">' +
        '<polygon points="20,72 12,46 32,20 64,16 88,42 80,76 50,88"/>' +
        '<polyline points="32,20 40,46 64,50 88,42"/><polyline points="40,46 20,72"/></svg>',
  paper: '<svg viewBox="0 0 100 100" fill="none" stroke="#fff" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">' +
         '<path d="M22,10 L68,10 L82,24 L82,90 L22,90 Z"/><polyline points="68,10 68,24 82,24"/>' +
         '<line x1="34" y1="42" x2="70" y2="42"/><line x1="34" y1="58" x2="70" y2="58"/><line x1="34" y1="74" x2="56" y2="74"/></svg>',
  scissors: '<svg viewBox="0 0 100 100" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round">' +
            '<line x1="30" y1="62" x2="76" y2="8"/><line x1="70" y1="62" x2="24" y2="8"/>' +
            '<circle cx="28" cy="78" r="12"/><circle cx="72" cy="78" r="12"/></svg>'
};

var winNotes = ["ok, nice one", "beginner's luck?", "hmm, not bad", "lucky..."];
var loseNotes = ["ha! too easy", "better luck next time", "did you even try?", "I saw that coming"];
var tieNotes = ["great minds think alike", "again!", "boring, go again"];

document.getElementById("iconRock").innerHTML = icons.rock;
document.getElementById("iconPaper").innerHTML = icons.paper;
document.getElementById("iconScissors").innerHTML = icons.scissors;

drawTally();
setButtons(true);

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function setNote(text) {
  document.getElementById("sticky").innerText = text;
}

function startGame() {
  document.getElementById("intro").className = "intro hidden";
  started = true;
  setButtons(false);
  setNote("good luck :)");
}

function notNow() {
  document.getElementById("introText").innerText = "No worries, refresh the page if you change your mind.";
  document.getElementById("askText").innerText = "";
  document.getElementById("noBtn").style.display = "none";
  setNote("see you later");
}

function setMode(element) {
  if (rolling) {
    return;
  }
  var all = document.querySelectorAll(".mode");
  for (var i = 0; i < all.length; i++) {
    all[i].className = "mode";
  }
  element.className = "mode active";
  winsNeeded = Number(element.getAttribute("data-wins"));
  wipeBoard();
}

function setButtons(disabled) {
  var buttons = document.querySelectorAll(".choice");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].disabled = disabled;
  }
}

function getResult(player, comp) {
  if (player == comp) {
    return "tie";
  }
  if ((player == "rock" && comp == "scissors") ||
      (player == "paper" && comp == "rock") ||
      (player == "scissors" && comp == "paper")) {
    return "win";
  }
  return "lose";
}

function play(choice) {
  if (!started || rolling || matchOver) {
    return;
  }
  rolling = true;
  setButtons(true);

  var playerSlot = document.getElementById("playerSlot");
  var compSlot = document.getElementById("compSlot");
  var message = document.getElementById("message");

  playerSlot.className = "slot shake";
  compSlot.className = "slot shake";
  playerSlot.innerHTML = icons.rock;
  compSlot.innerHTML = icons.rock;
  setNote("...");

  message.innerText = "Rock...";
  setTimeout(function () { message.innerText = "Paper..."; }, 400);
  setTimeout(function () { message.innerText = "Scissors..."; }, 800);
  setTimeout(function () { message.innerText = "Shoot!"; }, 1200);

  setTimeout(function () {
    var comp = pick(moves);
    var result = getResult(choice, comp);

    playerSlot.innerHTML = icons[choice];
    compSlot.innerHTML = icons[comp];
    playerSlot.className = "slot";
    compSlot.className = "slot";

    if (result == "win") {
      playerScore++;
      message.innerText = "You win this round!";
      playerSlot.className = "slot winner";
      compSlot.className = "slot loser";
      setNote(pick(winNotes));
    } else if (result == "lose") {
      compScore++;
      message.innerText = "Computer wins this round";
      playerSlot.className = "slot loser";
      compSlot.className = "slot winner";
      setNote(pick(loseNotes));
    } else {
      ties++;
      message.innerText = "It's a tie";
      setNote(pick(tieNotes));
    }

    rounds.push(result);
    document.getElementById("ties").innerText = ties;
    drawTally();
    drawRounds();
    rolling = false;

    if (playerScore == winsNeeded || compScore == winsNeeded) {
      endMatch();
    } else {
      setButtons(false);
    }
  }, 1600);
}

function makeTally(count) {
  var html = "";
  var full = Math.floor(count / 5);
  var left = count % 5;
  for (var i = 0; i < full; i++) {
    html += '<div class="group"><div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="slash"></div></div>';
  }
  if (left > 0) {
    html += '<div class="group">';
    for (var j = 0; j < left; j++) {
      html += '<div class="bar"></div>';
    }
    html += '</div>';
  }
  return html;
}

function drawTally() {
  document.getElementById("playerTally").innerHTML = makeTally(playerScore);
  document.getElementById("compTally").innerHTML = makeTally(compScore);
}

function drawRounds() {
  var html = "";
  for (var i = 0; i < rounds.length; i++) {
    if (rounds[i] == "win") {
      html += '<span class="box w">W</span>';
    } else if (rounds[i] == "lose") {
      html += '<span class="box l">L</span>';
    } else {
      html += '<span class="box">-</span>';
    }
  }
  document.getElementById("rounds").innerHTML = html;
}

function endMatch() {
  matchOver = true;
  var message = document.getElementById("message");
  if (playerScore > compScore) {
    message.innerText = "You won the match!";
    setNote("ok ok you win. rematch?");
  } else {
    message.innerText = "Computer won the match";
    setNote("told you :P");
  }
  document.getElementById("againRow").style.display = "block";
}

function wipeBoard() {
  if (rolling) {
    return;
  }
  playerScore = 0;
  compScore = 0;
  ties = 0;
  rounds = [];
  matchOver = false;

  document.getElementById("ties").innerText = 0;
  document.getElementById("playerSlot").className = "slot";
  document.getElementById("compSlot").className = "slot";
  document.getElementById("playerSlot").innerHTML = '<span class="q">?</span>';
  document.getElementById("compSlot").innerHTML = '<span class="q">?</span>';
  document.getElementById("message").innerText = "Choose your move";
  document.getElementById("againRow").style.display = "none";
  drawTally();
  drawRounds();
  setNote("fresh board!");

  if (started) {
    setButtons(false);
  }
}

document.addEventListener("keydown", function (e) {
  if (e.ctrlKey || e.metaKey || e.altKey) {
    return;
  }
  var key = e.key.toLowerCase();
  if (key == "r") play("rock");
  if (key == "p") play("paper");
  if (key == "s") play("scissors");
});