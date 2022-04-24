let current = {
    firstOperand : null,
    operator : null,
    secondOperand: null,
}

function operate(newOperator) {
    let result;
    switch (current.operator) {
        case '+' :
            current.firstOperand = +current.firstOperand + +current.secondOperand;
            break;
        case '-' :
            current.firstOperand = +current.firstOperand - +current.secondOperand;
            break;
        case 'x' :
            if (current.secondOperand == '0') {
                current.firstOperand = '0';
                break;
            }
            current.firstOperand = +current.firstOperand * +current.secondOperand;
            break;
        case '/' :
            current.firstOperand = +current.firstOperand / +current.secondOperand;
            break;
    }

    if (newOperator != '=') {
        current.operator = newOperator;
    } else {
        current.operator = null;
    }

    if (current.operator) 
    {
        displayTop.textContent = `${current.firstOperand} ${current.operator}`;
        displayBottom.textContent = '0';
    }
    else
    {
        displayTop.textContent += ` ${current.secondOperand}`;
        displayBottom.textContent = current.firstOperand;
        current.use = true; //so that user can start from zero without using clear
    }

    current.secondOperand = null;
}

//DISPLAY
const displayBottom = document.querySelector('.display.bottom');
const displayTop = document.querySelector('.display.top');

//OPERANDS
const numbers = document.querySelectorAll('.number');
numbers.forEach(number => number.addEventListener('click', event => {

    if (current.use) 
    {
        current.firstOperand = null;
        delete current.use;
        displayBottom.textContent = event.target.textContent;
    }
    else if (displayBottom.textContent == '0') 
    {
        displayBottom.textContent = event.target.textContent;
    } 
    else 
    {
        displayBottom.textContent += event.target.textContent;
    }
}))

//OPERATORS
const operators = document.querySelectorAll('.operator');
operators.forEach(operator => operator.addEventListener('click', event => {

    if (current.operator) 
    {
        current.secondOperand = displayBottom.textContent;
        operate(event.target.textContent);

    }
     else 
     {
        if (event.target.textContent == '=') return;

        if (event.target.textContent == '-' && displayBottom.textContent == '0') 
        {
            displayBottom.textContent = '-' ;
            return;
        }

        current.firstOperand = displayBottom.textContent;
        current.operator = event.target.textContent;

        displayTop.textContent = (`${current.firstOperand} ${current.operator}`)
        displayBottom.textContent = '0';

        if (current.use) delete current.use;
    }
}))