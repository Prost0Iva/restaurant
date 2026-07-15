import { Menu } from './menu_.js'
import { Settings } from './settings.js'

const response = await fetch('assets/data.json');
export const data = await response.json();

const menu = new Menu()
export const settings = new Settings()

const modal_close = document.getElementById('modal-close');
const modal_overlay = document.getElementById('modal-overlay');
modal_close.addEventListener('click', ()=>{settings.close()});
modal_overlay.addEventListener('click', function(e) {
    if (e.target === modal_overlay) {
        settings.close()
    }
});

menu.fillCategories()
settings.fillCategories()