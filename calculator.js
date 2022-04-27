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
                current.firstOperand = 'no.';
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
        if ((current.firstOperand.toString(10)).match(/\./)) 
        {
            displayTop.textContent = `${current.firstOperand.toFixed(2)} ${current.operator}`;
        }
        else 
        {
            displayTop.textContent = `${current.firstOperand} ${current.operator}`;
        }

        displayBottom.textContent = '0';
    }
    else
    {
        displayTop.textContent += ` ${current.secondOperand}`;
        if ((current.firstOperand.toString(10)).match(/\./))
        {
            displayBottom.textContent = current.firstOperand.toFixed(2);
        }
        else
        {
            displayBottom.textContent = current.firstOperand;
        }

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

        if (current.float) delete current.float;
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
        if (current.float) delete current.float;
    }
}))

//SPECIALS
const floatBtn = document.querySelector('.float');
floatBtn.addEventListener('click', () => {

    if (current.float) // So that we can only use one float per operand
    {
        return;
    }

    if (current.use) 
    {
        displayBottom.textContent = '0.' ;
        delete current.use ;
    }
    else if (displayBottom.textContent == '0')
    {
        displayBottom.textContent = '0.' ;
    }
    else
    {
        displayBottom.textContent += '.' ;
    }

    current.float = true

})

const clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', () => {

    displayBottom.textContent = '0' ;
    displayTop.textContent = '' ;

    current.firstOperand = null;
    current.operator = null;
    current.secondOperand = null;

    if (current.use) delete current.use;
    if (current.float) delete current.float;

})

const delBtn = document.querySelector('.delete');
delBtn.addEventListener('click', () => {
    let str = displayBottom.textContent ;

    if (str.length === 1) 
    {
        displayBottom.textContent = '0' ;
    }
    else
    {
        displayBottom.textContent = str.substring(0, str.length-1);
    }

})