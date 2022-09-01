import {initialCards, scroll, profile, profileName, profileAbout, editButton, addButton,
  popups, popupOverlays, popupProfile, formProfileEdit, popupCard, formCard, formProfile,
  cardTemplate, cardContainer, popupImage, imagePopup, titlePopup
} from './utils.js'
import {openCardPopup, deleteCard, createCard} from './card.js'
function openPopup(popup) {
  popup.classList.add('popup_opened')
  scroll.classList.add('body_active')
};

function closePopup(popup) {
  popup.classList.remove('popup_opened')
  scroll.classList.remove('body_active')
}

function cardAddProfile(evt) {
  evt.preventDefault()
  const linkImage = formCard.url.value;
  const nameImage = formCard.text.value
  const newCard = createCard(nameImage, linkImage);
  cardContainer.prepend(newCard)
  closePopup(popupCard)
  formCard.text.value = ''
  formCard.url.value = ''
} 

popupOverlays.forEach(overlay => {
  overlay.addEventListener('click', closeByClick); 
})

function closeEscBtn(evt) {
  if(evt.key === 'Escape') {
      popups.forEach(popup => { 
          closePopup(popup) 
      }); 
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
} 
export {openPopup, closePopup, cardAddProfile, closeEscBtn, closeByClick, editProfileInfo}