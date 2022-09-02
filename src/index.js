const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { getAllTalkers } = require('./utils/talkers');
const { emailValidation } = require('./middlewares/emailValidation');
const { passwordValidation } = require('./middlewares/passwordValidation');

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
  res.status(200).json(respList);
});

app.get('/talker/:id', async (req, res) => {
  const respList = await getAllTalkers();
  const talkerById = respList.find((talker) => talker.id === Number(req.params.id));
  if (talkerById) {
    return res.status(200).json(talkerById);
  }
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', emailValidation, passwordValidation, (req, res) => {
  const useCrypto = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token: useCrypto });
});