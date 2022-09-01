import {initialCards, scroll, profile, profileName, profileAbout, editButton, addButton,
  popups, popupOverlays, popupProfile, formProfileEdit, popupCard, formCard, formProfile,
  cardTemplate, cardContainer, popupImage, imagePopup, titlePopup
} from './utils.js'
import {openPopup, closePopup, cardAddProfile, closeEscBtn, closeByClick, editProfileInfo} from './modal.js'

function openCardPopup(element) {
  imagePopup.src = element.src;
  imagePopup.alt = element.alt;
  titlePopup.textContent = element.alt
  openPopup(popupImage)
} 

function deleteCard(cardElement) {
  cardElement.remove()
}

function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__illustration')
  cardImage.src = link;
  cardImage.alt = name
  cardElement.querySelector('.element__title').textContent = name
  cardImage.addEventListener('click', evt => {
      openCardPopup(cardImage);
  })
  cardElement.querySelector('.element__icon').addEventListener('click', evt => {
      evt.target.classList.toggle('element__icon_active')
  })

  cardElement.querySelector('.element__delete-button').addEventListener('click', evt => {
      deleteCard(cardElement)
  });
  return cardElement
}

initialCards.forEach(card => {
  const newCard = createCard(card.name, card.link)
  cardContainer.prepend(newCard)
})

export {openCardPopup, deleteCard, createCard}
