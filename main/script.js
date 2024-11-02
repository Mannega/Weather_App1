const totalBalanceLabelNumber = document.getElementById("totalBalanceLabelNumber");
const totalBalanceLabelText = document.getElementById("totalBalanceLabelText");
const incomeExpenseDiv = document.getElementById("incomeExpense");
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

const addTransactionLegend = document.getElementById("addTransactionLegend");

let income = parseFloat(localStorage.getItem("income")) || 0;
let expense = parseFloat(localStorage.getItem("expense")) || 0;
let total = parseFloat(localStorage.getItem("total")) || 0;
let transactions;
let storedTransactions = localStorage.getItem("transactions");
if (storedTransactions && storedTransactions !== null) {
	transactions = JSON.parse(storedTransactions);
} else {
	transactions = [];
}
if (transactions.length < 1) {
	localStorage.setItem("income", 0);
	localStorage.setItem("expense", 0);
	localStorage.setItem("total", 0);
	income = 0;
	expense = 0;
	total = 0;
}

// console.log(total, income, expense);
expenseLabelNumber.textContent = `-$${expense.toFixed(2)}`;
incomeLabelNumber.textContent = `+$${income.toFixed(2)}`;
totalBalanceLabelNumber.textContent = `${total < 0 ? `-$${Math.abs(total).toFixed(2)}` : `$${total.toFixed(2)}`}`;

let transactionChoice = "";

expenseChoiceButton.classList.add("selected");
transactionChoice = "expense";
expenseChoiceButton.addEventListener("click", (event) => {
	event.preventDefault();
	if (incomeChoiceButton.classList.contains("selected")) {
		incomeChoiceButton.classList.remove("selected");
	}
	event.target.classList.add("selected");
	transactionChoice = "expense";
});

incomeChoiceButton.addEventListener("click", (event) => {
	event.preventDefault();
	if (expenseChoiceButton.classList.contains("selected")) {
		expenseChoiceButton.classList.remove("selected");
	}
	event.target.classList.add("selected");
	transactionChoice = "income";
});

addExpenseButton.addEventListener("click", addTransaction);

