export default class FormValidator {
  constructor(config, formElement) {
    this._config = config
    this._formElement = formElement

    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    )
    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    )
    this._inactiveButtonClass = this._config.inactiveButtonClass
    this._inputErrorClass = this._config.inputErrorClass
    this._errorClass = this._config.errorClass
  }

  _showError(input, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${input.id}-error`)
    input.classList.add(this._inputErrorClass)
    errorElement.classList.add(this._errorClass)
    errorElement.textContent = errorMessage
  }

  _hideError(input) {
    const errorElement = this._formElement.querySelector(`.${input.id}-error`)
    input.classList.remove(this._inputErrorClass)
    errorElement.classList.remove(this._errorClass)
    errorElement.textContent = ""
  }

  _checkInputValidity = (input) => {
    if (input.validity.patternMismatch) {
      input.setCustomValidity(input.dataset.errorMessage)
    } else {
      input.setCustomValidity("")
    }

    if (!input.validity.valid) {
      this._showError(input, input.validationMessage)
    } else {
      this._hideError(input)
    }
  }

  _hasInvalidInput = () => {
    return this._inputList.some((input) => {
      return !input.validity.valid
    })
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass) ||
        this._buttonElement.setAttribute("disabled", "disabled")
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass) ||
        this._buttonElement.removeAttribute("disabled", "disabled")
    }
  }

  _setEventListener = () => {
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input)
        this._toggleButtonState()
      })
    })
  }

  _enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault()
    })
    this._setEventListener()
  }

  _addButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass) ||
      this._buttonElement.setAttribute("disabled", "disabled")
  }
}
