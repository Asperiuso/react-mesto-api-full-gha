import React from 'react';
import { Link } from 'react-router-dom';

function Login({ onLogin }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);
    setEmail('');
    setPassword('');
  }

  return (
    <div className="sign-form">
      <h2 className="sign-form__title">Вход</h2>
      <form className="sign-form__form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          className="sign-form__input"
          placeholder="Email"
          required
          minLength={8}
          maxLength={30}
          value={email}
          onChange={handleChangeEmail}
        />
        <span className="sign-form__input-error" />
        <input
          type="password"
          name="password"
          className="sign-form__input"
          placeholder="Пароль"
          required
          value={password}
          onChange={handleChangePassword}
        />
        <span className="sign-form__input-error" />
        <button className="sign-form__button-submit" type="submit">
          Войти
        </button>
      </form>
      <p className="sign-form__paragraph-link sign-form__paragraph-link_type_hidden">
        Уже зарегистрированы? &nbsp;
        <Link className="sign-form__link" to="/signin">
          Войти
        </Link>
      </p>
    </div>
  );
}

export default Login;
