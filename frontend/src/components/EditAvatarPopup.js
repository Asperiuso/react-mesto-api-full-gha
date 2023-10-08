import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({
  isOpen,
  onClose,
  onCloseEsc,
  onCloseOverlay,
  onUpdateAvatar,
  isLoading,
}) {
  // получаем доступ к инпуту, с помощью рефа
  const ref = React.useRef();
  // Функция-отработчик сохранения стейта
  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения во внешний обработчик
    onUpdateAvatar({
      avatar: ref.current.value,
    });
  }
  // очищаем поля инпут
  React.useEffect(() => {
    ref.current.value = '';
  }, [isOpen]);
  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
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
        type="url"
        name="avatar"
        className="popup__input popup__input_type_avatar"
        placeholder="Ссылка на картинку"
        required
        ref={ref}
      />
      <span className="popup__input-error popup__input-error_type_avatar" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
