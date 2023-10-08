class AuthApi {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
  }

  async _request(url, options) {
    const res = await fetch(url, options);
    return this._checkResponse(res);
  }

  checkToken(token) {
    return this._request(`${this.baseUrl}/users/me`, {
      headers: { ...this.headers, Authorization: `Bearer ${token}`},
    });
  }

  registerUser({ email, password }) {
    return this._request(`${this.baseUrl}/signup`, {
    method: 'POST',
    headers: this.headers,
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  });
  }

  loginUser({ email, password }) {
    return this._request(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    });
  }
}

export const authApi = new AuthApi({
  baseUrl: `https://api.mestox.nomoredomainsrocks.ru`,
  headers: {
    'Content-Type': 'application/json',
  },
});

