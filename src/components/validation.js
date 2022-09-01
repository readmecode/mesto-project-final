const showError = (formElement, input, errorMessage, setting) => {
  const errorElement = formElement.querySelector(`.${input.id}-error`);
  input.classList.add(setting.inputErrorClass);
  errorElement.classList.add(setting.errorClass);
  errorElement.textContent = errorMessage
}

const hideError = (formElement, input, setting) => {
  const errorElement = formElement.querySelector(`.${input.id}-error`);
  input.classList.remove(setting.inputErrorClass);
  errorElement.classList.remove(setting.errorClass);
  errorElement.textContent = '';
}


const checkInputValidity = (formElement, input, setting) => {
  if(input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage)
  }
  else {
    input.setCustomValidity("")
  }

  if(!input.validity.valid) {
    showError(formElement, input, input.validationMessage, setting)
  }
  else {
    hideError(formElement, input, setting)
  }
}


const setEventListener = (formElement, setting) => {
  const inputList = Array.from(formElement.querySelectorAll(setting.inputSelector));
  const buttonElement = formElement.querySelector(setting.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, setting);

  inputList.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(formElement, input, setting)
      toggleButtonState(inputList, buttonElement, setting)
    });
  });
};

const enableValidation = (setting) => {
  const formList = Array.from(document.querySelectorAll(setting.formSelector));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    });
/* form Element? */
    const fieldsetList = Array.from(document.querySelectorAll(setting.formSelector));
    fieldsetList.forEach((fieldset) => {
      setEventListener(fieldset, setting)
    })
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
  return !input.validity.valid
  });
}

const toggleButtonState = (inputList, buttonElement, setting) => {
  if(hasInvalidInput(inputList, buttonElement)) {
    buttonElement.classList.add(setting.inputErrorClass) || buttonElement.setAttribute('disabled', 'disabled')
  }
  else {
    buttonElement.classList.remove(setting.inputErrorClass) || buttonElement.removeAttribute('disabled', 'disabled')
  }
}

enableValidation({
  formSelector: '.popup-form',
  inputSelector: '.popup-form__place',
  submitButtonSelector: '.popup-form__button',
  inactiveButtonClass: 'popup-form__button_inactive',
  inputErrorClass: 'popup-form__place_type_error',
  errorClass: 'popup-form__place_error_active'
});

export {showError, hideError, checkInputValidity, setEventListener, enableValidation}