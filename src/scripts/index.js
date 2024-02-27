import "../pages/index.css";
import { initialCards } from "./cards";
import { createCard, deleteCard, toggleLike } from "../components/card.js";
import { openModal, closeModal } from "../components/modal.js";
// import { toggleButtonState } from "../components/validation.js";
import { data } from "autoprefixer";

const cardsContainer = document.querySelector(".places__list");
const editPopupOpenButton = document.querySelector(".profile__edit-button");
const addPopupOpenButton = document.querySelector(".profile__add-button");
const editPopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imgPopup = document.querySelector(".popup_type_image");
const editPopupCloseButton = editPopup.querySelector(".popup__close");
const cardPopupCloseButton = cardPopup.querySelector(".popup__close");
const imagePopupCloseButton = imgPopup.querySelector(".popup__close");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formElementEditPopup = editPopup.querySelector(".popup__form");
const nameInput = formElementEditPopup.querySelector(".popup__input_type_name");
const descriptionInput = formElementEditPopup.querySelector(".popup__input_type_description");
const formElementCardPopup = cardPopup.querySelector(".popup__form");
const newCardName = formElementCardPopup.querySelector(".popup__input_type_card-name");
const newCardLink = formElementCardPopup.querySelector(".popup__input_type_url");
const popupImage = imgPopup.querySelector(".popup__image");
const popupCaption = imgPopup.querySelector(".popup__caption");

// const popupForm = document.querySelector(".popup__form");
// const formInput = popupForm.querySelector(".popup__input");

function addCard(cardElement) {
  const newCard = createCard(
    cardElement,
    deleteCard,
    toggleLike,
    openPopupWithImage,
  );
  cardsContainer.append(newCard);
}

initialCards.forEach((cardElement) => {
  addCard(cardElement);
});

//открытие и закрытие попап

editPopupOpenButton.addEventListener("click", () => {
    openModal(editPopup);
    nameInput.value = profileName.textContent; 
    descriptionInput.value = profileDescription.textContent; 
  }
);
addPopupOpenButton.addEventListener("click", () => openModal(cardPopup));

// editPopupCloseButton.addEventListener("click", () => {
//   closeModal(editPopup);
//   clearValidation(editPopup, validationConfig);
//   }
// );

// cardPopupCloseButton.addEventListener("click", () => {
//   closeModal(cardPopup);
//   clearValidation(cardPopup, validationConfig);
//   }
// );
editPopupCloseButton.addEventListener("click", () =>  closeModal(editPopup));
cardPopupCloseButton.addEventListener("click", () => closeModal(cardPopup));
imagePopupCloseButton.addEventListener("click", () => closeModal(imgPopup));

//Редактирование имени и информации о себе

nameInput.value = profileName.textContent;
descriptionInput.value = profileDescription.textContent;

function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editPopup);
  clearValidation(editPopup, validationConfig);
}

formElementEditPopup.addEventListener("submit", handleProfileEditFormSubmit);

//Добавление карточки

function handleFormCardSubmit(evt) {
  evt.preventDefault();
  const newCardPopup = {
    name: newCardName.value,
    link: newCardLink.value,
  };

  const createNewCard = createCard(
    newCardPopup,
    deleteCard,
    toggleLike,
    openPopupWithImage
  );
  cardsContainer.prepend(createNewCard);
  formElementCardPopup.reset();
  closeModal(cardPopup);
}

formElementCardPopup.addEventListener("submit", handleFormCardSubmit);

//открытие карточек с изображением

function openPopupWithImage(imageSrc, captionText) {
  popupImage.src = imageSrc;
  popupImage.alt = captionText;
  popupCaption.textContent = captionText;

  openModal(imgPopup);
}

//ПР-7

// // Настройки валидации
// const validationConfig = {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: '.popup__button_disabled',
//   inputErrorClass: '.popup__input_type_error',
//   errorClass: '.popup__error_visible'
// };

// // Функция отображения ошибки

// const showInputError = (formElement, inputElement, errorMessage) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(validationConfig.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(validationConfig.errorClass);
// };

// // Функция скрытия ошибки

// const hideInputError = (formElement, inputElement) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(validationConfig.inputErrorClass);
//   errorElement.classList.remove(validationConfig.errorClass);
//   errorElement.textContent = '';
// };

// // Функция проверки валидности ввода

// const checkInputValidity = (formElement, inputElement) => {
//   if (inputElement.validity.patternMismatch) {
//     inputElement.setCustomValidity(inputElement.dataset.errorMessage);
//     } else {
//     inputElement.setCustomValidity("");
//     }
//     if (!inputElement.validity.valid) {
//       showInputError(formElement, inputElement, inputElement.validationMessage);
//     } else {
//       hideInputError(formElement, inputElement);
//     }
// };


