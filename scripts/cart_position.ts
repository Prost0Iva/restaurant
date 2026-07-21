import { cart } from './main.ts';
import { createCartCard } from './cart_card.ts';
import { RawComponents } from './types.ts';

export class CartPosition {
    name: string;
    val: number;
    price: number;
    components: RawComponents;
    image: string;
    description: string;

    constructor(
        name: string,
        val: number,
        price: number,
        components: RawComponents,
        image: string,
        description: string
    ) {
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
        const pos: HTMLElement = createCartCard(
            this.name,
            this.val,
            this.price,
            this.image,
            this.description,
            this
        );
        const list: HTMLElement = document.getElementById('modal-cart')!;
        const valRemove: HTMLElement = pos.querySelector('.val-remove')!;
        const valAdd: HTMLElement = pos.querySelector('.val-add')!;
        valRemove.addEventListener('click', () => {
            const valIndicator: HTMLElement = pos.querySelector('.val-indicator')!;
            this.val = Number(valIndicator.textContent);
            cart.updMenuCart();
        });
        valAdd.addEventListener('click', () => {
            const valIndicator: HTMLElement = pos.querySelector('.val-indicator')!;
            this.val = Number(valIndicator.textContent);
            cart.updMenuCart();
        });
        list.appendChild(pos);
    }
}
