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
    animateClick(e);
    operand += e.target.textContent;
    show();
}

function getOperator(e) {
    animateClick(e);
    if(!result && operand && !operator){
        result = operand;
        operand = "";
        operator = (e.target.textContent === "=" ? "" : e.target.textContent);
    }else if(result && operand && operator){
        result = operate();
        operand = "";
        operator = (e.target.textContent === "=" ? "" : e.target.textContent);
    }else if(result && !operand && !operator){
        operator = (e.target.textContent === "=" ? "" : e.target.textContent);
    }
    show();
}

function operate() {
    switch(operator){
        case "+": return Number(result) + Number(operand);
        case "-": return Number(result) - Number(operand);
        case "x": return Number(result) * Number(operand);
        case "/": return Number(result) / Number(operand);
    }
}

function resetCalculator(e) {
    animateClick(e);
    operand = "";
    result = "";
    operator = "";
    show();
}

function clearScreen(e) {
    animateClick(e);
    operand ? operand = operand.slice(0,-1) :
    operator ? operator = "" : result = String(result).slice(0,-1);
    show();
}
function show(){
    resultScreen.lastElementChild.textContent = result + operator + operand;
}

function animateClick(e){

    if(e.target.className === 'clear' || e.target.className === 'reset'){
        e.target.style.fontSize = "1.8rem";
        setTimeout(function(){
            e.target.style.fontSize = "1.5rem";
        },100);
    }else{
        e.target.style.fontSize = "2.8rem";
        setTimeout(function(){
            e.target.style.fontSize = "2.5rem";
        },100);
    }
}
