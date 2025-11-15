const balance = document.getElementById('balance');
const incomeEl = document.getElementById('income');
const expenseEl = document.getElementById('expense');
const transactionList = document.getElementById('transaction-list');
const addBtn = document.getElementById('addBtn');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');

let transactions = [];

// Add Transaction
addBtn.addEventListener('click', () => {
  const description = descriptionInput.value.trim();
  const amount = +amountInput.value.trim();

  if(description !== '' && !isNaN(amount) && amount !== 0){
    const transaction = {
      id: Date.now(),
      description,
      amount
    };
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    descriptionInput.value = '';
    amountInput.value = '';
  } else {
    alert('Please enter valid description and amount (not zero).');
  }
});

// Add transaction to DOM
function addTransactionDOM(transaction){
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');
  item.classList.add(transaction.amount < 0 ? 'expense' : 'income');
  item.innerHTML = `
    ${transaction.description} <span>${sign}$${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;
  transactionList.appendChild(item);
}

// Update balance, income, and expense
function updateValues(){
  const amounts = transactions.map(t => t.amount);
  const total = amounts.reduce((acc, item) => acc + item, 0);
  const income = amounts.filter(item => item > 0).reduce((acc, item) => acc + item, 0);
  const expense = amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0);

  balance.innerText = `$${total.toFixed(2)}`;
  incomeEl.innerText = `$${income.toFixed(2)}`;
  expenseEl.innerText = `$${Math.abs(expense).toFixed(2)}`;
}

// Remove transaction
function removeTransaction(id){
  transactions = transactions.filter(t => t.id !== id);
  init();
}

// Initialize app
function init(){
  transactionList.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();
