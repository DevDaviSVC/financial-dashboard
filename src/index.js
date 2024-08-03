import Transaction from "./component/Transaction";
import './css/style.css';

const formEl = document.querySelector('#new-transaction form');

function renderTransactions (transactions) {
    let transactionsEl = document.getElementById('transactions-list');
    transactionsEl.innerHTML = '';

    transactions.forEach(transaction => {
        let transactionEl = Transaction(transaction);
        transactionsEl.append(transactionEl);
    })
}

function renderDashboard (transactions) {
    const balanceEl = document.getElementById('balance-el');
    const profitEl = document.getElementById('profit-el');
    const debtEl = document.getElementById('debts-el');

    balanceEl.innerText = '';
    profitEl.innerText = '';
    debtEl.innerText = '';

    // rendering balance
    let balance = transactions.reduce((accum, transaction) => accum + (transaction.type === 'Withdraw' ? -transaction.value : transaction.value), 0);
    balanceEl.innerText = `R$ ${balance.toFixed(2)}`;

    // rendering profit
    let profit = transactions.reduce((accum, transaction) => accum + (transaction.type === 'Deposit' ? transaction.value : 0), 0);
    profitEl.innerText = `R$ ${profit.toFixed(2)}`;

    // rendering debts
    let debt = transactions.reduce((accum, transaction) => accum + (transaction.type === 'Withdraw' ? transaction.value : 0), 0);
    debtEl.innerText = `-R$ ${debt.toFixed(2)}`;
}

async function getTransactions () {
    const response = await fetch('http://localhost:3000/transactions');
    const data = await response.json();

    renderTransactions(data);
    renderDashboard(data);
}

async function postTransaction(newTransaction) {
    await fetch('http://localhost:3000/transactions', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(newTransaction)
    });

    getTransactions();
}

async function putTransaction(id, updatedTransactionbody) {
    await fetch(`http://localhost:3000/transactions/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(updatedTransactionbody)
    });

    getTransactions();
}

export async function deleteTransaction (id) {
    await fetch(`http://localhost:3000/transactions/${id}`, {
        method: 'DELETE'
    });

    getTransactions();
}

function addTransaction () {
    const name = document.getElementById('name').value;
    const type = document.getElementById('type').value;
    const value = +document.getElementById('value').value;

    const newTransaction = {name, type, value};

    postTransaction(newTransaction);
}

function updateTransaction () {
    const id = formEl.getAttribute('id');

    const name = document.getElementById('name').value;
    const type = document.getElementById('type').value;
    const value = +document.getElementById('value').value;

    const updatedTransaction = {name, type, value};

    putTransaction(id, updatedTransaction);
}

export function setFormToUpdate (transaction) {

    const nameEl = document.getElementById('name');
    const typeEl = document.getElementById('type');
    const valueEl = document.getElementById('value');

    nameEl.value = transaction.name;
    typeEl.value = transaction.type;
    valueEl.value = transaction.value.toString();

    formEl.setAttribute('id', transaction.id);
}

addEventListener('DOMContentLoaded', getTransactions);

formEl.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (formEl.getAttribute('id') === 'default') {
        addTransaction();
    } else {
        updateTransaction();
        formEl.setAttribute('id', 'default');
    }

    formEl.reset();

})