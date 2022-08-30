import '../style/index.css'; // добавьте импорт главного файла стилей
import {showError, hideError, checkInputValidity, setEventListener, enableValidation} from './validation.js'
import {initialCards, scroll, profile, profileName, profileAbout, editButton, addButton,
popups, popupOverlay, popupProfile, formProfileEdit, popupCard, formCard, formProfile,
cardTemplate, cardContainer, popupImage, imagePopup, titlePopup} from './utils.js'
import {openPopup, closePopup, cardAddProfile, closeEscBtn, closeByClick, editProfileInfo} from './modal.js'
import {openCardPopup, deleteCard, createCard} from './card.js'




document.addEventListener('keydown', closeEscBtn);
formProfileEdit.addEventListener('submit', editProfileInfo)
formCard.addEventListener('submit', cardAddProfile)