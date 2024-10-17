let transactionDiv = document.getElementById('transactionsDiv');
const filterByTypeSelect = document.getElementById('filterByTypeSelect');
const filterByCategorySelect = document.getElementById('filterByCategorySelect');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

transactions.forEach(transactionObject => {
    const newTransactionElement = document.createElement('div');
    newTransactionElement.classList.add('transactionDiv');
    newTransactionElement.innerHTML = `<div class="name&DateDiv">
                                        <div class="name">${transactionObject.name}</div>
                                        <div class="date">${transactionObject.date}</div>
                                   </div>
                                   <div class="category">${transactionObject.category}</div>
                                   <div>${transactionObject.choice == 'expense' ? `-${transactionObject.amount}` : `+${transactionObject.amount}`}</div>`;
    transactionDiv.prepend(newTransactionElement);
})

console.log(transactions);