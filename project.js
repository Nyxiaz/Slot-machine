// Creating a function to get deposit amount from the user 
const prompt = require("prompt-sync")();

const deposit = () =>{
    while (true){
        const depositAmount = prompt("Enter the amount you want to deposit: ");
        const numberDeposit = parseFloat(depositAmount);
        if (isNaN(numberDeposit) || numberDeposit <= 0){
            console.log("Invalid input. Please try again.");
        }
        else{
            return numberDeposit;
        }
    }
};

const depositAmount = deposit();
console.log(depositAmount);
