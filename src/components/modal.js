import {initialCards, scroll, profile, profileName, profileAbout, editButton, addButton,
  popups, popupOverlays, popupProfile, formProfileEdit, popupCard, formCard, formProfile,
  cardTemplate, cardContainer, popupImage, imagePopup, titlePopup, popupEditIcon, profileAvatar, formEditIcon, profileAvatarBtn
} from './utils.js'
import {openCardPopup, deleteCard, createCard} from './card.js'
import {checkResult, usersLoad, cardsLoad, editProfileUser, createCardLoad, deleteCardUser,  cardPutLike,  cardDeleteLike, userEditIcon} from './api.js'
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

function cardAddProfile(evt) {
  evt.preventDefault()
  const linkImage = formCard.url.value;
  const nameImage = formCard.text.value
  createCardLoad(nameImage, linkImage) 
  .then(item => {
    let liked = false
    item.likes.forEach(like => {
      if(like._id == userId) {
        liked = true
      }
    })
    const newCard = createCard(item.name, item.link, item._id, item.likes.length, liked, '', '')
    cardContainer.prepend(newCard)
  })
  

  closePopup(popupCard)
  formCard.text.value = ''
  formCard.url.value = ''
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
/* Редактирование профиля */
  editProfileUser({
    name: formProfileEdit.name.value,
    about: formProfileEdit.description.value
  })
} 


function popupEditIconForm (evt) {
  evt.preventDefault()
  profileAvatar.src = formEditIcon.urlIcon.value
  closePopup(popupEditIcon)
  userEditIcon(formEditIcon.urlIcon)
}

profileAvatarBtn.addEventListener('click', () => {
  openPopup(popupEditIcon)
})

export {openPopup, closePopup, cardAddProfile, closeEscBtn, closeByClick, editProfileInfo, popupEditIconForm}