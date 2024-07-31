export default function Transaction ({ id, name, value }) {
    const transactionEl = document.createElement('div');
    transactionEl.setAttribute('id', id);

    const nameEl = document.createElement('h2');
    nameEl.innerText = name;

    const valueEl = document.createElement('span');
    valueEl.innerText = `R$ ${value.toFixed(2)}`;

    transactionEl.append(nameEl, valueEl);

    return transactionEl;
}