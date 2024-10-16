let firstNumber;
let secondNumber;
let operator;
let displayValue = '0';

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
    return num1 / num2;
}

function operate(num1, num2, op) {
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

function updateDisplay(digit) {
    if (displayValue === '0') {
        displayValue = digit;
    }
    else {
        displayValue += digit;
    }
    display.textContent = displayValue;
}

const display = document.querySelector('.display');
const numberButtons = Array.from(document.querySelectorAll('.number'));

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        updateDisplay(button.textContent);
    })
})