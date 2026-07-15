export function createValChanger(){
    const value = document.createElement('div')
    value.classList.add('value')
    const valTitle = document.createElement('p')
    valTitle.textContent = 'КОЛИЧЕСТВО'
    value.appendChild(valTitle)
    const valChanger = document.createElement('div')
    valChanger.classList.add('val-changer')
    value.appendChild(valChanger)
    const valRemove = document.createElement('button')
    valRemove.classList.add('val-remove')
    valRemove.textContent = '-'
    valRemove.addEventListener('click', ()=>{buttonValRemove(valIndicator)})
    valChanger.appendChild(valRemove)
    const valIndicator = document.createElement('div')
    valIndicator.classList.add('val-indicator')
    valIndicator.textContent = '1'
    valChanger.appendChild(valIndicator)
    const valAdd = document.createElement('button')
    valAdd.classList.add('val-add')
    valAdd.textContent = '+'
    valAdd.addEventListener('click', ()=>{buttonValAdd(valIndicator)})
    valChanger.appendChild(valAdd)

    return value
}

function buttonValRemove(indicator){
    let v = Number(indicator.textContent)
    if(v > 0){v--}
    indicator.textContent = v
}
function buttonValAdd(indicator){
    let v = Number(indicator.textContent)
    v++
    indicator.textContent = v
}