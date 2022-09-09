import '../style/index.css';
import {showError, hideError, checkInputValidity, setEventListener, enableValidation} from './validation.js'
import {initialCards, scroll, profile, profileName, profileAbout, editButton, addButton,
  popups, popupOverlays, popupProfile, formProfileEdit, popupCard, formCard, formProfile,
  cardTemplate, cardContainer, popupImage, imagePopup, titlePopup, popupEditIcon, profileAvatar, formEditIcon, profileAvatarBtn
} from './utils.js'
import {openPopup, closePopup, cardAddProfile, closeEscBtn, closeByClick, editProfileInfo, popupEditIconForm} from './modal.js'
import {openCardPopup, deleteCard, createCard} from './card.js'
import {checkResult, usersLoad, cardsLoad, editProfileUser, createCardLoad, deleteCardUser,  cardPutLike,  cardDeleteLike, userEditIcon} from './api.js'

/* Загрузка информации о пользователе с сервера */
let userId = null

usersLoad()
.then(data => {
  profileName.textContent = data.name,
  profileAbout.textContent = data.about
  profileAvatar.src = data.avatar
  userId = data._id
})

/* Загрузка карточек с сервера */
cardsLoad()
.then(data => {
  data.forEach(item => {
    let liked = false
    item.likes.forEach(like => {
      if(like._id == userId) {
        liked = true
      }
    })
    const card = createCard(item.name, item.link, item._id, item.likes.length, liked, item.owner._id, userId)
    cardContainer.prepend(card)
  }) 
})

formProfileEdit.addEventListener('submit', editProfileInfo)
formCard.addEventListener('submit', cardAddProfile)
formEditIcon.addEventListener('submit', popupEditIconForm)