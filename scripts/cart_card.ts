import { createValChanger } from './value.ts';
import { CartPosition } from './cart_position.ts';

export function createCartCard(
    name: string,
    val: number,
    price: number,
    image: string,
    description: string,
    pos: CartPosition
) {
    const position = document.createElement('div');
    position.classList.add('position');

    const imgFrame = document.createElement('div');
    imgFrame.classList.add('option-img-frame');
    const img = document.createElement('img');
    img.classList.add('option-img');
    img.src = `assets${image}`;
    imgFrame.appendChild(img);
    position.appendChild(imgFrame);
    const right = document.createElement('div');
    right.classList.add('position-right');
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-position');
    deleteBtn.textContent = 'X';
    deleteBtn.addEventListener('click', () => {
        pos.deleteFromCart();
    });
    right.appendChild(deleteBtn);
    const table = document.createElement('table');
    table.classList.add('position-description');
    const thead = document.createElement('thead');
    const th = document.createElement('th');
    th.textContent = name;
    thead.appendChild(th);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    const tr1 = document.createElement('tr');
    const td1 = document.createElement('td');
    td1.textContent = description;
    tr1.appendChild(td1);
    tbody.appendChild(tr1);
    table.appendChild(tbody);
    const tfoot = document.createElement('tfoot');
    const tr2 = document.createElement('tr');
    const td2 = document.createElement('td');
    td2.textContent = `${price} руб. за шт`;
    tr2.appendChild(td2);
    tfoot.appendChild(tr2);
    table.appendChild(tfoot);
    right.appendChild(table);

    right.appendChild(createValChanger(val));
    position.appendChild(right);

    return position;
}
