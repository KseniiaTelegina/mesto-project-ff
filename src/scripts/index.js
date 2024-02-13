import '../pages/index.css'
import { initialCards } from './cards';
import {createCard, deleteCard, toggleLike} from '../components/card.js'
import {openModal, closeModal} from '../components/modal.js'
import { data } from 'autoprefixer';

const placesList = document.querySelector('.places__list');
const popup = document.querySelector('.popup'); 
const editPopupOpenButton = document.querySelector('.profile__edit-button');
const addPopupOpenButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imgPopup = document.querySelector('.popup_type_image');
const EditPopupCloseButton = editPopup.querySelector('.popup__close');
const CardPopupCloseButton = cardPopup.querySelector('.popup__close');
const ImagePopupCloseButton = imgPopup.querySelector('.popup__close');
const profileName = document.querySelector('.profile__title');
const jobInput = document.querySelector('.profile__description');
const formElementEditPopup = editPopup.querySelector('.popup__form');
const nameInput = formElementEditPopup.querySelector('.popup__input_type_name');
const descriptionInput = formElementEditPopup.querySelector('.popup__input_type_description');
const formElementCardPopup = cardPopup.querySelector('.popup__form');
const newCardName = formElementCardPopup.querySelector('.popup__input_type_card-name');
const newCardLink = formElementCardPopup.querySelector('.popup__input_type_url');
const popupImage = imgPopup.querySelector('.popup__image');
const popupCaption = imgPopup.querySelector('.popup__caption');

function showCard(cardElement) {
    const newCard = createCard(cardElement, deleteCard, toggleLike, openPopupWithImage);
    
    if (placesList.children.length < initialCards.length) {
        placesList.append(newCard);
    } else {
        placesList.prepend(newCard);
    }
}

initialCards.forEach((cardElement) => {
    showCard(cardElement);
})

//открытие карточек с изображением

function openPopupWithImage(imageSrc, captionText) {
    popupImage.src = imageSrc;
    popupImage.alt = captionText;
    popupCaption.textContent = captionText;
  
    openModal(imgPopup);
    };

//открытие и закрытие попап


editPopupOpenButton.addEventListener('click', () => openModal(editPopup));
addPopupOpenButton.addEventListener('click', () => openModal(cardPopup));
EditPopupCloseButton.addEventListener('click', () => closeModal(editPopup));
CardPopupCloseButton.addEventListener('click', () => closeModal(cardPopup));
ImagePopupCloseButton.addEventListener('click', () => closeModal(imgPopup));

//Редактирование имени и информации о себе

nameInput.value = profileName.textContent;
descriptionInput.value = jobInput.textContent;

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    jobInput.textContent = descriptionInput.value;
    closeModal(editPopup);                                    
}

formElementEditPopup.addEventListener('submit', handleFormSubmit);

//Добавление карточки

function handleFormCardSubmit(evt) { 
    evt.preventDefault(); 
    const newCardPopup = {  
      name: newCardName.value, 
      link: newCardLink.value, 
      alt: newCardName.value
    };

    showCard(newCardPopup);
    formElementCardPopup.reset(); 
    closeModal(cardPopup); 
}

formElementCardPopup.addEventListener('submit', handleFormCardSubmit);

//открытие карточек с изображением

function handleImageClick(imageSrc, captionText) {
    popupImage.src = imageSrc;
    popupImage.alt = captionText;
    popupCaption.textContent = captionText;
  
    openModal(imgPopup);
    };








