
export { createCard, deleteCard, updateLikeCounter, handleLikeClick };
import {deleteCardId, addLike, deleteLike } from "./api";

const cardTemplate = document.querySelector("#card-template").content;

function createCard(userId, data, deleteCard, updateLikeCounter, imageClickCallback) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector(".card__like-button");
    const likeCounter = cardElement.querySelector(".counter__likes");

    cardElement.dataset.id = data._id;
    
    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;
    const cardId = data._id;
    const isLiked = data.likes.some(like => like._id === userId);
  
    if (userId !== data.owner._id) {
      deleteButton.style.visibility = 'hidden';
    }
  
  
    deleteButton.addEventListener("click", function () {
      deleteCardId(cardId).then((data) => {
          console.log("Карточка успешно удалена", data);
          deleteCard(cardElement);
      })
      .catch((error) => {
          console.log(error);
      });
  });
  

    likeButton.addEventListener('click', () => {  
      handleLikeClick(cardId, likeButton, likeCounter, addLike, deleteLike, updateLikeCounter);  
  });   
  
    cardImage.addEventListener("click", function () {
      imageClickCallback(data.link, data.name);
    });

    if (isLiked) {
        likeButton.classList.add('card__like-button_is-active');
        likeStates[cardId] = true; }
        
        likeCounter.textContent = data.likes.length;
      
        return cardElement;
  };
  
  function deleteCard(cardElement) {
    cardElement.remove();
  };

  const likeStates = {};

  function handleLikeClick(cardId, likeButton, likeCounter, updateLikeCounter) {
      if (likeStates[cardId]) {
          // Убираем лайк
          deleteLike(cardId)
              .then(data => {
                  likeButton.classList.remove('card__like-button_is-active');
                  likeCounter.textContent = data.likes.length;
                  updateLikeCounter(cardId, data.likes.length);
                  likeStates[cardId] = false;
              })
              .catch(error => {
                  console.log(error);
              });
      } else {
          // Устанавливаем лайк
          addLike(cardId)
              .then(data => {
                  likeButton.classList.add('card__like-button_is-active');
                  likeCounter.textContent = data.likes.length;
                  updateLikeCounter(cardId, data.likes.length);
                  likeStates[cardId] = true;
              })
              .catch(error => {
                  console.log(error);
              });
      }
  };
  
  function updateLikeCounter(cardId, likesCount) {
    const likeCounter = document.querySelector(`.card[data-id="${cardId}"] .counter__likes`);
    if (likeCounter) {
        likeCounter.textContent = likesCount;
    }
};


