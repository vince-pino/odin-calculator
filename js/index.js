import { evaluate, del } from './functions.js';

const display = document.querySelector('.current-operand');
const buttons = document.querySelectorAll('button');

let displayValue = '';

buttons.forEach((button) => {
  button.addEventListener('click', handleClicks);
});

function handleClicks(e) {
  const { target } = e;
  const value = target.value;

  if (value === '=') {
    const result = evaluate(displayValue);
    displayValue = result.toString();
    display.textContent = displayValue;
    console.log(result);
  }
  else if (value === 'clear') {
    displayValue = '';
    display.textContent = '';
  }
  else if (value === 'del') {
    displayValue = del(displayValue);
    console.log(displayValue);
    display.textContent = displayValue;
  }
  else {
    displayValue += value;
    display.textContent = displayValue;
  }
}