let operand = "";
let result = "";
let operator = "";
// getting all dom elements to work with
let digits = document.querySelectorAll(".digit");
let operators = document.querySelectorAll(".operator");
let resultScreen = document.querySelector(".screen");
let reset = document.querySelector(".reset");
let clear = document.querySelector(".clear");
let decimal = document.querySelector(".decimal");

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
    if(e.target.textContent === ".") decimal.removeEventListener("click",getOperand); //prevent user from entering more than one decimal
    show();
}

function getOperator(e) {
    if(operand.includes(".")) decimal.addEventListener("click",getOperand);//let user access decimal button again for new operand
    animateClick(e);
    if(!result && operand && !operator){ // when it is first claculation
        result = operand;
        operand = "";
    }else if(result && operand && operator){  // when all operands are entered
        result = operate();
        if(result === "Error" ){ // reset
             handleError();
             return;
         }
        operand = "";
    }
    operator = (e.target.textContent === "=" ? "" : e.target.textContent);
    show();
}

function operate() {
    let operationResult;
    switch(operator){
        case "+": operationResult =  Number(result) + Number(operand); break;
        case "-": operationResult = Number(result) - Number(operand); break;
        case "x": operationResult = Number(result) * Number(operand); break;
        case "/":  operationResult = Number(result) / Number(operand); break;
    }
    if(operationResult === Infinity || operationResult === -Infinity) return "Error"; // divide by zero
    return Math.round(operationResult*1000)/1000; // round upto 3 decimal points
}

function resetCalculator(e) {
    if(e) animateClick(e); // when called by click then only animate
    operand = "";
    result = "";
    operator = "";
    show();
}

function clearScreen(e) {  // used ad backspace
    animateClick(e);
    operand ? operand = operand.slice(0,-1) :
    operator ? operator = "" : result = String(result).slice(0,-1);
    show();
}
function show(){
    resultScreen.lastElementChild.textContent = result + operator + operand;
}

function animateClick(e){ // increse size of clicked button by .2rem for .2s

    if(e.target.className === 'clear' || e.target.className === 'reset'){
        e.target.style.fontSize = "1.8rem";
        setTimeout(function(){
            e.target.style.fontSize = "1.5rem";
        },200);
    }else{
        e.target.style.fontSize = "2.8rem";
        setTimeout(function(){
            e.target.style.fontSize = "2.5rem";
        },200);
    }
}

function handleError() {
    resultScreen.lastElementChild.textContent = "ERROR!";
    setTimeout(resetCalculator,1000);
}