function addTransaction() {
	const transactionName = nameField.value;
	const transactionCategory = categorySelect.value;
	const transactionAmount = parseFloat(amountField.value);
	const transactionDate = dateField.value;

	if (transactionName === "") {
		alert("Name field can't be empty");
		return;
	}

	if (transactionChoice === "") {
		alert("Please choose a transaction type");
		return;
	}

	if (transactionAmount === 0) {
		alert("Transaction amount can't be 0");
		return;
	}

	if (transactionDate === "") {
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

	if (transactionChoice == "expense") {
		expense += transactionObject.amount;
		expenseLabelNumber.textContent = `-$${expense.toFixed(2)}`;
		total -= transactionObject.amount;
		localStorage.setItem("expense", expense);
		localStorage.setItem("total", total);
		expenseLabelNumber.textContent = `-$${expense.toFixed(2)}`;
		totalBalanceLabelNumber.textContent = `${total < 0 ? `-$${Math.abs(total).toFixed(2)}` : `$${total.toFixed(2)}`}`;
		adjustFontSize();
		transactionSuccess();
	} else {
		income += transactionObject.amount;
		incomeLabelNumber.textContent = `+$${income.toFixed(2)}`;
		total += transactionObject.amount;
		localStorage.setItem("income", income);
		localStorage.setItem("total", total);
		expenseLabelNumber.textContent = `-$${expense.toFixed(2)}`;
		totalBalanceLabelNumber.textContent = `${total < 0 ? `-$${Math.abs(total).toFixed(2)}` : `$${total.toFixed(2)}`}`;
		adjustFontSize();
		transactionSuccess();
	}

	transactions.push(transactionObject);
	localStorage.setItem("transactions", JSON.stringify(transactions));

	nameField.value = "";
	categorySelect.selectedIndex = 0;
	amountField.value = "";
	dateField.value = "";
}
setInterval(() => {
	adjustFontSize();
}, 100);

console.log(expenseLabelNumber.textContent.length);
console.log(incomeLabelNumber.textContent.length);

function adjustFontSize() {
	incomeLabelNumber.style.fontSize = "2.5rem";
	expenseLabelNumber.style.fontSize = "2.5rem";

	if (incomeLabelNumber.textContent.length > 9) {
		incomeLabelNumber.classList.remove("mediumText");
		incomeExpenseDiv.style.gap = "10%";
		incomeLabelNumber.style.fontSize = "2.3rem";
	} else {
		incomeLabelNumber.classList.add("mediumText");
	}
	if (expenseLabelNumber.textContent.length > 9) {
		expenseLabelNumber.classList.remove("mediumText");
		expenseLabelNumber.style.fontSize = "2.3rem";
	} else {
		expenseLabelNumber.classList.add("mediumText");
	}
	if (totalBalanceLabelNumber.textContent.length > 12) {
		totalBalanceLabelNumber.classList.remove("bigText");
		incomeExpenseDiv.style.gap = "10%";
		totalBalanceLabelNumber.style.fontSize = "3.2rem";
	} else {
		totalBalanceLabelNumber.classList.add("bigText");
	}
}

// console.log(totalBalanceLabelNumber.textContent.length)

function transactionSuccess() {
	addTransactionLegend.innerHTML = `Add Transaction <span id="transactionSuccess" class="transactionSuccess">Added Transaction!</span>`;
	const text = document.getElementById("transactionSuccess");
	text.style.opacity = "0%";
	text.style.transition = `opacity 0.6s ease`;
	requestAnimationFrame(() => {
		text.style.opacity = "100%";
	});
	setTimeout(() => {
		hideText();
	}, 3500);
	function hideText() {
		text.style.opacity = "0%";
		setTimeout(() => {
			text.remove();
		}, 700);
	}
}
// alert(`Width: ${window.innerWidth} \n height: ${window.innerHeight}`);

// Theme Handling to ensure consistry alonge side with CSS

const body = document.body;
const heading = document.getElementById("heading");
const headerTextElements = document.getElementsByClassName("headerText");
const inputFields = document.getElementsByClassName("inputField");
const inputAndExpenseChoiceButtons = document.getElementsByClassName("expenseIncomeChoice");

function findPreferedTheme() {
	let theme = ``;
	if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
		theme = "dark";
		localStorage.setItem("theme", theme);
	} else {
		theme = "light";
		localStorage.setItem("theme", theme);
	}

	return theme;
}

let inputAndExpenseChoiceButtonsObserver; // The expense and income choice buttons mutational observer

const previousTheme = localStorage.getItem("theme") || findPreferedTheme();
console.log(findPreferedTheme(), previousTheme);
if (previousTheme === "dark") {
	document.getElementById("container").classList.add("dark");
	heading.style.color = "#eee";
	body.style.backgroundColor = `#171718`;
	Array.from(inputFields).forEach((inputField) => {
		inputField.style.color = "white";
	});
	Array.from(inputAndExpenseChoiceButtons).forEach((button) => {
		if (!button.classList.contains("selected")) {
			button.style.color = "white";
		} else {
			button.style.color = "black";
		}
	});
	inputAndExpenseChoiceButtonsObserver = new MutationObserver(switchFontColor);
	Array.from(inputAndExpenseChoiceButtons).forEach((button) => {
		inputAndExpenseChoiceButtonsObserver.observe(button, { attribute: true, attributeFilter: ["class"], attributeOldValue: true });
	});
} else {
	document.getElementById("container").classList.remove("dark");
	heading.style.color = "black";
	body.style.backgroundColor = "#f6f8fa";
	Array.from(inputFields).forEach((inputField) => {
		inputField.style.color = "black";
	});
}

function switchFontColor(entries) {
	// console.log(entries);
	entries.forEach((mutation) => {
		if (mutation.oldValue === "expenseIncomeChoice selected") {
			mutation.target.style.color = "white";
		} else {
			mutation.target.style.color = "black";
		}
	});
}
