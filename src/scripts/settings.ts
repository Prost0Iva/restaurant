import { getData } from './api.ts';
import { Option } from './option.ts';
import { createFinishPage } from './finish_page.ts';
import type { Data, RawComponents, RawSetting } from './types.ts';

interface ClassCategory {
    name: string;
    type: string;
    title: string;
    multiple: boolean;
    options: Option[];
}

const modalOverlay: HTMLElement = document.getElementById('modal-overlay')!;

export class Settings {
    components: RawComponents;
    categories: Record<string, ClassCategory>;
    originPrice: number;
    totalPrice: number;
    prodName: string;
    image: string;
    description: string;

    constructor() {
        this.components = {};
        this.categories = {};
        this.originPrice = 0;
        this.totalPrice = 0;
        this.prodName = '';
        this.image = '';
        this.description = '';
    }

    async fillCategories() {
        const settings: Record<string, RawSetting> = await getData('settings');
        Object.entries(settings).forEach(([k, v]) => {
            const multiple = v.multiple || false;
            this.categories[k] = {
                name: v.name,
                type: v.object,
                title: v.title,
                multiple: multiple,
                options: []
            };
        });
    }

    renderNavigButtons() {
        let first = true;
        const navig: HTMLElement = document.getElementById('modal-navig')!;
        const nextPage: HTMLElement = document.getElementById('modal-next')!;
        const previousPage: HTMLElement = document.getElementById('modal-previous')!;
        navig.innerHTML = '';
        Object.entries(this.categories as Record<string, ClassCategory>).forEach(([k, v]) => {
            let button = document.createElement('button');
            button.classList.add('modal-navig-button');
            button.textContent = v.name;
            button.addEventListener('click', () => {
                const navigButtons = document.querySelectorAll<HTMLButtonElement>('.modal-navig-button');
                navigButtons.forEach((b) => {
                    b.disabled = false;
                });
                button.disabled = true;
                if (k !== 'finish') {
                    if (k == Object.keys(this.categories)[0]) {
                        previousPage.classList.add('hidden');
                    } else previousPage.classList.remove('hidden');
                    nextPage.classList.remove('hidden');
                    this.renderPage(k);
                } else {
                    this.renderFinishPage();
                    previousPage.classList.remove('hidden');
                    nextPage.classList.add('hidden');
                }
            });
            navig.appendChild(button);
            if (first) {
                previousPage.classList.add('hidden');
                button.click();
                first = false;
            }
        });
    }

    renderNPButtons() {
        const nextPage: HTMLElement = document.getElementById('modal-next')!;
        const previousPage: HTMLElement = document.getElementById('modal-previous')!;
        const navigButtons = document.querySelectorAll<HTMLButtonElement>('.modal-navig-button');
        nextPage.addEventListener('click', () => {
            let i = 0;
            navigButtons.forEach((b) => {
                if (b.disabled) {
                    navigButtons[i + 1].click();
                    if (navigButtons.length - 1 == i + 1) {
                        nextPage.classList.add('hidden');
                    } else nextPage.classList.remove('hidden');
                    return;
                }
                i++;
            });
        });
        previousPage.addEventListener('click', () => {
            let i = 0;
            navigButtons.forEach((b) => {
                if (b.disabled) {
                    navigButtons[i - 1].click();
                    if (i - 1 == 0) {
                        previousPage.classList.add('hidden');
                    } else previousPage.classList.remove('hidden');
                    return;
                }
                i++;
            });
        });
    }

    async fillOptions(category: string) {
        const type = this.categories[category].type as keyof Data;
        const options = await getData(type);
        Object.entries(options).forEach(([k, v]) => {
            let option = new Option(
                k,
                category,
                this.categories[category].multiple,
                v.name,
                v.description,
                v.price,
                v.image
            );
            this.categories[category].options.push(option);
        });
    }

    async renderPage(category: string) {
        if (this.categories[category].options.length == 0) {
            await this.fillOptions(category);
        }
        const title: HTMLElement = document.getElementById('modal-title-text')!;
        const list: HTMLElement = document.getElementById('modal-options')!;
        const finish: HTMLElement = document.getElementById('modal-finish')!;
        const modalFoot: HTMLElement = document.getElementById('modal-foot')!;
        finish.innerHTML = '';
        list.classList.remove('hidden');
        finish.classList.add('hidden');
        if (
            modalFoot.querySelector('.value') !== null &&
            modalFoot.querySelector('.product-add-to-cart') !== null
        ) {
            modalFoot.removeChild(modalFoot.querySelector('.value')!);
            modalFoot.removeChild(modalFoot.querySelector('.product-add-to-cart')!);
        }
        title.textContent = this.categories[category].title;
        list.innerHTML = '';
        this.categories[category].options.forEach((option) => {
            const o = option.render();
            if (this.categories[category].multiple && this.components[category].length > 0) {
                let component = this.components[category] as string[];
                component.forEach((t) => {
                    if (option.type == t) {
                        o.classList.add('modal-option-active');
                    }
                });
            } else {
                if (option.type == this.components[category]) {
                    o.classList.add('modal-option-active');
                }
            }
            list.appendChild(o);
        });
        this.updTotalPrice();
    }

    renderFinishPage() {
        const title: HTMLElement = document.getElementById('modal-title-text')!;
        title.textContent = this.categories['finish'].title;
        const optionList: HTMLElement = document.getElementById('modal-options')!;
        optionList.innerHTML = '';
        const finishComponents: Record<string, string> = {};
        Object.entries(this.categories).forEach(([k, v]) => {
            if (k !== 'finish') {
                finishComponents[v.name] = '';
                v.options.forEach((option) => {
                    const componentValue: string | string[] = this.components[k];
                    if (typeof componentValue == 'string' && componentValue == option.type) {
                        finishComponents[v.name] += `${option.name}; `;
                    }
                    if (typeof componentValue == 'object') {
                        componentValue.forEach((type) => {
                            if (type == option.type) {
                                finishComponents[v.name] += `${option.name}; `;
                            }
                        });
                    }
                });
            }
        });
        createFinishPage(
            finishComponents,
            this.prodName,
            this.totalPrice,
            this.components,
            this.image,
            this.description
        );
    }

    open(components: RawComponents, price: number, name: string, image: string, description: string) {
        this.components = structuredClone(components);
        this.originPrice = price;
        this.prodName = name;
        this.image = image;
        this.description = description;
        this.updTotalPrice();
        this.renderNavigButtons();
        this.renderNPButtons();
        modalOverlay.classList.add('active');
        document.body.classList.add('scrollbar-off');
    }
    close() {
        modalOverlay.classList.remove('active');
        document.body.classList.add('scrollbar-off');
    }

    updTotalPrice() {
        this.totalPrice = this.originPrice;
        const footPrice: HTMLElement = document.getElementById('modal-total-price')!;
        Object.entries(this.components).forEach(([k, v]) => {
            if (this.categories[k].multiple) {
                const component = v as string[];
                this.categories[k].options.forEach((option) => {
                    component.forEach((type: string) => {
                        if (type == option.type) {
                            this.totalPrice += option.price;
                        }
                    });
                });
            } else {
                this.categories[k].options.forEach((option) => {
                    if (v == option.type) {
                        this.totalPrice += option.price;
                    }
                });
            }
        });
        footPrice.textContent = `Итого: ${this.totalPrice} руб.`;
    }
}
