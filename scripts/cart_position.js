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
        console.log(pos.querySelector('.val-remove'));
        pos.querySelector('.val-remove').addEventListener('click', () => {
            console.log(Number(pos.querySelector('.val-indicator').textContent));
            this.val = Number(pos.querySelector('.val-indicator').textContent);
            cart.updMenuCart();
        });
        pos.querySelector('.val-add').addEventListener('click', () => {
            this.val = Number(pos.querySelector('.val-indicator').textContent);
            cart.updMenuCart();
        });
        list.appendChild(pos);
    }
}
