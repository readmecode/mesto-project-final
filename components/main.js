import {showError, hideError, checkInputValidity, setEventListener, enableValidation} from './validation.js'

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
const popupProfile = document.querySelector('#editInfo');
const formProfileEdit = popupProfile.querySelector('.popup-form')
const popupCard = document.querySelector('#addCard');
const formCard = popupCard.querySelector('.popup-form')
const popupImage = document.querySelector('#imageModal');
const imagePopup = popupImage.querySelector('.popup__illustration');
const titlePopup = popupImage.querySelector('.popup__title');

/* form */
const formProfile = popupProfile.querySelector('.popup-form')




function openPopup(popup) {
    popup.classList.add('popup_opened')
    scroll.classList.add('body_active')
};

function closePopup(popup) {
    popup.classList.remove('popup_opened')
    scroll.classList.remove('body_active')
}


function cardAddProfile(evt) {
    evt.preventDefault()
    const linkImage = formCard.url.value;
    const nameImage = formCard.text.value
    const newCard = createCard(nameImage, linkImage);
    cardContainer.prepend(newCard)
    closePopup(popupCard)
    formCard.text.value = ''
    formCard.url.value = ''
}

document.addEventListener('keydown', closeEscBtn);
/* popupProfile.addEventListener('click', closeByClick);
popupProfile.addEventListener('click', closeByClick); */

function closeEscBtn (evt) {
    if(evt.key === 'Escape') {
        popups.forEach(popup => { 
            closePopup(popup)
        }); 
    }
} 
/* function closeByClick () {
    popups.forEach(popup => { 
        closePopup(popup)
    }); 
}  */

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
}

/* template */
const cardTemplate = document.querySelector('#card-element').content;
const cardContainer = document.querySelector('.elements')
    /* функция для темплэйта */
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

formProfileEdit.addEventListener('submit', editProfileInfo)
formCard.addEventListener('submit', cardAddProfile)