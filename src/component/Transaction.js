import { deleteTransaction, setFormToUpdate } from "..";

export default function Transaction ({ id, name, value, type }) {
    const transactionEl = document.createElement('div');
    transactionEl.setAttribute('id', id);
    transactionEl.classList.add('transaction');

    const transactionInfo = document.createElement('div');
    transactionInfo.classList.add('transaction-info');

    const nameEl = document.createElement('h2');
    nameEl.innerText = name;

    const valueEl = document.createElement('p');
    valueEl.innerText = `R$ ${value.toFixed(2)}`;

    const typeEl = document.createElement('span');
    typeEl.innerText = type;
    typeEl.style.backgroundColor = type === 'Deposit' ? '#64ffda' : '#ff1744'

    const btnsWraper = document.createElement('div');
    btnsWraper.classList.add('transaction-btns');

    const editBtn = document.createElement('button');
    editBtn.innerText = 'Edit';
    editBtn.classList.add('primary-btn');
    editBtn.onclick = () => setFormToUpdate({ id, name, value, type });

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete'
    deleteBtn.classList.add('danger-btn');
    deleteBtn.onclick = () => deleteTransaction(id);

    transactionInfo.append(nameEl, valueEl, typeEl);
    btnsWraper.append(editBtn, deleteBtn);

    transactionEl.append(transactionInfo, btnsWraper);

    return transactionEl;
}