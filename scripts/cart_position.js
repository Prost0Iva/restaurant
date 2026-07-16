import { cart } from './main.js';
import { createCartCard } from './cart_card.js';

export class CartPosition {
    constructor(name, val, price, components, image, description) {
        this.name = name;
        this.val = val;
        this.price = price;
        this.components = structuredClone(components);
        this.image = image;
        this.description = description;
    }

    deleteFromCart() {
        const i = cart.positions.indexOf(this);
        cart.positions.splice(i, 1);
        cart.updModalCart();
        cart.updMenuCart();
    }

    render() {
        const pos = createCartCard(this.name, this.val, this.price, this.image, this.description, this);
        const list = document.getElementById('modal-cart');
        const val = pos.querySelector('.val-indicator').textContent;
        pos.querySelector('.val-remove').addEventListener('click', () => {
            this.val = Number(val);
            cart.updMenuCart();
        });
        pos.querySelector('.val-add');
        list.appendChild(pos);
    }
}
