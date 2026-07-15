document.addEventListener('DOMContentLoaded', function() {
    pageFill("sandwiches");
});

export async function pageFill(page) {
    const prod_list = document.getElementById('product-list')
    prod_list.innerHTML = '';

    const response = await fetch('assets/data.json');
    const products = await response.json();

    let options = ""
    if (page == "sandwiches") {
        options = "custom-hyper-text"
    }

    products.menu.forEach(prod => {
        if (prod.category == page) {
            let market_src = ""
            if (products.markets[prod.market] !== undefined) {
                market_src = products.markets[prod.market].image
            }

            prod_list.insertAdjacentHTML("beforeend",
            `<div class = "product">
                <img class="product-market" src="assets${market_src}" alt="">
                <div class = "product-img-frame">
                    <img class = "product-img" src="assets${prod.image}" alt="">
                </div>
                <table class = "product-description">
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
                <div class = "product-value">
                    <p>КОЛИЧЕСТВО</p>
                    <div class="product-val-changer">
                        <button class = "product-val-remove">-</button>
                        <div class="product-val-indicator">1</div>
                        <button class = "product-val-add">+</button>
                    </div>
                </div>
                <button class = "product-add-to-cart">В КОРЗИНУ</button>
            </div>`
            )
        }
    });
    
    document.dispatchEvent(new CustomEvent('productListFilled'));
}