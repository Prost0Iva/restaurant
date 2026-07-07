const modal_overlay = document.getElementById('modal_overlay');
const modal_close = document.getElementById('modal_close');

function open_modal() {
    modal_overlay.classList.add('active');
}

function close_modal() {
    modal_overlay.classList.remove('active');
}

modal_close.addEventListener('click', close_modal);
document.addEventListener('productListFilled', function() {
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        const desc = product.querySelector('.custom_hyper_text');
        desc.addEventListener('click', open_modal)
    })
})