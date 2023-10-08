import React from 'react';

function DeleteCardPopup({
  name,
  title,
  buttonText,
  buttonTextLoading,
  card,
  isOpen,
  onClose,
  onCloseEsc,
  onCloseOverlay,
  onCardDelete,
  isLoading,
}) {
  // слушатель закрытия попапов через esc
  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', onCloseEsc);
    }
    return () => document.removeEventListener('keydown', onCloseEsc);
  }, [isOpen]);
  // слушатель закрытия попапов через overlay
  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', onCloseOverlay);
    }
    return () => document.removeEventListener('mousedown', onCloseOverlay);
  }, [isOpen]);
  // Функция-отработчик сохранения стейта
  function handleDeleteClick(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onCardDelete(card);
    onClose();
  }
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__button-close button"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          name={`form-${name}`}
          className={`popup__form popup__form_type_${name}`}
        >
          <button
            type="submit"
            className="popup__button-submit"
            onClick={handleDeleteClick}
          >
            {isLoading ? buttonTextLoading : buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default DeleteCardPopup;
