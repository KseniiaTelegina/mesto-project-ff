import { data } from "autoprefixer";

// Загрузка информации о пользователе с сервера

const getProfile = () => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-8/users/me`, {
    headers: {
      authorization: "e1fba36e-fa88-4189-abcb-30f5e8bd6edd",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

//Загрузка карточек с сервера

const getCard = () => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-8/cards/`, {
    headers: {
      authorization: "e1fba36e-fa88-4189-abcb-30f5e8bd6edd",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const getData = () => {
  return Promise.all([getProfile(), getCard()]);
};

// Сохранение редактирование профиля

export const updateProfile = (name, about) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-8/users/me`, {
    method: "PATCH",
    headers: {
      authorization: "e1fba36e-fa88-4189-abcb-30f5e8bd6edd",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// Добавление новой карточки

export const updateCard = (name, link) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-8/cards`, {
    method: "POST",
    headers: {
      authorization: "e1fba36e-fa88-4189-abcb-30f5e8bd6edd",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// Удаление карточки

export const deleteCardId = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-8/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "e1fba36e-fa88-4189-abcb-30f5e8bd6edd",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// Постановка и снятие лайка

export const addLike = (cardId) => {
  return fetch(
    `https://nomoreparties.co/v1/wff-cohort-8/cards/likes/${cardId}`,
    {
      method: "PUT",
      headers: {
        authorization: "e1fba36e-fa88-4189-abcb-30f5e8bd6edd",
        "Content-Type": "application/json",
      },
    },
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const deleteLike = (cardId) => {
  return fetch(
    `https://nomoreparties.co/v1/wff-cohort-8/cards/likes/${cardId}`,
    {
      method: "DELETE",
      headers: {
        authorization: "e1fba36e-fa88-4189-abcb-30f5e8bd6edd",
        "Content-Type": "application/json",
      },
    },
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// Обновление аватара пользователя

export const updateAvatar = (avatar) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-8/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: "e1fba36e-fa88-4189-abcb-30f5e8bd6edd",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};