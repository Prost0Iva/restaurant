import { createValChanger } from './value.ts';
import { settings, cart } from './main.ts';
import { RawComponents } from './types.ts';

export class Product {
    name: string;
    description: string;
    image: string;
    marketImage: string;
    price: number;
    category: string;
    market: string;
    type: string;
    components: RawComponents;

    constructor(
        name: string,
        description: string,
        image: string,
        marketImage: string,
        price: number,
        category: string,
        market: string,
        type: string,
        components: RawComponents
    ) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.marketImage = marketImage;
        this.price = price;
        this.category = category;
        this.market = market;
        this.type = type;
        this.components = components;
    }

    render() {
        const product = document.createElement('div');
        product.className = 'product';

        // Картинка рынка
        const marketImg = document.createElement('img');
        marketImg.className = 'product-market';
        if (this.marketImage == '') {
            marketImg.src = '';
        } else marketImg.src = `assets${this.marketImage}`;
        product.appendChild(marketImg);

        // Рамка с картинкой товара
        const imgFrame = document.createElement('div');
        imgFrame.className = 'product-img-frame';

        const prodImg = document.createElement('img');
        prodImg.className = 'product-img';
        prodImg.src = `assets${this.image}`;
        imgFrame.appendChild(prodImg);

        product.appendChild(imgFrame);

        // Таблица описания
        const table = document.createElement('table');
        table.className = 'product-description';

        const thead = document.createElement('thead');
        const th = document.createElement('th');
        th.textContent = this.name;
        thead.appendChild(th);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        const td = document.createElement('td');
        td.className = this.type;
        if (this.type == 'multiple') {
            td.addEventListener('click', () => {
                settings.open(this.components, this.price, this.name, this.image, this.description);
            });
        }
        td.textContent = this.description;
        tbody.appendChild(td);
        table.appendChild(tbody);

        const tfoot = document.createElement('tfoot');
        const tr = document.createElement('tr');
        const priceTd = document.createElement('td');
        priceTd.textContent = `Цена: ${this.price} руб.`;
        tr.appendChild(priceTd);
        tfoot.appendChild(tr);
        table.appendChild(tfoot);

        product.appendChild(table);

        // Блок количества
        product.appendChild(createValChanger(1));

        // Кнопка "В корзину"
        const addToCartBtn = document.createElement('button');
        addToCartBtn.className = 'product-add-to-cart';
        addToCartBtn.textContent = 'В КОРЗИНУ';
        addToCartBtn.addEventListener('click', () => {
            cart.addToCart(
                this.name,
                Number(product.querySelector('.val-indicator')!.textContent),
                this.price,
                this.components,
                this.image,
                this.description
            );
        });
        product.appendChild(addToCartBtn);

        return product;
    }
}
