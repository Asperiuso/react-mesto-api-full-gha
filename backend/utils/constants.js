const URL_PATTERN = /^(https?:\/\/)(www\.)?([\w-.~:/?#[\]@!$&')(*+,;=]*\.?)*\.{1}[\w]{2,8}(\/([\w-.~:/?#[\]@!$&')(*+,;=])*)?/;
const corsOpt = {
  origin: [
    'http://localhost:3001',
    'http://localhost:3000',
    'http://mestox.nomoredomainsrocks.ru',
    'https://mestox.nomoredomainsrocks.ru',
  ],
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  optionsSuccessStatus: 200,
};

module.exports = {
  URL_PATTERN,
  corsOpt,
};
