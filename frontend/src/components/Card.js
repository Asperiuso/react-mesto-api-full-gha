import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({
  card,
  name,
  link,
  likes,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  // Подписываем компонент на контекст
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `element__button-trash button ${
    !isOwn && 'element__button-trash_hidden'
  }`;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__button-like button ${
    isLiked && 'element__button-like_active'
  }`;
  function handleCardClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteCardClick() {
    onCardDelete(card);
  }
  return (
    <li className="element">
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDeleteCardClick}
      />
      <img
        className="element__image"
        src={link}
        alt={name}
        onClick={handleCardClick}
      />
      <article className="element__title-block">
        <h2 className="element__title">{name}</h2>
        <div className="element__button-like-block">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          />
          <span className="element__like-counter">{likes}</span>
        </div>
      </article>
    </li>
  );
}

export default Card;
