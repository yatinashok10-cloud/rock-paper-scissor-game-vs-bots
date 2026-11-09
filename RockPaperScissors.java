import java.util.NoSuchElementException;
import java.util.Random;
import java.util.Scanner;

public class RockPaperScissors {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Random random = new Random();
        String[] choices = {"rock", "paper", "scissors"};

        int wins = 0;
        int losses = 0;
        int ties = 0;

        System.out.println("Rock Paper Scissors!");
        System.out.println("Type rock, paper or scissors. Type q to quit.");

        try {
            while (true) {
                System.out.print("\nYour move: ");
                String player = scanner.nextLine().toLowerCase().trim();

                if (player.equals("q")) {
                    break;
                }

                if (!player.equals("rock") && !player.equals("paper") && !player.equals("scissors")) {
                    System.out.println("Not a valid move, try again.");
                    continue;
                }

                String computer = choices[random.nextInt(3)];
                System.out.println("Computer picked " + computer);

                if (player.equals(computer)) {
                    System.out.println("Tie!");
                    ties++;
                } else if ((player.equals("rock") && computer.equals("scissors"))
                        || (player.equals("paper") && computer.equals("rock"))
                        || (player.equals("scissors") && computer.equals("paper"))) {
                    System.out.println("You win!");
                    wins++;
                } else {
                    System.out.println("You lose!");
                    losses++;
                }

                System.out.println("Score -> Wins: " + wins + " Losses: " + losses + " Ties: " + ties);
            }
        } catch (NoSuchElementException e) {
            System.out.println();
        }

        System.out.println("Thanks for playing!");
        System.out.println("Final score -> Wins: " + wins + " Losses: " + losses + " Ties: " + ties);
        scanner.close();
    }
}