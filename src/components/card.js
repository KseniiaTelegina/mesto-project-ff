
export { createCard, deleteCard, handleLikeClick };
import {deleteCardId, addLike, deleteLike } from "./api";

const cardTemplate = document.querySelector("#card-template").content;

function createCard(userId, data, deleteCard, handleLikeClick, imageClickCallback) {
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
  
    if (isLiked) {
        likeButton.classList.add('card__like-button_is-active');
        likeStates[cardId] = true; 
    }
        
        likeCounter.textContent = data.likes.length;
  
    deleteButton.addEventListener("click", function () {
      deleteCardId(cardId).then(() => {
          deleteCard(cardElement);
      })
      .catch((error) => {
          console.log(error);
      });
      
  });
  

    likeButton.addEventListener('click', () => {  
      handleLikeClick(cardId, likeButton, likeCounter);  
  });   
  
    cardImage.addEventListener("click", function () {
      imageClickCallback(data.link, data.name);
    });
      
        return cardElement;
  };
  
  function deleteCard(cardElement) {
    cardElement.remove();
  };

  const likeStates = {};

  function handleLikeClick(cardId, likeButton, likeCounter) {
      if (likeStates[cardId]) {
          // Убираем лайк
          deleteLike(cardId)
              .then(data => {
                  likeButton.classList.remove('card__like-button_is-active');
                  likeCounter.textContent = data.likes.length;
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
                  likeStates[cardId] = true;
              })
              .catch(error => {
                  console.log(error);
              });
      }
  };
  


// function toggleLike(evt) { 
//     evt.target.classList.toggle('card__like-button_is-active'); 
//   }
// export { createCard, deleteCard, toggleLike, updateLikeCounter, handleLikeClick };