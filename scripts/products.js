
document.addEventListener('productListFilled', function() {

    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        const add_val = product.querySelector('.product_val_add');
        const val = product.querySelector('.product_val_indicator');
        const remove_val = product.querySelector('.product_val_remove');

        const add_to_cart = product.querySelector('.product_add_to_cart');  
        const prod_desc = product.querySelector('.product_description');  
        const cart = document.getElementById('cart_content')

        add_val.addEventListener('click', function() {
            let temp_val = Number(val.textContent)
            temp_val += 1
            val.textContent = temp_val
        })
        remove_val.addEventListener('click', function() {
            let temp_val = Number(val.textContent)
            if (temp_val > 0) {
                temp_val -= 1
            }
            val.textContent = temp_val
        })
        add_to_cart.addEventListener('click', function() {
            let name = prod_desc.children[0].firstElementChild.textContent.trim()
            let value = Number(val.textContent)
            let price = Number(prod_desc.children[2].firstElementChild.textContent.split(" ")[1])
            price *= value
            if (value > 0) {
                let order = document.createElement('tr');
                order.innerHTML = `<td>${name}</td> <td>${value}</td> <td>${price}</td>`
                cart.children[1].append(order)

                cart.children[2].children[0].innerHTML = `<td colspan="3">Итого: ${totalPrice(cart, price)} руб.</td>`
                //console.log(totalPrice(cart, price))
            }
        })
    })
})

function totalPrice(cart, price) {
    let old_price = Number(cart.children[2].children[0].textContent.trim().split(" ")[1])
    return old_price + price
}