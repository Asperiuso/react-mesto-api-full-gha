import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({
  isOpen,
  onClose,
  onCloseEsc,
  onCloseOverlay,
  onUpdateUser,
  isLoading,
}) {
  // Стейт, в котором содержится значение инпута name
  const [name, setName] = React.useState('');
  // Стейт, в котором содержится значение инпута description
  const [description, setDescription] = React.useState('');
  // Подписываем компонент на контекст
  const currentUser = React.useContext(CurrentUserContext);
  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);
  // Функция-отработчик изменения name
  function handleNameChange(e) {
    setName(e.target.value);
  }
  // Функция-отработчик изменения description
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  // Функция-отработчик сохранения стейта
  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      buttonTextLoading="Сохранение..."
      isOpen={isOpen}
      onClose={onClose}
      onCloseEsc={onCloseEsc}
      onCloseOverlay={onCloseOverlay}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <input
        type="text"
        name="name"
        className="popup__input popup__input_type_name"
        placeholder="Введите имя"
        required
        minLength={2}
        maxLength={40}
        value={name}
        onChange={handleNameChange}
      />
      <span className="popup__input-error popup__input-error_type_name" />
      <input
        type="text"
        name="about"
        className="popup__input popup__input_type_about"
        placeholder="Введите профессию"
        required
        minLength={2}
        maxLength={200}
        value={description}
        onChange={handleDescriptionChange}
      />
      <span className="popup__input-error popup__input-error_type_about" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
