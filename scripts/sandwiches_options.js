const navig = document.querySelectorAll('.modal_navig_button');

const response = await fetch('assets/data.json');
const data = await response.json();

export let components = {
    size: "1x",
    bread: "white-italian",
    vegetable: [],
    sauce: [],
    filling: []
}

export function fillOptions(page){
    const options = document.querySelectorAll('.modal_option')
    console.log(components)
    options.forEach(option => {
        //Object.entries(components).forEach(([k, v]) => {
            if(data.settings[page].multiple == true){
                if(components[page].includes(option.id)){
                    option.classList.add("modal_option_active")
                }
            } else {
                if(option.id == components[page]){option.classList.add("modal_option_active")}
            }
            //console.log(k)
            //if (option.id == v) {
            //    option.classList.add("modal_option_active")
            //}
        //})
    })
}

document.addEventListener('optionsClosed', function(){
    components = {
        size: "1x",
        bread: "white-italian",
        vegetable: [],
        sauce: [],
        filling: []
    }
})
document.addEventListener('optionsListFilled', function() {
    const options = document.querySelectorAll('.modal_option')
    options.forEach(option => {
        option.addEventListener('click', async function(){
            let page = ""
            navig.forEach(v => {
                if(v.disabled){page = v.id.slice(6, -1)}
            })

            if(data.settings[page].multiple == true){
                if (option.classList.contains("modal_option_active")) {
                    option.classList.remove("modal_option_active")
                    components[page].splice(components[page].indexOf(option.id), 1)
                }
                else {
                    option.classList.add("modal_option_active")
                    components[page].push(option.id)
                }
            } else {
                options.forEach(v => {v.classList.remove("modal_option_active")})
                option.classList.add("modal_option_active")
                components[page] = option.id
            }
        })
    });
})
