const container = document.getElementById("container");
const transactionDiv = document.getElementById("transactionsDiv");
const filterByTypeSelect = document.getElementById("filterByTypeSelect");
const filterByCategorySelect = document.getElementById("filterByCategorySelect");
const clearButton = document.getElementById("clearButton");
const backToMainPageButton = document.getElementById("backToMainPageButton");
const deleteButtonsHTMLCollection = document.getElementsByClassName("delete");
const headingDiv = document.getElementById("headingDiv");
let deleteButtons;

const preferedTheme = localStorage.getItem("theme");

let popupPurpose = "";
const popupDiv = document.getElementById("popup");
const popupText = document.getElementById("popupText");
const confirmButton = document.getElementById("confirmButton");
const cancelButton = document.getElementById("cancelButton");

let incomeTransactions = [];
let expenseTransactions = [];
let transactions;
let income = parseFloat(localStorage.getItem("income")) || 0;
let expense = parseFloat(localStorage.getItem("expense")) || 0;
let total = parseFloat(localStorage.getItem("total")) || 0;
try {
	let storedTransactions = localStorage.getItem("transactions");
	transactions = storedTransactions ? JSON.parse(storedTransactions) : [];
} catch (error) {
	console.error(error);
	transactions = [];
	localStorage.removeItem("income");
	localStorage.removeItem("expense");
	localStorage.removeItem("total");
	localStorage.setItem("income", 0);
	localStorage.setItem("expense", 0);
	localStorage.setItem("total", 0);
}
if (transactions.length < 1) {
	transactionDiv.innerHTML = `<p class="defaultText" style="color: ${preferedTheme === "dark" ? "white" : "black"}">There are no transactions right now</p>`;
} else {
	filterByTypeSelect.value = "All";
	transactions.forEach(showAllTransactions);
}

let currentFilterByType = "All";
let currentFilterByCategory = "All";

filterByTypeSelect.removeEventListener("change", sortByType);
filterByTypeSelect.addEventListener("change", sortByType);
function sortByType(event) {
	transactionDiv.innerHTML = ``;
	let newTransactions = [];
	console.log(incomeTransactions, expenseTransactions);

	if (event.target.value == "All") {
		if (currentFilterByCategory != "All") {
			transactions.forEach((transaction) => {
				if (transaction.category == currentFilterByCategory) {
					newTransactions.push(transaction);
				}
			});
		} else {
			if (transactions.length < 1) {
				transactionDiv.innerHTML = `<p class="defaultText" style="color: ${preferedTheme === "dark" ? "white" : "black"}">No transactions found for this category and transaction type</p>`;
			} else {
				incomeTransactions = [];
				expenseTransactions = [];
				transactions.forEach(showAllTransactions);
			}
			updateDeleteButtonsEventListeners();
			return;
		}
		currentFilterByType = "All";
	} else if (event.target.value == "Income") {
		if (currentFilterByCategory != "All") {
			incomeTransactions.forEach((transaction) => {
				if (transaction.category == currentFilterByCategory) {
					newTransactions.push(transaction);
				}
			});
		} else {
			if (incomeTransactions.length > 0) {
				incomeTransactions.forEach(showIncomeTransactions);
			} else {
				transactionDiv.innerHTML = `<p class="defaultText" style="color: ${preferedTheme === "dark" ? "white" : "black"}">No transactions found for this category and transaction type</p>`;
			}
			currentFilterByType = "Income";
			updateDeleteButtonsEventListeners();
			return;
		}
		currentFilterByType = "Income";
	} else if (event.target.value == "Expenses") {
		if (currentFilterByCategory != "All") {
			expenseTransactions.forEach((transaction) => {
				if (transaction.category == currentFilterByCategory) {
					newTransactions.push(transaction);
				}
			});
		} else {
			if (expenseTransactions.length > 0) {
				expenseTransactions.forEach(showExpenseTransactions);
			} else {
				transactionDiv.innerHTML = `<p class="defaultText" style="color: ${preferedTheme === "dark" ? "white" : "black"}">No transactions found for this category and transaction type</p>`;
			}
			currentFilterByType = "Expenses";
			updateDeleteButtonsEventListeners();
			return;
		}

		currentFilterByType = "Expenses";
	}
	if (newTransactions.length < 1) {
		transactionDiv.innerHTML = `<p class="defaultText" style="color: ${preferedTheme === "dark" ? "white" : "black"}">No transactions found for this category and transaction type</p>`;
	} else {
		newTransactions.forEach(displayFilteredTransactions);
	}
	updateDeleteButtonsEventListeners();
}

