
export {getProfile};

// Загрузка информации о пользователе с сервера

function getProfile() {
    fetch(`https://nomoreparties.co/v1/wff-cohort-8/users/me`, {
        headers: {
          authorization: 'e1fba36e-fa88-4189-abcb-30f5e8bd6edd',
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then(data => {
          const userName = data.name;
          const userAbout = data.about;
          const userAvatar = data.avatar;

          const profileImage = document.querySelector('.profile__image');
          profileImage.style.backgroundImage = `url(${userAvatar})`;

          const profileTitle = document.querySelector('.profile__title');
          profileTitle.textContent = userName;

         const profileDescription = document.querySelector('.profile__description');
         profileDescription.textContent = userAbout;

        //  getCard(data._id);

        })
        .catch(err => {
          console.error(err);
        });
}

//Загрузка карточек с сервера

export const getCard = () => { 
    return fetch(`https://nomoreparties.co/v1/wff-cohort-8/cards/`, { 
        headers: { 
        authorization: 'e1fba36e-fa88-4189-abcb-30f5e8bd6edd', 
        'Content-Type': 'application/json' 
    }
}) 
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`); 
          });
        
} 

export const getData = () => {
    return  Promise.all([getProfile(), getCard()]);
};

// Редактирование профиля





    