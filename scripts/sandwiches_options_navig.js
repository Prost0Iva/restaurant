import {fillOptions} from './sandwiches_options.js';

const modal_overlay = document.getElementById('modal_overlay');
const modal_close = document.getElementById('modal_close');
const navig = document.querySelectorAll('.modal_navig_button');
const modal_previous = document.getElementById('modal_previous');
const modal_next = document.getElementById('modal_next');
const modal_title_text = document.getElementById('modal_title_text');
const modal_foot = document.getElementById('modal_foot');

function openModal() {
    navig.forEach(v => {
        v.disabled = false
    })
    navig[0].disabled = true
    optionPageFill("sizes")
    modal_overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeModal() {
    modal_overlay.classList.remove('active');
    document.body.style.overflow = '';
}
function changePage(page) {
    let i = 0
    let temp_page = ""
    navig.forEach(v => {
        if (typeof page == "string") {v.disabled = (v.id === `navig_${page}`)}
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
    if (page == 0 || page == navig[0].id.slice(6)) {modal_previous.style.visibility = "hidden"} else modal_previous.style.visibility = ""
    if (page == navig.length-1 || page == navig[navig.length-1].id.slice(6)) {modal_next.style.visibility = "hidden"} else modal_next.style.visibility = ""
}
async function optionPageFill(page) {
    const options_list = document.getElementById('modal_options')
    options_list.innerHTML = '';

    const response = await fetch('assets/data.json');
    const options = await response.json();

    modal_title_text.textContent = options.settings[page.slice(0, -1)].title

    Object.entries(options).forEach(([k, v]) => {
        if (k == page && page != "finish") {
            Object.entries(options[k]).forEach(([k, option]) => {
                options_list.insertAdjacentHTML("beforeend",
                    `<div class="modal_option" id="${k}">
                        <div class = "option_img_frame">
                            <img class = "option_img" src="assets${option.image}" alt="">
                        </div>
                        <table class = "product_description">
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
    fillOptions(page.slice(0, -1))
    document.dispatchEvent(new CustomEvent('optionsListFilled'));
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
        const desc = product.querySelector('.custom_hyper_text');
        desc.addEventListener('click', openModal)
    })
})
navig.forEach(button => {
    button.addEventListener('click', function() {
        changePage(button.id.slice(6))
    })
})