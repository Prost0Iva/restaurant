import {cart, menuCartUpd} from './cart.js'

document.addEventListener('productListFilled', function() {
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        const add_val = product.querySelector('.product_val_add');
        const val = product.querySelector('.product_val_indicator');
        const remove_val = product.querySelector('.product_val_remove');

        const add_to_cart = product.querySelector('.product_add_to_cart');  
        const prod_desc = product.querySelector('.product_description');

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
            if (Number(val.textContent) > 0) {
                let temp_name = prod_desc.children[0].firstElementChild.textContent.trim()
                let matched = false
                cart.positions.forEach(pos => {
                    let temp_components = JSON.stringify(pos.components)
                    if(pos.name == temp_name && temp_components == JSON.stringify({})) {
                        pos.count += Number(val.textContent)
                        matched = true
                    }
                })
                if(!matched){
                    cart.positions.push({
                        name: temp_name,
                        count: Number(val.textContent),
                        price: Number(prod_desc.children[2].firstElementChild.textContent.split(" ")[1]),
                        components: {}
                    })
                }
                menuCartUpd()
            }
        })
    })
})

