import {pageFill} from './product_list.js';

const navig = document.querySelectorAll('.navig-button');


navig.forEach(button => {
    button.addEventListener('click', function() {
        navig.forEach(v => {
            if (v.id != button.id) {
                v.disabled = false
            }
        })
        button.disabled = true
        pageFill(button.id.slice(6))
    })
})