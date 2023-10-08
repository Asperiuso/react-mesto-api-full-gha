// Конфигурация селекторов для валидации формы
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input-item_error',
  errorClass: 'popup__input-error-message_active'
};

// Находим элементы на странице


const btnEdit = document.querySelector('.profile__edit-button');
const btnAdd = document.querySelector('.profile__add-button');

const formCard = document.forms['editCard'];
const formProfile = document.forms['editProfile'];
const formInputName = document.querySelector('.popup__input-item_profile_name');
const formInputJob = document.querySelector('.popup__input-item_profile_profission');
const buttonAvatar = document.querySelector('.profile__avatar-edit-button');
const formAvatar  = document.forms['avatar'];

/*const popupAdd = document.querySelector('.popup-add');
const popupEdit = document.querySelector('.popup-edit');

const modalImg = popupInputCard.querySelector('img');
const modalText = popupInputCard.querySelector('.popup__card-title');
const popups = document.querySelectorAll('.popup');
const popupsList = Array.from(popups);
const inputProfileName = document.querySelector('.profile__name');
const inputProfileProfession = document.querySelector('.profile__profession');
const titleInputCard = document.querySelector('.popup__input-item_card_title');
const linkInputCard = document.querySelector('.popup__input-item_card_link');
const popupInputCard = document.querySelector('.popup-card');*/

export { validationConfig, buttonAvatar, formAvatar , formInputName, formInputJob, btnEdit, btnAdd, formCard, formProfile }