// transactions.forEach(showAllTransactions)
function showAllTransactions(transactionObject) {
	const newTransactionElement = document.createElement("div");
	newTransactionElement.classList.add("transactionDiv");
	let amount = parseFloat(transactionObject.amount);
	newTransactionElement.dataset.name = transactionObject.name;
	newTransactionElement.dataset.date = transactionObject.date;
	newTransactionElement.dataset.amount = transactionObject.amount;
	newTransactionElement.dataset.category = transactionObject.category;

	newTransactionElement.style.boxShadow = `${preferedTheme === "dark" ? "1px 1px 10px rgba(255, 255, 255, 0.2)" : "1px 1px 10px rgba(0, 0, 0, 0.5"}`;
	newTransactionElement.style.backgroundColor = `${preferedTheme === "dark" ? "#20202020" : "rgba(214, 207, 207, 0.7)"}`;
	newTransactionElement.innerHTML = `<div class="name&DateDiv">
                                        <div class="name" style="color: ${preferedTheme === "dark" ? "rgb(230, 230, 230)" : "black"}">${transactionObject.name}</div>
                                        <div class="date" style="color: ${preferedTheme === "dark" ? "rgba(230, 230, 230, 0.8)" : "rgb(0, 0, 0, 0.8)"}">${transactionObject.date}</div>
                                   </div>
                                   <div class="category" style="color: ${preferedTheme === "dark" ? "rgba(230, 230, 230, 0.8)" : "rgb(0, 0, 0, 0.8)"}">${transactionObject.category}</div>
                                   <div class="amountAndDelete"><div class="amount ${transactionObject.choice == "expense" ? "redText" : "greenText"}">${transactionObject.choice == "expense" ? `-$${amount.toFixed(2)}` : `+$${amount.toFixed(2)}`}</div>
                                   <div class="delete"><img src="../Icons/deleteIcon.png"></div>
                                   </div>`;
	transactionDiv.prepend(newTransactionElement);
	if (transactionObject.choice == "expense") {
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
	const newTransactionElement = document.createElement("div");
	newTransactionElement.classList.add("transactionDiv");
	let amount = parseFloat(transactionObject.amount);
	newTransactionElement.dataset.name = transactionObject.name;
	newTransactionElement.dataset.date = transactionObject.date;
	newTransactionElement.dataset.amount = amount;
	newTransactionElement.dataset.category = transactionObject.category;

	newTransactionElement.style.boxShadow = `${preferedTheme === "dark" ? "1px 1px 10px rgba(255, 255, 255, 0.2)" : "1px 1px 10px rgba(0, 0, 0, 0.5"}`;
	newTransactionElement.style.backgroundColor = `${preferedTheme === "dark" ? "#20202020" : "rgba(214, 207, 207, 0.7)"}`;
	newTransactionElement.innerHTML = `<div class="name&DateDiv">
                                        <div class="name" style="color: ${preferedTheme === "dark" ? "rgb(230, 230, 230)" : "black"}">${transactionObject.name}</div>
                                        <div class="date" style="color: ${preferedTheme === "dark" ? "rgba(230, 230, 230, 0.8)" : "rgb(0, 0, 0, 0.8)"}">${transactionObject.date}</div>
                                   </div>
                                   <div class="category" style="color: ${preferedTheme === "dark" ? "rgba(230, 230, 230, 0.8)" : "rgb(0, 0, 0, 0.8)"}">${transactionObject.category}</div>
                                   <div class="amountAndDelete"><div class="amount ${transactionObject.choice == "expense" ? "redText" : "greenText"}">${transactionObject.choice == "expense" ? `-$${amount.toFixed(2)}` : `+$${amount.toFixed(2)}`}</div>
                                   <div class="delete"><img src="../Icons/deleteIcon.png"></div>
                                   </div>`;
	transactionDiv.append(newTransactionElement);
}

function showExpenseTransactions(transactionObject) {
	// transactionDiv.innerHTML = ``;
	const newTransactionElement = document.createElement("div");
	newTransactionElement.classList.add("transactionDiv");
	let amount = parseFloat(transactionObject.amount);
	newTransactionElement.dataset.name = transactionObject.name;
	newTransactionElement.dataset.date = transactionObject.date;
	newTransactionElement.dataset.amount = amount;
	newTransactionElement.dataset.category = transactionObject.category;

	newTransactionElement.style.boxShadow = `${preferedTheme === "dark" ? "1px 1px 10px rgba(255, 255, 255, 0.2)" : "1px 1px 10px rgba(0, 0, 0, 0.5"}`;
	newTransactionElement.style.backgroundColor = `${preferedTheme === "dark" ? "#20202020" : "rgba(214, 207, 207, 0.7)"}`;
	newTransactionElement.innerHTML = `<div class="name&DateDiv">
                                        <div class="name" style="color: ${preferedTheme === "dark" ? "rgb(230, 230, 230)" : "black"}">${transactionObject.name}</div>
                                        <div class="date" style="color: ${preferedTheme === "dark" ? "rgba(230, 230, 230, 0.8)" : "rgb(0, 0, 0, 0.8)"}">${transactionObject.date}</div>
                                   </div>
                                   <div class="category" style="color: ${preferedTheme === "dark" ? "rgba(230, 230, 230, 0.8)" : "rgb(0, 0, 0, 0.8)"}">${transactionObject.category}</div>
                                   <div class="amountAndDelete"><div class="amount ${transactionObject.choice == "expense" ? "redText" : "greenText"}">${transactionObject.choice == "expense" ? `-$${amount.toFixed(2)}` : `+$${amount.toFixed(2)}`}</div>
                                   <div class="delete"><img src="../Icons/deleteIcon.png"></div>
                                   </div>`;
	transactionDiv.append(newTransactionElement);
}

function displayFilteredTransactions(transactionObject) {
	const newTransactionElement = document.createElement("div");
	newTransactionElement.classList.add("transactionDiv");
	let amount = parseFloat(transactionObject.amount);
	newTransactionElement.dataset.name = transactionObject.name;
	newTransactionElement.dataset.date = transactionObject.date;
	newTransactionElement.dataset.amount = amount;
	newTransactionElement.dataset.category = transactionObject.category;

	newTransactionElement.style.boxShadow = `${preferedTheme === "dark" ? "1px 1px 10px rgba(255, 255, 255, 0.2)" : "1px 1px 10px rgba(0, 0, 0, 0.5"}`;
	newTransactionElement.style.backgroundColor = `${preferedTheme === "dark" ? "#20202020" : "rgba(214, 207, 207, 0.7)"}`;
	newTransactionElement.innerHTML = `<div class="name&DateDiv">
                                        <div class="name" style="color: ${preferedTheme === "dark" ? "rgb(230, 230, 230)" : "black"}">${transactionObject.name}</div>
                                        <div class="date" style="color: ${preferedTheme === "dark" ? "rgba(230, 230, 230, 0.8)" : "rgb(0, 0, 0, 0.8)"}">${transactionObject.date}</div>
                                   </div>
                                   <div class="category" style="color: ${preferedTheme === "dark" ? "rgba(230, 230, 230, 0.8)" : "rgb(0, 0, 0, 0.8)"}">${transactionObject.category}</div>
                                   <div class="amountAndDelete"><div class="amount ${transactionObject.choice == "expense" ? "redText" : "greenText"}">${transactionObject.choice == "expense" ? `-$${amount.toFixed(2)}` : `+$${amount.toFixed(2)}`}</div>
                                   <div class="delete"><img src="../Icons/deleteIcon.png"></div>
                                   </div>`;
	transactionDiv.prepend(newTransactionElement);
}

function sortByCategoryHandler(categoryName, transactionType) {
	let transactionsArray = [];
	if (categoryName === "All") {
		if (transactionType === "All") {
			return transactions;
		} else if (transactionType === "Income") {
			return incomeTransactions;
		} else {
			return expenseTransactions;
		}
	}

	switch (transactionType) {
		case "Income":
			incomeTransactions.forEach((transaction) => {
				if (transaction.category === categoryName) {
					transactionsArray.push(transaction);
				}
			});
			break;
		case "Expenses":
			expenseTransactions.forEach((transaction) => {
				if (transaction.category === categoryName) {
					transactionsArray.push(transaction);
				}
			});
			break;
		default:
			transactions.forEach((transaction) => {
				if (transaction.category === categoryName) {
					transactionsArray.push(transaction);
				}
			});
	}
	console.log(currentFilterByType);
	return transactionsArray;
}

function sortByCategory(event) {
	console.log("working...");
	let categoryName = event.target.value;
	currentFilterByCategory = categoryName;
	console.log(categoryName);
	let filteredTransactions = sortByCategoryHandler(categoryName, currentFilterByType);
	console.log(filteredTransactions);
	transactionDiv.innerHTML = ``;
	transactionDiv.innerHTML = ``;
	if (filteredTransactions.length > 0) {
		filteredTransactions.forEach(displayFilteredTransactions);
	} else {
		transactionDiv.innerHTML = `<p class="defaultText" style="color: ${preferedTheme === "dark" ? "white" : "black"}">No transactions found for this category and transaction type</p>`;
	}
	updateDeleteButtonsEventListeners();
}
filterByCategorySelect.removeEventListener("change", sortByCategory);
filterByCategorySelect.addEventListener("change", sortByCategory);

backToMainPageButton.removeEventListener("click", backToMainPage);
backToMainPageButton.addEventListener("click", backToMainPage);
function backToMainPage() {
	window.location.href = "../main/index.html";
}

clearButton.addEventListener("click", (event) => {
	popupText.textContent = `Are you sure you want to clear all transaction?`;
	popupDiv.classList.toggle("active");
	headingDiv.classList.toggle("active");
	container.classList.toggle("active");

	popupPurpose = "clear";

	cancelButton.removeEventListener("click", cancelPopup);
	cancelButton.addEventListener("click", cancelPopup);

	confirmButton.removeEventListener("click", confirmHandle);
	confirmButton.addEventListener("click", confirmHandle);
});

function confirmHandle() {
	hidePopup().then(() => {
		transactionDiv.innerHTML = `<p class="defaultText" style="color: ${preferedTheme === "dark" ? "white" : "black"}">There are no transactions right now</p>`;
		transactions = [];
		localStorage.setItem("transactions", transactions);
		localStorage.setItem("total", 0);
		localStorage.setItem("income", 0);
		localStorage.setItem("expense", 0);
	});
}

function hidePopup() {
	popupDiv.classList.remove("active");
	headingDiv.classList.remove("active");
	container.classList.remove("active");
	// let timeout = setTimeout(() => {
	//     if(popupDiv.style.opacity !== '0') {
	//         popupDiv.style.opacity = '0';
	//     } else {
	//         clearTimeout(timeout);
	//     }
	//     if(popupDiv.style.visibility !== 'hidden') {
	//         popupDiv.style.visibility = 'hidden';
	//     } else {
	//         clearTimeout(timeout);
	//     }
	// }, 500);

	return new Promise((resolve) => {
		resolve();
	});
}

function cancelPopup() {
	popupDiv.classList.toggle("active");
	headingDiv.classList.toggle("active");
	container.classList.toggle("active");
}

// alert(`Width: ${window.innerWidth} \n height: ${window.innerHeight}`);
function updateDeleteButtonsEventListeners() {
	deleteButtons = Array.from(deleteButtonsHTMLCollection);
	deleteButtons.forEach((button) => {
		button.removeEventListener("click", fetchTransactionDiv);
		button.addEventListener("click", fetchTransactionDiv);
	});
}
updateDeleteButtonsEventListeners();
console.log(deleteButtons);

function fetchTransactionDiv(event) {
	popupPurpose = "delete";
	let transactionElement = event.target.parentElement.parentElement.parentElement;
	let name = transactionElement.dataset.name;
	let amount = transactionElement.dataset.amount;
	let date = transactionElement.dataset.date;
	let category = transactionElement.dataset.category;
	console.log(transactionElement);
	showdDeletePopup();
	confirmButton.removeEventListener("click", hidePopup);
	confirmButton.addEventListener("click", (event) => {
		hidePopup().then(() => {
			console.log("Confirm button clicked!");
			if (transactions.lenght < 1) {
				transactionDiv.innerHTML = `<p class="defaultText" style="color: ${preferedTheme === "dark" ? "white" : "black"}">There are no transactions right now</p>`;
			} else {
				transactions.forEach((transaction, index) => {
					if (transaction.name == name && transaction.amount == amount && transaction.date == date && transaction.category == category) {
						transactions.splice(index, 1);
						if (transaction.choice == "expense") {
							expense -= transaction.amount;
							total = income - expense;
							localStorage.setItem("expense", expense);
							localStorage.setItem("total", total);
						} else {
							income -= transaction.amount;
							total = income - expense;
							localStorage.setItem("income", income);
							localStorage.setItem("total", total);
						}
						localStorage.setItem("transactions", JSON.stringify(transactions));
						transactionDiv.innerHTML = ``;
						incomeTransactions = [];
						expenseTransactions = [];
						transactions.forEach(showAllTransactions);
						transactionDiv.innerHTML = ``;
						let filteredTransactions = sortByCategoryHandler(currentFilterByCategory, currentFilterByType);
						filteredTransactions.forEach(displayFilteredTransactions);
						if (filteredTransactions.length < 1 && transactions.length < 1) {
							transactionDiv.innerHTML = `<p class="defaultText" style="color: ${preferedTheme === "dark" ? "white" : "black"}">There are no transactions right now</p>`;
						} else if (transactions.length < 1) {
							localStorage.removeItem("income");
							localStorage.removeItem("expense");
							localStorage.removeItem("total");
							localStorage.removeItem("transaction");

							localStorage.setItem("income", 0);
							localStorage.setItem("expense", 0);
							localStorage.setItem("total", 0);
						} else {
							console.log(filteredTransactions);
							updateDeleteButtonsEventListeners();
							console.log(transactions, incomeTransactions, filteredTransactions);
						}
					}
				});
			}
		});
	});
	updateDeleteButtonsEventListeners();
}

function showdDeletePopup() {
	popupDiv.classList.toggle("active");
	headingDiv.classList.toggle("active");
	container.classList.toggle("active");
	popupText.textContent = `Are you sure you want to delete this transaction?`;

	cancelButton.removeEventListener("click", cancelPopup);
	cancelButton.addEventListener("click", cancelPopup);
}

//  Theme switch handling

const body = document.body;
const filterLabels = document.getElementsByClassName("filterLabel");
const filterSelects = document.getElementsByClassName("filterSelect");

function switchTheme() {
	if (preferedTheme === "dark") {
		container.style.backgroundColor = "#171718";
		container.style.boxShadow = "0px 0px 3px 1px rgba(255, 255, 255, 0.1)";
		body.style.backgroundColor = "#171718";
		heading.style.color = "white";

		Array.from(filterLabels).forEach((label) => {
			label.style.color = "rgb(230, 230, 230)";
		});
		Array.from(filterSelects).forEach((select) => {
			select.style.backgroundColor = "#2e2e2e";
			select.style.color = "white";
		});
	} else {
		container.style.backgroundColor = "white";
		container.style.boxShadow = "0px 0px 3px 1px rgba(0, 0, 0, 0.1)";
		body.style.backgroundColor = "white";
		heading.style.color = "rgba(0, 0, 0, 0.95)";

		Array.from(filterLabels).forEach((label) => {
			label.style.color = "black";
		});
		Array.from(filterSelects).forEach((select) => {
			select.style.backgroundColor = "white";
			select.style.color = "black";
		});
	}
}
switchTheme();
