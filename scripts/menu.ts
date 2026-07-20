import { Product } from './product.js';
import { data } from './main.js';

interface Category {
    name: string;
    description: string;
    products: any[];
}

export class Menu {
    categories: Record<string, Category> = {};

    fillCategories() {
        Object.entries(data.categories).forEach(([k, v]) => {
            this.categories[k] = {
                name: v.name,
                description: v.description,
                products: []
            };
        });
        this.renderMenuButtons();
    }

    renderMenuButtons() {
        let first = true;
        const navig: HTMLElement = document.getElementById('navig')!;
        Object.entries(this.categories).forEach(([k, v]) => {
            let button = document.createElement('button');
            button.classList.add('navig-button');
            button.textContent = v.name;
            button.addEventListener('click', () => {
                const navigButtons = document.querySelectorAll<HTMLButtonElement>('.navig-button');
                navigButtons.forEach((b) => {
                    b.disabled = false;
                });
                button.disabled = true;
                this.renderPage(k);
            });
            navig.appendChild(button);
            if (first) {
                button.click();
                first = false;
            }
        });
    }

    fillProducts(category: string) {
        data.menu.forEach((prod) => {
            if (prod.category == category) {
                let components = [];
                let marketImage = '';
                if (prod.type == 'multiple') {
                    components = prod.components;
                }
                if (prod.market !== '') {
                    marketImage = data.markets[prod.market].image;
                }
                let product = new Product(
                    prod.name,
                    prod.description,
                    prod.image,
                    marketImage,
                    prod.price,
                    prod.category,
                    prod.market,
                    prod.type,
                    components
                );
                this.categories[category].products.push(product);
            }
        });
    }

    renderPage(category: string) {
        if (this.categories[category].products.length == 0) {
            this.fillProducts(category);
        }
        const list = document.getElementById('product-list');
        list.innerHTML = '';
        this.categories[category].products.forEach((prod) => {
            list.appendChild(prod.render());
        });
    }
}
