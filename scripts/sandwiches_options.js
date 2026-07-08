const modal_overlay = document.getElementById('modal_overlay');
const modal_close = document.getElementById('modal_close');
const navig = document.querySelectorAll('.modal_navig_button');
const modal_previous = document.getElementById('modal_previous');
const modal_next = document.getElementById('modal_next');

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
    navig.forEach(v => {
        if ((v.id != `navig_${page}`) || (i != page)) {
            v.disabled = false
        }
        else {v.disabled = true;}
        i++
    })
    optionPageFill(page)
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

export async function optionPageFill(page) {
    const options_list = document.getElementById('modal_options')
    options_list.innerHTML = '';

    const response = await fetch('assets/data.json');
    const options = await response.json();

    Object.entries(options).forEach(([k, v]) => {
        if (k == page && page != "finish") {
            Object.values(options[k]).forEach(option => {
                    options_list.insertAdjacentHTML("beforeend",
                `<div class="modal_option">
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
    
    document.dispatchEvent(new CustomEvent('productListFilled'));
}