const modalOverlay = document.getElementById('modal_overlay');
const modalClose = document.getElementById('modal_close');

function openModal() {
    modalOverlay.classList.add('active');
}

function closeModal() {
    modalOverlay.classList.remove('active');
}

modalClose.addEventListener('click', closeModal);
openModal()