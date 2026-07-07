document.addEventListener('DOMContentLoaded', function() {
    pageFill();
});

async function pageFill() {
    const prod_list = document.getElementById('product_list')

    const response = await fetch('assets/data.json');
    const products = await response.json();

    products.menu.forEach(prod => {
        if (prod.category == "sandwiches") {
            let market_src = products.markets[prod.market].image

            prod_list.insertAdjacentHTML("afterbegin",
            `<div class = "product">
                    <img class="product_market" src="assets${market_src}" alt="">
                    <div class = "product_img">
                        <img src="assets${prod.image}" alt="">
                    </div>
                    <table class = "product_description">
                        <thead>
                            <th>${prod.name}</th>
                        </thead>
                        <tbody>
                            <td>${prod.description}</td>
                        </tbody>
                        <tfoot>
                            <tr><td>Цена: ${prod.price} руб.</td></tr>
                        </tfoot>
                    </table>
                    <div class = "product_value">
                        <p>КОЛИЧЕСТВО</p>
                        <div class="product_val_changer">
                            <button class = "product_val_remove">-</button>
                            <div class="product_val_indicator">0</div>
                            <button class = "product_val_add">+</button>
                        </div>
                    </div>
                    <button class = "product_add_to_cart">В КОРЗИНУ</button>
                </div>`
            )
        }
    });

    //prod_list.insertAdjacentHTML("afterbegin",
    //    `<div class = "product">
    //            <img class="product_market" src="assets/img/markets/subway_logo.png" alt="">
    //            <div class = "product_img">
    //                <img src="assets/img/sandwiches/ovoshnoy.png" alt="">
    //            </div>
    //            <table class = "product_description">
    //                <thead>
    //                    <th>Овощной</th>
    //                </thead>
    //                <tbody>
    //                    <td>Соус и овощи на выбор</td>
    //                </tbody>
    //                <tfoot>
    //                    <tr><td>Цена: 110 руб.</td></tr>
    //                </tfoot>
    //            </table>
    //            <div class = "product_value">
    //                <p>КОЛИЧЕСТВО</p>
    //                <div class="product_val_changer">
    //                    <button class = "product_val_remove">-</button>
    //                    <div class="product_val_indicator">0</div>
    //                    <button class = "product_val_add">+</button>
    //                </div>
    //            </div>
    //            <button class = "product_add_to_cart">В КОРЗИНУ</button>
    //        </div>`
    //)
    
    document.dispatchEvent(new CustomEvent('productListFilled'));
}