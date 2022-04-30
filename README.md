# calculator
Calculator project from https://www.theodinproject.com/lessons/foundations-calculator

***

### What I learned:

- How to use a global object to store data
- How important is writing clean code for refactoring and reading
- How to add sound effects to interactions with the UI
- How to implement the usage of object properties to filter through certain operations
- How to integrate the keyboard in the UI, and how important it is to plan code ahead of time to avoid refactoring or duplicating
- How to use variables in CSS
- How to use a palette for better design

[Live Demo](https://tomcoso.github.io/calculator/)

***

### Planning process

I came up with the idea of using an object to store the operands and the current operator. Once a second operator is chosen it would then solve the expression and assign the result as the first operand and the second operator as the current operator, awaiting for a second operand (unless the seocnd operator was an equal sign):

    current = {
      firstOperand = '5' ,
      operator = '+' ,
      secondOperand = '7',
      }

When an operator was selected for a second time, the expression above would be solved in the operate() function and the object redefined as follows:

    current.firstOperand = result (e.g '12') ;
    current.operator = new operator (e.g '-') ;        // if new operator is "=" then no value is assigned here
    current.secondOperand = null    // awaits for second operand and once a new operator is input it assigns it here
    
Then each operand would be assigned to each property by adquiring the textContent of the display element on the UI, so the text content on the DOM acted as the input for the current object.

The rest of the work was integrating the html and manipulating the DOM to make everything work together.
The project is very easy to expand by adding expressions to the operate() function, the most problematic aspect of this would be updating the css and html to add the new buttons.
