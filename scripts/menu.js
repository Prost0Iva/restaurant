import {pageFill} from './product_list.js';

const navig = document.querySelectorAll('.navig_button');

navig.forEach(button => {
    button.addEventListener('click', function() {
        navig.forEach(v => {
            if (v.id != button.id) {
                v.disabled = false
            }
        })
        button.disabled = true
        const prod_list = document.getElementById('product_list')
        prod_list.innerHTML = '';
        pageFill(button.id.slice(6))
    })
})