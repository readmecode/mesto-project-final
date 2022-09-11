import {cardTemplate, popupImage, imagePopup, titlePopup
} from './utils.js'
import {openPopup} from './modal.js'
import { myId } from './index.js';

function openCardPopup(element) {
  imagePopup.src = element.src;
  imagePopup.alt = element.alt;
  titlePopup.textContent = element.alt
  openPopup(popupImage)
} 

function createCard(name, link, likes, ownerId, elemId, handleDeleteCard, handleAddLike, handleDeleteLike) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__illustration');
  const deleteCard = cardElement.querySelector('.element__delete-button')
  const cardLike = cardElement.querySelector('.element__icon');
  const cardLikes = cardElement.querySelector('.element__likes')
  cardLikes.textContent = likes.length

  cardImage.src = link;
  cardImage.alt = name

  cardElement.querySelector('.element__title').textContent = name
  cardImage.addEventListener('click', evt => {
      openCardPopup(cardImage);
  })

  if(likes) {
    const myLike = likes.some(like => {
      return like._id === myId
    })
    if(myLike) {
      cardLike.classList.add('element__icon_active')
    }
  }
  
  cardLike.addEventListener('click', evt => {
    if(cardLike.classList.contains('element__icon_active')) {
      handleDeleteLike(elemId, cardLikes, cardLike)
    }
    else {
      handleAddLike(elemId, cardLikes, cardLike)
    }
  })

  if(myId !== ownerId) {
    deleteCard.classList.add('element__delete-button_disabled')
  }
  else {
  deleteCard.addEventListener('click', evt => {
    handleDeleteCard(elemId, cardElement)
  })
}
  return cardElement
}



export {openCardPopup,  createCard}
