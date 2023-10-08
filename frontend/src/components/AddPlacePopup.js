import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({
  isOpen,
  onClose,
  onCloseEsc,
  onCloseOverlay,
  onAddPlace,
  isLoading,
}) {
  // Стейт, в котором содержится значение инпута title
  const [title, setTitle] = React.useState('');
  // Стейт, в котором содержится значение инпута link
  const [link, setLink] = React.useState('');
  // очищаем поля ввода при открытии попапа
  React.useEffect(() => {
    if (isOpen) {
      setTitle('');
      setLink('');
    }
  }, [isOpen]);
  // Функция-отработчик изменения title
  function handleTitleChange(e) {
    setTitle(e.target.value);
  }
  // Функция-отработчик изменения link
  function handleLinkChange(e) {
    setLink(e.target.value);
  }
  // Функция-отработчик сохранения стейта
  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({
      name: title,
      link: link,
    });
  }
  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonText="Создать"
      buttonTextLoading="Создание..."
      isOpen={isOpen}
      onClose={onClose}
      onCloseEsc={onCloseEsc}
      onCloseOverlay={onCloseOverlay}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <input
        type="text"
        name="title"
        className="popup__input popup__input_type_title"
        placeholder="Название"
        minLength={2}
        maxLength={30}
        value={title}
        onChange={handleTitleChange}
        required
      />
      <span className="popup__input-error popup__input-error_type_title" />
      <input
        type="url"
        name="link"
        className="popup__input popup__input_type_link"
        placeholder="Ссылка на картинку"
        value={link}
        onChange={handleLinkChange}
        required
      />
      <span className="popup__input-error popup__input-error_type_link" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
