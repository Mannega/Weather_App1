const totalBalanceLabelNumber = document.getElementById("totalBalanceLabelNumber");
const totalBalanceLabelText = document.getElementById("totalBalanceLabelText");
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

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let transactionChoice = '';

expenseChoiceButton.classList.add('selected');
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

    transactions.push(transactionObject);
    localStorage.setItem('transactions', JSON.stringify(transactions));

    // Clear input fields after adding a transaction
    nameField.value = '';
    categorySelect.selectedIndex = 0;
    amountField.value = '';
    dateField.value = '';
}
