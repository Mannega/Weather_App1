let transactionDiv = document.getElementById('transactionsDiv');
const filterByTypeSelect = document.getElementById('filterByTypeSelect');
const filterByCategorySelect = document.getElementById('filterByCategorySelect');
const clearButton = document.getElementById('clearButton');
const backToMainPageButton = document.getElementById('backToMainPageButton');
const deleteButtonsHTMLCollection = document.getElementsByClassName('delete');
let deleteButtons;

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
    transactionDiv.innerHTML = `<p class="defaultText">There are no transactions right now</p>`;
} else {
    filterByTypeSelect.value = 'All';
    transactions.forEach(showAllTransactions);
}

let currentFilterByType = 'All';
let currentFilterByCategory = 'All';

filterByTypeSelect.removeEventListener("change", sortByType);
filterByTypeSelect.addEventListener("change", sortByType);
function sortByType(event) {
    transactionDiv.innerHTML = ``;
    let newTransactions = [];
    console.log(incomeTransactions, expenseTransactions);

    if(event.target.value == 'All') {
        if(currentFilterByCategory != 'All') {
            transactions.forEach(transaction => {
                if(transaction.category == currentFilterByCategory) {
                    newTransactions.push(transaction);
                }
            });
        } else {
            incomeTransactions = [];
            expenseTransactions = [];
            transactions.forEach(showAllTransactions);
            return;
        }
        currentFilterByType = 'All';
    }
    else if(event.target.value == 'Income') {
            if(currentFilterByCategory != 'All') {
                incomeTransactions.forEach(transaction => {
                    if(transaction.category == currentFilterByCategory) {
                        newTransactions.push(transaction);
                    }
            });
        } else {
            incomeTransactions.forEach(showIncomeTransactions);
            currentFilterByType = 'Income';
            return;
        }
        currentFilterByType = 'Income';
    }
     else if(event.target.value == 'Expenses') {
        if(currentFilterByCategory != 'All') {
            expenseTransactions.forEach(transaction => {
                if(transaction.category == currentFilterByCategory) {
                    newTransactions.push(transaction);
                }
            });
        } else {
            expenseTransactions.forEach(showExpenseTransactions);
            currentFilterByType = 'Expenses';
            return;
        }
      
        currentFilterByType = 'Expenses';
    }
    if(newTransactions.length < 1) {
        transactionDiv.innerHTML = `<p class="defaultText">No transactions found for this category and transaction type</p>`
    } else {
        newTransactions.forEach(displayFilteredTransactions);
    }
}

// transactions.forEach(showAllTransactions)
function showAllTransactions(transactionObject) {
    const newTransactionElement = document.createElement('div');
    newTransactionElement.classList.add('transactionDiv');
    let amount = parseFloat(transactionObject.amount);
    newTransactionElement.dataset.name = transactionObject.name;
    newTransactionElement.dataset.date = transactionObject.date;
    newTransactionElement.dataset.amount = transactionObject.amount;
    newTransactionElement.dataset.category = transactionObject.category;
    newTransactionElement.innerHTML = `<div class="name&DateDiv">
                                        <div class="name">${transactionObject.name}</div>
                                        <div class="date">${transactionObject.date}</div>
                                   </div>
                                   <div class="category">${transactionObject.category}</div>
                                   <div class="amountAndDelete"><div class="amount ${transactionObject.choice == 'expense' ? 'redText' : 'greenText'}">${transactionObject.choice == 'expense' ? `-$${amount.toFixed(2)}` : `+$${amount.toFixed(2)}`}</div>
                                   <div class="delete">x</div>
                                   </div>`;
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
    newTransactionElement.dataset.name = transactionObject.name;
    newTransactionElement.dataset.date = transactionObject.date;
    newTransactionElement.dataset.amount = amount;
    newTransactionElement.dataset.category = transactionObject.category;
    newTransactionElement.innerHTML = `<div class="name&DateDiv">
                                        <div class="name">${transactionObject.name}</div>
                                        <div class="date">${transactionObject.date}</div>
                                   </div>
                                   <div class="category">${transactionObject.category}</div>
                                   <div class="amountAndDelete"><div class="amount ${transactionObject.choice == 'expense' ? 'redText' : 'greenText'}">${transactionObject.choice == 'expense' ? `-$${amount.toFixed(2)}` : `+$${amount.toFixed(2)}`}</div>
                                   <div class="delete">x</div>
                                   </div>`;
    transactionDiv.append(newTransactionElement);
}

function showExpenseTransactions(transactionObject) {
    // transactionDiv.innerHTML = ``;
    const newTransactionElement = document.createElement('div');
    newTransactionElement.classList.add('transactionDiv');
    let amount = parseFloat(transactionObject.amount);
    newTransactionElement.dataset.name = transactionObject.name;
    newTransactionElement.dataset.date = transactionObject.date;
    newTransactionElement.dataset.amount = amount;
    newTransactionElement.dataset.category = transactionObject.category;
    newTransactionElement.innerHTML = `<div class="name&DateDiv">
                                        <div class="name">${transactionObject.name}</div>
                                        <div class="date">${transactionObject.date}</div>
                                   </div>
                                   <div class="category">${transactionObject.category}</div>
                                   <<div class="amountAndDelete"><div class="amount ${transactionObject.choice == 'expense' ? 'redText' : 'greenText'}">${transactionObject.choice == 'expense' ? `-$${amount.toFixed(2)}` : `+$${amount.toFixed(2)}`}</div>
                                   <div class="delete">x</div>
                                   </div>`;
    transactionDiv.append(newTransactionElement);
}

