let current = {
    firstOperand : null,
    operator : null,
    secondOperand: null,
}

function operate(newOperator) {
    switch (current.operator) {
        case '+' :
            current.firstOperand = +current.firstOperand + +current.secondOperand;
            break;
        case '-' :
            current.firstOperand = +current.firstOperand - +current.secondOperand;
            break;
        case '*' :
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

    current.secondOperand = null;
}