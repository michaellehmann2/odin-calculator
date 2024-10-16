//represents the current value displayed on the screen
let currentValue = '0';

//represents the last operation button pressed
let storedOperator = '';

//represents the last value entered into the calculator before an operation button was pressed
let storedValue = '';

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) {
        return 'ERR';
    }
    return num1 / num2;
}

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

function updateDisplay() {
    if (currentValue === 'ERR') {
        display.textContent = 'ERR DIVBY0';
    }
    else {
        display.textContent = +Number.parseFloat(currentValue).toFixed(4);
    }
}

// clearDisplay - clear button function;
// set the currentValue to '0', and empty out the stored value and operation.
// then, redraw the display
function clearDisplay() {
    currentValue = '0';
    storedOperator = '';
    storedValue = '';
    updateDisplay();
}

// appendDigit? - number button
// if the currentValue is a 0 (nothing has been typed), set currentValue to the digit
// otherwise, append the digit to the end
// then, redraw the display
function appendDigit(digit) {
    if (currentValue === '0') {
        currentValue = digit;
    }
    else {
        currentValue += digit;
    }
    updateDisplay();
}

// appendOperation - operator button function
// if there's a stored value (e.g., you typed like 2 + 3 - or something)
//   call compute() (to compute the 2 + 3 and store its result in currentValue)
// store currentValue in storedValue
// then, storedOperator = operator from button pressed
// then, set currentValue to ''
function appendOperator(operator) {
    if (storedValue) {
        compute();
    }
    storedValue = currentValue;
    storedOperator = operator;
    currentValue = '';
}

// compute - equals button function
// if an operation is stored
//   if there is a stored value
//     call operate with storedValue, currentValue, and storedOperator
//     store that result in currentValue
//   else (no stored value)
//     call operate with currentValue, currentValue, and storedOperator
//     store that result in currentValue
//   clear storedValue, storedOperator
//   call updateDisplay
function compute() {
    if (storedOperator) {
        if (storedValue === '') {
            storedValue = currentValue;
        }
        currentValue = operate(storedValue, currentValue, storedOperator);
        updateDisplay();
        if (currentValue === 'ERR') {
            currentValue = '0';
        }
        storedValue = '';
        storedOperator = '';
    }
}

const display = document.querySelector('.display');

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
    let classes = button.className.split(' ');
    let myOperation = classes[0];

    button.addEventListener('click', () => {
        appendOperator(myOperation);
    });
})