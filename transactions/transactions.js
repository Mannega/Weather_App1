let transactionDiv = document.getElementById('transactionsDiv');
const filterByTypeSelect = document.getElementById('filterByTypeSelect');
const filterByCategorySelect = document.getElementById('filterByCategorySelect');
const clearButton = document.getElementById('clearButton');
const backToMainPageButton = document.getElementById('backToMainPageButton');

let popupPurpose = '';
const popupDiv = document.getElementById('popup');
const confirmButton = document.getElementById('confirmButton');
const cancelButton = document.getElementById('cancelButton');

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
}

transactions.forEach(transactionObject => {
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
})

console.log(transactions);

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