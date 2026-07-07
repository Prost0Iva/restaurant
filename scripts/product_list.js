document.addEventListener('DOMContentLoaded', function() {
    pageFill("sandwiches");
});

export async function pageFill(page) {
    const prod_list = document.getElementById('product_list')

    const response = await fetch('assets/data.json');
    const products = await response.json();

    let options = ""
    if (page == "sandwiches") {
        options = "custom_hyper_text"
    }

    products.menu.forEach(prod => {
        if (prod.category == page) {
            let market_src = ""
            if (products.markets[prod.market] !== undefined) {
                market_src = products.markets[prod.market].image
            }

            prod_list.insertAdjacentHTML("beforeend",
            `<div class = "product">
                <img class="product_market" src="assets${market_src}" alt="">
                <div class = "product_img_frame">
                    <img class = "product_img" src="assets${prod.image}" alt="">
                </div>
                <table class = "product_description">
                    <thead>
                        <th>${prod.name}</th>
                    </thead>
                    <tbody>
                        <td class=${options}>${prod.description}</td>
                    </tbody>
                    <tfoot>
                        <tr><td>Цена: ${prod.price} руб.</td></tr>
                    </tfoot>
                </table>
                <div class = "product_value">
                    <p>КОЛИЧЕСТВО</p>
                    <div class="product_val_changer">
                        <button class = "product_val_remove">-</button>
                        <div class="product_val_indicator">1</div>
                        <button class = "product_val_add">+</button>
                    </div>
                </div>
                <button class = "product_add_to_cart">В КОРЗИНУ</button>
            </div>`
            )
        }
    });
    
    document.dispatchEvent(new CustomEvent('productListFilled'));
}