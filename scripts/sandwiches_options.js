const navig = document.querySelectorAll('.modal_navig_button');

document.addEventListener('optionsListFilled', function() {
    const options = document.querySelectorAll('.modal_option')
    options.forEach(option => {
        option.addEventListener('click', async function(){
            const response = await fetch('assets/data.json');
            const data = await response.json();
            let page = ""
            navig.forEach(v => {
                if(v.disabled){page = v.id.slice(6, -1)}
            })

            if(data.settings[page].multiple == true){
                if (option.style.backgroundColor == "rgb(246, 216, 70)") {option.style.backgroundColor = ""}
                else option.style.backgroundColor = "#f6d846"
            } else {
                options.forEach(v => {v.style.backgroundColor = ""})
                option.style.backgroundColor = "#f6d846"
            }
        })
    });
})
