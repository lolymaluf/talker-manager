const tokenValidation = (req, res, next) => {
  const { authorization } = req.body;
  const minimumCharacters = 16;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== minimumCharacters) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

module.exports = {
  tokenValidation,
};