const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const talkers = require('./utils/talkers');
// const fs = require('fs');
// const { join } = require('path');
const { getAllTalkers, createNewTalker, editTalker } = require('./utils/talkers');
const { emailValidation } = require('./middlewares/emailValidation');
const { passwordValidation } = require('./middlewares/passwordValidation');
const {
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
} = require('./middlewares/validateNewTalker');
const { tokenValidation } = require('./middlewares/tokenValidation');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
  const respList = await getAllTalkers();
  res.status(HTTP_OK_STATUS).json(respList);
});

app.get(
  '/talker/search',
  tokenValidation,
  async (req, res) => {
    const { q } = req.query;
    console.log('query', q);
    const findTalker = await talkers.searchTalker(q);
    console.log(findTalker);
    return res.status(200).json(findTalker);
  },
);

app.get('/talker/:id', async (req, res) => {
  const respList = await getAllTalkers();
  const talkerById = respList.find((talker) => talker.id === Number(req.params.id));
  if (talkerById) {
    return res.status(HTTP_OK_STATUS).json(talkerById);
  }
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post(
  '/talker',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
  // createNewTalker,
  async (req, res) => {
    const newTalker = req.body;
    const response = await createNewTalker(newTalker);
    return res.status(201).json(response);
  },
  );

app.post('/login', emailValidation, passwordValidation, (_req, res) => {
  const useCrypto = crypto.randomBytes(8).toString('hex');
  return res.status(HTTP_OK_STATUS).json({ token: useCrypto });
});

app.put(
  '/talker/:id',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
    
  async (req, res) => {
    const { id } = req.params;
    const object = { id, ...req.body };
    const result = await editTalker(id, object);
    return res.status(200).json(result);
  },
  );

app.delete(
 '/talker/:id',
  tokenValidation,
  
  async (req, res) => {
  const { id } = req.params;
  await talkers.deleteTalker(id);
  return res.status(204).end();
},
);