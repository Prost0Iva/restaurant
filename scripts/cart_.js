import { CartPosition } from './cart_position.js';

const cartOverlay = document.getElementById('modal-cart-overlay');

export class Cart {
    constructor() {
        this.positions = [];
        this.totalPrice = 0;
    }

    addToCart(name, val, price, components, image, description) {
        let posFind = false;
        this.positions.forEach((pos) => {
            console.log(components);
            console.log(pos.components);
            if (pos.name == name && JSON.stringify(pos.components) == JSON.stringify(components)) {
                pos.val += val;
                this.updMenuCart();
                posFind = true;
            }
        });
        if (!posFind) {
            this.positions.push(new CartPosition(name, val, price, components, image, description));
        }
        this.updMenuCart();
    }

    updTotalPrice() {
        this.totalPrice = 0;
        this.positions.forEach((pos) => {
            this.totalPrice += pos.price * pos.val;
        });
        const menuTotalPrice = document.getElementById('cart-total-price');
        const modalTotalPrice = document.getElementById('modal-total-price');
        menuTotalPrice.textContent = `Итого: ${this.totalPrice} руб.`;
        modalTotalPrice.textContent = `Итого: ${this.totalPrice} руб.`;
    }

    updMenuCart() {
        this.updTotalPrice();
        const menuCart = document.getElementById('cart');
        const tbody = menuCart.querySelector('tbody');
        tbody.innerHTML = '';
        let totalPrice;
        this.positions.forEach((pos) => {
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            const td2 = document.createElement('td');
            const td3 = document.createElement('td');
            td1.classList.add('cart-td-1');
            td2.classList.add('cart-td-2');
            td3.classList.add('cart-td-3');
            td1.textContent = pos.name;
            td2.textContent = pos.val;
            td3.textContent = pos.price;
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tbody.appendChild(tr);
        });
        //`<td class="cart-td-1">${position.name}</td> <td class="cart-td-2">${position.count}</td> <td class="cart-td-3">${position.price}</td><td class="cart-td-4">X</td>`;
    }

    updModalCart() {
        const list = document.getElementById('modal-cart');
        list.innerHTML = '';
        this.positions.forEach((pos) => {
            pos.render();
        });
    }

    open() {
        cartOverlay.classList.add('active');
        this.updModalCart();
    }
    close() {
        cartOverlay.classList.remove('active');
    }
}
