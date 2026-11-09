import random

choices = ["rock", "paper", "scissors"]

wins = 0
losses = 0
ties = 0

print("Rock Paper Scissors!")
print("Type rock, paper or scissors. Type q to quit.\n")

while True:
    player = input("Your move: ").lower().strip()

    if player == "q":
        break

    if player not in choices:
        print("That's not a valid move, try again.\n")
        continue

    computer = random.choice(choices)
    print("Computer picked", computer)

    if player == computer:
        print("Tie!")
        ties += 1
    elif (player == "rock" and computer == "scissors") or \
         (player == "paper" and computer == "rock") or \
         (player == "scissors" and computer == "paper"):
        print("You win!")
        wins += 1
    else:
        print("You lose!")
        losses += 1

    print("Score -> Wins:", wins, "Losses:", losses, "Ties:", ties, "\n")

print("Thanks for playing!")
print("Final score -> Wins:", wins, "Losses:", losses, "Ties:", ties)