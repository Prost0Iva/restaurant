import { data } from './main.js'
import { Option } from './option.js'

const modal_overlay = document.getElementById('modal-overlay');

export class Settings {
    constructor(){
        this.components = {}
        this.categories = {}
        this.originPrice = 0
        this.totalPrice = 0
    }

    fillCategories(){
        Object.entries(data.settings).forEach(([k, v]) => {
            const multiple = v.multiple || false
            this.categories[k] = {
                name: v.name,
                type: v.object,
                title: v.title,
                multiple: multiple,
                options: []
            }
        })
    }

    renderNavigButtons(){
        let first = true
        const navig = document.getElementById('modal-navig')
        navig.innerHTML = ''
        Object.entries(this.categories).forEach(([k, v]) => {
            let button = document.createElement('button');
            button.classList.add('modal-navig-button')
            button.textContent = v.name
            button.addEventListener('click', ()=>{
                const navigButtons = document.querySelectorAll('.modal-navig-button')
                navigButtons.forEach(b => {
                    b.disabled = false
                })
                button.disabled = true
                this.renderPage(k)
            })
            navig.appendChild(button)
            if(first){
                button.click()
                first = false
            }
        })
    }

    fillOptions(category){
        Object.entries(data[this.categories[category].type]).forEach(([k, v]) => {
            let option = new Option(k, category, this.categories[category].multiple, v.name, v.description, v.price, v.image)
            this.categories[category].options.push(option)
        })
    }

    renderPage(category){
        if(this.categories[category].options.length == 0){this.fillOptions(category)}
        const title = document.getElementById('modal-title-text')
        const list = document.getElementById('modal-options')
        title.textContent = this.categories[category].title
        list.innerHTML = ''
        this.categories[category].options.forEach(option => {
            const o = option.render()
            if(this.categories[category].multiple && this.components[category].length > 0){
                this.components[category].forEach(t => {
                    if(option.type == t){
                        o.classList.add("modal-option-active")
                    }
                })
            } else {if(option.type == this.components[category]){o.classList.add("modal-option-active")}}
            list.appendChild(o)
        })
    }

    open(components, price){
        this.originPrice = price
        this.updTotalPrice()
        this.components = structuredClone(components)
        this.renderNavigButtons()
        modal_overlay.classList.add('active');
    }
    close(){
        modal_overlay.classList.remove('active');
    }

    updTotalPrice(){
        this.totalPrice = this.originPrice
        const footPrice = document.getElementById('modal-total-price')
        Object.entries(this.components).forEach(([k, v]) => {
            if(this.categories[k].multiple){
                this.categories[k].options.forEach(option => {
                    v.forEach(type => {
                        if(type == option.type){this.totalPrice += option.price}
                    })
                })
            } else {
                this.categories[k].options.forEach(option => {
                    if(v == option.type){this.totalPrice += option.price}
                })
            }
        })
        footPrice.textContent = `Итого: ${this.totalPrice} руб.`
    }
}