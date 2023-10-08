import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import headerLogo from '../images/logo.svg';

function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип" />
      <Routes>
        <Route
          path="/signin"
          element={
            <Link to="/signup" className="header__link">
              Регистрация
            </Link>
          }
        />

        <Route
          path="/signup"
          element={
            <Link to="/signin" className="header__link">
              Войти
            </Link>
          }
        />

        <Route
          exact
          path="/"
          element={
            <div className="header__user-info">
              <p className="header__email">{email}</p>
              <Link to="/signin" className="header__link" onClick={onSignOut}>
                Выйти
              </Link>
            </div>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
