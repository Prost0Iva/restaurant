export function createValChanger(indicatorVal: number) {
    const iVal = indicatorVal || 1;

    const value = document.createElement('div');
    value.classList.add('value');
    const valTitle = document.createElement('p');
    valTitle.textContent = 'КОЛИЧЕСТВО';
    value.appendChild(valTitle);
    const valChanger = document.createElement('div');
    valChanger.classList.add('val-changer');
    value.appendChild(valChanger);
    const valRemove = document.createElement('button');
    valRemove.classList.add('val-remove');
    valRemove.textContent = '-';
    valRemove.addEventListener('click', () => {
        buttonValRemove(valIndicator);
    });
    valChanger.appendChild(valRemove);
    const valIndicator = document.createElement('div');
    valIndicator.classList.add('val-indicator');
    valIndicator.textContent = iVal.toString();
    valChanger.appendChild(valIndicator);
    const valAdd = document.createElement('button');
    valAdd.classList.add('val-add');
    valAdd.textContent = '+';
    valAdd.addEventListener('click', () => {
        buttonValAdd(valIndicator);
    });
    valChanger.appendChild(valAdd);

    return value;
}

function buttonValRemove(indicator: HTMLElement) {
    let v = Number(indicator.textContent);
    if (v > 1) {
        v--;
    }
    indicator.textContent = v.toString();
}
function buttonValAdd(indicator: HTMLElement) {
    let v = Number(indicator.textContent);
    v++;
    indicator.textContent = v.toString();
}
