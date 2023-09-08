#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// step 1 generate a random number
const targetNumber = Math.floor(Math.random() * 100) + 1;
// let a = Math.random()
// console.log(a)
let remainingChances = 6;
// console.log(randomNumber)
// step 2
function validateNumber(input) {
    const number = parseFloat(input);
    if (isNaN(number)) {
        return "Please enter a valid number.";
    }
    if (number < 0 || number > 100) {
        return "Please guess a number between 1 and 100.";
    }
    return true;
}
async function askForGuess() {
    inquirer
        .prompt([
        {
            type: "input",
            name: "guess",
            message: "Please guess a number between 1 and 100:",
            validate: validateNumber,
        },
    ])
        // Step 3
        .then((answers) => {
        const guessedNumber = parseInt(answers.guess);
        if (guessedNumber === targetNumber) {
            console.log(chalk.yellow.bgRed(`Congratulations! You guessed the number ${targetNumber} correctly.`));
            process.exit(0);
        }
        else if (guessedNumber < targetNumber) {
            remainingChances--;
            console.log(chalk.bgRed.yellow(`Too low! You have ${remainingChances} chances left.`));
            if (remainingChances === 0) {
                console.log(chalk.bgRed.yellow(`Sorry, you've run out of chances. The correct number was ${targetNumber}.`));
                process.exit(0);
            }
            else {
                askForGuess();
            }
        }
        else {
            remainingChances--;
            console.log(chalk.bgRed.yellow(`Too high! You have ${remainingChances} chances left.`));
            if (remainingChances === 0) {
                console.log(chalk.red(`Sorry, you've run out of chances. The correct number was ${targetNumber}.`));
                process.exit(0);
            }
            else {
                askForGuess();
            }
        }
    });
}
askForGuess();
