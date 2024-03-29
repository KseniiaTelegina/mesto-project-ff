
export { createCard, deleteCard, handleLikeClick };
import {deleteCardId, addLike, deleteLike } from "./api";

const cardTemplate = document.querySelector("#card-template").content;

// function createCard(userId, data, deleteCard, handleLikeClick, imageClickCallback) 
function createCard(userId, data, deleteCallback, handleLikeClick, imageClickCallback){
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
    } else {
        deleteButton.addEventListener("click", function () {
            deleteCallback(cardId, cardElement)
      });
    }
  
    if (isLiked) {
        likeButton.classList.add('card__like-button_is-active');
        likeStates[cardId] = true; 
    }
        
        likeCounter.textContent = data.likes.length;

    likeButton.addEventListener('click', () => {  
      handleLikeClick(cardId, likeButton, likeCounter);
  });   
  
    cardImage.addEventListener("click", function () {
      imageClickCallback(data.link, data.name);
    });
        return cardElement;
  };

  function deleteCard(cardId, cardElement) {
    deleteCardId(cardId, cardElement).then(() => {
        cardElement.remove();
    })
    .catch((error) => {
        console.log(error);
    });
  };

  const likeStates = {};

  function handleLikeClick(cardId, likeButton, likeCounter) {
    const likeMethod = likeStates[cardId] ? deleteLike: addLike;
      likeMethod(cardId) 
              .then(data => { 
                    likeButton.classList.toggle('card__like-button_is-active'); 
                    likeCounter.textContent = data.likes.length; 
                    likeStates[cardId] = !likeStates[cardId]; 
               })
      .catch(err => console.log(err));
  };



// function toggleLike(evt) { 
//     evt.target.classList.toggle('card__like-button_is-active'); 
//   }
// export { createCard, deleteCard, toggleLike, updateLikeCounter, handleLikeClick };