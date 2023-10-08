export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
    this._authorization = options.headers.authorization; //токен
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkRes);
  }

  getUserInfo(token) {
    return this._request(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  getInitialCards(token) {
    return this._request(`${this._url}/cards`, {
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  setUserInfo(data, token) {
    return this._request(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  addNewCard(data, token) {
    return this._request(`${this._url}/cards`, {
      method: "POST",
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  }

  deleteCard(id, token) {
    return this._request(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  changeLikeCardStatus(id, isLiked, token) {
    return this._request(`${this._url}/cards/${id}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  addLike(id, token) {
    return this._request(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  removeLike(id, token) {
    return this._request(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  setUserAvatar(data, token) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }
}

export const api = new Api({
  url: "https://api.mestox.nomoredomainsrocks.ru",
  headers: {
    "Content-Type": "application/json",
  },
});

