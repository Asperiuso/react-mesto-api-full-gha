import React from 'react';

function PopupWithForm({
  name,
  title,
  buttonText,
  buttonTextLoading,
  isOpen,
  onClose,
  onCloseEsc,
  onCloseOverlay,
  onSubmit,
  isLoading,
  children,
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
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          className="popup__button-close button"
          type="button"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form popup__form_type_${name}`}
          name={`form-${name}`}
          onSubmit={onSubmit}
        >
          {children}
          <button
            className="popup__button-submit"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? buttonTextLoading : buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
