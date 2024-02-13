// openModal
// closeModal
export {openModal, closeModal}

const handleEscClose = (event) => { 
    if (event.key === 'Escape') { 
      const openPopup = document.querySelector('.popup_is-opened'); 
      closeModal(openPopup); 
    } 
  };
  
  const handleOverlayClick = (event) => { 
    if (event.target === event.currentTarget) { 
      closeModal(event.target); 
    } 
  }; 
  
function openModal(popup) {
    popup.classList.add('popup_is-opened', 'popup_is-animated'); 
    document.addEventListener('keydown', handleEscClose); 
    popup.addEventListener('click', handleOverlayClick);
  }
  
  function closeModal(popup) {  
      popup.classList.remove('popup_is-opened');  
      document.removeEventListener('keydown', handleEscClose);  
      popup.removeEventListener('click', handleOverlayClick);  
  }
  
