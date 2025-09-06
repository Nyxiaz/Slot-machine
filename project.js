const prompt = require("prompt-sync")();


// Creating a function to get deposit amount from the user 
const deposit = () =>{
    while (true){
        const depositAmount = prompt("Enter the amount you want to deposit: ");
        const numberDeposit = parseFloat(depositAmount);
        if (isNaN(numberDeposit) || numberDeposit <= 0){
            console.log("Invalid Amount! Please try again.");
        }
        else{
            return numberDeposit;
        }
    }
};


//Creating a function to get the number of lines to bet on
const getLines = () =>{
    while (true){
        const lines = prompt("Enter the number of lines to bet on (1-3): ");
        const numberLines = parseFloat(lines);
        if (isNaN(numberLines) || numberLines <= 0 || numberLines > 3){
            console.log("Invalid number of Lines! Please try again.");
        }
        else{
            return numberLines;
        }
    }
};

const depositAmount = deposit();
const numberLines = getLines();