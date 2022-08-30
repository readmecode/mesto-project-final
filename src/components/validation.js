const showError = (formElement, input, errorMessage) => {
  const errorElement = formElement.querySelector(`.${input.id}-error`);
  input.classList.add('popup-form__place_type_error');
  errorElement.classList.add('popup-form__place_error_active');
  errorElement.textContent = errorMessage
}

const hideError = (formElement, input) => {
  const errorElement = formElement.querySelector(`.${input.id}-error`);
  input.classList.remove('popup-form__place_type_error');
  errorElement.classList.remove('popup-form__place_error_active');
  errorElement.textContent = '';
}

const checkInputValidity = (formElement, input) => {
  if(!input.validity.valid) {
    showError(formElement, input, input.validationMessage)
  }
  else {
    hideError(formElement, input)
  }
}


const setEventListener = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup-form__place'));
  const buttonElement = formElement.querySelector('.popup-form__button');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(formElement, input)
      toggleButtonState(inputList, buttonElement)
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup-form'));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    });

    const fieldsetList = Array.from(formElement.querySelectorAll('.popup-form__contact-info'));
    fieldsetList.forEach((fieldset) => {
      setEventListener(fieldset)
    })
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
  return !input.validity.valid
  });
}

const toggleButtonState = (inputList, buttonElement) => {
  if(hasInvalidInput(inputList, buttonElement)) {
    buttonElement.classList.add('popup-form__button_inactive')
  }
  else {
    buttonElement.classList.remove('popup-form__button_inactive')
  }
}



enableValidation()

export {showError, hideError, checkInputValidity, setEventListener, enableValidation}