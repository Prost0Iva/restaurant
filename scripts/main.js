import { Menu } from './menu_.js'
import { Settings } from './settings.js'

const response = await fetch('assets/data.json');
export const data = await response.json();

let menu = new Menu()
let settings = new Settings()

menu.fillCategories()
settings.fillCategories()
const modal_overlay = document.getElementById('modal-overlay');
//modal_overlay.classList.add('active');