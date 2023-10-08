import successIcon from '../images/success-icon.svg';
import failIcon from '../images/fail-icon.svg';
import React from 'react';

function InfoToolTipPopUp({
  isOpen,
  isSuccess,
  onClose,
  onCloseEsc,
  onCloseOverlay,
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
    <div
      className={`popup popup_type_info-tool-tip ${
        isOpen ? 'popup_opened' : ''
      }`}
    >
      <div className="popup__container popup__container_type_info-tool-tip">
        {isSuccess ? (
          <>
            <img
              src={`${successIcon}`}
              alt="Регистрация прошла успешно"
              className="popup__image_type_info-tool-tip"
            />
            <h2 className="popup__title popup__title_type_info-tool-tip">
              Вы успешно зарегистрировались!
            </h2>
          </>
        ) : (
          <>
            <img
              src={`${failIcon}`}
              alt="Регистрация не была выполнена"
              className="popup__image_type_info-tool-tip"
            />
            <p className="popup__title popup__title_type_info-tool-tip">
              Что-то пошло не так. Попробуйте ещё раз!
            </p>
          </>
        )}
        <button
          className="popup__button-close button"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoToolTipPopUp;
