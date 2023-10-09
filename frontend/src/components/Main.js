import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  // Подписываем компонент на контекст
  const currentUser = React.useContext(CurrentUserContext);
 
  // Сортируем карточки по дате создания в убывающем порядке
  const sortedCards = cards.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA;
  });

  const cardsElements = sortedCards.map((card) => (
    <Card
      card={card}
      key={card._id}
      name={card.name}
      link={card.link}
      likes={card.likes.length}
      onCardClick={onCardClick}
      onCardLike={onCardLike}
      onCardDelete={onCardDelete}
    />
  ));
  return (
    <main>
      <section className="profile">
        <div
          className="profile__avatar"
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
          onClick={onEditAvatar}
        />
        <div className="profile__name-block">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__button-edit button"
            type="button"
            onClick={onEditProfile}
          />
        </div>
        <p className="profile__about">{currentUser.about}</p>
        <button
          className="profile__button-add button"
          type="button"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements">
        <ul className="elements__list">{cardsElements}</ul>
      </section>
    </main>
  );
}

export default Main;
