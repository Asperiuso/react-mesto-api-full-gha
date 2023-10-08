/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
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

import * as auth from '../utils/Auth';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  // переменные состояния
  const [isEditAvatarOpen, setIsEditAvatarOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddPlaceOpen, setIsAddPlaceOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [cardDelete, setCardDelete] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [registeredIn, setRegisteredIn] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();
  // функции для попапов
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfileOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlaceOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarOpen(false);
    setIsEditProfileOpen(false);
    setIsAddPlaceOpen(false);
    setSelectedCard(null);
    setIsConfirmDeletePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setRegisteredIn(false);
  }

  //------------------------------------АВТОРИЗАЦИЯ-----------------------------//

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (loggedIn) {
      api
        .getInitialCards(token)
        .then((res) => {
          setCards(res);
        })
        .catch(console.error);
      api
        .getUserInfo(token)
        .then((res) => {
          setCurrentUser(res);
        })
        .catch(console.error);
    }

  }, [loggedIn]);

  useEffect(() => {
    checkToken();
  }, []);

  function checkToken() {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setUserInfo(res.email); //res.data.email
          setLoggedIn(true);
          navigate("/", { replace: true });
        })
        .catch((error) => {
          localStorage.removeItem("token");
          navigate("/sign-up", { replace: true });
          setLoggedIn(false);
          console.log(error);
        });
    }
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          setIsInfoTooltipOpen(true);
          setRegisteredIn(true);
          navigate("/sign-in", { replace: true });
        }
      })
      .catch((error) => {
        setIsInfoTooltipOpen(true);
        setRegisteredIn(false);
        console.log(error);
      })
  }

  function handleLogin(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        localStorage.setItem("token", res.token);
        setLoggedIn(true);
        setUserInfo(email, password);
        navigate("/", { replace: true });
      })
      .catch((error) => {
        setIsInfoTooltipOpen(true);
        setLoggedIn(false);
        console.log(error);
      });
  }

  function handleSignOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/sign-in", { replace: true });
  }

  //-------------------------------------------------------------АВАТАР------------//
  // Функция-отработчик изменения аватара
  function handleUpdateAvatar(data) {
    const token = localStorage.getItem('token');
    if (loggedIn) {
      setLoading(true);
      api
        .setUserAvatar({ avatar: data }, token)
        .then((res) => {
          setCurrentUser(res);
          closeAllPopups();
        })
        .catch(console.error)
        .finally(() => {
          setLoading(false);
        });
    }
  }
  //-----------------------------------------------------------ПРОФИЛЬ--------------//
  // Функция-отработчик изменения профиля
  function handleUpdateUser(data) {
    const token = localStorage.getItem('token');
    if (loggedIn) {
      setLoading(true);
      api
        .setUserInfo(data, token)
        .then((res) => {
          setCurrentUser(res);
          closeAllPopups();
        })
        .catch(console.error)
        .finally(() => {
          setLoading(false);
        });
    }

  }
  //---------------------------------------------------------ДОБАЛЕНИЕ КАРТОЧЕК-----//
  // Функция-отработчик добавления новых карточек
  function handleAddPlaceSubmit(data) {
    const token = localStorage.getItem('token');
    if (loggedIn) {
      setLoading(true);
      api
        .addNewCard(data, token)
        .then((newCard) => {
          setCards([newCard, ...cards]);
          closeAllPopups();
        })
        .catch(console.error)
        .finally(() => {
          setLoading(false);
        });
    }
  }

  // Функция-отработчик лайков/анлайков
  function handleCardLike(card) {
    const token = localStorage.getItem('token');
    const isLiked = card.likes.some((i) => i === currentUser._id);
    if (loggedIn) {
      api
        .changeLikeCardStatus(card._id, !isLiked, token)
        .then((newCard) => {
          setCards((cards) =>
            cards.map((c) => (c._id === card._id ? newCard : c)),
          );
        })
        .catch(console.error);
    }
  }

  //---------------------------------------------------------УДАЛЕНИЕ КРТОЧЕК ------//
  // Функция-отработчик удаления карточки
  function handleCardDelete() {
    const token = localStorage.getItem('token');
    if (loggedIn) {
      setLoading(true)
      api
        .deleteCard(cardDelete._id, token)
        .then(() => {
          setCards((state) => state.filter((c) => c._id !== cardDelete._id));
          closeAllPopups();
        })
        .catch(console.error)
        .finally(() => {
          setLoading(false);
        });
    }
  }

  function handleDeleteCardClick(card) {
    setIsConfirmDeletePopupOpen(true);
    setCardDelete(card);
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
            loggedIn={loggedIn}
            userInfo={userInfo}
            onSignOut={handleSignOut}
          />

          <Routes>
            <Route
              exact
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  loggedIn={loggedIn}
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
              element={<Login onLogin={handleRegister} loggedIn={loggedIn} />}
            />
            <Route
              path="/signup"
              element={<Register onRegistration={handleLogin} loggedIn={loggedIn} />}
            />
            <Route
              exact
              path="*"
              element={
                loggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/signin" replace />
                )
              }
            />
          </Routes>

          <Footer />

          <EditAvatarPopup
            isOpen={isEditAvatarOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            onCloseEsc={closePopupWithEsc}
            onCloseOverlay={closePopupWithClickOnOverlay}
            isLoading={isLoading}
          />

          <EditProfilePopup
            isOpen={isEditProfileOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onCloseEsc={closePopupWithEsc}
            onCloseOverlay={closePopupWithClickOnOverlay}
            isLoading={isLoading}
          />

          <AddPlacePopup
            isOpen={isAddPlaceOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            onCloseEsc={closePopupWithEsc}
            onCloseOverlay={closePopupWithClickOnOverlay}
            isLoading={isLoading}
          />

          <DeleteCardPopup
            name="delete-card"
            title="Вы уверены?"
            buttonText="Да"
            buttonTextLoading="Удаление..."
            isOpen={isConfirmDeletePopupOpen}
            card={isConfirmDeletePopupOpen}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}
            onCloseEsc={closePopupWithEsc}
            onCloseOverlay={closePopupWithClickOnOverlay}
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
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            isSuccess={registeredIn}
            onCloseEsc={closePopupWithEsc}
            onCloseOverlay={closePopupWithClickOnOverlay}
          />
        </div>
      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;
