import "../pages/index.css";
import { initialCards } from "./cards";
import { createCard, deleteCard, toggleLike } from "../components/card.js";
import { openModal, closeModal } from "../components/modal.js";
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
editPopupCloseButton.addEventListener("click", () => closeModal(editPopup));
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