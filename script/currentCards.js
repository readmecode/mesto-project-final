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
const templateCards = document.querySelector('#elements').content;
const userElementSection = document.querySelector('.elements');
/* окно для иллюстраций */
const cardCurrentModalImage = document.querySelector('.image-popup')

initialCards.forEach((item) => {
    const card = createCard(item);
    userElementSection.prepend(card);
})

function createCard(data) {
    const cardElementWrapper = templateCards.cloneNode(true);
    const cardElement = cardElementWrapper.querySelector('.element');

    const cardTitle = cardElement.querySelector('.element__title');
    cardTitle.textContent = data.name;

    const cardImage = cardElement.querySelector('.element__illustration')
    cardImage.src = data.link
    cardImage.alt = data.link

    /* лайк карточек */
    const cardLikeButton = cardElement.querySelector('.element__icon');
    cardLikeButton.addEventListener('click', function(e) {
        e.target.classList.toggle('element__icon_active');
    })

    /* удаление карточек */
    const deleteButton = cardElement.querySelector('.element__delete-button');
    deleteButton.addEventListener('click', () => {
        const templateBlockElement = deleteButton.closest('.element');
        templateBlockElement.remove();
    })

    const deleteButtonCurrentImage = cardCurrentModalImage.querySelector('.image-popup__button-close'); /* кнопка удалить */
    const imageModalCurrent = cardCurrentModalImage.querySelector('.image-popup__illustration');
    const textModalCurrent = cardCurrentModalImage.querySelector('.image-popup__text');

    function openModalCurrentImage(popupCurrentImage) {
        popupCurrentImage.classList.add('image-popup_opened');
        imageModalCurrent.src = cardImage.src
        imageModalCurrent.alt = cardImage.alt
        textModalCurrent.textContent = cardTitle.textContent
        body.classList.add('body_active')
    }

    function closeModalCurrentImage(popupCurrentImage) {
        popupCurrentImage.classList.remove('image-popup_opened');
        body.classList.remove('body_active')
    }
    cardImage.addEventListener('click', () => {
        openModalCurrentImage(cardCurrentModalImage)
    })

    deleteButtonCurrentImage.addEventListener('click', () => {
        closeModalCurrentImage(cardCurrentModalImage)
    })
    return cardElement;
}