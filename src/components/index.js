import '../style/index.css'; // добавьте импорт главного файла стилей
import {showError, hideError, checkInputValidity, setEventListener, enableValidation} from './validation.js'
import {initialCards, scroll, profile, profileName, profileAbout, editButton, addButton,
popups, popupOverlays, popupProfile, formProfileEdit, popupCard, formCard, formProfile,
cardTemplate, cardContainer, popupImage, imagePopup, titlePopup} from './utils.js'
import {openPopup, closePopup, cardAddProfile, closeEscBtn, closeByClick, editProfileInfo} from './modal.js'
import { createCard} from './card.js'
import {getUserInfo, getInitialCards, createCardLoad, deleteCardUser, addLike, deleteLike} from './api.js'


export let myId

Promise.all([getUserInfo(), getInitialCards()])
.then(res => {
  myId = res[0]._id
  console.log(res[0]._id)
  profileName.textContent = res[0].name
  profileAbout.textContent = res[0].about
  res[1].forEach(data => {
    const card = createCard(data.name, data.link, data.likes, data.owner._id, data._id, handleDeleteCard, handleAddLike, handleDeleteLike)
    cardContainer.append(card)
  })
})
.catch(err => {
  console.log(err)
})

function submitAddCardForm(evt) {
  evt.preventDefault()
  const linkImage = formCard.url.value;
  const nameImage = formCard.text.value
  createCardLoad(nameImage, linkImage)
  .then(item => {
    const newCard = createCard(item.name, item.link, [], myId, item._id, handleDeleteCard, handleAddLike, handleDeleteLike);
    cardContainer.prepend(newCard)
  })
  .then(() => {
    formCard.text.value = ''
    formCard.url.value = ''
    closePopup(popupCard)
  })
  .catch(err => {
    console.log(err)
  })
} 

function handleDeleteCard(elemId, elementCard) {
  deleteCardUser(elemId)
  .then(res => {
    elementCard.remove()
  })
  .catch(err => {
    console.log(err)
  })
}

function handleAddLike(elemId, cardLikes, cardLike) {
  addLike(elemId)
  .then((res) => {
    cardLikes.textContent = res.likes.length
    cardLike.classList.add('element__icon_active')
  })
  .catch(err => {
    console.log(err)
  })
}

function handleDeleteLike(elemId, cardLikes, cardLike) {
  deleteLike(elemId)
  .then((res) => {
    cardLikes.textContent = res.likes.length
    cardLike.classList.remove('element__icon_active')
  })
  .catch(err => {
    console.log(err)
  })
}

formProfileEdit.addEventListener('submit', editProfileInfo)
formCard.addEventListener('submit', submitAddCardForm)

