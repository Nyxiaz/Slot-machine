const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
}

const SYMBOLS_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2 
}



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


//Creating a function to get the bet amount from the user
const getBet = (Balance, lines) =>{
    while (true){
        const bet = prompt("Enter the amount you want to bet on: ");
        const numberBet = parseFloat(bet);
        if(isNaN(numberBet) || numberBet <= 0 || numberBet > Balance/lines){
            console.log("Invalid Bet Amount! Please try again.");
        }
        else{
            return numberBet;
        }
    }
};


//Creating a function to spin the slot machine
const spin = () =>{
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++){
            symbols.push(symbol)
        }
    }

    const reels = [];
    for(let i = 0; i < COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random()* reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex]
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        } 
    }
    return reels;
};


//creating a function to transpose the reels into rows
const transpose = (reels) =>{
    const rows = [];
    for (let i = 0; i < ROWS; i ++){
        rows.push([]);
        for (let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}


//printing the rows
const printRows = (rows) =>{
    for (const row of rows){
        let rowString= "";
        for (const [i, symbol] of row.entries()){
            rowString += symbol
            if (i != row.length -1){
                rowString += " | "
            }
        }
        console.log(rowString);
    }
};


//creating a function to calculate the winnings
const getWinnings = (rows, bet, lines) =>{
    let winnings = 0;
    for (let row = 0; row < lines; row++){
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols){
            if (symbol != symbols[0]){
                allSame = false;
                break;
            }
        }
        if (allSame){
            winnings += bet*SYMBOLS_VALUES[symbols[0]];
        }
    }
    return winnings;
};


//creating the main game loop
const game = () =>{
    let Balance = deposit();

    while (true){
        console.log("Your Current Balance is $" + Balance);
        const numberLines = getLines();
        const bet = getBet(Balance, numberLines);
        Balance -= bet*numberLines;
        const reels =spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberLines);
        Balance += winnings;
        console.log("You Won, $" + winnings.toString());

        if (Balance <= 0){
            console.log("You ran out of money!");
            break;
        }
        const playAgain = prompt("Do you want to play again? (y/n)?");
        if (playAgain != "y") break;
        console.log("\n");
    }
    
};

game();
