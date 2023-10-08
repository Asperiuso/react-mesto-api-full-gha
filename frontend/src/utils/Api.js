class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  //----------------------------------------------------------------------//
  // Загрузка информации о пользователе с сервера
  getUserInfo() {
    return this._request('users/me', { headers: this._headers });
  }
  // Загрузка карточек с сервера
  getCards() {
    return this._request('cards', { headers: this._headers });
  }
  //----------------------------------------------------------------------//
  // Редактирование аватара пользователя
  chahgeUserAvatar({ avatar }) {
    return this._request('users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    });
  }
  // Редактирование профиля
  changeUserInfo({ name, about }) {
    return this._request('users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    });
  }
  //----------------------------------------------------------------------//
  // Создание новой карточки
  addNewCard(body) {
    return this._request('cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(body),
    });
  }
  // Удаление карточки
  deleteCard(id) {
    return this._request(`cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }
  // Добавить лайк
  addLike(id) {
    return this._request(`cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    });
  }
  // Убрать лайк
  removeLike(id) {
    return this._request(`cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }
  //----------------------------------------------------------------------//
  // Универсальный метод запроса с проверкой ответа
  _request(endpoint, options) {
    return fetch(`${this._baseUrl}${endpoint}`, options).then(
      this._getResponseData
    );
  }
  // Универсальный метод, который при запросе на сервер возвращает json,
  // если все прошло успешно, или ошибку, если нет
  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

// Создание экземпляра класса Api
const api = new Api({
  // baseUrl: 'http://localhost:3000/',
  baseUrl: 'https://api.mestox.nomoredomainsrocks.ru/',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json',
  },
});

export default api;
