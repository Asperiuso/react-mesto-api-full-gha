const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const cors = require('cors');
const {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { URL_PATTERN, corsOpt } = require('../utils/constants');

router.get('/', cors(corsOpt), getCards);

const cardIdValidate = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});

router.delete('/:cardId', cors(corsOpt), cardIdValidate, deleteCard);

router.post('/', cors(corsOpt), celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(URL_PATTERN),
  }),
}), createCard);

router.put('/:cardId/likes', cors(corsOpt), cardIdValidate, likeCard);

router.delete('/:cardId/likes', cors(corsOpt), cardIdValidate, dislikeCard);

module.exports = router;
