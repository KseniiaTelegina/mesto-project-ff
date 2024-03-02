import "../pages/index.css";
import { createCard, deleteCard, handleLikeClick } from "../components/card.js";
import { openModal, closeModal } from "../components/modal.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import { getData, updateProfile, updateCard, updateAvatar } from "../components/api.js";
export { validationConfig};

const cardsContainer = document.querySelector(".places__list");
const editPopupOpenButton = document.querySelector(".profile__edit-button");
const addPopupOpenButton = document.querySelector(".profile__add-button");
const avatarPopupOpenButton = document.querySelector(".profile__image-button");
const editPopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const avatarPopup = document.querySelector(".popup_type_edit-avatar");
const imgPopup = document.querySelector(".popup_type_image");
const editPopupCloseButton = editPopup.querySelector(".popup__close");
const cardPopupCloseButton = cardPopup.querySelector(".popup__close");
const avatarPopupCloseButton = avatarPopup.querySelector(".popup__close");
const imagePopupCloseButton = imgPopup.querySelector(".popup__close");
const profileName = document.querySelector(".profile__title");
const formElementAvatarPopup = avatarPopup.querySelector(".popup__form");
const newAvatarLink = formElementAvatarPopup.querySelector(".popup__input_type_avatar_url");
const profileDescription = document.querySelector(".profile__description");
const formElementEditPopup = editPopup.querySelector(".popup__form");
const nameInput = formElementEditPopup.querySelector(".popup__input_type_name");
const descriptionInput = formElementEditPopup.querySelector(".popup__input_type_description");
const formElementCardPopup = cardPopup.querySelector(".popup__form");
const newCardName = formElementCardPopup.querySelector(".popup__input_type_card-name");
const newCardLink = formElementCardPopup.querySelector(".popup__input_type_url");
const popupImage = imgPopup.querySelector(".popup__image");
const popupCaption = imgPopup.querySelector(".popup__caption");
const saveButton = document.querySelector(".popup__button");
let userId;

// Создание карточки

getData()
.then((res) => {
  const [userData, cardsData] = res;

  const userName = userData.name;
  const userAbout = userData.about;
  const userAvatar = userData.avatar;
  userId = userData._id;

  const profileImage = document.querySelector(".profile__image");
  profileImage.style.backgroundImage = `url(${userAvatar})`;

  const profileTitle = document.querySelector(".profile__title");
  profileTitle.textContent = userName;

  const profileDescription = document.querySelector(".profile__description");
  profileDescription.textContent = userAbout;

  cardsData.forEach((card) => {
    const cardElement = createCard(
      userId,
      card,
      deleteCard,
      handleLikeClick,
      openPopupWithImage,
    );
    cardsContainer.append(cardElement);
  });
})
.catch((err) => {
  console.error(err);
});

//открытие и закрытие попап
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

editPopupOpenButton.addEventListener("click", () => {
clearValidation(formElementEditPopup, validationConfig);
openModal(editPopup);
nameInput.value = profileName.textContent;
descriptionInput.value = profileDescription.textContent;
});

addPopupOpenButton.addEventListener("click", () => {
clearValidation(formElementCardPopup, validationConfig);
openModal(cardPopup);
});

avatarPopupOpenButton.addEventListener("click", () => {
clearValidation(formElementAvatarPopup, validationConfig);
openModal(avatarPopup);
});

editPopupCloseButton.addEventListener("click", () => closeModal(editPopup));
cardPopupCloseButton.addEventListener("click", () => closeModal(cardPopup));
imagePopupCloseButton.addEventListener("click", () => closeModal(imgPopup));
avatarPopupCloseButton.addEventListener("click", () => closeModal(avatarPopup));

//Редактирование имени и информации о себе

nameInput.value = profileName.textContent;
descriptionInput.value = profileDescription.textContent;

function handleProfileEditFormSubmit(event) {
  event.preventDefault();

  saveButton.textContent = "Сохранение...";

  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  updateProfile(nameInput.value, descriptionInput.value)
  .then((data) => {
    const userName = data.name;
    const userAbout = data.about;
    const userAvatar = data.avatar;

    const profileImage = document.querySelector(".profile__image");
    profileImage.style.backgroundImage = `url(${userAvatar})`;

    const profileTitle = document.querySelector(".profile__title");
    profileTitle.textContent = userName;

    const profileDescription = document.querySelector(".profile__description");
    profileDescription.textContent = userAbout;
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    saveButton.textContent = "Сохранить";
  });
  closeModal(editPopup);
}

formElementEditPopup.addEventListener("submit", handleProfileEditFormSubmit);

//Добавление карточки

function handleFormCardSubmit(event) {
  event.preventDefault();

  saveButton.textContent = "Сохранение...";

  updateCard(newCardName.value, newCardLink.value)
    .then((data) => {
      const createNewCard = createCard(
        userId,
        data,
        deleteCard,
        handleLikeClick,
        openPopupWithImage
      );

      cardsContainer.prepend(createNewCard);
      formElementCardPopup.reset();
      closeModal(cardPopup);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      saveButton.textContent = "Сохранить";
    });
}

formElementCardPopup.addEventListener("submit", handleFormCardSubmit);

// Обновление аватара

function handleFormAvatarSubmit(event) {
  event.preventDefault();

  saveButton.textContent = "Сохранение...";

  updateAvatar(newAvatarLink.value)
    .then((data) => {
      const avatarImage = data.avatar;
      const profileImage = document.querySelector(".profile__image");
      profileImage.style.backgroundImage = `url(${avatarImage})`;
      closeModal(avatarPopup);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      saveButton.textContent = "Сохранить";
    });

  formElementAvatarPopup.reset();
}

formElementAvatarPopup.addEventListener("submit", handleFormAvatarSubmit);

//открытие карточек с изображением

function openPopupWithImage(imageSrc, captionText) {
popupImage.src = imageSrc;
popupImage.alt = captionText;
popupCaption.textContent = captionText;

openModal(imgPopup);
}



