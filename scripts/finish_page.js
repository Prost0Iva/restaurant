import { createValChanger } from './value.js';
import { cart } from './main.js';

export function createFinishPage(componentsString, name, price, components, image, desc) {
    const finish = document.getElementById('modal-finish');
    const optionList = document.getElementById('modal-options');
    const modalFoot = document.getElementById('modal-foot');
    optionList.innerHTML = '';
    optionList.classList.add('hidden');
    finish.classList.remove('hidden');

    const imgFrame = document.createElement('div');
    imgFrame.classList.add('option-img-frame');
    finish.appendChild(imgFrame);
    const img = document.createElement('img');
    img.classList.add('option-img');
    img.src = 'assets/i/result_sandwich.jpg';
    imgFrame.appendChild(img);
    const description = document.createElement('table');
    description.id = 'finish-description';
    finish.appendChild(description);
    const tHead = document.createElement('thead');
    const th = document.createElement('th');
    th.textContent = 'Ваш сендвич готов!';
    tHead.appendChild(th);
    description.appendChild(tHead);
    const tBody = document.createElement('tbody');
    Object.entries(componentsString).forEach(([k, v]) => {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.textContent = `${k}: ${v}`;
        tr.appendChild(td);
        tBody.appendChild(tr);
    });
    description.appendChild(tBody);
    const tFoot = document.createElement('tfoot');
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.textContent = name;
    tr.appendChild(td);
    tFoot.appendChild(tr);
    description.appendChild(tFoot);

    modalFoot.appendChild(createValChanger());
    const button = document.createElement('button');
    button.classList.add('product-add-to-cart');
    button.textContent = 'В КОРЗИНУ';
    button.addEventListener('click', () => {
        cart.addToCart(
            name,
            Number(modalFoot.querySelector('.val-indicator').textContent),
            price,
            components,
            image,
            desc
        );
    });

    modalFoot.appendChild(button);

    //`<div class = "option-img-frame">
    //        <img class = "option-img" src="assets/i/result_sandwich.jpg" alt="">
    //</div>
    //<table id = "finish-description">
    //        <thead>
    //                <th>Ваш сендвич готов!</th>
    //        </thead>
    //        <tbody>
    //                <tr><td>Размер: ${componentsString_list[0]}</td></tr>
    //                <tr><td>Хлеб: ${componentsString_list[1]}</td></tr>
    //                <tr><td>Овощи: ${componentsString_list[2]}</td></tr>
    //                <tr><td>Соусы: ${componentsString_list[3]}</td></tr>
    //                <tr><td>Начинка: ${componentsString_list[4]}</td></tr>
    //        </tbody>
    //        <tfoot>
    //                <tr><td>${sandwich_data.querySelector('thead th').textContent.trim()}</td></tr>
    //        </tfoot>
    //</table>`

    //`<div id = "modal-value">
    //        <p>КОЛИЧЕСТВО</p>
    //        <div class="modal-val-changer">
    //                <button class = "modal-val-remove">-</button>
    //                <div class="modal-val-indicator">1</div>
    //                <button class = "modal-val-add">+</button>
    //        </div>
    //</div>
    //<p id="modal-total-price">Итого: 0 руб.</p>
    //<button class = "product-add-to-cart modal-add-to-cart">В КОРЗИНУ</button>`
}