function displayFilteredTransactions(transactionObject) {
    const newTransactionElement = document.createElement('div');
    newTransactionElement.classList.add('transactionDiv');
    let amount = parseFloat(transactionObject.amount);
    newTransactionElement.dataset.name = transactionObject.name;
    newTransactionElement.dataset.date = transactionObject.date;
    newTransactionElement.dataset.amount = amount;
    newTransactionElement.dataset.category = transactionObject.category;
    newTransactionElement.innerHTML = `<div class="name&DateDiv">
                                        <div class="name">${transactionObject.name}</div>
                                        <div class="date">${transactionObject.date}</div>
                                   </div>
                                   <div class="category">${transactionObject.category}</div>
                                   <div class="amountAndDelete"><div class="amount ${transactionObject.choice == 'expense' ? 'redText' : 'greenText'}">${transactionObject.choice == 'expense' ? `-$${amount.toFixed(2)}` : `+$${amount.toFixed(2)}`}</div>
                                   <div class="delete">x</div>
                                   </div>`;
    transactionDiv.prepend(newTransactionElement);
}

function sortByCategoryHandler(categoryName, transactionType) {
    let transactionsArray = [];
    if (categoryName === 'All') {
        if(transactionType === 'All') {
            return transactions; 
        } else if(transactionType === 'Income') {
            return incomeTransactions;
        } else {
            return expenseTransactions;
        }
    }

    switch(transactionType) {
        case 'Income':
            incomeTransactions.forEach(transaction => {
                if(transaction.category === categoryName) {
                    transactionsArray.push(transaction);
                }
            });
            break;
        case 'Expenses':
            expenseTransactions.forEach(transaction => {
                if(transaction.category === categoryName) {
                    transactionsArray.push(transaction);
                }
            });
            break;
        default:
            transactions.forEach(transaction => {
                if(transaction.category === categoryName) {
                    transactionsArray.push(transaction);
                }
            });
    }
    console.log(currentFilterByType);
    return transactionsArray;
}

function sortByCategory(event) {
    console.log('working...')
    let categoryName = event.target.value;
    currentFilterByCategory = categoryName;
    console.log(categoryName);
    let filteredTransactions = sortByCategoryHandler(categoryName, currentFilterByType);
    console.log(filteredTransactions);
    transactionDiv.innerHTML = ``;
        transactionDiv.innerHTML = ``;
    if(filteredTransactions.length > 0) {
        filteredTransactions.forEach(displayFilteredTransactions);
    } else {
        transactionDiv.innerHTML = `<p class="defaultText">No transactions found for this category and transaction type</p>`;
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
            transactionDiv.innerHTML = `<p class="defaultText">There are no transactions right now</p>`;
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

// alert(`Width: ${window.innerWidth} \n height: ${window.innerHeight}`);
function updateDeleteButtonsEventListeners() {
    deleteButtons = Array.from(deleteButtonsHTMLCollection);
    deleteButtons.forEach(button => {
    button.removeEventListener("click", fetchTransactionDiv);
    button.addEventListener("click", fetchTransactionDiv);
})
}
updateDeleteButtonsEventListeners();
console.log(deleteButtons);

function fetchTransactionDiv(event, callback) {
    let transactionElement = event.target.parentElement.parentElement;
    let name = transactionElement.dataset.name;
    let amount = transactionElement.dataset.amount;
    let date = transactionElement.dataset.date;
    let category = transactionElement.dataset.category;
    transactions.forEach((transaction, index)=> {
        if(transaction.name == name && transaction.amount == amount
            && transaction.date == date && transaction.category == category
        ) {
            transactions.splice(index, 1);
            transactionDiv.innerHTML = ``;
            transactions.forEach(showAllTransactions);
            updateDeleteButtonsEventListeners();
            console.log(transactions);
        }
    })
}

function showdDeletePopup(event) {
    popupDiv.style.transition = 'opacity 0.3s ease'
    popupDiv.style.zIndex = '999';
    popupDiv.style.opacity = '100%'
    popupPurpose = 'delete';
    cancelButton.removeEventListener("click", cancelPopup);
    cancelButton.addEventListener("click", cancelPopup);

    confirmButton.removeEventListener("click", hidePopup);
    confirmButton.addEventListener("click", () => {
        hidePopup().then(() => {
            if(transactions.lenght < 1) {
                transactionDiv.innerHTML = `<p class="defaultText">There are no transactions right now</p>`;
            } else {
                transactions.forEach(showAllTransactions);
            }
        })
    });
}