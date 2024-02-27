// export { enableValidation };

// function toggleButtonState(inputList, buttonElement) {
//     if (hasInvalidInput(inputList)) {
//     // сделай кнопку неактивной
//         buttonElement.disabled = true;
//     buttonElement.classList.add('button_inactive');
//   } else {
//         // иначе сделай кнопку активной
//         buttonElement.disabled = false;
//     buttonElement.classList.remove('button_inactive');
//   }
// }

// function toggleButtonState() {
//     const isValid = form.checkValidity();
//     submitButton.disabled = !isValid;
//     submitButton.classList.toggle(inactiveButtonClass, !isValid);
// }

// function enableValidation({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass, ...otherInputSettings}) {
//     const form = document.querySelector(formSelector);
//     const inputList = form.querySelectorAll(inputSelector);
//     const submitButton = form.querySelector(submitButtonSelector);
    
//     function toggleButtonState() {
//         const isValid = form.checkValidity();
//         submitButton.disabled = !isValid;
//         submitButton.classList.toggle(inactiveButtonClass, !isValid);
//     }
    
//     function checkInputValidity(inputElement, errorElement) {
//         if (!inputElement.validity.valid) {
//             errorElement.textContent = inputElement.validationMessage || "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы";
//             errorElement.classList.add(errorClass);
//             inputElement.classList.add(inputErrorClass);
//         } else {
//             errorElement.textContent = "";
//             errorElement.classList.remove(errorClass);
//             inputElement.classList.remove(inputErrorClass);
//         }
//     }
    
//     function setEventListeners() {
//         inputList.forEach((inputElement) => {
//             const errorElement = inputElement.nextElementSibling;
            
//             inputElement.addEventListener('input', function () {
//                 checkInputValidity(inputElement, errorElement);
//                 toggleButtonState();
//             });
//         });
        
//         form.addEventListener('submit', function (evt) {
//             evt.preventDefault();
//         });
        
//         toggleButtonState();
//     }
    
//     setEventListeners();
// }