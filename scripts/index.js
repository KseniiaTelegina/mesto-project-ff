const cardTemplate = document.querySelector('#card-template').content;

const placesList = document.querySelector('.places__list');
initialCards.forEach(function(cardData) {
    const newCard = createCard(cardData, deleteCard);
    placesList.appendChild(newCard);
});

function createCard(data, deleteCallback) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
  
    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;
  
    deleteButton.addEventListener('click', function() {
      deleteCallback(cardElement);
    });
  
    return cardElement;
  }

  function deleteCard(cardElement) {
    cardElement.remove();
  }
  
