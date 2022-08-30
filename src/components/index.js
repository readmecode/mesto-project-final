import '../style/index.css'; // добавьте импорт главного файла стилей
import {scroll, profile, profileName, profileAbout,
    editButton, addButton, popups, popupOverlay, popupProfile, 
    formProfileEdit, popupCard, formCard, popupImage, imagePopup, titlePopup, formProfile, cardTemplate, cardContainer, initialCards} from './utils.js' 
import {showError, hideError, checkInputValidity, setEventListener, enableValidation} from './validation.js'

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
} /* ----- */


document.addEventListener('keydown', closeEscBtn);


popupOverlay.forEach(overlay => {
    overlay.addEventListener('click', closeByClick); 
}) /* ----- */



function closeEscBtn (evt) {
    if(evt.key === 'Escape') {
        popups.forEach(popup => { 
            closePopup(popup) /* ----- */
        }); 
    }
} 

function closeByClick () {
    popups.forEach(popup => { 
        closePopup(popup)
    });  /* ----- */
}


addButton.addEventListener('click', evt => {
    openPopup(popupCard)
});

editButton.addEventListener('click', evt => {
    formProfile.name.value = profileName.textContent;
    formProfile.description.value = profileAbout.textContent;
    openPopup(popupProfile)
}); /* ----- */

popups.forEach(popup => {
    popup.addEventListener('click', evt => {
        evt.target.classList.contains('popup__button-close') ? closePopup(popup) : false;
    }); /* ----- */
});

function editProfileInfo(evt) {
    evt.preventDefault();
    profileName.textContent = formProfileEdit.name.value;
    profileAbout.textContent = formProfileEdit.description.value;
} /* ----- */

/* template */

    /* функция для темплэйта */
function openCardPopup(element) {
    imagePopup.src = element.src;
    imagePopup.alt = element.alt;
    titlePopup.textContent = element.alt
    openPopup(popupImage)
} /* ----- */

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