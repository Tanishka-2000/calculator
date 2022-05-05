let operand = "";
let result = "";
let operator = "";
// getting all dom elements to work with
let digits = document.querySelectorAll(".digit");
let operators = document.querySelectorAll(".operator");
let resultScreen = document.querySelector(".screen");
let reset = document.querySelector(".reset");
let clear = document.querySelector(".clear");

//1 adding event listeners to all buttons(digits/operators)
digits.forEach((digit) => {
    digit.addEventListener("click",getOperand);
});
operators.forEach((operator) => {
    operator.addEventListener("click",getOperator);
});
reset.addEventListener("click",resetCalculator);
clear.addEventListener("click",clearScreen);

function getOperand(e){
    operand += e.target.textContent;
    resultScreen.lastElementChild.textContent += e.target.textContent;
}

function getOperator(e) {
    if(!result && operand && !operator){
        result = operand;
        operand = "";
        operator = e.target.textContent;
        resultScreen.lastElementChild.textContent += operator;
    }else if(result && operand && operator){
        result = operate();
        operand = "";
        operator = (e.target.textContent === "=" ? "" : e.target.textContent);
        resultScreen.lastElementChild.textContent = result + operator;
    }else if(result && !operand && !operator){
        operator = e.target.textContent;
        resultScreen.lastElementChild.textContent += operator;
    }
}

function operate() {
    switch(operator){
        case "+": return Number(result) + Number(operand);
        case "-": return Number(result) - Number(operand);
        case "x": return Number(result) * Number(operand);
        case "/": return Number(result) / Number(operand);
    }
}

function resetCalculator() {
    operand = "";
    result = "";
    operator = "";
    resultScreen.lastElementChild.textContent = "";
}
