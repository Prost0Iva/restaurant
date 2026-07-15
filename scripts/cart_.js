class Cart {
    constructor(){
        this.positions = []
    }
    
    addToCart(name, val, price, components){
        this.positions.forEach(pos => {
            if(JSON.stringify(pos.components) == JSON.stringify(components)){
                pos.val += val
                return
            }
        })
        this.positions.push({
            name: name,
            val: val,
            price: price,
            components: components
        })
    }
}