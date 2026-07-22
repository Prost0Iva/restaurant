import { Product } from './product.ts';
import { getProducts, getMarkets, getCategories } from './api.ts';
import type { RawComponents, RawCategory, RawProduct, RawMarket } from './types.ts';

interface ClassCategory {
    name: string;
    description: string;
    products: Product[];
}

export class Menu {
    categories: Record<string, ClassCategory> = {};

    async fillCategories() {
        const categories: Record<string, RawCategory> = await getCategories();
        Object.entries(categories).forEach(([k, v]) => {
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

    async fillProducts(category: string) {
        const menu: RawProduct[] = await getProducts();
        const markets: Record<string, RawMarket> = await getMarkets();
        menu.forEach((prod) => {
            if (prod.category == category) {
                let components: RawComponents = {};
                let marketImage = '';
                if (prod.type == 'multiple') {
                    components = prod.components;
                }
                if (prod.market !== '') {
                    marketImage = markets[prod.market].image;
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

    async renderPage(category: string) {
        if (this.categories[category].products.length == 0) {
            await this.fillProducts(category);
        }
        const list: HTMLElement = document.getElementById('product-list')!;
        list.innerHTML = '';
        this.categories[category].products.forEach((prod) => {
            list.appendChild(prod.render());
        });
    }
}
