const totalBalanceLabelNumber = document.getElementById("totalBalanceLabelNumber");
const totalBalanceLabelText = document.getElementById("totalBalanceLabelText");
const incomeExpenseDiv = document.getElementById('incomeExpense');
const incomeLabelText = document.getElementById("incomeLabelText");
const incomeLabelNumber = document.getElementById("incomeLabelNumber");
const expenseLabelText = document.getElementById("expenseLabelText");
const expenseLabelNumber = document.getElementById("expenseLabelNumber");

const filterByTypeSelect = document.getElementById("transactionFilterSelect");
const categoryField = document.getElementById("categoryField");

const transactionsList = document.getElementById("transactionList");

const expenseChoiceButton = document.getElementById("expenseButton");
const incomeChoiceButton = document.getElementById("incomeButton");

const nameField = document.getElementById("nameField");
const categorySelect = document.getElementById("categorySelect");
const amountField = document.getElementById("amountField");
const dateField = document.getElementById("dateField");

const addExpenseButton = document.getElementById("addExpenseButton");

let income = parseFloat(localStorage.getItem('income')) || 0;
let expense = parseFloat(localStorage.getItem('expense')) || 0;
let total = parseFloat(localStorage.getItem('total')) || 0;
// console.log(total, income, expense);
expenseLabelNumber.textContent = `-$${expense.toFixed(2)}`;
incomeLabelNumber.textContent = `+$${income.toFixed(2)}`;
totalBalanceLabelNumber.textContent = `${total < 0 ? `-$${Math.abs(total).toFixed(2)}` : `+$${total.toFixed(2)}`}`;

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let transactionChoice = '';

expenseChoiceButton.classList.add('selected');
transactionChoice = 'expense';
expenseChoiceButton.addEventListener("click", event => {
    if (incomeChoiceButton.classList.contains('selected')) {
        incomeChoiceButton.classList.remove('selected');
    }
    event.target.classList.add('selected');
    transactionChoice = 'expense';
});

incomeChoiceButton.addEventListener("click", event => {
    if (expenseChoiceButton.classList.contains('selected')) {
        expenseChoiceButton.classList.remove('selected');
    }
    event.target.classList.add('selected');
    transactionChoice = 'income';
});

addExpenseButton.addEventListener("click", addTransaction);

function addTransaction() {
    const transactionName = nameField.value;
    const transactionCategory = categorySelect.value;
    const transactionAmount = parseFloat(amountField.value);
    const transactionDate = dateField.value;

    if (transactionName === '') {
        alert("Name field can't be empty");
        return;
    }

    if (transactionChoice === '') {
        alert("Please choose a transaction type");
        return;
    }

    if (transactionAmount === 0) {
        alert("Transaction amount can't be 0");
        return;
    }

    if (transactionDate === '') {
        alert("Please provide a transaction date");
        return;
    }

    const transactionObject = {
        name: transactionName,
        category: transactionCategory,
        amount: transactionAmount,
        date: transactionDate,
        choice: transactionChoice
    };

    if(transactionChoice == 'expense') {
        expense += transactionObject.amount;
        expenseLabelNumber.textContent = `-$${expense.toFixed(2)}`;
        total -= transactionObject.amount;
        localStorage.setItem('expense', expense);
        localStorage.setItem('total', total);
        expenseLabelNumber.textContent = `-$${expense.toFixed(2)}`;
        totalBalanceLabelNumber.textContent = `${total < 0 ? `-$${Math.abs(total).toFixed(2)}` : `+$${total.toFixed(2)}`}`;
        adjustFontSize();
    } else {
        income += transactionObject.amount;
        incomeLabelNumber.textContent = `+$${income.toFixed(2)}`;
        total += transactionObject.amount;
        localStorage.setItem('income', income);
        localStorage.setItem('total', total);
        expenseLabelNumber.textContent = `-$${expense.toFixed(2)}`;
        totalBalanceLabelNumber.textContent = `${total < 0 ? `-$${Math.abs(total).toFixed(2)}` : `+$${total.toFixed(2)}`}`;
        adjustFontSize();
    }

    transactions.push(transactionObject);
    localStorage.setItem('transactions', JSON.stringify(transactions));


    nameField.value = '';
    categorySelect.selectedIndex = 0;
    amountField.value = '';
    dateField.value = '';
}
setInterval(() => {
    adjustFontSize();
}, 100);

// console.log(expenseLabelNumber.textContent.length) 
// console.log(incomeLabelNumber.textContent.length) 

function adjustFontSize() {
    incomeLabelNumber.style.fontSize = '2.5rem';
    expenseLabelNumber.style.fontSize = '2.5rem';

    if (incomeLabelNumber.textContent.length > 6) {
        incomeLabelNumber.classList.remove('mediumText');
        incomeExpenseDiv.style.gap = '10%'
        incomeLabelNumber.style.fontSize = '2.3rem';
    } else {
        incomeLabelNumber.classList.add('mediumText');
    }
    if (expenseLabelNumber.textContent.length > 6) {
        expenseLabelNumber.classList.remove('mediumText');
        expenseLabelNumber.style.fontSize = '2.3rem';
    } else {
        expenseLabelNumber.classList.remove('mediumText');
    }
    if(totalBalanceLabelNumber.textContent.length > 12) {
        totalBalanceLabelNumber.classList.remove('bigText');
        incomeExpenseDiv.style.gap = '10%'
        totalBalanceLabelNumber.style.fontSize = '3.2rem';
    } else {
        totalBalanceLabelNumber.classList.add('bigText');
    }
}

// console.log(totalBalanceLabelNumber.textContent.length)