let transactionDiv = document.getElementById('transactionsDiv');
const filterByTypeSelect = document.getElementById('filterByTypeSelect');
const filterByCategorySelect = document.getElementById('filterByCategorySelect');

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