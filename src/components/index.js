import '../style/index.css'; // добавьте импорт главного файла стилей
import {showError, hideError, checkInputValidity, setEventListener, enableValidation} from './validation.js'
import {initialCards, scroll, profile, profileName, profileAbout, editButton, addButton,
popups, popupOverlays, popupProfile, formProfileEdit, popupCard, formCard, formProfile,
cardTemplate, cardContainer, popupImage, imagePopup, titlePopup} from './utils.js'
import {openPopup, closePopup, cardAddProfile, closeEscBtn, closeByClick, editProfileInfo} from './modal.js'
import {openCardPopup, deleteCard, createCard} from './card.js'

import {editUserProfile, userServe, getInitialCards} from './api.js'

/* userServe() */
userServe()
.then(data => {
  profileName.textContent = data.name
  profileAbout.textContent = data.about
})

getInitialCards() 
.then(data => {
  data.forEach (item => {
    const card =  createCard(
    item.name,
    item.link 
  )
  cardContainer.prepend(card)
  })
})

/* addCardServer()
.then(item => {
  cardImage.src = cardLink, 
  cardText.textContent = cardName
  console.log(item)
}) */
formProfileEdit.addEventListener('submit', editProfileInfo)
formCard.addEventListener('submit', cardAddProfile)

 