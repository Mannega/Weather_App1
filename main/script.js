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

export let transactions = [];
let transactionNumber = localStorage.length;
let transactionChoice;

let thereIsAtrasaction = false;

expenseChoiceButton.addEventListener("click", event => {
    if(incomeChoiceButton.classList.contains('selected')) {
        incomeChoiceButton.classList.remove('selected');
        event.target.classList.add('selected');
        transactionChoice = 'expense';
    } else {
        event.target.classList.add('selected');
        transactionChoice = 'expense';
    }
})
incomeChoiceButton.addEventListener("click", event => {
    if(expenseChoiceButton.classList.contains('selected')) {
        expenseChoiceButton.classList.remove('selected');
        event.target.classList.add('selected');
        transactionChoice = 'income';
    } else {
        event.target.classList.add('selected');
        transactionChoice = 'income';
    }
})

addExpenseButton.addEventListener("click", addTransaction);

function addTransaction() {
    const transactionName = nameField.value;
    const transactionCategory = categorySelect.value;
    const transactionAmount = amountField.value
    const transactionDate = dateField.value;

    if(transactionName == '') {
        alert("Name field can't be empty");
    }

    else if(transactionAmount == 0) {
        alert("Transaction amount can't be 0");
    }

    else if(transactionDate == '') {
        alert("Please provide a trasaction date");
    } else {
        let newTransaction = document.createElement('div');
        newTransaction.innerHTML = `<div class="name&DateDiv">
                                        <div class="name">${transactionName}</div>
                                        <div class="date">${transactionDate}</div>
                                   </div>
                                   <div class="category">${transactionCategory}</div>
                                   <div>${transactionChoice == 'expense' ? `-${transactionAmount}` : `+${transactionAmount}`}</div>`;
        const newTransactionObject = {
            name: transactionName,
            date: transactionDate,
            choice: transactionChoice,
            amount: transactionAmount,
            category: transactionCategory
        }
        transactions.push(newTransactionObject);
        localStorage.setItem(`transaction${transactionNumber++}`, JSON.stringify(newTransactionObject));
        if(thereIsAtrasaction) {
            transactionsList.prepend(newTransaction);
            
            nameField.value = '';
            categorySelect.selectedIndex = 0;
            amountField.value = '';
            dateField.value = '';
        } else {
            thereIsAtrasaction = true;
            transactionsList.innerHTML = ``;
            transactionsList.prepend(newTransaction);

            nameField.value = '';
            categorySelect.selectedIndex = 0;
            amountField.value = '';
            dateField.value = '';
        }
    }
}