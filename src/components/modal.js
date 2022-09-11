import {scroll, profileName, profileAbout, editButton, addButton,
popups, popupOverlays, popupProfile, formProfileEdit, popupCard, formCard, formProfile, cardContainer} from './utils.js'
import {createCard} from './card.js'
import {editProfileUser} from './api.js'

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

addButton.addEventListener('click', evt => {
  openPopup(popupCard)
});

editButton.addEventListener('click', evt => {
  formProfile.name.value = profileName.textContent;
  formProfile.description.value = profileAbout.textContent;
  openPopup(popupProfile)
}); 

popups.forEach(popup => {
  popup.addEventListener('click', evt => {
      evt.target.classList.contains('popup__button-close') ? closePopup(popup) : false;
  }); 
});

function editProfileInfo(evt) {
  evt.preventDefault();
  profileName.textContent = formProfileEdit.name.value;
  profileAbout.textContent = formProfileEdit.description.value;
  closePopup(popupProfile)
  editProfileUser({ 
    name: formProfileEdit.name.value, 
    about: formProfileEdit.description.value 
  }) 
  .catch(err => {
    console.log(err)
  }) 
} 
export {openPopup, closePopup, closeEscBtn, closeByClick, editProfileInfo}