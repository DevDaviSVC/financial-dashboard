import Transaction from "./component/Transaction";

function renderTransactions (transactions) {
    let transactionsEl = document.getElementById('transactions-list');

    transactions.forEach(transaction => {
        let transactionEl = Transaction(transaction);
        transactionsEl.appendChild(transactionEl);
    })
}

async function getTransactions () {
    const response = await fetch('http://localhost:3000/transactions');
    const data = await response.json();

    renderTransactions(data);
}

getTransactions();
