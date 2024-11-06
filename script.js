let currentInput = '';
let previousInput = '';
let operation = null;

const updateDisplay = () => {
    document.getElementById('display').value = currentInput || '0';
}

const appendNumber = (num) => {
    // Prevent adding multiple decimal points
    if (num === '.' && currentInput.includes('.')) return;
  
    // Check if the current input is empty and the user tries to add a decimal point
    if (num === '.' && currentInput === '') {
      currentInput = '0.'; // Start the number with 0. if it was empty
    } else if (currentInput === '0' && num !== '.') {
        // If the current input is '0' (initial state), replace it with the new number
        currentInput = num;
    } else {
        // Append the new number
        currentInput += num;
    }
  
    updateDisplay();
  }

const clearDisplay = () => {
    currentInput = '';
    previousInput = '';
    operation = null;
    updateDisplay();
}

const setOperation = (op) => {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operation = op;
    previousInput = currentInput;
    currentInput = '';
}

const calculate = () => {
    if (previousInput === '' || currentInput === '') return;

    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Cannot divide by zero!');
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operation = null;
    previousInput = '';
    updateDisplay();
}

// Initial display update
updateDisplay();
