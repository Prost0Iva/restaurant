import { createValChanger } from './value.ts';
import { cart } from './main.ts';
import type { RawComponents } from './types.ts';

export function createFinishPage(
    componentsString: Record<string, string>,
    name: string,
    price: number,
    components: RawComponents,
    image: string,
    desc: string
) {
    const finish: HTMLElement = document.getElementById('modal-finish')!;
    const optionList: HTMLElement = document.getElementById('modal-options')!;
    const modalFoot: HTMLElement = document.getElementById('modal-foot')!;
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

    modalFoot.appendChild(createValChanger(1));
    const button = document.createElement('button');
    button.classList.add('product-add-to-cart');
    button.textContent = 'В КОРЗИНУ';
    button.addEventListener('click', () => {
        const indicatorValue: number = Number(modalFoot.querySelector('.val-indicator')!.textContent);
        cart.addToCart(name, Number(indicatorValue), price, components, image, desc);
    });

    modalFoot.appendChild(button);
}
