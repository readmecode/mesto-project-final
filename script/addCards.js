/* открытие модального окна */
const addButtonModal = document.querySelector('.profile__add-button');
const openModalAddCard = document.querySelector('.popup');
const closeButtonModal = document.querySelector('.popup__button-close');


function openPopupAdd(popupAdd) {
    popupAdd.classList.add('popup_opened');
    body.classList.add('body_active')
}

function closePopupAdd(popupAdd) {
    popupAdd.classList.remove('popup_opened');
    body.classList.remove('body_active')
}

addButtonModal.addEventListener('click', () => {
    openPopupAdd(openModalAddCard);
})
closeButtonModal.addEventListener('click', () => {
    closePopupAdd(openModalAddCard);
})


/* переменная для модального окна */
const imagePopup = document.querySelector('.image-popup');
/* дополнение темплаэйн */

const inputNameCardAdd = openModalAddCard.querySelector('.form-add__place'); /* input */
const inputIllustrationAddCard = openModalAddCard.querySelector('.form-add_type_name'); /* input */
const addCardButton = openModalAddCard.querySelector('.form-add__button'); /* кнопка добавить */

const formAddCard = openModalAddCard.querySelector('.form') /* form */

/* темплэйт */



function formSubmitAddCard(evt) {
    evt.preventDefault()
    const templateAddCard = document.querySelector('#elements').content;
    const elementsSection = document.querySelector('.elements');
    const userElementTemplate = templateAddCard.querySelector('.element').cloneNode(true);

    const addCardTitle = userElementTemplate.querySelector('.element__title');
    addCardTitle.textContent = inputNameCardAdd.value /* input */

    const addCardIllustration = userElementTemplate.querySelector('.element__illustration')
    addCardIllustration.src = inputIllustrationAddCard.value /* input */

    elementsSection.prepend(userElementTemplate)
    openModalAddCard.classList.remove('popup_opened');
    body.classList.remove('body_active')

    /* лайк */
    const likeButtonAddCard = document.querySelector('.element__icon')
    likeButtonAddCard.addEventListener('click', (e) => {
        e.target.classList.toggle('element__icon_active')
    })

    /* удаление */
    const deleteAddCardButton = document.querySelector('.element__delete-button');
    deleteAddCardButton.addEventListener('click', () => {
        const templateBlock = deleteAddCardButton.closest('.element');
        templateBlock.remove()
    })

    /* открытие картинки и закрытие */
    const imagePopupIllustration = imagePopup.querySelector('.image-popup__illustration');
    const imagePopupText = imagePopup.querySelector('.image-popup__text');
    const imageButtonClose = imagePopup.querySelector('.image-popup__button-close')

    function openImagePopup(popupImage) {
        popupImage.classList.add('image-popup_opened');
        imagePopupIllustration.src = addCardIllustration.src
        imagePopupIllustration.alt = addCardIllustration.alt
        imagePopupText.textContent = addCardTitle.textContent
        body.classList.add('body_active')
    }

    function closeImagePopup(popupImage) {
        popupImage.classList.remove('image-popup_opened')
        body.classList.remove('body_active')
    }
    addCardIllustration.addEventListener('click', () => {
        openImagePopup(imagePopup)
    })
    imageButtonClose.addEventListener('click', () => {
        closeImagePopup(imagePopup)
    })
}

formAddCard.addEventListener('submit', formSubmitAddCard)