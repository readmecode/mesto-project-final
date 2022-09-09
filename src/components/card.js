import {initialCards, scroll, profile, profileName, profileAbout, editButton, addButton,
  popups, popupOverlays, popupProfile, formProfileEdit, popupCard, formCard, formProfile,
  cardTemplate, cardContainer, popupImage, imagePopup, titlePopup, popupEditIcon, profileAvatar, formEditIcon, profileAvatarBtn
} from './utils.js'
import {openPopup, closePopup, cardAddProfile, closeEscBtn, closeByClick, editProfileInfo} from './modal.js'
import {checkResult, usersLoad, cardsLoad, editProfileUser, createCardLoad, deleteCardUser,  cardPutLike,  cardDeleteLike, userEditIcon} from './api.js'
function openCardPopup(element) {
  imagePopup.src = element.src;
  imagePopup.alt = element.alt;
  titlePopup.textContent = element.alt
  openPopup(popupImage)
} 

function deleteCard(cardElement) {
  cardElement.remove()
}

function createCard(name, link, elementId, likeCount, liked, ownerId, userId) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__illustration');
  const deleteBtn = cardElement.querySelector('.element__delete-button');
  const cardLike = cardElement.querySelector('.element__icon')
  const cardLikeCount = cardElement.querySelector('.element__like-count')

  cardLikeCount.textContent = likeCount
  cardImage.src = link;
  cardImage.alt = name
  cardElement.querySelector('.element__title').textContent = name
  cardImage.addEventListener('click', evt => {
      openCardPopup(cardImage);
  })

    if(liked) {
      cardLike.classList.add('element__icon_active')
    } 

    if(ownerId !== userId) {
      deleteBtn.remove()
    }
  cardLike.addEventListener('click', evt => {
    if(cardLike.classList.contains('element__icon_active')) {
      cardDeleteLike(elementId)
      .then(res => { 
        likeCount --
        cardLikeCount.textContent = likeCount
      })
      .then(cardLike.classList.remove('element__icon_active'))
    }
    else {
      cardPutLike(elementId)
      .then(res => { 
        likeCount ++
        cardLikeCount.textContent = likeCount
      })
      .then(cardLike.classList.add('element__icon_active'))
    }
  })

  deleteBtn.addEventListener('click', evt => {
    deleteCardUser(elementId)
    deleteCard(cardElement)
  });
  return cardElement
}



export {openCardPopup, deleteCard, createCard}
