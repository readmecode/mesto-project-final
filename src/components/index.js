import '../style/index.css';
import {disableButton} from './validation.js'
import {profileName, profileAbout, editButton, addButton,
 popupProfile, formProfileEdit, popupCard, formCard, 
 formProfile, cardContainer, popupEditIcon, profileAvatarBtn, profileAvatar, formEditIcon, buttonElement, buttonElementEdit,  buttonElementCreate, editButtonText,
popupImage, imagePopup, titlePopup } from './utils.js'
import {openPopup, closePopup} from './modal.js'
import {createCard} from './card.js'
import {getUserInfo, getInitialCards, createCardLoad, deleteCardUser, addLike, deleteLike, userEditIcon, editProfileUser} from './api.js'

let myId

Promise.all([getUserInfo(), getInitialCards()])
.then(res => {
  myId = res[0]._id
  console.log(res[0]._id)
  profileName.textContent = res[0].name
  profileAbout.textContent = res[0].about
  profileAvatar.src = res[0].avatar
  res[1].forEach(data => {
    const card = createCard(data.name, data.link, data.likes, data.owner._id, data._id, handleDeleteCard, handleAddLike, handleDeleteLike, openCardPopup, myId)
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
  editButtonText(buttonElementCreate, 'создать', true)
  createCardLoad(nameImage, linkImage)
  .then(item => {
    const newCard = createCard(item.name, item.link, [], myId, item._id, handleDeleteCard, handleAddLike, handleDeleteLike, openCardPopup, myId);
    cardContainer.prepend(newCard)
  })
  .then(() => {
    formCard.reset()
    closePopup(popupCard)
  })
  .catch(err => {
    console.log(err)
  })
  .finally(() => {
    editButtonText(buttonElementCreate, 'создать', false)
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

addButton.addEventListener('click', evt => {
  openPopup(popupCard)
});

editButton.addEventListener('click', evt => {
  formProfile.name.value = profileName.textContent;
  formProfile.description.value = profileAbout.textContent;
  openPopup(popupProfile)
}); 


function popupEditIconForm (evt) { 
  evt.preventDefault() 
  editButtonText(buttonElement, 'сохранить', true)
  userEditIcon(formEditIcon.urlIcon.value)
  .then(() => {
    profileAvatar.src = formEditIcon.urlIcon.value 
    closePopup(popupEditIcon) 
    userEditIcon(formEditIcon.urlIcon) 
    formEditIcon.urlIcon.value = ''
    disableButton(buttonElement)
  })
  .catch(err => {
    console.log(err)
  })
  .finally(() => {
    editButtonText(buttonElement, 'сохранить', false)
  })
} 

function editProfileInfo(evt) {
  evt.preventDefault();
  editButtonText(buttonElementEdit, 'Сохранить', true)
  getUserInfo()
  .then(() => {
    profileName.textContent = formProfileEdit.name.value;
    profileAbout.textContent = formProfileEdit.description.value;
    closePopup(popupProfile)
  })
  .then(() => {
    editProfileUser({ 
      name: formProfileEdit.name.value, 
      about: formProfileEdit.description.value 
    }) 
  })
  .catch(err => {
    console.log(err)
  }) 
  .finally(() => {
    editButtonText(buttonElementEdit, 'Сохранить', false)
  })
} 

profileAvatarBtn.addEventListener('click', () => { 
  openPopup(popupEditIcon) 
}) 

function openCardPopup(element) {
  imagePopup.src = element.src;
  imagePopup.alt = element.alt;
  titlePopup.textContent = element.alt
  openPopup(popupImage)
} 


formEditIcon.addEventListener('submit', popupEditIconForm) 
formProfileEdit.addEventListener('submit', editProfileInfo)
formCard.addEventListener('submit', submitAddCardForm)

