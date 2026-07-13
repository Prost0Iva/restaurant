import {fillOptions, components} from './sandwiches_options.js'
import {cart, menuCartUpd} from './cart.js'

const modal_overlay = document.getElementById('modal-overlay');
const modal_close = document.getElementById('modal-close');
const navig = document.querySelectorAll('.modal-navig-button');
const modal_previous = document.getElementById('modal-previous');
const modal_next = document.getElementById('modal-next');
const modal_title_text = document.getElementById('modal-title-text');
const modal_foot = document.getElementById('modal-foot');
const response = await fetch('assets/data.json');
const options = await response.json();

export let sandwich_data

function openModal(desc) {
    sandwich_data = desc
    navig.forEach(v => {
        v.disabled = false
    })
    navig[0].disabled = true
    optionPageFill("sizes")
    modal_overlay.classList.add('active');
    document.body.classList.add('scrollbar-off')
    modal_previous.classList.add('hidden')
    modal_next.classList.remove('hidden')
    //console.log(desc.querySelector('thead th').textContent.trim())
}
function closeModal() {
    modal_overlay.classList.remove('active');
    document.body.classList.remove('scrollbar-off')
    sandwich_data = undefined
    const modal_price =  modal_foot.querySelector('#modal-total-price')
    modal_price.textContent = `Итого: 0 руб.`

    document.dispatchEvent(new CustomEvent('optionsClosed'));
}
function changePage(page) {
    let i = 0
    let temp_page = ""
    navig.forEach(v => {
        if (typeof page == "string") {v.disabled = (v.id === `navig-${page}`)}
        if (typeof page == "number") {
            if (i != page) {
                v.disabled = false
            } else {
                v.disabled = true;
                temp_page = v.id.slice(6)
            }
            i++
        }
    })
    if (temp_page == "") {
        optionPageFill(page)
    } else optionPageFill(temp_page)
    if (page == 0 || page == navig[0].id.slice(6)) {modal_previous.classList.add('hidden')} else modal_previous.classList.remove('hidden')
    if (page == navig.length-1 || page == navig[navig.length-1].id.slice(6)) {modal_next.classList.add('hidden')} else modal_next.classList.remove('hidden')
}
export function priceUpd() {
    let sandwich_price = Number(sandwich_data.querySelector('tfoot tr td').textContent.trim().split(" ")[1])
    let components_price = 0
    Object.entries(components).forEach(([type, comp]) => {
        let price = 0
        Object.entries(options[type+'s']).forEach(([k, v]) => {
            if(typeof comp == 'string'){
                if(comp == k) {
                    price = v.price
                }
            } else {
                comp.forEach(comp_v => {
                    if (comp_v == k) {
                        price += v.price
                    }
                })
            }
        })
        components_price += price
    })
    let total_price = sandwich_price + components_price
    const modal_price =  modal_foot.querySelector('#modal-total-price')
    modal_price.textContent = `Итого: ${total_price} руб.`
}
async function optionPageFill(page) {
    const options_list = document.getElementById('modal-options')
    const finish = document.getElementById('modal-finish')
    options_list.innerHTML = '';
    finish.innerHTML = ''

    modal_title_text.textContent = options.settings[page.slice(0, -1)].title

    Object.entries(options).forEach(([k, v]) => {
        if (k == page && page != "finishs") {
            Object.entries(options[k]).forEach(([id, option]) => {
                options_list.insertAdjacentHTML("beforeend",
                    `<div class="modal-option" id="${id}">
                        <div class = "option-img-frame">
                            <img class = "option-img" src="assets${option.image}" alt="">
                        </div>
                        <table class = "product-description">
                            <thead>
                                <th>${option.name}</th>
                            </thead>
                            <tfoot>
                                <tr><td>Цена: ${option.price} руб.</td></tr>
                            </tfoot>
                        </table>
                    </div>`
                )
            })
        }

    });
    if (page == "finishs") {
        let components_list = []
        Object.entries(components).forEach(([type, comp]) => {
            let str = ""
            Object.entries(options[type+'s']).forEach(([k, v]) => {
                if(typeof comp == 'string'){
                    if(comp == k) {
                        str = v.name
                    }
                } else {
                    comp.forEach(comp_v => {
                        if (comp_v == k) {
                            str += `${v.name}; `
                        }
                    })
                }
            })
            if(str == "") {str = "Нет"}
            components_list.push(str)
        })
        options_list.classList.add("hidden")
        finish.classList.remove("hidden")
        finish.innerHTML = 
            `<div class = "option-img-frame">
                <img class = "option-img" src="assets/i/result_sandwich.jpg" alt="">
            </div>
            <table id = "finish-description">
                <thead>
                    <th>Ваш сендвич готов!</th>
                </thead>
                <tbody>
                    <tr><td>Размер: ${components_list[0]}</td></tr>
                    <tr><td>Хлеб: ${components_list[1]}</td></tr>
                    <tr><td>Овощи: ${components_list[2]}</td></tr>
                    <tr><td>Соусы: ${components_list[3]}</td></tr>
                    <tr><td>Начинка: ${components_list[4]}</td></tr>
                </tbody>
                <tfoot>
                    <tr><td>${sandwich_data.querySelector('thead th').textContent.trim()}</td></tr>
                </tfoot>
            </table>`
        modal_foot.innerHTML = 
            `<div id = "modal-value">
                <p>КОЛИЧЕСТВО</p>
                <div class="modal-val-changer">
                    <button class = "modal-val-remove">-</button>
                    <div class="modal-val-indicator">1</div>
                    <button class = "modal-val-add">+</button>
                </div>
            </div>
            <p id="modal-total-price">Итого: 0 руб.</p>
            <button class = "product-add-to-cart modal-add-to-cart">В КОРЗИНУ</button>`
            finishButtons()
    } else {
        options_list.classList.remove("hidden")
        finish.classList.add("hidden")
        modal_foot.innerHTML = 
            `<p id="modal-total-price">Итого: 0 руб.</p>`
    }
    priceUpd()
    fillOptions(page.slice(0, -1))
    document.dispatchEvent(new CustomEvent('optionsListFilled'));
}
function finishButtons() {
    document.querySelector('.modal-val-remove').addEventListener('click', function(){
        if(Number(document.querySelector('.modal-val-indicator').textContent) > 1) {
            document.querySelector('.modal-val-indicator').textContent = Number(document.querySelector('.modal-val-indicator').textContent) - 1
        }
    })
    document.querySelector('.modal-val-add').addEventListener('click', function(){
        document.querySelector('.modal-val-indicator').textContent = Number(document.querySelector('.modal-val-indicator').textContent) + 1
    })
    document.querySelector('.modal-add-to-cart').addEventListener('click', function(){
        let temp_name = sandwich_data.querySelector('thead th').textContent.trim()
        let matched = false
        cart.positions.forEach(pos => {
            if(pos.name == temp_name && JSON.stringify(pos.components) == JSON.stringify(components)) {
                pos.count += Number(document.querySelector('.modal-val-indicator').textContent)
                matched = true
            }
        })
        if(!matched){
            cart.positions.push({
                name: sandwich_data.querySelector('thead th').textContent.trim(),
                count: Number(document.querySelector('.modal-val-indicator').textContent),
                price: Number(modal_foot.querySelector('#modal-total-price').textContent.trim().split(" ")[1]),
                components: components
            })
        }
        menuCartUpd()
        closeModal()
    })
}

modal_next.addEventListener('click', function(){
    let i = 0
    navig.forEach(v => {
        if (v.disabled) {
            changePage(i+1)
            return
        }
        i++
    })
});
modal_previous.addEventListener('click', function(){
    let i = 0
    navig.forEach(v => {
        if (v.disabled) {
            changePage(i-1)
            return
        }
        i++
    })
});
modal_close.addEventListener('click', closeModal);
modal_overlay.addEventListener('click', function(e) {
    if (e.target === modal_overlay) {
        closeModal();
    }
});
document.addEventListener('productListFilled', function() {
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        const hyper_text = product.querySelector('.custom-hyper-text');
        const desc = product.querySelector('.product-description');
        hyper_text.addEventListener('click', function(){openModal(desc)})
    })
})
navig.forEach(button => {
    button.addEventListener('click', function() {
        changePage(button.id.slice(6))
    })
})

