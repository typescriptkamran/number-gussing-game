import inquirer from "inquirer";
import chalk from "chalk";

// step 1 generate a random number

const randomNumber: number = Math.floor(Math.random()*100)+1
let remainingChances = 6;

// console.log(randomNumber)

// step 2

function validateNumber(input: string): boolean | string {

const number = parseFloat(input);
if (isNaN(number)) {
    return "Please enter a valid number.";
}
if (number < 0 || number > 100) {
    return "Please guess a number between 1 to hundred.";

}   
return true;
}

async function askForGuess() {

inquirer.prompt([{

    type: 'input',
    name: 'guess',
    message: 'Please guess a number between 1 and 100:',
    validate: validateNumber,

}])

// Step 3

.then ((answers: any) => {
    const gussedNumber = parseInt(answers.guess)

    if (gussedNumber === randomNumber) {
        console.log(chalk.bgBlue.yellow(`congratulations! you guessed the number ${randomNumber} corectly!`))

        process.exit(0)
    }

    else if (gussedNumber < randomNumber) 
    {
        remainingChances--;
        console.log(chalk.bgRed.white(`To Low, kindly guess again your remaining chances left ${remainingChances}:`))

        if (remainingChances = 0) {
        console.log(chalk.green.bgRed(`We are really sorry you have missed all your chances correct number is ${randomNumber}`));
        } else {
            askForGuess()

        }


    }

    else if (gussedNumber > randomNumber) 
    {
        remainingChances--;
        console.log(chalk.bgRed.white(`To high, kindly guess again your remaining chances left ${remainingChances}:`))

        if (remainingChances = 0) {
        console.log(chalk.green.bgRed(`We are really sorry you have missed all your chances correct number is ${randomNumber}`));
        } else 
        {askForGuess()}


    }


}
)
}

askForGuess()