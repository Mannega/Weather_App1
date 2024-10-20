let transactionDiv = document.getElementById('transactionsDiv');
const filterByTypeSelect = document.getElementById('filterByTypeSelect');
const filterByCategorySelect = document.getElementById('filterByCategorySelect');
const clearButton = document.getElementById('clearButton');
const backToMainPageButton = document.getElementById('backToMainPageButton');

let popupPurpose = '';
const popupDiv = document.getElementById('popup');
const confirmButton = document.getElementById('confirmButton');
const cancelButton = document.getElementById('cancelButton');

let categoryObject = {
    foodTransactions: [],
    utilitiesTransactions: [],
    transportationTransactions: [],
    rentTransactions: [],
    entertainmentTransactions: [],
    healthTransactions: [],
    otherTransactions: []
}

let incomeTransactions = [];
let expenseTransactions = [];
let transactions;
try {
    let storedTransactions = localStorage.getItem('transactions');
    transactions = storedTransactions ? JSON.parse(storedTransactions) : [];
} catch(error) {
    console.error(error);
    transactions = [];
}
if(transactions.length < 1) {
    transactionDiv.innerHTML = `<p id="defaultText">There are no transactions right now</p>`
} else {
    filterByTypeSelect.value = 'All';
    transactions.forEach(showAllTransactions);
}
let currentFilterByType = '';
let currentFilterByCategory = '';

filterByTypeSelect.removeEventListener("change", sortByType);
filterByTypeSelect.addEventListener("change", sortByType);
function sortByType(event) {
    transactionDiv.innerHTML = ``;
    if(event.target.value == 'All') {
        transactionDiv.innerHTML = ``;
        expenseTransactions = [];
        incomeTransactions = [];
        transactions.forEach(showAllTransactions);
        currentFilterByType = 'All';
    }
    else if(event.target.value == 'Income') {
        transactionDiv.innerHTML = ``;
        incomeTransactions.forEach(showIncomeTransactions)
        currentFilterByType = 'Income';
    }
     else if(event.target.value == 'Expenses') {
        transactionDiv.innerHTML = ``;
        expenseTransactions.forEach(showExpenseTransactions);
        currentFilterByType = 'Expenses';
    }
}

// transactions.forEach(showAllTransactions)
function showAllTransactions(transactionObject) {
    const newTransactionElement = document.createElement('div');
    newTransactionElement.classList.add('transactionDiv');
    let amount = parseFloat(transactionObject.amount);
    newTransactionElement.innerHTML = `<div class="name&DateDiv">
                                        <div class="name">${transactionObject.name}</div>
                                        <div class="date">${transactionObject.date}</div>
                                   </div>
                                   <div class="category">${transactionObject.category}</div>
                                   <div class="amount ${transactionObject.choice == 'expense' ? 'redText' : 'greenText'}">${transactionObject.choice == 'expense' ? `-$${amount.toFixed(2)}` : `+$${amount.toFixed(2)}`}</div>`;
    transactionDiv.prepend(newTransactionElement);
    if(transactionObject.choice == 'expense') {
        expenseTransactions.unshift(transactionObject);
    } else {
        incomeTransactions.unshift(transactionObject);
    }
}
console.log(expenseTransactions);
console.log(incomeTransactions);
console.log(transactions);

function showIncomeTransactions(transactionObject) {
    // transactionDiv.innerHTML = ``;
    const newTransactionElement = document.createElement('div');
    newTransactionElement.classList.add('transactionDiv');
    let amount = parseFloat(transactionObject.amount);
    newTransactionElement.innerHTML = `<div class="name&DateDiv">
                                        <div class="name">${transactionObject.name}</div>
                                        <div class="date">${transactionObject.date}</div>
                                   </div>
                                   <div class="category">${transactionObject.category}</div>
                                   <div class="amount greenText">+$${amount.toFixed(2)}</div>`;
    transactionDiv.prepend(newTransactionElement);
}

