const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const cors = require('cors');
const {
  getUsers, getUserById, editUserData, editUserAvatar, getMe,
} = require('../controllers/users');
const { URL_PATTERN, corsOpt } = require('../utils/constants');

router.get('/', cors(corsOpt), getUsers);

router.get('/me', cors(corsOpt), getMe);

router.get('/:userId', cors(corsOpt), celebrate({
  params: Joi.object().keys({ userId: Joi.string().required().length(24).hex() }),
}), getUserById);

router.patch('/me', cors(corsOpt), celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), editUserData);

router.patch('/me/avatar', cors(corsOpt), celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(URL_PATTERN),
  }),
}), editUserAvatar);

module.exports = router;
