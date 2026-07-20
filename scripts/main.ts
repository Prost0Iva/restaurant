import { Menu } from './menu.js';
import { Settings } from './settings.js';
import { Cart } from './cart.js';

interface RawProduct {
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
    market: string;
    type: string;
    weight: number;
    components: RawComponents;
}
interface RawComponents {
    size: string;
    bread: string;
    vegetable: string[];
    sauce: string[];
    filling: string[];
}
interface RawOption {
    name: string;
    description: string;
    price: number;
    image: string;
}
interface RawMarket {
    name: string;
    image: string;
}
interface RawCategory {
    name: string;
    description: string;
}
interface RawSetting {
    name: string;
    object: string;
    title: string;
    multiple: boolean;
}

interface Data {
    version: string;
    menu: RawProduct[];
    fillings: Record<string, RawOption>;
    sizes: Record<string, RawOption>;
    breads: Record<string, RawOption>;
    vegetables: Record<string, RawOption>;
    sauces: Record<string, RawOption>;
    markets: Record<string, RawMarket>;
    categories: Record<string, RawCategory>;
    settings: Record<string, RawSetting>;
}

const response = await fetch('assets/data.json');
export const data: Data = await response.json();

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
