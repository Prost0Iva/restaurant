const modal_overlay = document.getElementById('modal-cart-overlay');
const modal_close = document.getElementById('modal-cart-close');
const modal_foot = document.getElementById('modal-cart-foot');
const cart_button = document.getElementById('cart-button')
const modal_cart = document.getElementById('modal-cart');
const menu_cart = document.getElementById('cart')

export let cart = {
    positions: [],
    total_price: 0
}

let data;
async function init() {
    const response = await fetch('assets/data.json');
    data = await response.json();
}
const dataReady = init();

function openModal() {
    modalCartUpd()
    modal_overlay.classList.add('active');
    document.body.classList.add('scrollbar-off')
}
function closeModal() {
    modal_overlay.classList.remove('active');
    document.body.classList.remove('scrollbar-off')
}
async function modalCartUpd() {
    await dataReady;
    modal_cart.innerHTML = ''
    let i = 0
    cart.positions.forEach(position => {
        data.menu.forEach(prod => {
            if(prod.name == position.name) {
                modal_cart.insertAdjacentHTML("beforeend",
                    `<div class="position" id="${i}">
                        <div class = "option-img-frame">
                            <img class = "option-img" src="assets${prod.image}" alt="">
                        </div>
                        <div class="position-right">
                            <button class="delete-position">X</button>
                            <table class = "position-description">
                                <thead>
                                    <th>${position.name}</th>
                                </thead>
                                <tbody>
                                    <tr><td>${prod.description}</td></tr>
                                </tbody>
                                <tfoot>
                                    <tr><td>${position.price} руб. за шт</td></tr>
                                </tfoot>
                            </table>
                            <div class="modal-val-changer">
                                <button class="modal-val-remove">-</button>
                                <div class="modal-val-indicator">${position.count}</div>
                                <button class="modal-val-add">+</button>
                            </div>
                        </div>
                    </div>`
                )
            }
        })
        i++
    })
    cartTotalPrice()

    document.dispatchEvent(new CustomEvent('modalCartUpdated'));
}
document.addEventListener('modalCartUpdated', function(){
    const positions = document.querySelectorAll('.position')
    positions.forEach(pos => {
        pos.querySelector('.modal-val-remove').addEventListener('click', function(){
            if(Number(pos.querySelector('.modal-val-indicator').textContent) > 1) {
                cart.positions[Number(pos.id)].count -= 1
                pos.querySelector('.modal-val-indicator').textContent = cart.positions[Number(pos.id)].count
                menuCartUpd()
            }
        })
        pos.querySelector('.modal-val-add').addEventListener('click', function(){
            cart.positions[Number(pos.id)].count += 1
            pos.querySelector('.modal-val-indicator').textContent = cart.positions[Number(pos.id)].count
            menuCartUpd()
        })
        pos.querySelector('.delete-position').addEventListener('click', function(){
            cart.positions.splice(Number(pos.id), 1)
            modalCartUpd()
            menuCartUpd()
        })
    })
})
document.addEventListener('menuCartUpdated', function(){

    if (cart.positions.length < 1) {cart_button.disabled = true}
    else {cart_button.disabled = false}
})
export function menuCartUpd() {
    menu_cart.querySelector('tbody').innerHTML = ''
    cart.positions.forEach(position => {
        menu_cart.querySelector('tbody').insertAdjacentHTML("beforeend",
            `<td class="cart-td-1">${position.name}</td> <td class="cart-td-2">${position.count}</td> <td class="cart-td-3">${position.price}</td><td class="cart-td-4">X</td>`
        )
    })
    cartTotalPrice()

    document.dispatchEvent(new CustomEvent('menuCartUpdated'));
}
function cartTotalPrice() {
    cart.total_price = 0
    cart.positions.forEach(position => {
        cart.total_price += position.price * position.count
    })
    menu_cart.querySelector('#cart-total-price').textContent = `Итого: ${cart.total_price} руб.`
    modal_foot.querySelector('#modal-total-price').textContent = `Итого: ${cart.total_price} руб.`
}

modal_close.addEventListener('click', closeModal);
modal_overlay.addEventListener('click', function(e) {
    if (e.target === modal_overlay) {
        closeModal();
    }
});
cart_button.addEventListener('click', openModal)



//function totalPrice(cart, price) {
//    let old_price = Number(cart.children[2].children[0].textContent.trim().split(" ")[1])
//    return old_price + price
//}
//
//            let name = prod_desc.children[0].firstElementChild.textContent.trim()
//            let value = Number(val.textContent)
//            let price = Number(prod_desc.children[2].firstElementChild.textContent.split(" ")[1])
//            price *= value
//            if (value > 0) {
//                let order = document.createElement('tr');
//                order.innerHTML = `<td>${name}</td> <td>${value}</td> <td>${price}</td>`
//                cart.children[1].append(order)
//
//                cart.children[2].children[0].innerHTML = `<td colspan="3">Итого: ${totalPrice(cart, price)} руб.</td>`
//            }        