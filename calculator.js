//string representing the current value displayed on the screen.
//will be the second operand in an equation.
//NOTE: nums are stored as strings (until equation is actually evaluated) to make appending digits to the end simpler. could this be bad practice?
let currentValue = '0';

//string representing the last operation button pressed
let storedOperator = '';

//string representing the last value entered into the calculator before an operation button was pressed.
//will be the first operand in an equation.
let storedValue = '';

//boolean flag to represent division by 0 error.
//is only true immediately after a div by 0 operation.
let errorDivBy0 = false;

//helper functions for the 4 basic operations
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

//throws errors when dividing by 0.
function divide(num1, num2) {
    if (num2 === 0) {
        errorDivBy0 = true;
    }
    return num1 / num2;
}

//uses 4 basic operation helper-functions to evaluate an operation
//converts arguments to numbers first (since nums are stored as strings in all other places)
function operate(num1, num2, op) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    switch (op) {
        case 'add': 
            return add(num1, num2);
            break;
        case 'subtract': 
            return subtract(num1, num2);
            break;
        case 'multiply':
            return multiply(num1, num2);
            break;
        case 'divide': 
            return divide(num1, num2);
            break;
    }
}

//draws the display on the page. 
//shows a number or an error (if user divides by 0)
//TODO: Work on display some. set a fixed num of digits? need to do CSS work first I think
function updateDisplay() {
    if (errorDivBy0) {
        display.textContent = 'ERR DIVBY0';
    }
    else {
        //the '+' is to get rid of the decimal point for non-decimal values.
        display.textContent = +parseFloat(currentValue).toFixed(4);
    }
}

//resets the state of the calculator. 
function clearDisplay() {
    currentValue = '0';
    storedOperator = '';
    storedValue = '';
    errorDivBy0 = false;
    updateDisplay();
}

//'types' a new digit into the calculator
function appendDigit(digit) {
    if (currentValue === '0') {
        currentValue = digit;
    }
    else {
        currentValue += digit;
    }
    updateDisplay();
}

//'types' an operator into the calculator.
//if another operation is waiting to be evaluated (e.g. user types '2 + 3' and then presses '-' without first pressing '='), evaluates that operation first.
function appendOperator(operator) {
    if (storedOperator !== '') {
        compute();
    }
    storedValue = currentValue;
    storedOperator = operator;
    currentValue = '';
}

//if an operator button has been pressed, calls operate() to evaluate an expression, then updates display and state variables.
//NOTE: if only one number has been typed (e.g. user types '2 +' and then presses '='), that number will be used as both operands
function compute() {
    if (storedOperator) {
        //if there's only one value, duplicate it to use it as both operands.
        if (currentValue === '') {
            currentValue = storedValue;
        }
        currentValue = operate(storedValue, currentValue, storedOperator);
        updateDisplay();
        if (errorDivBy0) {
            currentValue = '0';
            errorDivBy0 = false;
        }
        storedValue = '';
        storedOperator = '';
    }
}

//get references to html elements and add listeners to the buttons.
const display = document.querySelector('.display-numbers');

const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        appendDigit(button.textContent);
    })
})

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', clearDisplay);

const equalsButton = document.querySelector('.equals');
equalsButton.addEventListener('click', compute);

const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach((button) => {
    //the name of the operation should be that button's first class. could cause errors if you changed class order.
    let classes = button.className.split(' ');
    let myOperation = classes[0];

    button.addEventListener('click', () => appendOperator(myOperation));
})