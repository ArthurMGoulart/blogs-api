// Código autoria de Gabriel Gaspar em seu repo: https://github.com/tryber/sd-014-c-store-manager/blob/gabriel-gaspar_store-manager/middlewares/errorHandler.js
module.exports = (error, _req, res, _next) => {
  console.error(error);

  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    res.status(400).json({ message: 'Invalid body syntax' });
  }

  return res.status(500)
    .json({ message: 'Something went wrong here, please try again later' });
};
