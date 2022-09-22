import '../style/index.css';
import {disableButton} from './validation.js'
import {profileName, profileAbout, editButton, addButton,
 popupProfile, formProfileEdit, popupCard, formCard, 
 formProfile, cardContainer, popupEditIcon, profileAvatarBtn, profileAvatar, formEditIcon, buttonElement, buttonElementEdit,  buttonElementCreate, editButtonText,
popupImage, imagePopup, titlePopup } from './utils.js'
import {openPopup, closePopup} from './modal.js'
import createCard from './card';
import Api from './api.js'
let myId

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14',
  headers: {
    authorization: '926c6a3f-a217-4e7a-afc3-b54f61f5ab3a',
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(res => {
  myId = res[0]._id
  profileName.textContent = res[0].name
  profileAbout.textContent = res[0].about
  profileAvatar.src = res[0].avatar
  res[1].forEach(data => {
    const createcard = new createCard(data.name, data.link, data.likes, data.owner._id, data._id, handleDeleteCard, handleAddLike, handleDeleteLike, openCardPopup, myId, '#card-element')
    const card = createcard._generateCards()
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
  api.createCardLoad(nameImage, linkImage)
  .then(item => {
    const createcard = new createCard(item.name, item.link, [], myId, item._id, handleDeleteCard, handleAddLike, handleDeleteLike, openCardPopup, myId, '#card-element');
    const card = createcard._generateCards()
    cardContainer.prepend(card)
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
  api.deleteCardUser(elemId)
  .then(res => {
    elementCard.remove()
  })
  .catch(err => {
    console.log(err)
  })
}

function handleAddLike(elemId, cardLikes, cardLike) {
  api.addLike(elemId)
  .then((res) => {
    cardLikes.textContent = res.likes.length
    cardLike.classList.add('element__icon_active')
  })
  .catch(err => {
    console.log(err)
  })
}

function handleDeleteLike(elemId, cardLikes, cardLike) {
  api.deleteLike(elemId)
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
  api.userEditIcon(formEditIcon.urlIcon.value)
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
  api.getUserInfo()
  .then(() => {
    profileName.textContent = formProfileEdit.name.value;
    profileAbout.textContent = formProfileEdit.description.value;
    closePopup(popupProfile)
  })
  .then(() => {
    api.editProfileUser({ 
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

