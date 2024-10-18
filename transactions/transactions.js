let transactionDiv = document.getElementById('transactionsDiv');
const filterByTypeSelect = document.getElementById('filterByTypeSelect');
const filterByCategorySelect = document.getElementById('filterByCategorySelect');
const clearButton = document.getElementById('clearButton');

let popupPurpose = '';
const popupDiv = document.getElementById('popup');
const confirmButton = document.getElementById('confirmButton');
const cancelButton = document.getElementById('cancelButton');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
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

clearButton.addEventListener("click", event => {
    popupDiv.style.transition = 'opacity 0.3s ease'
    popupDiv.style.zIndex = '999';
    popupDiv.style.opacity = '100%'
    popupPurpose = 'clear';
    confirmButton.removeEventListener("click", hidePopup)
    confirmButton.addEventListener("click", () => {
        hidePopup().then(() => {
            transactionDiv.innerHTML = ``;
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
                resolve();
            }
        })
    }
}
