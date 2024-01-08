export function del(string) {
  return string.slice(0, -1);
}

export function evaluate(expression) {
  const operands = [];
  const operators = [];

  let currentNumber = "";
  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];
    if (!isNaN(parseFloat(char)) || char === '.') {
      currentNumber += char;
    }
    else {
      if (char) {
        operands.push(parseFloat(currentNumber));
        currentNumber = '';
      }
      while (
        operators.length > 0 &&
        precedence(operators[operators.length - 1]) >= precedence(char)
      ) {
        performOperation(operands, operators);
      }
      operators.push(char);
    }
  }

  if (currentNumber !== '') {
    operands.push(parseFloat(currentNumber));
  }

  while (operators.length > 0) {
    performOperation(operands, operators);
  }

  if (operands.length !== 1 || operators.length !== 0) {
    throw new Error('Invalid expression');
  }

  return operands[0];
}

function precedence(operation) {
  if (operation === '+' || operation === '-') return 1;
  if (operation === '×' || operation === '÷') return 2;
  return 0;
}

function performOperation(operands, operators) {
  const operator = operators.pop();
  const num2 = operands.pop();
  const num1 = operands.pop();

  switch (operator) {
    case '+':
      operands.push(num1 + num2);
    break;
    case '-':
      operands.push(num1 - num2);
    break;
    case '×':
      operands.push(num1 * num2);
    break;
    case '÷':
      if (num2 === 0) {
        throw new Error('Division by zero');
      }
      else {
        operands.push(num1 / num2);
      }
    break;
  }
}