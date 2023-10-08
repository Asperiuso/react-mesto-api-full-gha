/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// импортируем компоненты приложения
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import InfoToolTipPopup from './InfoToolTipPopup';

import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';

import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  // переменные состояния
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] =
    React.useState(null);
  const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);

  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [isSuccessSignUp, setIsSuccessSignUp] = React.useState(false);

  const navigate = useNavigate();

  //------------------------------------АВТОРИЗАЦИЯ-----------------------------//
  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  function handleTokenCheck() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.email);
            navigate('/', { replace: true });
          } else {
            setLoggedIn(false);
          }
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`)});
    }
  }

  function handleRegistration(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        if (res._id) {
          setIsSuccessSignUp(true);
          setInfoToolTipPopupOpen(true);
          navigate('/signin', { replace: true });
        } else {
          setInfoToolTipPopupOpen(true);
          setIsSuccessSignUp(false);
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleAuthorization(email, password) {
    auth
      .authorize(email, password)
      .then(({ token }) => {
        if (token) {
          // пользователь залоггинен
          setLoggedIn(true);
          // сохраняем токен
          localStorage.setItem('jwt', token);
          setEmail(email);
          navigate('/', { replace: true });
        } else {
          setInfoToolTipPopupOpen(true);
          setIsSuccessSignUp(false);
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setEmail('');
    navigate('/signin', { replace: true });
  }
  
  React.useEffect(() => {
    if (isLoggedIn) {
      // Забираем с сервера инф о пользователе и карточки
      Promise.all([api.getUserInfo(), api.getCards()])
        .then(([me, cards]) => {
          setCurrentUser(me);
          setCards(cards);
        })
        .catch((err) => console.log(`Ошибка: ${err}`));
    }
  }, [isLoggedIn]);
  //-------------------------------------------------------------АВАТАР------------//
  // ф-я открытия попапа - редактирование аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  // Функция-отработчик изменения аватара
  function handleUpdateAvatar(data) {
    setLoading(true);
    api
      .chahgeUserAvatar(data)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => {
        setLoading(false);
      });
  }
  //-----------------------------------------------------------ПРОФИЛЬ--------------//
  // ф-я открытия попапа - редактирование профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  // Функция-отработчик изменения профиля
  function handleUpdateUser(data) {
    setLoading(true);
    api
      .changeUserInfo(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => {
        setLoading(false);
      });
  }
  //---------------------------------------------------------ДОБАЛЕНИЕ КАРТОЧЕК-----//
  // ф-я открытия попапа - добавление новых карточек
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  // Функция-отработчик добавления новых карточек
  function handleAddPlaceSubmit(data) {
    setLoading(true);
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => {
        setLoading(false);
      });
  }
  // Функция-отработчик лайков/анлайков
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);
    if (!isLiked) {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(`Ошибка: ${err}`));
    } else {
      api
        .removeLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(`Ошибка: ${err}`));
    }
  }
  //---------------------------------------------------------УДАЛЕНИЕ КРТОЧЕК ------//
  // ф-я открытия попапа - удаление карточек
  function handleDeleteCardClick(card) {
    setIsDeleteCardPopupOpen(card);
  }
  // Функция-отработчик удаления карточки
  function handleCardDelete(card) {
    setLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((items) => items.filter((c) => c._id !== card._id && c));
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => {
        setLoading(false);
      });
  }
  //----------------------------------------------------ПРОСМОТР ИЗОБРАЖЕНИЙ ------//
  // ф-я открытия попапа - просмотр изображений
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  //-------------------------------------------------ЗАКРЫТИЕ ВСЕХ ПОПАПОВ --------//
  // функция закрытия всех попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsDeleteCardPopupOpen(null);
    setInfoToolTipPopupOpen(false);
  }
  // закрытие попаров через esc
  function closePopupWithEsc(e) {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  }
  // закрытие попапов через оверлей
  function closePopupWithClickOnOverlay(e) {
    if (e.target.classList.contains('popup_opened')) {
      closeAllPopups();
    }
  }
  //-------------------------------------------------------------------------------//
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header
            isLoggedIn={isLoggedIn}
            email={email}
            onSignOut={handleSignOut}
          />

          <Routes>
            <Route
              exact
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  isLoggedIn={isLoggedIn}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeleteCardClick}
                  cards={cards}
                />
              }
            />
            <Route
              path="/signin"
              element={<Login onLogin={handleAuthorization} />}
            />
            <Route
              path="/signup"
              element={<Register onRegistration={handleRegistration} />}
            />
            <Route
              exact
              path="*"
              element={
                isLoggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/signin" replace />
                )
              }
            />
          </Routes>

          <Footer />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onCloseEsc={closePopupWithEsc}
            onCloseOverlay={closePopupWithClickOnOverlay}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onCloseEsc={closePopupWithEsc}
            onCloseOverlay={closePopupWithClickOnOverlay}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onCloseEsc={closePopupWithEsc}
            onCloseOverlay={closePopupWithClickOnOverlay}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />

          <DeleteCardPopup
            name="delete-card"
            title="Вы уверены?"
            buttonText="Да"
            buttonTextLoading="Удаление..."
            card={isDeleteCardPopupOpen}
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            onCloseEsc={closePopupWithEsc}
            onCloseOverlay={closePopupWithClickOnOverlay}
            onCardDelete={handleCardDelete}
            isLoading={isLoading}
          />

          <ImagePopup
            card={selectedCard}
            isOpen={selectedCard}
            onClose={closeAllPopups}
            onCloseEsc={closePopupWithEsc}
            onCloseOverlay={closePopupWithClickOnOverlay}
          />

          <InfoToolTipPopup
            isOpen={isInfoToolTipPopupOpen}
            onClose={closeAllPopups}
            isSuccess={isSuccessSignUp}
            onCloseEsc={closePopupWithEsc}
            onCloseOverlay={closePopupWithClickOnOverlay}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
