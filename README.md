# Rock Paper Scissors

A rock paper scissors game you play against the computer, right in your browser. I made it with HTML, CSS and JavaScript. The whole thing looks like a classroom chalkboard because I wanted it to feel different from the usual plain buttons-on-a-white-page version.

Live link:https://rockpaperscissorsvsbots.netlify.app/

## How to play

1. Click "Yes, let's play!" on the popup.
2. Pick a match length at the top: Best of 3, Best of 5 or Best of 9.
3. Click Rock, Paper or Scissors. You can also press R, P or S on your keyboard.
4. Wait for the countdown. The computer picks at random.
5. First one to win enough rounds takes the match.

The usual rules apply. Rock beats scissors, scissors beats paper, paper beats rock. Same move is a tie.

## What it has

- Chalk tally marks for the score (every fifth point gets a slash through it)
- A little box for each round, so you can see how the match went
- A countdown with shaking hands before every reveal
- A sticky note in the corner that says something different after each round
- An eraser at the bottom that wipes the board and starts over
- Works on phones too, though it looks best on a bigger screen

## Running it

You don't need to install anything. Download the folder and open `index.html` in your browser. The fonts come from Google Fonts, so you need an internet connection for them to load. Without it the game still works, it just uses a default font.

## Files

- `index.html` is the page itself
- `style.css` is all the styling
- `script.js` is the game logic

## Built with

- HTML
- CSS
- JavaScript (no libraries)
- Google Fonts (Permanent Marker and Nunito)

## Things I might add later

- Sound effects
- A name box so the scoreboard says your name
- A smarter computer that notices if you pick the same move a lot
- A light mode

## Notes

The computer just picks a random move each round, so there is no trick to beating it. If you lose five in a row, that's just bad luck.

Made by Yatin
