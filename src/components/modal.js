/* import {scroll, popups, popupOverlays} from './utils.js'

function openPopup(popup) {
  popup.classList.add('popup_opened')
  scroll.classList.add('body_active')
  document.addEventListener('keydown', closeEscBtn);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened')
  scroll.classList.remove('body_active')
  document.removeEventListener('keydown', closeEscBtn);
}


popupOverlays.forEach(overlay => {
  overlay.addEventListener('click', closeByClick); 
})

function closeEscBtn(evt) {
  if(evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
} 

function closeByClick () {
  popups.forEach(popup => { 
      closePopup(popup)
  });  
}

popups.forEach(popup => {
  popup.addEventListener('click', evt => {
      evt.target.classList.contains('popup__button-close') ? closePopup(popup) : false;
  }); 
});

export {openPopup, closePopup, closeEscBtn, closeByClick} */
