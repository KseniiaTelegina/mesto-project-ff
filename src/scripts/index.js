import "../pages/index.css";
import { initialCards } from "./cards";
import { createCard, deleteCard, toggleLike } from "../components/card.js";
import { openModal, closeModal } from "../components/modal.js";
import { getProfile } from "../components/api.js";
import { getCard, getData } from "../components/api.js";
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

getProfile();
// getCard();

// function addCard(cardElement) {
//   const newCard = createCard(
//     cardElement,
//     deleteCard,
//     toggleLike,
//     openPopupWithImage,
//   );
//   cardsContainer.append(newCard);
// }

// initialCards.forEach((cardElement) => {
//   addCard(cardElement);
// });


getData().then(res => {
  const [userData, cardsData] = res;
  cardsData.forEach(card => {
  const cardElement = createCard(card, deleteCard, toggleLike,
      openPopupWithImage,);
      cardsContainer.append(cardElement);
  })
  // .catch(err => {
  //   console.error(err);
  // })
})
.catch(err => {
  console.error(err);
})

// initialCards.forEach((cardElement) => {
//   addCard(cardElement);
// });




//открытие и закрытие попап

editPopupOpenButton.addEventListener("click", () => {
  clearValidation(formElementEditPopup, validationConfig);
  openModal(editPopup);
  nameInput.value = profileName.textContent; 
  descriptionInput.value = profileDescription.textContent; 
  }
);

addPopupOpenButton.addEventListener("click", () => {
  clearValidation(formElementCardPopup, validationConfig);
  openModal(cardPopup); 
}
);

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

// validation.js

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


const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (validationConfig) => {
  const formList = document.querySelectorAll(validationConfig.formSelector);

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement, validationConfig);
  });
};

// index.js

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
  }
  
  function toggleButtonState(inputList, buttonElement) {
      if (hasInvalidInput(inputList)) {
          buttonElement.disabled = true;
      buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
          buttonElement.disabled = false;
      buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
  }

// Функция очистки ошибок валидации и сделать кнопку неактивной

const clearValidation = (formElement, validationConfig) => { 
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector)); 
  const submitButton = formElement.querySelector(validationConfig.submitButtonSelector); 
 
  inputList.forEach((inputElement) => {
    inputElement.value = '';
    hideInputError(formElement, inputElement); 
  }); 
  submitButton.classList.add(validationConfig.inactiveButtonClass); 
};
