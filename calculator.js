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

    if (newOperator != '=') 
    {
        current.operator = newOperator;
    }
    else if (newOperator == 'Enter')
    {
        current.operator = null;
    }
    else
    {
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
numbers.forEach(number => number.addEventListener('click', addOperand)) ;
function addOperand(event) {

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

    let audio = new Audio('buttonsound.wav');
    audio.play();

}

//OPERATORS
const operators = document.querySelectorAll('.operator');
operators.forEach(operator => operator.addEventListener('click', addOperator)) ;
function addOperator(event) {

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

    let audio = new Audio('specialsound.wav');
    audio.play();

}

//SPECIALS
const floatBtn = document.querySelector('.float');
floatBtn.addEventListener('click', addFloat) ;
function addFloat() {

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
    let audio = new Audio('buttonsound.wav');
    audio.play();

}

const clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', clear);
function clear() {

    displayBottom.textContent = '0' ;
    displayTop.textContent = '' ;

    current.firstOperand = null;
    current.operator = null;
    current.secondOperand = null;

    if (current.use) delete current.use;
    if (current.float) delete current.float;

    let audio = new Audio('clearsound.wav');
    audio.play();

}

const delBtn = document.querySelector('.delete');
delBtn.addEventListener('click', deleteLast)
function deleteLast() {

    let str = displayBottom.textContent ;

    if (str.length === 1) 
    {
        displayBottom.textContent = '0' ;
    }
    else if (current.use)
    {
        displayBottom.textContent = '0' ;
    }
    else
    {
        displayBottom.textContent = str.substring(0, str.length-1);
    }

    let audio = new Audio('specialsound.wav');
    audio.play();

}

//KEYBOARD INTEGRATION
window.addEventListener('keydown', (event) => {
    console.log(event);

    if (event.key >= 0 && event.key <= 9 && event.key != ' ') 
    {
        addOperandKey(event);
    }
    else if (
        event.key == '+' ||
        event.key == '-' ||
        event.key == '*' ||
        event.key == '/' ||
        event.key == 'Enter')
    {
        addOperatorKey(event);
    }
    else if (event.key == 'Backspace')
    {
        deleteLast();
    }
    else if (event.key == '.')
    {
        addFloat();
    }
    else if (event.code == 'Space')
    {
        event.preventDefault();
        clear();
    }
})

function addOperandKey(event) {

    if (current.use) 
    {
        current.firstOperand = null;
        delete current.use;
        displayBottom.textContent = event.key;
    }
    else if (displayBottom.textContent == '0') 
    {
        displayBottom.textContent = event.key;
    } 
    else 
    {
        displayBottom.textContent += event.key;
    }

    let audio = new Audio('buttonsound.wav');
    audio.play();
}

function addOperatorKey(event) {

    let operator;
    if (event.key == 'Enter')
    {
        operator = '=' ;
    }
    else 
    {
        operator = event.key;
    }

    if (current.operator) 
    {
        current.secondOperand = displayBottom.textContent;
        operate(operator);

        if (current.float) delete current.float;
    }
     else 
    {
        if (operator == '=') return;

        if (operator == '-' && displayBottom.textContent == '0') 
        {
            displayBottom.textContent = '-' ;
            return;
        }

        current.firstOperand = displayBottom.textContent;
        current.operator = operator;

        displayTop.textContent = (`${current.firstOperand} ${current.operator}`)
        displayBottom.textContent = '0';

        if (current.use) delete current.use;
        if (current.float) delete current.float;
    }

    let audio = new Audio('specialsound.wav');
    audio.play();
}