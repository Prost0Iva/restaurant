import { data } from './main.js'
import { Option } from './option.js'

const modal_overlay = document.getElementById('modal-overlay');

export class Settings {
    constructor(){
        this.categories = {}
    }

    fillCategories(){
        Object.entries(data.settings).forEach(([k, v]) => {
            let multiple = v.multiple || false
            this.categories[k] = {
                name: v.name,
                type: v.object,
                title: v.title,
                multiple: multiple,
                options: []
            }
        })
        this.renderNavigButtons()
    }

    renderNavigButtons(){
        let first = true
        const navig = document.getElementById('modal-navig')
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
                this.fillOptions(k)
            })
            navig.appendChild(button)
            if(first){
                button.click()
                first = false
            }
        })
    }

    fillOptions(category){
        if(this.categories[category].options.length > 0){this.renderPage(category); return}
        Object.entries(data[this.categories[category].type]).forEach(([k, v]) => {
            let option = new Option(k, v.name, v.description, v.price, v.image)
            this.categories[category].options.push(option)
        })
        this.renderPage(category)
    }

    renderPage(category){
        const title = document.getElementById('modal-title-text')
        const list = document.getElementById('modal-options')
        title.textContent = this.categories[category].title
        list.innerHTML = ''
        this.categories[category].options.forEach(option => {
            list.appendChild(option.render())
        })
    }

    open(components){
        modal_overlay.classList.add('active');
    }
    close(){
        modal_overlay.classList.remove('active');
    }
}