function showExpenseTransactions(transactionObject) {
    // transactionDiv.innerHTML = ``;
    const newTransactionElement = document.createElement('div');
    newTransactionElement.classList.add('transactionDiv');
    let amount = parseFloat(transactionObject.amount);
    newTransactionElement.innerHTML = `<div class="name&DateDiv">
                                        <div class="name">${transactionObject.name}</div>
                                        <div class="date">${transactionObject.date}</div>
                                   </div>
                                   <div class="category">${transactionObject.category}</div>
                                   <div class="amount redText">-$${amount.toFixed(2)}</div>`;
    transactionDiv.prepend(newTransactionElement);
}

function displayFilteredTransactions(transactionObject) {
    const newTransactionElement = document.createElement('div');
    newTransactionElement.classList.add('transactionDiv');
    let amount = parseFloat(transactionObject.amount);
    newTransactionElement.innerHTML = `<div class="name&DateDiv">
                                        <div class="name">${transactionObject.name}</div>
                                        <div class="date">${transactionObject.date}</div>
                                   </div>
                                   <div class="category">${transactionObject.category}</div>
                                   <div class="amount ${transactionObject.choice == 'expense' ? 'redText' : 'greenText'}">${transactionObject.choice == 'expense' ? `-$${amount.toFixed(2)}` : `+$${amount.toFixed(2)}`}</div>`;
    transactionDiv.prepend(newTransactionElement);
}

function sortByCategoryHandler(categoryName, transactionType) {
    let transactionsArray = [];
    switch(transactionType) {
        case 'Income':
            incomeTransactions.forEach((transaction) => {
                if(transaction.category == categoryName) {
                    transactionsArray.push(transaction);
                }
            })
            break;
        case 'Expenses':
            expenseTransactions.forEach(transaction => {
                if(transaction.category == categoryName) {
                    transactionsArray.push(transaction);
                }
            })
            break;
    }
    return transactionsArray;
}

function sortByCategory(event) {
    let categoryName = event.target.value;
    let filteredTransactions = sortByCategoryHandler(categoryName, currentFilterByType);
    transactionDiv.innerHTML = ``;
    if(currentFilterByType) {
        transactionDiv.innerHTML = ``;
        filteredTransactions.forEach(displayFilteredTransactions);
    
    }
}
filterByCategorySelect.removeEventListener("change", sortByCategory);
filterByCategorySelect.addEventListener("change", sortByCategory);


backToMainPageButton.removeEventListener("click", backToMainPage);
backToMainPageButton.addEventListener("click", backToMainPage);
function backToMainPage() {
    window.location.href = '../main/index.html';
}

clearButton.addEventListener("click", event => {
    popupDiv.style.transition = 'opacity 0.3s ease'
    popupDiv.style.zIndex = '999';
    popupDiv.style.opacity = '100%'
    popupPurpose = 'clear';
    cancelButton.removeEventListener("click", cancelPopup);
    cancelButton.addEventListener("click", cancelPopup);

    confirmButton.removeEventListener("click", hidePopup);
    confirmButton.addEventListener("click", () => {
        hidePopup().then(() => {
            transactionDiv.innerHTML = `<p id="defaultText">There are no transactions right now</p>`;
            transactions = [];
            localStorage.setItem('transactions', transactions);
            localStorage.setItem('total', 0);
            localStorage.setItem('income', 0);
            localStorage.setItem('expense', 0);
        })
    });
})

function hidePopup() {
    if(popupPurpose == 'clear') {
        popupDiv.style.opacity = '0%';
        return new Promise(resolve => {
            popupDiv.removeEventListener("transitionend",  hidePopupHandler)
            popupDiv.addEventListener('transitionend', hidePopupHandler)
            function hidePopupHandler(event) {
                event.target.style.zIndex = '-999';
                popupDiv.removeEventListener("transitionend",  hidePopupHandler)
                popupDiv.style.zIndex = '-999';
                resolve();
            }
        })
    }
}

function cancelPopup() {
    popupDiv.style.opacity = '0%';
    return new Promise(resolve => {
        popupDiv.removeEventListener('transitionend', cancelPopupHandler);
        popupDiv.addEventListener('transitionend', cancelPopupHandler)
        function cancelPopupHandler(event) {
            event.target.style.zIndex = '-999';
            popupDiv.removeEventListener('transitionend', cancelPopupHandler);
            popupDiv.style.zIndex = '-999';
            resolve();
        }
    })
} 