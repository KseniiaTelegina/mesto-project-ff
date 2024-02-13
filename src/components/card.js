export { createCard, deleteCard, toggleLike };

const cardTemplate = document.querySelector("#card-template").content;

function createCard(data, deleteCallback, likeCallback, imageClickCallback) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  deleteButton.addEventListener("click", function () {
    deleteCallback(cardElement);
  });

  likeButton.addEventListener('click', likeCallback);

  cardImage.addEventListener("click", function () {
    imageClickCallback(data.link, data.name);
  });

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function toggleLike(evt) { 
  evt.target.classList.toggle('card__like-button_is-active'); 
}




