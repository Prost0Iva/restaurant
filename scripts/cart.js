const modal_overlay = document.getElementById('modal_cart_overlay');
const modal_close = document.getElementById('modal_cart_close');
const modal_foot = document.getElementById('modal_cart_foot');
const cart_button = document.getElementById('cart_button')
const modal_cart = document.getElementById('modal_cart');
const menu_cart = document.getElementById('cart_content')
const response = await fetch('assets/data.json');
const data = await response.json();

export let cart = {
    positions: [],
    total_price: 0
}

function openModal() {
    modalCartUpd()
    modal_overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeModal() {
    modal_overlay.classList.remove('active');
    document.body.style.overflow = '';
}
function modalCartUpd() {
    modal_cart.innerHTML = ''
    let i = 0
    cart.positions.forEach(position => {
        data.menu.forEach(prod => {
            if(prod.name == position.name) {
                modal_cart.insertAdjacentHTML("beforeend",
                    `<div class="position" id="${i}">
                        <div class = "option_img_frame">
                            <img class = "option_img" src="assets${prod.image}" alt="">
                        </div>
                        <div class="position_right">
                            <button class="delete_position">X</button>
                            <table class = "position_description">
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
                            <div class="modal_val_changer">
                                <button class="modal_val_remove">-</button>
                                <div class="modal_val_indicator">${position.count}</div>
                                <button class="modal_val_add">+</button>
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
        pos.querySelector('.modal_val_remove').addEventListener('click', function(){
            if(Number(pos.querySelector('.modal_val_indicator').textContent) > 1) {
                cart.positions[Number(pos.id)].count -= 1
                pos.querySelector('.modal_val_indicator').textContent = cart.positions[Number(pos.id)].count
                menuCartUpd()
            }
        })
        pos.querySelector('.modal_val_add').addEventListener('click', function(){
            cart.positions[Number(pos.id)].count += 1
            pos.querySelector('.modal_val_indicator').textContent = cart.positions[Number(pos.id)].count
            menuCartUpd()
        })
        pos.querySelector('.delete_position').addEventListener('click', function(){
            cart.positions.splice(Number(pos.id), 1)
            modalCartUpd()
            menuCartUpd()
        })
    })
})
export function menuCartUpd() {
    menu_cart.querySelector('tbody').innerHTML = ''
    cart.positions.forEach(position => {
        menu_cart.querySelector('tbody').insertAdjacentHTML("beforeend",
            `<td>${position.name}</td> <td>${position.count}</td> <td>${position.price}</td>`
        )
    })
    cartTotalPrice()
}
function cartTotalPrice() {
    cart.total_price = 0
    cart.positions.forEach(position => {
        cart.total_price += position.price * position.count
    })
    menu_cart.querySelector('tfoot tr td').textContent = `Итого: ${cart.total_price} руб.`
    modal_foot.querySelector('#modal_total_price').textContent = `Итого: ${cart.total_price} руб.`
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