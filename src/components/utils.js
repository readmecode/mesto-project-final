const initialCards = [{
  name: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
},
{
  name: 'Челябинская область',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
},
{
  name: 'Иваново',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
},
{
  name: 'Камчатка',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
},
{
  name: 'Холмогорский район',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
},
{
  name: 'Байкал',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}
];


const scroll = document.querySelector('.body')

/* профили  */
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__description')
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

/* profile */
const popups = document.querySelectorAll('.popup');
const popupOverlay = document.querySelectorAll('.popup__overlay')
const popupProfile = document.querySelector('#editInfo');
const formProfileEdit = popupProfile.querySelector('.popup-form')
const popupCard = document.querySelector('#addCard');
const formCard = popupCard.querySelector('.popup-form')
const popupImage = document.querySelector('#imageModal');
const imagePopup = popupImage.querySelector('.popup__illustration');
const titlePopup = popupImage.querySelector('.popup__title');
/* form */
const formProfile = popupProfile.querySelector('.popup-form')
/* template variables */
const cardTemplate = document.querySelector('#card-element').content;
const cardContainer = document.querySelector('.elements')

export {scroll, profile, profileName, profileAbout,
   editButton, addButton, popups, popupOverlay, popupProfile, 
   formProfileEdit, popupCard, formCard, popupImage, imagePopup, titlePopup, formProfile, cardTemplate, cardContainer, initialCards}