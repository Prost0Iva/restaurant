import { settings } from "./main.js"

export class Option {
    constructor(type, category, multiple, name, description, price, image){
        this.type = type,
        this.category = category,
        this.multiple = multiple,
        this.name = name,
        this.description = description,
        this.price = price,
        this.image = image
    }

    render(){
        const option = document.createElement('div')
        option.classList.add('modal-option')
        option.addEventListener('click',()=>{this.select(option)})

        const imgFrame = document.createElement('div')
        imgFrame.classList.add('option-img-frame')
        option.appendChild(imgFrame)

        const img = document.createElement('img')
        img.classList.add('option-img')
        img.src = `assets${this.image}`
        imgFrame.appendChild(img)

        const description = document.createElement('table')
        description.classList.add('product-description')
        const tHead = document.createElement('thead')
        const tHeadTh = document.createElement('th')
        tHeadTh.textContent = this.name
        tHead.appendChild(tHeadTh)
        description.appendChild(tHead)
        const tFoot = document.createElement('tfoot')
        const tFootTr = document.createElement('tr')
        const tFootTd = document.createElement('td')
        tFootTd.textContent = `Цена: ${this.price} руб.`
        tFootTr.appendChild(tFootTd)
        tFoot.appendChild(tFootTr)
        description.appendChild(tFoot)
        option.appendChild(description)

        return option
    }

    select(option){
        if(this.multiple){
            if(option.classList.contains("modal-option-active")){
                option.classList.remove("modal-option-active")
                settings.components[this.category].splice(settings.components[this.category].indexOf(this.type), 1)
            }
            else {
                option.classList.add("modal-option-active")
                settings.components[this.category].push(this.type)
            }
        } else {
            const options = document.querySelectorAll('.modal-option')
            options.forEach(o => {
                o.classList.remove("modal-option-active")
            })
            option.classList.add("modal-option-active")
            settings.components[this.category] = this.type
        }
        settings.updTotalPrice()
    }
}