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

expenseChoiceButton.addEventListener("click", event => {
    if(incomeChoiceButton.classList.contains('selected')) {
        incomeChoiceButton.classList.remove('selected');
        event.target.classList.add('selected');
    } else {
        event.target.classList.add('selected');
    }
})
incomeChoiceButton.addEventListener("click", event => {
    if(expenseChoiceButton.classList.contains('selected')) {
        expenseChoiceButton.classList.remove('selected');
        event.target.classList.add('selected');
    } else {
        event.target.classList.add('selected');
    }
})
