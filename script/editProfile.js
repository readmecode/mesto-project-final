/* открытие модального окно */
const editButton = document.querySelector('.profile__edit-button');
const modalProfilePopup = document.querySelector('.pop-up');
const editModalButtonClose = document.querySelector('.pop-up__button-close');
const buttonSave = document.querySelector('.form__button')
const body = document.querySelector('.body')
    /* нужнj напиcать для body */
function openPopup(popup) {
    popup.classList.add('pop-up_opened');
    body.classList.add('body_active')
}

function closePopup(popup) {
    popup.classList.remove('pop-up_opened');
    body.classList.remove('body_active')
}

editButton.addEventListener('click', () => {
    openPopup(modalProfilePopup)
})

editModalButtonClose.addEventListener('click', () => {
    closePopup(modalProfilePopup)
})


/* смена имени и описания */

const formElement = document.querySelector('.form')
const inputName = document.querySelector('.form__place');
const inputDescription = document.querySelector('.form_type_name'); /* inputs */

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description')

function formSubmitHandler(evt) {
    evt.preventDefault()

    profileName.innerText = inputName.value;
    profileDescription.innerText = inputDescription.value;

    modalProfilePopup.classList.remove('pop-up_opened')
}

formElement.addEventListener('submit', formSubmitHandler);