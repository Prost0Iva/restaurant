import '@/CSS/main.css';
import '@/CSS/cart.css';
import '@/CSS/menu.css';
import '@/CSS/modal_cart.css';
import '@/CSS/modal_settings.css';
import '@/CSS/value.css';
import { Menu } from './menu.ts';
import { Settings } from './settings.ts';
import { Cart } from './cart.ts';

const menu = new Menu();
export const settings = new Settings();
export const cart = new Cart();

const modalClose: HTMLElement = document.getElementById('modal-close')!;
const modalOverlay: HTMLElement = document.getElementById('modal-overlay')!;
modalClose.addEventListener('click', () => {
    settings.close();
});
modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) {
        settings.close();
    }
});
const cartOpen: HTMLElement = document.getElementById('cart-button')!;
const cartClose: HTMLElement = document.getElementById('modal-cart-close')!;
const cartOverlay: HTMLElement = document.getElementById('modal-cart-overlay')!;
cartOpen.addEventListener('click', () => {
    cart.open();
});
cartClose.addEventListener('click', () => {
    cart.close();
});
cartOverlay.addEventListener('click', function (e) {
    if (e.target === cartOverlay) {
        cart.close();
    }
});

menu.fillCategories();
settings.fillCategories();
