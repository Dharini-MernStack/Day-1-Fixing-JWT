const bcrypt = require("bcrypt");

const saltRounds = 10;

const hash = (password) => {
  return bcrypt.hash(password, saltRounds); // async version
};

const compare = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = { hash, compare };
