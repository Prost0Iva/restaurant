import { Menu } from './menu_.js';
import { Settings } from './settings.js';
import { Cart } from './cart_.js';

const response = await fetch('assets/data.json');
export const data = await response.json();

const menu = new Menu();
export const settings = new Settings();
export const cart = new Cart();

const modalClose = document.getElementById('modal-close');
const modalOverlay = document.getElementById('modal-overlay');
modalClose.addEventListener('click', () => {
    settings.close();
});
modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) {
        settings.close();
    }
});
const cartOpen = document.getElementById('cart-button');
const cartClose = document.getElementById('modal-cart-close');
const cartOverlay = document.getElementById('modal-cart-overlay');
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
