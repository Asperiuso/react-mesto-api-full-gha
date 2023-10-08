import React from 'react';

function ImagePopup({ card, isOpen, onClose, onCloseEsc, onCloseOverlay }) {
  // слушатель закрытия попапов через esc
  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', onCloseEsc);
    };
    return () => document.removeEventListener('keydown', onCloseEsc);
  }, [isOpen]);
  // слушатель закрытия попапов через overlay
  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', onCloseOverlay);
    }; 
    return () => document.removeEventListener('mousedown', onCloseOverlay);
  }, [isOpen]);
  return (
    <div className={`popup popup_type_picture ${isOpen ? 'popup_opened' : ''}`}>
      <figure className="popup__figure-container">
        <button
          className="popup__button-close button"
          type="button"
          onClick={onClose}
        />
        <img
          className="popup__image"
          src={card && card.link}
          alt={card && card.name}
        />
        <figcaption className="popup__caption">{card && card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
