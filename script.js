let currentNumber = ''

let decimals = 0

let fullOperation = []
let lastOperation = []

let operationJustFinished = false

const current = document.querySelector('.current');
const previous = document.querySelector('.previous');

// Adding click animations and handling user input
document.querySelectorAll('img').forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.target.parentNode.classList.add('click');
        setTimeout(() => e.target.parentNode.classList.remove('click'), 100);

        handleBackspace();
    })

    
})
document.querySelectorAll('.grid-item').forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.target.classList.add('click');
        setTimeout(() => e.target.classList.remove('click'), 100);

        if(e.target.classList.contains('del')) {
            if(e.target.classList.contains('backspace')) {
                handleBackspace();
            } else {
                resetCalc();
            }
        }

        if(e.target.classList.contains('dig')) {
            if (decimals > 0 && e.target.textContent == '.') return;

            if (e.target.textContent == '.') decimals++;

            if (currentNumber.length == 0 && e.target.textContent == '.') {
                return;
            } else if (operationJustFinished) {
                currentNumber = e.target.textContent;
                operationJustFinished = false;
            } else {
                currentNumber += e.target.textContent;
            }

            updateCurrent(currentNumber)
        }

        if(e.target.classList.contains('op')) {
            if (currentNumber.length == 0) {
                return;
            } else if (fullOperation.length == 2) { 
                fullOperation[2] = currentNumber;
                currentNumber = '';
                operate(fullOperation)
                fullOperation[0] = currentNumber;
                fullOperation[1] = e.target.textContent;
            } else {
                fullOperation[0] = currentNumber;
                currentNumber = '';
                fullOperation[1] = e.target.textContent;
                updateCurrent(currentNumber)
                operationJustFinished = false;
            }
        }

        if(e.target.classList.contains('equal')) {
            if (currentNumber.length == 0 || fullOperation.length < 2) {
                return;
            } else {
                fullOperation[2] = currentNumber;
                currentNumber = '';
                operate(fullOperation);
            }
        }

        if (operationJustFinished) {
            updatePrevious(lastOperation.toString().replaceAll(',', '')+'=');
            // operationJustFinished = false;
            return;
        }

        updatePrevious(fullOperation.toString().replaceAll(',', ''));
    })
})

// Basic Functions
function updateCurrent(s) {
    current.textContent = s;
    if (s.length == 0) {
        decimals = 0;
    } else {
        let num = +s;
        if (s%1 > 0) {
            decimals = 1
        } else {
            if (!s.contains('.')) {
                decimals = 0;
            } else {
                decimals = 1;
            }
        }
    }
}
function updatePrevious(s) {
    previous.textContent = s;
}
function operate(op) {
    let n1 = +op[0]
    let n2 = +op[2]
    
    let ans;

    if (op[1] == 'x') {
        ans = n1*n2;
    } else if (op[1] == '/') {
        if (n2 == 0) {
            updateCurrent("DON'T DO THAT!");
            fullOperation = [];
            operationJustFinished=true;
            return;
        }
        ans = n1/n2;
    } else if (op[1] == '+') {
        ans = n1+n2;
    } else if (op[1] == '-') {
        ans = n1-n2;
    }

    if (ans%1 > 0) {
        decimals = 1;
    } else {
        decimals = 0;
    }

    ans = Math.round(ans * 1000) / 1000

    currentNumber = ans.toString();
    operationJustFinished = true;
    updateCurrent(ans);

    lastOperation = fullOperation;
    fullOperation = [];
}
function handleBackspace() {
    if (currentNumber.length == 0) return;
    currentNumber = currentNumber.slice(0,-1);

    if (currentNumber[currentNumber.length-1] == '.') decimals--;

    updateCurrent(currentNumber);
}
function resetCalc() {
    currentNumber = '';
    decimals = 0
    fullOperation = [];
    lastOperation = [];

    operationJustFinished = false;

    updateCurrent(currentNumber);
    updatePrevious('');
}

