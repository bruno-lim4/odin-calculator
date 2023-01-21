let currentNumber = ''

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
    })
})
document.querySelectorAll('.grid-item').forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.target.classList.add('click');
        setTimeout(() => e.target.classList.remove('click'), 100);

        if(e.target.classList.contains('dig')) {
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
            return;
        }

        ans = n1/n2;
    } else if (op[1] == '+') {
        ans = n1+n2;
    } else if (op[1] == '-') {
        ans = n1-n2;
    }

    currentNumber = ans.toString();
    operationJustFinished = true;
    updateCurrent(ans);

    lastOperation = fullOperation;
    fullOperation = [];
}