// const setEventListeners = (formElement) => {
//   const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
//   const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
//   clearValidation(inputList, buttonElement);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', function () {
//       checkInputValidity(formElement, inputElement);
//       clearValidation(inputList, buttonElement);
//     });
//   });
// };


// const enableValidation = () => {
//   const formList = Array.from(document.querySelectorAll('.form'));
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', function (evt) {
//       evt.preventDefault();
//     });
//     const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
//     fieldsetList.forEach((fieldSet) => {
//       setEventListeners(fieldSet);
//     }); 
//   });  
// };

// // Вызов функции для включения валидации всех форм
// enableValidation(validationConfig);

// function hasInvalidInput(inputList) {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
//   }

// // Функция очистки ошибок валидации и сделать кнопку неактивной


// clearValidation(inputList, buttonElement) {
//   inputList.forEach((inputElement) => { 
//     hideInputError(inputElement); 
//   }); 
//   if (hasInvalidInput(inputList)) { 
//     buttonElement.classList.add(validationConfig.inactiveButtonClass); 
//     buttonElement.disabled = true; 
//   } else { 
//     buttonElement.classList.remove(validationConfig.inactiveButtonClass); 
//     buttonElement.disabled = false; 
//   }
// };


// function clearValidation(formElement, validationConfig) {
//   const inputElements = formElement.querySelectorAll(validationConfig.inputSelector);
//   inputElements.forEach(inputElement => {
//       hideInputError(formElement, inputElement, validationConfig);
//   });

//   if (hasInvalidInput(inputList)) {
//     buttonElement.disabled = true;
//     buttonElement.classList.add(validationConfig.inactiveButtonClass);
//   } else {
//     buttonElement.disabled = false;
//     buttonElement.classList.remove(validationConfig.inactiveButtonClass);
//   }
// }

// clearValidation(formElement, validationConfig); 







const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Функция отображения ошибки
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

// Функция скрытия ошибки
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

// Функция проверки валидности ввода
const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
    inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);

      const isValid = inputList.every(input => input.validity.valid);
      if (isValid) {
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
      } else {
        buttonElement.disabled = true;
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
      }
    });
  });
};

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset);
    });
  });
};

enableValidation(validationConfig);

// Функция очистки ошибок валидации и сделать кнопку неактивной
function clearValidation(formElement, validationConfig) {
  const inputElements = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  inputElements.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });

  buttonElement.disabled = true;
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
}

const profileForm = document.querySelector('.popup__form');
clearValidation(profileForm, validationConfig);

// export { clearValidation };


// const validationConfig = {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// };

// const enableValidation = (config) => {
//   const forms = document.querySelectorAll(config.formSelector);
//   forms.forEach((form) => {
//     form.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     }
// );

// const inputs = form.querySelectorAll(config.inputSelector);
// const submitButton = form.querySelector(config.submitButtonSelector);

// const validateInput = (input) => {
//   const inputError = input.nextElementSibling;
//     if (input.validity.valid) {
//       input.classList.remove(config.inputErrorClass);
//       inputError.classList.remove(config.errorClass);
//     } else {
//       input.classList.add(config.inputErrorClass);
//       inputError.textContent = input.validationMessage || input.dataset.errorMessage;
//       inputError.classList.add(config.errorClass);
//     }
// };


// const toggleSubmitButton = () => {
//       const isValid = Array.from(inputs).every(input => input.validity.valid);
//       submitButton.disabled = !isValid;
//       if (!isValid) {
//         submitButton.classList.add(config.inactiveButtonClass);
//       } else {
//         submitButton.classList.remove(config.inactiveButtonClass);
//       }
// };

// inputs.forEach((input) => {
//       input.addEventListener('input', () => {
//         validateInput(input);
//         toggleSubmitButton();
//       });
//     });
//   });
// };

// const clearValidation = (form, config) => {
//   form.reset();
//   const inputs = form.querySelectorAll(config.inputSelector);
//   const submitButton = form.querySelector(config.submitButtonSelector);

//   inputs.forEach((input) => {
//     const inputError = input.nextElementSibling;
//     input.classList.remove(config.inputErrorClass);
//     inputError.textContent = '';
//     inputError.classList.remove(config.errorClass);
//   });

//   submitButton.disabled = true;
//   submitButton.classList.add(config.inactiveButtonClass);
// };

// enableValidation(validationConfig);
// clearValidation(profileForm, validationConfig);




