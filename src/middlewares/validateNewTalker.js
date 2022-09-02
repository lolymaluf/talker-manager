const nameValidation = (req, res, next) => {
  const { name } = req.body;
  const minimumName = 3;
  if (name.length < minimumName) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  next();
};

const ageValidation = (req, res, next) => {
  const { age } = req.body;
  const minimumAge = 18;
  if (age < minimumAge) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  next();
};

const talkValidation = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  next();
};

const watchedAtValidation = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const watchedDateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!watchedDateRegex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const rateValidation = (req, res, next) => {
  const { rate } = req.body.talk;

  if (!rate) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = {
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
};