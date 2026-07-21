import { CartPosition } from './cart_position.ts';
import { RawComponents } from './types.ts';

const cartOverlay: HTMLElement = document.getElementById('modal-cart-overlay')!;

export class Cart {
    positions: CartPosition[];
    totalPrice: number;

    constructor() {
        this.positions = [];
        this.totalPrice = 0;
    }

    addToCart(
        name: string,
        val: number,
        price: number,
        components: RawComponents,
        image: string,
        description: string
    ) {
        let posFind = false;
        this.positions.forEach((pos) => {
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
        const menuTotalPrice: HTMLElement = document.getElementById('cart-total-price')!;
        const modalTotalPrice: HTMLElement = document.getElementById('modal-cart-total-price')!;
        menuTotalPrice.textContent = `Итого: ${this.totalPrice} руб.`;
        modalTotalPrice.textContent = `Итого: ${this.totalPrice} руб.`;
    }

    updMenuCart() {
        this.updTotalPrice();
        const menuCart: HTMLElement = document.getElementById('cart')!;
        const tbody: HTMLElement = menuCart.querySelector('tbody')!;
        tbody.innerHTML = '';
        this.positions.forEach((pos) => {
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            const td2 = document.createElement('td');
            const td3 = document.createElement('td');
            td1.classList.add('cart-td-1');
            td2.classList.add('cart-td-2');
            td3.classList.add('cart-td-3');
            td1.textContent = pos.name;
            td2.textContent = pos.val.toString();
            td3.textContent = pos.price.toString();
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tbody.appendChild(tr);
        });
        const openCart = document.getElementById('cart-button') as HTMLButtonElement;
        if (this.positions.length > 0) {
            openCart.disabled = false;
        } else openCart.disabled = true;
    }

    updModalCart() {
        const list: HTMLElement = document.getElementById('modal-cart')!;
        list.innerHTML = '';
        this.positions.forEach((pos) => {
            pos.render();
        });
    }

    open() {
        cartOverlay.classList.add('active');
        this.updModalCart();
        document.body.classList.add('scrollbar-off');
    }
    close() {
        cartOverlay.classList.remove('active');
        document.body.classList.remove('scrollbar-off');
    }
}
